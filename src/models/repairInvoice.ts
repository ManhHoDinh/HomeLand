import { ItemRepairInvoice } from "./ItemRepairInvoice";
import { Manager } from "./manager";
import { Resident } from "./resident";
import { Task } from "./task";

export interface RepairInvoice {
    id: string;
    task: Task;
    items: Array<ItemRepairInvoice>;
    status:string;
    total: number;
    created_at:Date;
}
export enum complainStatus {
    REJECTED = "Rejected",
    PENDING = "Pending",
    DONE = "Done"
}
