type Quote = {
  "Arnie Quote": string;
};

type CodeError = {
  FAILURE: string;
};

type HttpGetResponse = {
  status: number;
  body: string;
};

type QueryResult = Quote | CodeError;

type TResult = QueryResult[];

export { HttpGetResponse, TResult };
