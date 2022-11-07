import { httpGet } from "./mock-http-interface";

// TODO define this type properly
type Quote = {
  "Arnie Quote": string;
};

type Error = {
  FAILURE: string;
};

type HttpGetResponse = {
  status: number;
  body: string;
};

type QueryResult = Quote | Error;

type TResult = QueryResult[];

export const getArnieQuotes = async (urls: string[]): Promise<TResult> => {
  const result: TResult = [];
  const requests: Promise<HttpGetResponse>[] = urls.map((url) => httpGet(url));
  await Promise.all(requests)
    .then((res) => {
      //TODO: we can extract this to its own function
      res.map((res) => {
        const { status, body } = res;
        const message = JSON.parse(body).message; //improve this
        if (status === 200) {
          result.push({ "Arnie Quote": message });
        } else {
          console.log("this was not found in the list");
          result.push({ FAILURE: message });
        }
      });
    })
    .catch((error) => console.log(error));

  return result;
};
