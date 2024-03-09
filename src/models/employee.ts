import { StringOptions } from "sass";

export type Employee = {
        profilePictureURL: string;
        role: string;
        id: string;
        profile: Profile;
        created_at: Date;
        deleted_at?: Date;
        task_info?: string,
}
