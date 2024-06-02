import { Manager } from "./manager";
import { Resident } from "./resident";
import { Task } from "./task";

export interface Complain {
    complain_id: string,
    content: string,
    status:string,
    created_at:Date,
    task?: Task,
    resident: Resident,
}
export enum complainStatus {
    PENDING = "PENDING",
    FIXING = "FIXING",
    RECEIVED = "RECEIVED",  
    REJECTED = "REJECTED",  
    DONE = "DONE"
}
