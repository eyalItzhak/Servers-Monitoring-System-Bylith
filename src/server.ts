import express from "express";
import { TestRoute } from "./routes/TestRoute";
import { IRoute } from "./constants/interfaces/route.interface";
import cors from "cors";
import { errorHandlerMiddleWare } from "./middlewares/errorsMiddleWares/errorHandlerMiddleWare";
import { notFoundHandler } from "./middlewares/errorsMiddleWares/notFoundHandler";
import Database from "./config/database";
import Domain from "./models/domains";
import { HealthCheckRequest } from "./models/healthCheckRequest";
import { DomainsRoute } from "./routes/DomainsRoute";

const database = new Database();
const routeList: IRoute[] = [new TestRoute(), new DomainsRoute()];

export class ExpressServer {
  private app: express.Application;
  private port: number;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.port = parseInt(process.env.SERVER_PORT ?? "5000");
    this.routesConfig();
  }

  private routesConfig(): void {
    routeList.forEach((route) => {
      this.app.use("/api", route.getRoutes());
    });
    this.app.use(notFoundHandler);
    this.app.use(errorHandlerMiddleWare);
  }

  public start(): void {
    this.app.listen(this.port, async () => {
      await database.connect();
      Domain.createTableIfNotExists({ client: database.client });
      HealthCheckRequest.createHealthCheckRequestTable(database.client);
      console.log(`Server running at http://localhost:${this.port}`);
    });
  }

  public stop(): void {
    database.disconnect();
    process.exit();
  }
}
