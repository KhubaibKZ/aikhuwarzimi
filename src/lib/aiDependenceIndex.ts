// AI Dependence Index (TDI)
//
//   TDI = [ (0.5 · ΣHq + 1.0 · ΣSassist) / Q ] · 1 / log10(Q + 9)
//
// Where:
//   ΣHq        = total hints used (in the topic / paper / session)
//   ΣSassist   = total check-work uses
//   Q          = number of questions answered
//
// Independence is derived by clamping (100 − TDI · SCALE) into [0, 100].
// A higher TDI means more AI dependence → lower independence.

export const TDI_INDEPENDENCE_SCALE = 60;

export function computeTDI(hints: number, checkworks: number, questions: number): number {
  if (!questions || questions <= 0) return 0;
  const numerator = 0.5 * hints + 1.0 * checkworks;
  const damp = 1 / Math.log10(questions + 9);
  return (numerator / questions) * damp;
}

export function tdiToIndependence(tdi: number): number {
  return Math.max(0, Math.min(100, Math.round(100 - tdi * TDI_INDEPENDENCE_SCALE)));
}

export function independenceFromUsage(hints: number, checkworks: number, questions: number): number {
  return tdiToIndependence(computeTDI(hints, checkworks, questions));
}
