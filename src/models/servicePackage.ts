import { Service } from "./service";

export type ServicePackage = {
  servicePackage_id: string;
  service_id: string;
  name: string;
  expired_date: number;
  per_unit_price: number;
  service:Service;
};
