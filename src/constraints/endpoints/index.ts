export const baseUrl = "https://homeland-be-eumo.onrender.com";
// const baseUrl = "http://localhost:5002";
// export const baseUrl = "http://localhost:8080";
export const endpoint = {
  login: baseUrl + "/auth/signin",
  profile: baseUrl + "/me",
  tokenValidate: baseUrl + "/token/validate",
  resident: baseUrl + "/resident",
  apartment: baseUrl + "/apartment",
  employee: baseUrl + "/employee",
  person: baseUrl + "/person",
  me: baseUrl + "/me",
  building: baseUrl + "/building",
  vehicle: baseUrl + "/vehicle",
  contract: baseUrl + "/contract",
  complain: baseUrl + "/complain",
  task: baseUrl + "/task",
  repairInvoice: baseUrl + "/repairInvoice",
  manager: baseUrl + "/manager",
  technician: baseUrl + "/technician",
  equipment: baseUrl + "/equipment",
  floor: baseUrl + "/floor",
  service: baseUrl + "/service",
  searchService: baseUrl + "/service/search/byQuery",
  servicePackage: baseUrl + "/service-package",
  invoice: baseUrl + "/invoice",
  feedback: baseUrl + "/feedback",
};
