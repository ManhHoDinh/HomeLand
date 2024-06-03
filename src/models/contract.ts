import { Apartment } from "./apartment";
import { Resident } from "./resident";

export type Contract = {
  contract_id: string;
  role: ContractRole;
  resident_id: string;
  resident: Resident;
  status: ContractStatusRole;
  apartment_id: string;
  apartment: Apartment;
  created_at: Date;
  expire_at?: Date;
  deleted_at: Date;
  contract_with_signature_photo_URL: string;
};

export enum ContractRole {
  BUY = "buy",
  RENT = "rent",
}
export enum ContractStatusRole {
  ACTIVE = "active",
  INACTIVE = "inactive",
}
