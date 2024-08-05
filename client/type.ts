export type Table = "cards" | "transactions";

export interface Card {
  owner: string;
  nickname: string;
  balance: number;
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

export type Method = "POST" | "GET" | "PUT" | "DELETE";
export type AddCardError = {
  to: string;
  message: string;
};
