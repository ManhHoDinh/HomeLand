import { Resident } from "./resident";
import { Service } from "./service";

export interface Feedback {
        feedback_id: string,
        rating: string,
        comment: string,
        resident_id: string,
        service_id: string,
        created_at: string;
        service: Service;
        resident: Resident;
}