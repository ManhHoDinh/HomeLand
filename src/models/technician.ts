import { Task } from "./task";

export interface Technician {
    role: string;
    id: string;
    profile: Profile;
    account: Account,
    stay_at: any;
    tasks: Array<Task>;
    created_at: Date;
    deleted_at?: Date;
  }