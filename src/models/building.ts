import { Floor } from "./floor";
import { Manager } from "./manager";

export interface Building {
    building_id: string,
    name: string,
    address:string,
    max_floor:number,
    managers?: Array<Manager>
    // manager_id:string
    floors: Array<Floor>
}