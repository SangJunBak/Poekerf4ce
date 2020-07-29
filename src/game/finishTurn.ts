import { numPhases, Phase } from "./index";
import { offsetIndexWithinRange } from "./helpers";

export function goToNextPhase(currentPhase: Phase): Phase {
  return offsetIndexWithinRange(currentPhase, 1, numPhases);
}
