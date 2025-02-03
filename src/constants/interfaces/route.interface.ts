// src/types/userRoute.interface.ts
import { Router } from "express";

export abstract class IRoute {
  protected router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  public getRoutes(): Router {
    return this.router;
  }

  protected abstract initializeRoutes(): void;
}
