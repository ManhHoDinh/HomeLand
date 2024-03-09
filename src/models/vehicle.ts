import { Resident } from "./resident";

export type Vehicle = {
    id: string ;
    status:string;
    licensePlate: string;
    frontRegistrationPhotoURL:string;
    backRegistrationPhotoURL:string;
    licensePlatePhotoURL:string;
    residentId: string;
}
