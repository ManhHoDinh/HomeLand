import { Building } from "./building";

export interface Manager {
    role: string;
    id: string;
    profile: Profile;
    account: Account,
    building?: Building
    created_at: Date;
    deleted_at?: Date;
  }