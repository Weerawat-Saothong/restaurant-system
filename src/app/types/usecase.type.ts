export interface Usecase<T> {
  data: T;
  error: boolean;
  massage: string;
}
