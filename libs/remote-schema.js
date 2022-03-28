import { fetch } from "cross-fetch";
import { print } from "graphql";
import { introspectSchema } from "@graphql-tools/wrap";

export const createRemoteSchema = async (url) => {
  const remoteExecutor = async ({ document, variables }) => {
    const query = print(document);
    const fetchResult = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    const data = await fetchResult.json();
    return data;
  };

  return {
    schema: await introspectSchema(remoteExecutor),
    executor: remoteExecutor,
  };
};
