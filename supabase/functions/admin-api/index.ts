import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  try {
    const { action, ...params } = await req.json()

    switch (action) {
      case 'list_students': {
        const { data, error } = await supabaseAdmin
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false })
        if (error) throw error
        return new Response(JSON.stringify({ data }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }

      case 'get_assignments': {
        const { student_id } = params
        const [courses, chapters, papers] = await Promise.all([
          supabaseAdmin.from('student_assignments').select('course_id').eq('student_id', student_id),
          supabaseAdmin.from('student_chapter_assign').select('course_id, chapter_id').eq('student_id', student_id),
          supabaseAdmin.from('student_paper_assignments').select('paper_id, hint_count, checkwork_count').eq('student_id', student_id),
        ])
        if (courses.error) throw courses.error
        return new Response(JSON.stringify({
          courses: courses.data,
          chapters: chapters.data,
          papers: papers.data,
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }

      case 'save_assignments': {
        const { student_id, courses: courseIds, chapters, papers } = params

        // Delete and re-insert courses
        await supabaseAdmin.from('student_assignments').delete().eq('student_id', student_id)
        if (courseIds.length > 0) {
          const { error } = await supabaseAdmin.from('student_assignments').insert(
            courseIds.map((course_id: string) => ({ student_id, course_id }))
          )
          if (error) throw error
        }

        // Delete and re-insert chapters
        await supabaseAdmin.from('student_chapter_assign').delete().eq('student_id', student_id)
        if (chapters.length > 0) {
          const { error } = await supabaseAdmin.from('student_chapter_assign').insert(
            chapters.map((c: { course_id: string; chapter_id: string }) => ({ student_id, ...c }))
          )
          if (error) throw error
        }

        // Delete and re-insert papers
        await supabaseAdmin.from('student_paper_assignments').delete().eq('student_id', student_id)
        if (papers.length > 0) {
          const { error } = await supabaseAdmin.from('student_paper_assignments').insert(
            papers.map((p: { paper_id: string; hint_count: number; checkwork_count: number }) => ({ student_id, ...p }))
          )
          if (error) throw error
        }

        return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }

      case 'delete_student': {
        const { user_id } = params
        const { error } = await supabaseAdmin.auth.admin.deleteUser(user_id)
        if (error) throw error
        return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      }

      default:
        return new Response(JSON.stringify({ error: 'Unknown action' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
