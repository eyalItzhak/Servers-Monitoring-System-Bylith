import { Client } from "pg";
import { DOMAIN_QUERIES } from "../constants/queries/domainQueries";
import { Protocol, Status } from "../constants/types/domainsTypes";
import { executeQuery } from "../utils/sqlFunctions";

export class Domain {
  public id: number;
  public name: string;
  public url: string;
  public protocol: Protocol;
  public status: Status;
  public created_at: Date;
  public updated_at: Date;

  constructor(
    id: number,
    name: string,
    url: string,
    protocol: Protocol,
    status: Status,
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.protocol = protocol;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async createTableIfNotExists(client: Client) {
    const query = DOMAIN_QUERIES.CREATE_TABLE_IF_NOT_EXISTS;
    await executeQuery(client, query, {
      success: 'The "domains" table was created successfully or already exists',
      issue: 'There was an issue creating the "domains" table:',
      error: 'An error occurred while creating the "domains" table:',
    });
  }
}

export default Domain;
