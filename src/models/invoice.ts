import { Resident } from "./resident";
import { ServicePackage } from "./servicePackage";

export type Invoice = {
  invoice_id: string;
  buyer_id: string;
  total: number;
  amount: number;
  expired_at: Date;
  servicePackage: ServicePackage;
  buyer: Resident;
  created_at: Date;
};
