type MonsterComponents = {
  background: string | number;
  head: string | number;
  torso: string | number;
  legs: string | number;
};

export type Monster = {
  name: string;
  description: string;
  thumbnail: string;
  itemID: string;
  resourceID: string;
  owner: string;
  component: MonsterComponents;
};

export type GetMonstersResponse = Array<Monster>;

export type MintMonsterRequestBody = {
  address: string;
  components: MonsterComponents;
};

export type TxnStatus = {
  blockId: string;
  status: number;
  statusString: string;
  statusCode: number;
  errorMessage: string;
  events: any[];
};
