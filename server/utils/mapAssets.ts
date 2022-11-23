function generateRange(length: number): Array<number> {
  return Array(length)
    .fill(1)
    .map((val, idx) => val + idx);
}

export const headRange: Array<number> = generateRange(5);
export const legsRange: Array<number> = generateRange(5);
export const torsoRange: Array<number> = generateRange(10);
export const backgroundRange: Array<number> = generateRange(5);

export const getHeadImage = (index: number): string =>
  `/images/head/monster_head_${index}.png`;
export const getLegsImage = (index: number): string =>
  `/images/legs/monster_legs_${index}.png`;
export const getTorsoImage = (index: number): string =>
  `/images/torso/monster_torso_${index}.png`;
export const getBackgroundImage = (index: number): string =>
  `/images/background/bg_${index}.png`;
