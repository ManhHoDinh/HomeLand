export type Equipment = {
    id:string,
    name:string,
    status:string,
    imageURLs:string[],
    description: string,
    apartment_id?: string,
    floor_id?: string,
    building_id?:string,
    created_at: string,
    deleted_at?:string,
  };
  