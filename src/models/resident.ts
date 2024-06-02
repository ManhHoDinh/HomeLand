import { Apartment } from "./apartment";

export interface Resident {
    role: string;
    id: string;
    profile: Profile;
    account?: Account,
    account_id?: string,
    payment_info?: string,
    contracts: any,
    stay_at: any;
    created_at: Date;
    deleted_at?: Date;
    stay_at_apartment_id?: string,
    
  }