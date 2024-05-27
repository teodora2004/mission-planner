export interface Point {
  id: string;
  name: string;
  x: string;
  y: string;
}

export interface GetPointsResponse {
  data: Point[];
  items: number;
}

export enum PaginationOptions {
  PageSize = 5,
  PageIndex = 0,
}
