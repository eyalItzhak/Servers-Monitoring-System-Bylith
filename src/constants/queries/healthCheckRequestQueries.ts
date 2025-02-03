import { enumToSQLList, sql } from "../../utils/sqlFunctions";
import { Status } from "../types/domainsTypes";

export const HEALTH_CHECK_REQUEST_QUERIES = {
  CREATE_TABLE_IF_NOT_EXISTS: () => sql`
    CREATE TABLE IF NOT EXISTS healthcheck_requests (
      id SERIAL PRIMARY KEY,
      domain_id INT REFERENCES domains(id) ON DELETE CASCADE,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(50) CHECK (status IN (${enumToSQLList(Status)})),
      latency INT
    );
  `,
};
