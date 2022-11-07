import { httpGet } from "./mock-http-interface";
import { HttpGetResponse, TResult } from "./types/index";

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
          result.push({ FAILURE: message });
        }
      });
    })
    .catch((error) => console.log(error));

  return result;
};
