import { DomainController } from "../controllers/DomainController";
import { IRoute } from "../constants/interfaces/route.interface";
import { tryCatchWrapper } from "../utils/tryCatchWrapper";
import { validate } from "../middlewares/validator/validatorMiddelWare";
import { createDomainValidator } from "../constants/validateSchems/validateSchem";

export class DomainsRoute extends IRoute {
  protected initializeRoutes() {
    this.router.post(
      "/AddDomain",
      validate(createDomainValidator),
      tryCatchWrapper(DomainController.addDomain)
    );
  }
}
