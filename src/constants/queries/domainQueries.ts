//need to install on vscode extension call "SQL tagged template literal" to get syntax highlighting for sql queries

import { enumToSQLList, sql } from "../../utils/sqlFunctions";
import { Protocol, Status } from "../types/domainsTypes";

export const DOMAIN_QUERIES = {
  CREATE_TABLE_IF_NOT_EXISTS: sql`
    CREATE TABLE IF NOT EXISTS domains (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      url VARCHAR(255) NOT NULL,
      protocol VARCHAR(50) NOT NULL CHECK (protocol IN (${enumToSQLList(
        Protocol
      )})),
      status VARCHAR(50) DEFAULT 'healthy' CHECK (status IN (${enumToSQLList(
        Status
      )})),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `,
};
