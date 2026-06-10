import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, ArrowUp, ArrowDown, Save, RotateCcw, Upload, Eye, ImageOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAdminRole } from '@/hooks/useAdminRole';
import { useOverridesVersion } from '@/hooks/useOverridesSync';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  pastPapers,
  pastPaperQuestions,
  getPastPaperQuestion,
  type PastPaperQuestion,
  type EquationStage,
  type EquationStageElement,
} from '@/lib/pastPaperData';
import { getOverride, setOverride, clearOverride } from '@/lib/questionOverrides';
import { PastPaperWorkspace } from '@/components/PastPaperWorkspace';

type Editable = PastPaperQuestion & { diagramImageUrl?: string | null };

function deepClone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}

export default function PaperEditor() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin, loading: roleLoading } = useAdminRole();
  const { toast } = useToast();
  useOverridesVersion();

  const [paperId, setPaperId] = useState<string>('');
  const [questionId, setQuestionId] = useState<string>('');
  const [draft, setDraft] = useState<Editable | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const sortedPapers = useMemo(
    () => [...pastPapers].sort((a, b) => a.title.localeCompare(b.title)),
    [],
  );
  const currentPaper = pastPapers.find((p) => p.id === paperId);
  const sections = currentPaper?.sections ?? [];

  // Load draft when question changes
  useEffect(() => {
    if (!questionId) { setDraft(null); return; }
    const base = pastPaperQuestions[questionId];
    if (!base) { setDraft(null); return; }
    const ov = getOverride(questionId);
    const merged = ov ? getPastPaperQuestion(questionId) : base;
    setDraft(deepClone(merged as Editable));
  }, [questionId]);

  if (!roleLoading && !isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-12 text-center">
          <h2 className="text-2xl font-bold mb-2">Editor — Admins only</h2>
          <p className="text-muted-foreground mb-6">
            {user ? 'Your account does not have admin access.' : 'Please sign in with an admin account.'}
          </p>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const update = (mutator: (d: Editable) => void) => {
    setDraft((prev) => {
      if (!prev) return prev;
      const next = deepClone(prev);
      mutator(next);
      return next;
    });
  };

  const save = async () => {
    if (!draft || !paperId || !questionId || !user) return;
    setSaving(true);
    try {
      // Build override = only fields that differ from the base (shallow keys we edit)
      const base = pastPaperQuestions[questionId] as any;
      const ov: any = {};
      const keys: (keyof PastPaperQuestion)[] = [
        'title', 'question', 'marks', 'hints', 'parts',
        'answer', 'equationStages', 'equationStagesMap', 'markingCriteria',
      ];
      for (const k of keys) {
        if (JSON.stringify((draft as any)[k]) !== JSON.stringify(base[k])) {
          ov[k] = (draft as any)[k];
        }
      }
      // Also persist a per-part check-work toggle map
      if ((draft as any).checkWorkDisabledMap) {
        ov.checkWorkDisabledMap = (draft as any).checkWorkDisabledMap;
      }
      const diagramUrl = (draft as any).diagramImageUrl ?? null;

      const { error } = await supabase
        .from('question_overrides')
        .upsert(
          {
            paper_id: paperId,
            question_id: questionId,
            override: ov,
            diagram_image_url: diagramUrl,
            updated_by: user.id,
          },
          { onConflict: 'paper_id,question_id' },
        );
      if (error) throw error;
      setOverride({
        paper_id: paperId,
        question_id: questionId,
        override: ov,
        diagram_image_url: diagramUrl,
      });
      toast({ title: 'Saved', description: 'Question override is live on the dashboard.' });
    } catch (e: any) {
      toast({ title: 'Save failed', description: e.message ?? String(e), variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const revertToOriginal = async () => {
    if (!paperId || !questionId) return;
    if (!confirm('Discard all edits and revert this question to the original?')) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('question_overrides')
        .delete()
        .eq('paper_id', paperId)
        .eq('question_id', questionId);
      if (error) throw error;
      clearOverride(questionId);
      setDraft(deepClone(pastPaperQuestions[questionId] as Editable));
      toast({ title: 'Reverted', description: 'Original question restored.' });
    } catch (e: any) {
      toast({ title: 'Revert failed', description: e.message ?? String(e), variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const uploadDiagram = async (file: File) => {
    if (!questionId) return;
    setUploading(true);
    try {
      const ext = file.name.split('.').pop() || 'png';
      const path = `${questionId}-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from('question-diagrams')
        .upload(path, file, { upsert: true, cacheControl: '3600' });
      if (upErr) throw upErr;
      const { data: signed } = await supabase.storage
        .from('question-diagrams')
        .createSignedUrl(path, 60 * 60 * 24 * 365 * 5); // 5 years
      const url = signed?.signedUrl;
      if (!url) throw new Error('Could not generate URL');
      update((d) => { (d as any).diagramImageUrl = url; });
      toast({ title: 'Image uploaded', description: 'Click Save to publish.' });
    } catch (e: any) {
      toast({ title: 'Upload failed', description: e.message ?? String(e), variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Paper Editor</h1>
            <p className="text-sm text-muted-foreground">
              Pick any paper and question, edit the canvas, save to publish for all users.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>Back</Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Left: pickers + question list */}
          <Card className="col-span-12 lg:col-span-3 h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Select</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs">Paper</Label>
                <Select value={paperId} onValueChange={(v) => { setPaperId(v); setQuestionId(''); }}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Choose paper" /></SelectTrigger>
                  <SelectContent className="max-h-80">
                    {sortedPapers.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {currentPaper && (
                <div>
                  <Label className="text-xs">Question ({sections.length})</Label>
                  <div className="mt-1 max-h-[60vh] overflow-y-auto space-y-1 pr-1">
                    {sections.map((s) => {
                      const hasOverride = !!getOverride(s.questionId);
                      const isActive = s.questionId === questionId;
                      return (
                        <button
                          key={s.id}
                          onClick={() => setQuestionId(s.questionId)}
                          className={`w-full text-left rounded-md border px-2 py-1.5 text-xs transition-colors ${
                            isActive ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted/50'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-medium truncate">{s.title}</span>
                            {hasOverride && <Badge variant="secondary" className="text-[9px]">edited</Badge>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right: canvas */}
          <div className="col-span-12 lg:col-span-9">
            {!draft ? (
              <Card>
                <CardContent className="py-16 text-center text-muted-foreground">
                  Select a paper and a question to start editing.
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader className="pb-2 flex flex-row items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-lg">
                      Q{draft.questionNumber} — {draft.title || 'untitled'}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">{questionId}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap justify-end">
                    <Button variant="outline" size="sm" onClick={() => setPreviewOpen(true)}>
                      <Eye className="h-4 w-4" /> Preview
                    </Button>
                    <Button variant="outline" size="sm" onClick={revertToOriginal} disabled={saving}>
                      <RotateCcw className="h-4 w-4" /> Revert
                    </Button>
                    <Button size="sm" onClick={save} disabled={saving}>
                      <Save className="h-4 w-4" /> {saving ? 'Saving…' : 'Save'}
                    </Button>
                  </div>
                </CardHeader>

                <CardContent>
                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="parts">Parts</TabsTrigger>
                      <TabsTrigger value="steps">Solution steps</TabsTrigger>
                      <TabsTrigger value="hints">Hints & Check</TabsTrigger>
                      <TabsTrigger value="diagram">Diagram image</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="space-y-4">
                      <div>
                        <Label>Title</Label>
                        <Input value={draft.title} onChange={(e) => update((d) => { d.title = e.target.value; })} />
                      </div>
                      <div>
                        <Label>Question text</Label>
                        <Textarea
                          rows={6}
                          value={draft.question}
                          onChange={(e) => update((d) => { d.question = e.target.value; })}
                        />
                        <p className="text-[11px] text-muted-foreground mt-1">
                          Use plain text. Newlines preserved. Math symbols: × ÷ ² ³ √ π °.
                        </p>
                      </div>
                      <div className="w-32">
                        <Label>Total marks</Label>
                        <Input
                          type="number" min={0}
                          value={draft.marks}
                          onChange={(e) => update((d) => { d.marks = Number(e.target.value) || 0; })}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="parts" className="space-y-3">
                      {(draft.parts || []).length === 0 && (
                        <p className="text-sm text-muted-foreground">
                          This question has no parts. (Short / single-answer questions edit the answer directly under Solution steps.)
                        </p>
                      )}
                      {(draft.parts || []).map((p, idx) => (
                        <div key={idx} className="rounded-md border border-border p-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <Label className="text-xs">Label</Label>
                              <Input value={p.label} onChange={(e) => update((d) => { d.parts![idx].label = e.target.value; })} />
                            </div>
                            <div className="w-24">
                              <Label className="text-xs">Key</Label>
                              <Input value={p.key} onChange={(e) => update((d) => { d.parts![idx].key = e.target.value; })} />
                            </div>
                            <div className="w-20">
                              <Label className="text-xs">Marks</Label>
                              <Input type="number" min={0} value={p.marks}
                                onChange={(e) => update((d) => { d.parts![idx].marks = Number(e.target.value) || 0; })} />
                            </div>
                            <div className="flex flex-col gap-1 pt-5">
                              <Button variant="ghost" size="icon" className="h-7 w-7"
                                onClick={() => update((d) => {
                                  if (idx > 0) { const a = d.parts![idx - 1]; d.parts![idx - 1] = d.parts![idx]; d.parts![idx] = a; }
                                })}><ArrowUp className="h-3 w-3" /></Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7"
                                onClick={() => update((d) => {
                                  if (idx < d.parts!.length - 1) { const a = d.parts![idx + 1]; d.parts![idx + 1] = d.parts![idx]; d.parts![idx] = a; }
                                })}><ArrowDown className="h-3 w-3" /></Button>
                            </div>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"
                              onClick={() => update((d) => { d.parts!.splice(idx, 1); })}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          <div>
                            <Label className="text-xs">Final answer for this part (used by validator)</Label>
                            <Input
                              value={((draft.answer as any) || {})[p.key] || ''}
                              onChange={(e) => update((d) => {
                                if (typeof d.answer !== 'object' || !d.answer) d.answer = {} as any;
                                (d.answer as any)[p.key] = e.target.value;
                              })}
                              placeholder="e.g. 2b-a|-a+2b"
                            />
                            <p className="text-[10px] text-muted-foreground mt-1">Use <code>|</code> to accept alternatives.</p>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" onClick={() => update((d) => {
                        d.parts = d.parts || [];
                        const k = `p${d.parts.length + 1}`;
                        d.parts.push({ label: `(${String.fromCharCode(97 + d.parts.length)}) New part`, key: k, marks: 1 });
                      })}>
                        <Plus className="h-4 w-4" /> Add part
                      </Button>
                    </TabsContent>

                    <TabsContent value="steps">
                      <StepsEditor draft={draft} update={update} />
                    </TabsContent>

                    <TabsContent value="hints" className="space-y-4">
                      <div>
                        <Label>Hints (shown one at a time via the Hint button)</Label>
                        <div className="space-y-2 mt-2">
                          {(draft.hints || []).map((h, i) => (
                            <div key={i} className="flex gap-2">
                              <Input value={h} onChange={(e) => update((d) => { d.hints[i] = e.target.value; })} />
                              <Button variant="ghost" size="icon" className="text-destructive"
                                onClick={() => update((d) => { d.hints.splice(i, 1); })}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button variant="outline" size="sm" onClick={() => update((d) => { d.hints = [...(d.hints || []), '']; })}>
                            <Plus className="h-4 w-4" /> Add hint
                          </Button>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <Label className="mb-2 block">Check-work button (per part)</Label>
                        {(draft.parts || []).length === 0 ? (
                          <p className="text-sm text-muted-foreground">No parts on this question.</p>
                        ) : (
                          <div className="space-y-2">
                            {(draft.parts || []).map((p) => {
                              const map = (draft as any).checkWorkDisabledMap || {};
                              const disabled = !!map[p.key];
                              return (
                                <div key={p.key} className="flex items-center justify-between rounded-md border border-border px-3 py-2">
                                  <span className="text-sm">{p.label}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">{disabled ? 'Hidden' : 'Shown'}</span>
                                    <Switch
                                      checked={!disabled}
                                      onCheckedChange={(v) => update((d) => {
                                        (d as any).checkWorkDisabledMap = { ...((d as any).checkWorkDisabledMap || {}) };
                                        if (v) delete (d as any).checkWorkDisabledMap[p.key];
                                        else (d as any).checkWorkDisabledMap[p.key] = true;
                                      })}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        <p className="text-[11px] text-muted-foreground mt-2">
                          Note: this toggle is saved as metadata. The dashboard currently always shows the check-work button — wiring it to hide per part is a small follow-up.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="diagram" className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Upload an image to display above (or in place of) the built-in diagram for this question.
                        Existing hand-coded SVG diagrams will still render below — clear the image to remove the override.
                      </p>
                      {(draft as any).diagramImageUrl ? (
                        <div className="space-y-3">
                          <div className="rounded-md border border-border p-2 bg-white">
                            <img src={(draft as any).diagramImageUrl} alt="Diagram" className="max-h-80 mx-auto" />
                          </div>
                          <Button variant="outline" size="sm"
                            onClick={() => update((d) => { (d as any).diagramImageUrl = null; })}>
                            <ImageOff className="h-4 w-4" /> Remove image
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <input
                            id="diagram-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) uploadDiagram(f);
                              e.currentTarget.value = '';
                            }}
                          />
                          <Button asChild variant="outline" disabled={uploading}>
                            <label htmlFor="diagram-upload" className="cursor-pointer">
                              <Upload className="h-4 w-4" /> {uploading ? 'Uploading…' : 'Upload image'}
                            </label>
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Live preview */}
      {draft && previewOpen && (
        <PastPaperWorkspace
          question={draft as PastPaperQuestion}
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
          workspaceMode="general"
        />
      )}
    </div>
  );
}

/* -------------------- Steps editor -------------------- */

function StepsEditor({ draft, update }: { draft: Editable; update: (m: (d: Editable) => void) => void }) {
  const partKeys = (draft.parts || []).map((p) => p.key);
  // For single-answer questions, expose `equationStages`. For multi, expose per-part stages.
  const [activeKey, setActiveKey] = useState<string>(partKeys[0] || '__shared__');

  useEffect(() => {
    if (partKeys.length > 0 && !partKeys.includes(activeKey)) setActiveKey(partKeys[0]);
  }, [partKeys.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps

  const getStages = (): EquationStage[] => {
    if (partKeys.length === 0) return draft.equationStages || [];
    return (draft.equationStagesMap || {})[activeKey] || [];
  };
  const setStages = (m: (s: EquationStage[]) => void) => {
    update((d) => {
      if (partKeys.length === 0) {
        d.equationStages = d.equationStages || [];
        m(d.equationStages);
      } else {
        d.equationStagesMap = d.equationStagesMap || {};
        d.equationStagesMap[activeKey] = d.equationStagesMap[activeKey] || [];
        m(d.equationStagesMap[activeKey]);
      }
    });
  };

  const setAnswerVal = (key: string, val: string) => {
    update((d) => {
      if (typeof d.answer !== 'object' || !d.answer) d.answer = {} as any;
      (d.answer as any)[key] = val;
    });
  };
  const ansVal = (key: string) => ((draft.answer as any) || {})[key] || '';

  const stages = getStages();

  return (
    <div className="space-y-4">
      {partKeys.length > 0 && (
        <div className="flex items-center gap-2">
          <Label className="text-xs">Editing part:</Label>
          <Select value={activeKey} onValueChange={setActiveKey}>
            <SelectTrigger className="w-64"><SelectValue /></SelectTrigger>
            <SelectContent>
              {(draft.parts || []).map((p) => (
                <SelectItem key={p.key} value={p.key}>{p.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Single-answer (short) question */}
      {partKeys.length === 0 && stages.length === 0 && (
        <div className="rounded-md border border-border p-3 space-y-2">
          <Label className="text-xs">Final answer (short question)</Label>
          <Input
            value={typeof draft.answer === 'string' ? draft.answer : ''}
            onChange={(e) => update((d) => { d.answer = e.target.value; })}
          />
        </div>
      )}

      {stages.map((stage, si) => (
        <div key={si} className="rounded-md border border-border p-3 space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Label className="text-xs">Step label</Label>
              <Input value={stage.label} onChange={(e) => setStages((s) => { s[si].label = e.target.value; })} />
            </div>
            <div className="w-32">
              <Label className="text-xs">Step key</Label>
              <Input value={stage.stepKey} onChange={(e) => setStages((s) => { s[si].stepKey = e.target.value; })} />
            </div>
            <div className="flex flex-col gap-1 pt-5">
              <Button variant="ghost" size="icon" className="h-7 w-7"
                onClick={() => setStages((s) => { if (si > 0) { const a = s[si - 1]; s[si - 1] = s[si]; s[si] = a; } })}>
                <ArrowUp className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7"
                onClick={() => setStages((s) => { if (si < s.length - 1) { const a = s[si + 1]; s[si + 1] = s[si]; s[si] = a; } })}>
                <ArrowDown className="h-3 w-3" />
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"
              onClick={() => setStages((s) => { s.splice(si, 1); })}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Elements (text + boxes, left to right)</Label>
            {stage.elements.map((el, ei) => (
              <ElementRow
                key={ei}
                el={el}
                onChange={(next) => setStages((s) => { s[si].elements[ei] = next; })}
                onRemove={() => setStages((s) => { s[si].elements.splice(ei, 1); })}
                onMoveLeft={() => setStages((s) => {
                  if (ei > 0) { const a = s[si].elements[ei - 1]; s[si].elements[ei - 1] = s[si].elements[ei]; s[si].elements[ei] = a; }
                })}
                onMoveRight={() => setStages((s) => {
                  if (ei < s[si].elements.length - 1) { const a = s[si].elements[ei + 1]; s[si].elements[ei + 1] = s[si].elements[ei]; s[si].elements[ei] = a; }
                })}
                fullAnswerKey={partKeys.length === 0 ? el.key : `${activeKey}_${el.key}`}
                ansValue={el.type === 'box' && el.key ? ansVal(partKeys.length === 0 ? el.key : `${activeKey}_${el.key}`) : ''}
                setAnsValue={(v) => setAnswerVal(partKeys.length === 0 ? (el.key || '') : `${activeKey}_${el.key}`, v)}
              />
            ))}
            <div className="flex gap-2 pt-1">
              <Button variant="outline" size="sm"
                onClick={() => setStages((s) => { s[si].elements.push({ type: 'text', value: '=' }); })}>
                <Plus className="h-3 w-3" /> Text
              </Button>
              <Button variant="outline" size="sm"
                onClick={() => setStages((s) => {
                  const next = s[si].elements.length + 1;
                  s[si].elements.push({ type: 'box', key: `${s[si].stepKey}_${String.fromCharCode(96 + next)}`, width: 'w-16' });
                })}>
                <Plus className="h-3 w-3" /> Box
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Final answer for the active part */}
      {partKeys.length > 0 && (
        <div className="rounded-md border border-dashed border-border p-3">
          <Label className="text-xs">Final answer value (part "{activeKey}")</Label>
          <Input
            value={ansVal(activeKey)}
            onChange={(e) => setAnswerVal(activeKey, e.target.value)}
            placeholder="What the student's final answer must equal"
          />
        </div>
      )}

      <Button variant="outline" size="sm"
        onClick={() => setStages((s) => {
          const idx = s.length + 1;
          s.push({
            label: `Step ${idx}`,
            stepKey: `s${idx}`,
            elements: [{ type: 'text', value: '=' }, { type: 'box', key: `s${idx}_a`, width: 'w-16' }],
          });
        })}>
        <Plus className="h-4 w-4" /> Add step
      </Button>
    </div>
  );
}

function ElementRow({
  el, onChange, onRemove, onMoveLeft, onMoveRight, ansValue, setAnsValue, fullAnswerKey,
}: {
  el: EquationStageElement;
  onChange: (next: EquationStageElement) => void;
  onRemove: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  ansValue: string;
  setAnsValue: (v: string) => void;
  fullAnswerKey?: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded border border-border bg-muted/30 p-2">
      <Badge variant="outline" className="text-[10px]">{el.type}</Badge>
      {el.type === 'text' ? (
        <Input className="h-8 flex-1" value={el.value || ''} onChange={(e) => onChange({ ...el, value: e.target.value })} />
      ) : el.type === 'box' ? (
        <>
          <Input className="h-8 w-32" placeholder="key" value={el.key || ''} onChange={(e) => onChange({ ...el, key: e.target.value })} />
          <Input className="h-8 w-24" placeholder="w-16" value={el.width || ''} onChange={(e) => onChange({ ...el, width: e.target.value })} />
          <Input className="h-8 flex-1" placeholder={`answer for ${fullAnswerKey || el.key}`} value={ansValue} onChange={(e) => setAnsValue(e.target.value)} />
        </>
      ) : (
        <span className="text-xs text-muted-foreground flex-1">
          {el.type} (edit JSON in code — complex element)
        </span>
      )}
      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onMoveLeft}><ArrowUp className="h-3 w-3 rotate-[-90deg]" /></Button>
      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onMoveRight}><ArrowDown className="h-3 w-3 rotate-[-90deg]" /></Button>
      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={onRemove}><Trash2 className="h-3 w-3" /></Button>
    </div>
  );
}
