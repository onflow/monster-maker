type MonsterComponents = {
  background: string;
  head: string;
  torso: string;
  legs: string;
}

export type Monster = {
  name: string;
  description: string;
  thumbnail: string;
  itemID: string;
  resourceID: string;
  owner: string;
  component: MonsterComponents
}

export type GetMonstersResponse = Array<Monster>