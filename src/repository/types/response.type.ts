export interface Response<Item> {
  data: Item;
  message: string;
  result: boolean;
  status: number;
  statusCode: number;
}
