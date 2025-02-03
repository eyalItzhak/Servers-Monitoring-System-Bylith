import { Client } from "pg";
import { HEALTHCHECK_REQUEST_QUERIES } from "../constants/queries/healthCheckRequestQueries";
import { executeQuery } from "../utils/sqlFunctions";

export class HealthCheckRequest {
  public id: number;
  public server_id: number;
  public timestamp: Date;
  public status: string;
  public latency: number;

  constructor(
    id: number,
    server_id: number,
    timestamp: Date,
    status: string,
    latency: number
  ) {
    this.id = id;
    this.server_id = server_id;
    this.timestamp = timestamp;
    this.status = status;
    this.latency = latency;
  }

  static async createHealthCheckRequestTable(client: Client) {
    const query = HEALTHCHECK_REQUEST_QUERIES.CREATE_TABLE_IF_NOT_EXISTS;
    await executeQuery(client, query, {
      success:
        'The "healthCheck_requests" table was created successfully or already exists',
      issue: 'There was an issue creating the "healthCheck_requests" table:',
      error:
        'An error occurred while creating the "healthCheck_requests" table:',
    });
  }
}
