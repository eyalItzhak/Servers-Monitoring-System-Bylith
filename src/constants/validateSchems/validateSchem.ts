import Joi, { object } from "joi";
import { Protocol } from "../types/domainsTypes";
import { validProtocols } from "./validatorPattern";

export const createDomainValidator = Joi.object({
  domainName: Joi.string().min(3).required(),
  url: Joi.string().min(5).required(),
  protocol: Joi.string()
    .valid(...validProtocols)
    .required(),
});
