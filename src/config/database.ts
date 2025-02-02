import { Client } from "pg";

class Database {
  public client: Client;

  constructor() {
    this.client = new Client({
      host: "dpg-cufvaglsvqrc73fuak2g-a.oregon-postgres.render.com",
      user: "servers_monitoring_system_project_user",
      password: "Ze2VTdXU0qRQkVk1DLNRrAGrEh6ni38K",
      database: "servers_monitoring_system_project",
      port: 5432,
      ssl: { rejectUnauthorized: false },
    });
  }

  async connect() {
    await this.client.connect();
    console.log("Connected to PostgreSQL sccessfully");
  }

  async query(text: string, params?: any[]) {
    return await this.client.query(text, params);
  }

  async disconnect() {
    await this.client.end();
    console.log("Disconnected from PostgreSQL");
  }
}

export default Database;
