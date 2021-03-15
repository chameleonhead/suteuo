export interface ListRequest {
  nextToken?: string;
}

export interface ListResponse<T> {
  totalCount: number;
  items: T;
  nextToken: string;
}

export interface ErrorResponse {
  statusCode: number;
  code: string;
  message: string;
}
