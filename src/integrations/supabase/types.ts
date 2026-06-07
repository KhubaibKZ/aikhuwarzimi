export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      audit_reports: {
        Row: {
          audited_at: string
          audited_by: string | null
          check_type: Database["public"]["Enums"]["audit_check_type"]
          findings: Json | null
          id: string
          notes: string | null
          paper_id: string
          question_id: string
          source: string
          status: Database["public"]["Enums"]["audit_status"]
        }
        Insert: {
          audited_at?: string
          audited_by?: string | null
          check_type: Database["public"]["Enums"]["audit_check_type"]
          findings?: Json | null
          id?: string
          notes?: string | null
          paper_id: string
          question_id: string
          source?: string
          status?: Database["public"]["Enums"]["audit_status"]
        }
        Update: {
          audited_at?: string
          audited_by?: string | null
          check_type?: Database["public"]["Enums"]["audit_check_type"]
          findings?: Json | null
          id?: string
          notes?: string | null
          paper_id?: string
          question_id?: string
          source?: string
          status?: Database["public"]["Enums"]["audit_status"]
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      student_assignments: {
        Row: {
          assigned_by: string | null
          course_id: string
          created_at: string
          id: string
          student_id: string
        }
        Insert: {
          assigned_by?: string | null
          course_id: string
          created_at?: string
          id?: string
          student_id: string
        }
        Update: {
          assigned_by?: string | null
          course_id?: string
          created_at?: string
          id?: string
          student_id?: string
        }
        Relationships: []
      }
      student_chapter_assign: {
        Row: {
          assigned_by: string | null
          chapter_id: string
          course_id: string
          created_at: string
          id: string
          student_id: string
        }
        Insert: {
          assigned_by?: string | null
          chapter_id: string
          course_id: string
          created_at?: string
          id?: string
          student_id: string
        }
        Update: {
          assigned_by?: string | null
          chapter_id?: string
          course_id?: string
          created_at?: string
          id?: string
          student_id?: string
        }
        Relationships: []
      }
      student_paper_assignments: {
        Row: {
          assigned_by: string | null
          checkwork_count: number
          created_at: string
          hint_count: number
          id: string
          paper_id: string
          student_id: string
        }
        Insert: {
          assigned_by?: string | null
          checkwork_count?: number
          created_at?: string
          hint_count?: number
          id?: string
          paper_id: string
          student_id: string
        }
        Update: {
          assigned_by?: string | null
          checkwork_count?: number
          created_at?: string
          hint_count?: number
          id?: string
          paper_id?: string
          student_id?: string
        }
        Relationships: []
      }
      student_paper_progress: {
        Row: {
          accuracy_score: number | null
          ai_usage_count: number | null
          checkwork_count: number
          completed_steps: number | null
          created_at: string
          id: string
          is_correct: boolean
          paper_id: string
          question_id: string
          speed_score: number | null
          submitted_answers: Json | null
          submitted_at: string
          submitted_feedback: Json | null
          time_spent_seconds: number | null
          total_steps: number | null
          user_id: string
          workspace_mode: Database["public"]["Enums"]["workspace_mode"]
        }
        Insert: {
          accuracy_score?: number | null
          ai_usage_count?: number | null
          checkwork_count?: number
          completed_steps?: number | null
          created_at?: string
          id?: string
          is_correct?: boolean
          paper_id: string
          question_id: string
          speed_score?: number | null
          submitted_answers?: Json | null
          submitted_at?: string
          submitted_feedback?: Json | null
          time_spent_seconds?: number | null
          total_steps?: number | null
          user_id: string
          workspace_mode?: Database["public"]["Enums"]["workspace_mode"]
        }
        Update: {
          accuracy_score?: number | null
          ai_usage_count?: number | null
          checkwork_count?: number
          completed_steps?: number | null
          created_at?: string
          id?: string
          is_correct?: boolean
          paper_id?: string
          question_id?: string
          speed_score?: number | null
          submitted_answers?: Json | null
          submitted_at?: string
          submitted_feedback?: Json | null
          time_spent_seconds?: number | null
          total_steps?: number | null
          user_id?: string
          workspace_mode?: Database["public"]["Enums"]["workspace_mode"]
        }
        Relationships: []
      }
      usage_sessions: {
        Row: {
          account_type: string
          created_at: string
          display_name: string | null
          duration_seconds: number
          email: string | null
          id: string
          last_active_at: string
          session_token: string | null
          started_at: string
          user_id: string | null
        }
        Insert: {
          account_type?: string
          created_at?: string
          display_name?: string | null
          duration_seconds?: number
          email?: string | null
          id?: string
          last_active_at?: string
          session_token?: string | null
          started_at?: string
          user_id?: string | null
        }
        Update: {
          account_type?: string
          created_at?: string
          display_name?: string | null
          duration_seconds?: number
          email?: string | null
          id?: string
          last_active_at?: string
          session_token?: string | null
          started_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      decrement_checkwork: {
        Args: { p_paper_id: string; p_student_id: string }
        Returns: number
      }
      decrement_hint: {
        Args: { p_paper_id: string; p_student_id: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      update_demo_session: {
        Args: { _duration_seconds: number; _id: string; _token: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "student"
      audit_check_type:
        | "question_fidelity"
        | "diagram_fidelity"
        | "workspace_scaffolding"
        | "check_work_coverage"
        | "submit_validation"
      audit_status: "pending" | "pass" | "warning" | "fail"
      workspace_mode: "general" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "student"],
      audit_check_type: [
        "question_fidelity",
        "diagram_fidelity",
        "workspace_scaffolding",
        "check_work_coverage",
        "submit_validation",
      ],
      audit_status: ["pending", "pass", "warning", "fail"],
      workspace_mode: ["general", "student"],
    },
  },
} as const
