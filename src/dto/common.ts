export interface CommonResponseI<T> {
  status: number;
  message: string;
  data?: T;
}
