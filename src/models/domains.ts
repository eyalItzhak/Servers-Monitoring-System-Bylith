import { Client } from "pg";
import { DOMAIN_QUERIES } from "../constants/queries/domainQueries";
import { Protocol, Status } from "../constants/types/domainsTypes";
import { executeQuery } from "../utils/sqlFunctions";
import { query } from "express";

export class Domain {
  private static client: Client;

  private id: number | null;
  private name: string;
  private url: string;
  private protocol: Protocol;
  private status: Status;
  private created_at: Date | null;
  private updated_at: Date | null;

  constructor({
    name,
    url,
    protocol,
  }: {
    name: string;
    url: string;
    protocol: Protocol;
  }) {
    this.name = name;
    this.url = url;
    this.protocol = protocol;
    this.status = Status.Unknown;
    this.created_at = null;
    this.updated_at = null;
    this.id = null;
  }

  public async save() {
    const element = await Domain.saveDomain(this);
    this.id = element?.rows[0].id;
    this.created_at = element?.rows[0].created_at;
    this.updated_at = element?.rows[0].updated_at;
    this.status = element?.rows[0].status;
    return element;
  }

  static async createTableIfNotExists(props: { client: Client }) {
    this.client = props.client;
    const query = DOMAIN_QUERIES.CREATE_TABLE_IF_NOT_EXISTS();
    await executeQuery(props.client, query, {
      success: 'The "domains" table was created successfully or already exists',
      issue: 'There was an issue creating the "domains" table:',
      error: 'An error occurred while creating the "domains" table:',
    });
  }

  private static async saveDomain(domainData: Domain) {
    if (domainData.id === null) {
      // If the domain has not yet been saved to the database
      const query = DOMAIN_QUERIES.INSERT_DOMAIN();
      return await executeQuery(this.client, query, {}, [
        domainData.name,
        domainData.url,
        domainData.protocol,
        domainData.status,
      ]);
    }
  }
}

export default Domain;
