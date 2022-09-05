export type BoxResponseDTO = {
  _id: string;
  cards: string[];
  created_date: string;
  draw_pointer: number;
  draw_sequence: number[];
  last_access_date: string;
  last_updated_date: string;
  name: string;
  owner: string;
  shared_with: string[];
  tags?: string[];
};

export type CardResponseDTO = {
  _id: string;
  title: string;
  created_date: string;
  last_updated_date: string;
  last_access_date: string;
  owner: string;
  content: any;
  boxes?: string[];
};

export type CreateCardDTO = {
  title: string;
  owner?: string;
  content?: string;
  boxes?: string[];
  shared_with?: string;
  tags?: string[];
};
