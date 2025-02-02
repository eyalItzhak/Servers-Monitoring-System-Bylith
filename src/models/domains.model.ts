// models/Domain.ts
import { Client } from "pg";

export class Domain {
  id: number;
  name: string;
  url: string;
  protocol: "http" | "https" | "ftp" | "ssh";
  status: "Healthy" | "Unhealthy" | "Unknown";
  last_checked: Date;

  constructor(
    id: number,
    name: string,
    url: string,
    protocol: "http" | "https" | "ftp" | "ssh",
    status: "Healthy" | "Unhealthy" | "Unknown",
    last_checked: Date
  ) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.protocol = protocol;
    this.status = status;
    this.last_checked = last_checked;
  }

  static async createTableIfNotExists(client: Client) {
    const query = `
      CREATE TABLE IF NOT EXISTS domains (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        url VARCHAR(255),
        protocol VARCHAR(5) CHECK (protocol IN ('http', 'https', 'ftp', 'ssh')),
        status VARCHAR(10) CHECK (status IN ('Healthy', 'Unhealthy', 'Unknown')),
        last_checked TIMESTAMP
      );
    `;
    const res = await client.query(query);
    console.log('Table "domains" created or already exists.==>', res);
  }

  static async create(client: Client, domain: Domain) {
    const query = `
      INSERT INTO domains (name, url, protocol, status, last_checked)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
    `;
    const values = [
      domain.name,
      domain.url,
      domain.protocol,
      domain.status,
      domain.last_checked,
    ];
    const result = await client.query(query, values);
    return result.rows[0].id; // מחזיר את ה-id שנוצר
  }

  static async updateStatus(
    client: Client,
    id: number,
    status: "Healthy" | "Unhealthy" | "Unknown"
  ) {
    const query = `
      UPDATE domains
      SET status = $1, last_checked = NOW()
      WHERE id = $2;
    `;
    await client.query(query, [status, id]);
  }

  static async getById(client: Client, id: number) {
    const query = `
      SELECT * FROM domains WHERE id = $1;
    `;
    const result = await client.query(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    const domain = result.rows[0];
    return new Domain(
      domain.id,
      domain.name,
      domain.url,
      domain.protocol,
      domain.status,
      domain.last_checked
    );
  }
}

export default Domain;
