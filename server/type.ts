export type Table = "cards" | "transactions";

export interface Card {
  owner: string;
  nickname: string;
  color: string;
  id: number;
}

export interface Transaction {
  card: number;
  id: number;
  amount: number;
  purpose: string;
  notes?: string;
  date: Date;
}
