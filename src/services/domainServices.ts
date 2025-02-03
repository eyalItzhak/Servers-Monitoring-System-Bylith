import { Protocol } from "../constants/types/domainsTypes";
import Domain from "../models/domains";

const saveNewDomain = async (props: {
  domainName: string;
  url: string;
  protocol: Protocol;
}) => {
  const { domainName, url, protocol } = props;
  const domain = new Domain({ name: domainName, url: url, protocol: protocol });
  console.log("domain before save====>", domain);
  const result = await domain.save();
  console.log("domain before after save===>", domain);
  return result;
};

export const domainServices = { saveNewDomain };
