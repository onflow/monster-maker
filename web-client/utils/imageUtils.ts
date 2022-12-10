const getImageNumber = (value: string | number) =>
  typeof value === 'string' ? parseInt(value, 10) + 1 : value + 1;

export const getHeadImage = (index: number | string): string =>
  `/images/head/monster_head_${getImageNumber(index)}.png`;
export const getLegsImage = (index: number | string): string =>
  `/images/legs/monster_legs_${getImageNumber(index)}.png`;
export const getTorsoImage = (index: number | string): string =>
  `/images/torso/monster_torso_${getImageNumber(index)}.png`;
export const getBackgroundImage = (index: number | string): string =>
  `/images/background/bg_${getImageNumber(index)}.png`;
