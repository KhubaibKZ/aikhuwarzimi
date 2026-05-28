## Goal

Repair the entire `/demo` guided tour so every step is smooth, visible, and ordered correctly: hint card stays lit long enough, feedback cards are fully highlighted, buttons like OK / Try again / Continue are obvious, and the tour never jumps ahead or briefly flashes the wrong target.

## What I’ll change

1. **Stabilize tour progression logic**
  - Update `src/components/GuidedTour.tsx` so steps do not advance prematurely when a target merely appears for a moment.
  - Separate these cases cleanly:
    - steps that should pause until the user clicks a specific button
    - steps that should only highlight/read a card without switching too early
  - Make the spotlight persist across small layout remounts without re-centering or blinking.
  - Tighten the fallback logic so it only helps when the UI truly moved forward, not when the current element is temporarily re-rendering.
2. **Fix the scripted flow definition**

- Refine `TOUR_STEPS` in `src/pages/Demo.tsx` so each step matches the real intended sequence:

- open Q1
- click Hint
- show hint card fully & click OK
- enter wrong answer for part (a)
- click Check Work
- show incorrect AI feedback fully
- click Try again
- enter correct answer for part (a)
- click Check Work
- show correct feedback fully
- click Continue
- enter part (b)
- click Check Work
- show part (b) feedback fully
- click Continue
- click Submit
- show submit feedback

- Remove any step definitions that currently rely on timing in places where the user should be the one advancing.

1. **Make highlight targets cover the whole visible area**
  - Verify and adjust the `data-tour` anchors in `src/components/PastPaperWorkspace.tsx` and `src/components/workspace/StepWorkspace.tsx` so the spotlight lands on the full hint/feedback container, not just a small internal element.
  - Ensure the connected instruction box points to the correct card or action button at every step.
2. **Improve clarity of action points**
  - Ensure the visible action for each feedback state is the one the tour is asking for:
    - Hint → `OK`
    - Wrong answer feedback → `Try again`
    - Correct feedback → `Continue`
  - Keep those actions inside the highlighted feedback area where appropriate so the whole area feels coherent.
3. **Validate the full walkthrough end-to-end**
  - Re-check the tour against the live `/demo` flow and confirm there are no more microsecond flashes, skipped steps, or dark/unreadable feedback states.

## Files likely to change

- `src/components/GuidedTour.tsx`
- `src/pages/Demo.tsx`
- `src/components/PastPaperWorkspace.tsx`
- `src/components/workspace/StepWorkspace.tsx`

## Technical notes

- I’ll keep this frontend-only.
- I’ll preserve the current demo content and only fix the tour behavior, highlight targeting, and visibility/flow issues.
- I’ll follow the existing semantic design tokens rather than introducing ad-hoc colors.