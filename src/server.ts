import express from "express";
import { TestRoute } from "./routes/TestRoute";
import { IRoute } from "./types/route.interface";
import cors from "cors";
import { errorHandlerMiddleWare } from "./middlewares/errorsMiddleWares/errorHandlerMiddleWare";
import { notFoundHandler } from "./middlewares/errorsMiddleWares/notFoundHandler";
import Database from "./config/database";
import Domain from "./models/domains.model";

const database = new Database();
const routeList: IRoute[] = [new TestRoute()];

export class ExpressServer {
  private app: express.Application;
  private port: number;

  constructor() {
    this.app = express();
    this.app.use(cors());
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
      const databaseClient = await database.connect();
      Domain.createTableIfNotExists(database.client);
      console.log(`Server running at http://localhost:${this.port}`);
    });
  }

  public stop(): void {
    database.disconnect();
    process.exit();
  }
}
