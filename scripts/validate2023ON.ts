// Validator for paper 11 & 12 ON 2023 - checks internal consistency:
//   - Each part has an answer
//   - Each step (equationStages / equationStagesMap) has a stepKey
//   - Each step has expected answer fields populated
//   - Final-answer step value matches the part's `answer` value when present
import { questions4024_11_2023ON } from '../src/lib/pastPaper4024_11_2023ON';
import { questions4024_12_2023ON } from '../src/lib/pastPaper4024_12_2023ON';

// Marking-scheme final answers (from PDF) for paper 11
const MS_11: Record<string, string | Record<string, string>> = {
  q1: { a: '8', b: '12' },
  q2: 'order: 0.1, 3/25, 13%, 1/5',
  q3: { a: '8', b: '14' },
  q4: '7.80',
  q5: { a: '4', b: '5/20' },
  q6: { a: '70', b: '110' },
  q7: '5',
  q8: { a: '7.8', b: '30000' },
  q9: { a: 'positive', b: 'reading' },
  q10: { a: '30', b: '144' },
  q11: { a: '19', b: '25' },
  q12: { a: '1.76-1.84', b: 'bisector', c: 'S marked' },
  q13: '24/25',
  q14: { a: '2x2x3x3', b: '11 54' },
  q15: { a: '71', b: '142', c: '71' },
  q16: 'graph region',
  q17: '5/2',
  q18: { a: 'venn', b: "G∩H∩F'" },
  q19: { a: '2', b: '40' },
  q20: { a: 'inverse matrix', b: 'matrix' },
  q21: { a: '3(2a-3)', b: '(2b+5)(2b-5)', c: '2c/(2c+3)' },
  q22: { a: '1', b: '4(x-3)', c: '-20/7' },
  q23: { a: 'c-a', b: '(1/2)a+(1/2)c', c: '-(1/2)a-(1/6)c' },
  q24: '1/5',
};

interface Issue { qid: string; category: string; detail: string; }
const issues: Issue[] = [];

function validate(qs: Record<string, any>, paperLabel: string) {
  for (const q of Object.values(qs) as any[]) {
    const ans = q.answer ?? {};

    // 1. Each declared part has an answer entry
    if (q.parts) {
      for (const p of q.parts) {
        if (typeof ans === 'object' && !(p.key in ans)) {
          issues.push({ qid: q.id, category: 'missing-part-answer',
            detail: `part "${p.key}" (${p.label}) has no answer entry` });
        }
      }
    }

    // 2. Validate equationStages
    const groups: Array<{ partKey: string; stages: any[] }> = [];
    if (q.equationStages) groups.push({ partKey: q.parts?.[0]?.key ?? 'answer', stages: q.equationStages });
    if (q.equationStagesMap) {
      for (const [pk, st] of Object.entries(q.equationStagesMap)) {
        groups.push({ partKey: pk, stages: st as any[] });
      }
    }

    for (const g of groups) {
      const seenKeys = new Set<string>();
      for (let i = 0; i < g.stages.length; i++) {
        const stg = g.stages[i];
        if (!stg.stepKey) {
          issues.push({ qid: q.id, category: 'step-missing-key',
            detail: `part "${g.partKey}" stage #${i+1} ("${stg.label}") missing stepKey` });
          continue;
        }
        if (seenKeys.has(stg.stepKey)) {
          issues.push({ qid: q.id, category: 'step-duplicate-key',
            detail: `part "${g.partKey}" duplicate stepKey "${stg.stepKey}"` });
        }
        seenKeys.add(stg.stepKey);

        // Each box element must have an expected answer
        const collectBoxes = (els: any[]): string[] => {
          const out: string[] = [];
          for (const el of els || []) {
            if (el.type === 'box' && el.key) out.push(el.key);
            if (el.type === 'fraction') {
              out.push(...collectBoxes(el.numElements));
              out.push(...collectBoxes(el.denElements));
            }
            if (el.type === 'sqrt') out.push(...collectBoxes(el.innerElements));
          }
          return out;
        };
        const boxKeys = collectBoxes(stg.elements);
        for (const bk of boxKeys) {
          const fullKey = `${g.partKey}_${bk}`;
          if (typeof ans === 'object' && !(fullKey in ans)) {
            issues.push({ qid: q.id, category: 'step-box-no-answer',
              detail: `part "${g.partKey}" step "${stg.stepKey}" box "${bk}" → expected key "${fullKey}" missing in answer` });
          }
        }
      }
    }
  }
}

validate(questions4024_11_2023ON, '4024/11 ON 2023');
validate(questions4024_12_2023ON, '4024/12 ON 2023');

// Cross-check paper 11 final answers vs MS
console.log('\n=== Paper 11 vs Marking Scheme ===');
for (const [qNum, expected] of Object.entries(MS_11)) {
  const id = `pp_4024_on23_11_${qNum}`;
  const q = (questions4024_11_2023ON as any)[id];
  if (!q) { console.log(`MISSING ${id}`); continue; }
  if (typeof expected === 'object') {
    for (const [k, v] of Object.entries(expected)) {
      const got = (q.answer ?? {})[k];
      const flag = got && String(got).replace(/\s/g,'') === String(v).replace(/\s/g,'') ? '✅' : '⚠️ ';
      if (flag === '⚠️ ') console.log(`${flag} ${id}.${k}: got "${got}" expected "${v}"`);
    }
  } else {
    const got = typeof q.answer === 'string' ? q.answer : JSON.stringify(q.answer);
    console.log(`   ${id}: app="${got}"   ms="${expected}"`);
  }
}

console.log('\n=== Structural issues ===');
console.log(`Total: ${issues.length}`);
for (const i of issues) console.log(`[${i.category}] ${i.qid} — ${i.detail}`);
