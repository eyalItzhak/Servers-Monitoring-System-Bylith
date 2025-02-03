import { Client } from "pg";

export interface QueryMessages {
  success?: string;
  issue?: string;
  error?: string;
}

export const enumToSQLList = (e: object) =>
  Object.values(e)
    .map((value) => `'${value}'`)
    .join(", ");

export const sql = (strings: TemplateStringsArray, ...values: any[]) =>
  strings.reduce((prev, curr, i) => prev + curr + (values[i] ?? ""), "");

export async function executeQuery(
  client: Client,
  query: string,
  messages?: QueryMessages
) {
  try {
    const res = await client.query(query);
    if (res.command === "CREATE") {
      console.log(
        messages?.success ||
          "The query executed successfully (CREATE) or already exists."
      );
    } else {
      console.log(
        messages?.issue || "There was an issue executing the query:",
        res
      );
    }
    return res;
  } catch (err) {
    console.error(
      messages?.error || "An error occurred while executing the query:",
      err
    );
    throw err;
  }
}
