import { Complain } from "./complain";
import { Manager } from "./manager";
import { RepairInvoice } from "./repairInvoice";
import { Resident } from "./resident";
import { Technician } from "./technician";

export interface Task {
    task_id: string,
    manager?: any,
    admin?:any,
    assignee:Technician,
    invoice?: RepairInvoice,
    status:string,
    complain: Complain
    created_at: Date,
}