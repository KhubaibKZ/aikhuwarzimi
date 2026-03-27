// Parallel lines diagram for Q6 4024/11 Oct/Nov 2023
// Uses the actual exam paper image for pixel-perfect accuracy
import parallelLinesImg from "@/assets/q6-parallel-lines-2023on.png";

export function ParallelLines2023ON() {
  return (
    <div className="w-full max-w-md mx-auto">
      <img
        src={parallelLinesImg}
        alt="Two parallel lines crossed by a transversal. 110° angle at the left intersection, x° and y° angles at the right intersection."
        className="w-full h-auto dark:invert"
      />
    </div>
  );
}
