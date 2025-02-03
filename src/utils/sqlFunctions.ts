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
  customMessage?: { success?: string; error?: string; issue?: string }, // Optional message overrides
  queryParams?: any[] // Params for query placeholders
) {
  try {
    // Execute the query with parameters if provided
    const res = await client.query(query, queryParams);

    // Log success message, fallback to default if not provided
    if (res.command) {
      console.log(customMessage?.success || "Query executed successfully.");
    } else {
      console.log(
        customMessage?.issue || "Query executed, but no rows affected.",
        res
      );
    }

    return res;
  } catch (err) {
    // Log the error message if it occurs
    console.error(
      customMessage?.error || "An error occurred while executing the query:",
      err
    );
    throw err;
  }
}
