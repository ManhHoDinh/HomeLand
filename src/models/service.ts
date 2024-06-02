import { ServicePackage } from "./servicePackage";

export type Service = {
  service_id: string;
  name: string;
  description: string;
  imageURLs?: string[];
  servicePackages: ServicePackage[];
};
