// Quick debug: rank all projects + show the breakdown for the top 25.
import { PROJECTS } from "../src/data/projects.js";
import { aestheticBreakdown } from "../src/data/aesthetic-score.js";

console.log(`Total projects: ${PROJECTS.length}`);
console.log();
console.log("Rank | Score | Fusion / Simp / Orig / Tie | Name");
console.log("-----+-------+----------------------------+--------------------------------------");
PROJECTS.slice(0, 30).forEach((p, i) => {
  const b = aestheticBreakdown(p);
  const fmt = (n) => String(n).padStart(4, " ");
  console.log(
    `${String(i + 1).padStart(4, " ")} | ${fmt(b.total)} | ${fmt(b.colourFusion)} / ${fmt(b.simplicity)} / ${fmt(b.originality)} / ${fmt(b.conceptTie)} | ${p.name}`
  );
});
console.log();
console.log("--- bottom 10 ---");
PROJECTS.slice(-10).forEach((p, i) => {
  const b = aestheticBreakdown(p);
  const rank = PROJECTS.length - 10 + i + 1;
  console.log(`${String(rank).padStart(4, " ")} | ${String(b.total).padStart(4, " ")} | ${p.name}`);
});
