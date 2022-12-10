export const NUM_BACKGROUND_IMAGES = 5;
export const NUM_HEAD_IMAGES = 20;
export const NUM_TORSO_IMAGES = 10;
export const NUM_LEGS_IMAGES = 5;

// For preloading all UI assets in <head>
export const ALL_UI_ASSETS: Array<string> = [
  '/images/ui/button_background_tileable.png',
  '/images/ui/button_background.png',
  '/images/ui/connect_button.png',
  '/images/ui/create_button_off.png',
  '/images/ui/create_button_on.png',
  '/images/ui/down_arrow.png',
  '/images/ui/initialize_bubble.png',
  '/images/ui/left_arrow.png',
  '/images/ui/monster_maker_back_icon.png',
  '/images/ui/monster_maker_bottom_bar_mint.png',
  '/images/ui/monster_maker_exit_icon.png',
  '/images/ui/monster_maker_logo.png',
  '/images/ui/monster_maker_minting_banner.png',
  '/images/ui/right_arrow.png',
  '/images/ui/share_button.png',
  '/images/ui/up_arrow.png',
  '/images/ui/view_button_off.png',
  '/images/ui/view_button_on.png',
];

// Generates all possible images per part
const generatePartAssets = (
  partName: string,
  imagePrefix: string,
  totalNumOfParts: number,
) =>
  Array.from(
    { length: totalNumOfParts },
    (_, i) => `/images/${partName}/${imagePrefix}_${i + 1}.png`,
  );

// For preloading all part assets in <head>
export const ALL_MONSTER_PART_ASSETS: Array<string> = [
  ...generatePartAssets('background', 'bg', NUM_BACKGROUND_IMAGES),
  ...generatePartAssets('head', 'monster_head', NUM_HEAD_IMAGES),
  ...generatePartAssets('torso', 'monster_torso', NUM_TORSO_IMAGES),
  ...generatePartAssets('legs', 'monster_legs', NUM_LEGS_IMAGES),
];