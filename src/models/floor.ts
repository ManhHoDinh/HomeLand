import { Apartment } from "./apartment";
import { Building } from "./building";

export interface Floor {
        floor_id: string,
        building_id: string,
        name: string,
        max_apartment: number,
        apartments: Array<Apartment>,
        building: Building
}