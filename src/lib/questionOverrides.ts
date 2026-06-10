// Module-level cache of question overrides loaded from Cloud.
// PaperEditor writes; pastPaperData merges on read.

import type { PastPaperQuestion } from './pastPaperData';

export interface QuestionOverrideRow {
  paper_id: string;
  question_id: string;
  override: Partial<PastPaperQuestion> & Record<string, any>;
  diagram_image_url: string | null;
}

const cache = new Map<string, QuestionOverrideRow>();
const subscribers = new Set<() => void>();
let version = 0;

export function setAllOverrides(rows: QuestionOverrideRow[]) {
  cache.clear();
  for (const r of rows) cache.set(r.question_id, r);
  version++;
  subscribers.forEach((cb) => cb());
}

export function setOverride(row: QuestionOverrideRow) {
  cache.set(row.question_id, row);
  version++;
  subscribers.forEach((cb) => cb());
}

export function clearOverride(questionId: string) {
  cache.delete(questionId);
  version++;
  subscribers.forEach((cb) => cb());
}

export function getOverride(questionId: string): QuestionOverrideRow | undefined {
  return cache.get(questionId);
}

export function getOverridesVersion(): number {
  return version;
}

export function subscribeOverrides(cb: () => void): () => void {
  subscribers.add(cb);
  return () => subscribers.delete(cb);
}

/**
 * Deep-merge override on top of base question. Arrays in override fully replace
 * arrays in base. Plain objects merge key-by-key.
 */
export function mergeOverride<T extends PastPaperQuestion>(
  base: T,
  override?: Partial<PastPaperQuestion> & Record<string, any>,
  diagramUrl?: string | null,
): T {
  if (!override && !diagramUrl) return base;
  const out: any = deepMerge(base, override || {});
  if (diagramUrl) out.diagramImageUrl = diagramUrl;
  return out as T;
}

function isPlainObject(v: unknown): v is Record<string, any> {
  return !!v && typeof v === 'object' && !Array.isArray(v);
}

function deepMerge(a: any, b: any): any {
  if (b === undefined || b === null) return a;
  if (Array.isArray(b)) return b; // arrays replace
  if (!isPlainObject(a) || !isPlainObject(b)) return b;
  const out: Record<string, any> = { ...a };
  for (const k of Object.keys(b)) {
    out[k] = k in a ? deepMerge(a[k], b[k]) : b[k];
  }
  return out;
}
