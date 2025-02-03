import { Request, Response } from "express";
import { testService } from "../services/testService";
import { RespondType } from "../constants/types/controllerTypes";
import { domainServices } from "../services/domainServices";
import { Protocol } from "../constants/types/domainsTypes";

interface AddDomainBody_api {
  domainName: string;
  url: string;
  protocol: Protocol;
}

export class DomainController {
  public static addDomain: RespondType = async (req, res, next) => {
    const { domainName, protocol, url } = req.body as AddDomainBody_api;
    const saveStatus = await domainServices.saveNewDomain({
      domainName,
      protocol,
      url,
    });

    return res.status(200).json({ saveStatus });
  };
}
