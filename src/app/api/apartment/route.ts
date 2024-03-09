import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { endpoint } from '@/constraints/endpoints';
import { Apartment } from '@/models/apartment';
import { Resident } from '@/models/resident';

export async function POST(request: NextRequest) {
  let body = await request.formData()
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: endpoint.apartment,
    headers: {
      'Authorization': "Bearer " + request.cookies.get("token")?.value,
    },
    data: body
  };
  const response = await axios.request(config).then((response) => {
    if (response.status == 201) {
      const element = response.data
      const temp = {
        apartment_id: element.apartment_id,
        width: element.width,
        length: element.length,
        name: element.name,
        rent: element.rent,
        bathroom: element.number_of_bathroom,
        bedroom: element.number_of_bedroom,
        images: element.imageURLs,
        status: element.status,
        description: element.description,
        floorId: element.floor_id,
        buildingId: element.building_id,
        resident: response.data.resident as Resident[]
      } as Apartment
      return NextResponse.json(temp, {
        status: 201,
      });
    }

  }).catch((error) => { console.log(error); return NextResponse.json(error.response.data.message, { status: error.response.status, statusText: error.response.statusText }) })
  return response;
}
export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page")
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: endpoint.apartment + (page != null ? "?page=" + page : ""), 
    headers: {
      'Authorization': "Bearer " + request.cookies.get("token")?.value,
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.request(config).then((response) => {
    if (response.status == 200) {
      const result: Apartment[] = []
      response.data.forEach((element: any) => {
        const temp = {
          apartment_id: element.apartment_id,
          width: element.width,
          length: element.length,
          name: element.name,
          rent: element.rent,
          bathroom: element.number_of_bathroom,
          bedroom: element.number_of_bedroom,
          images: element.imageURLs,
          status: element.status,
          description: element.description,
          floorId: element.floor_id,
          buildingId: element.building_id,
          resident: response.data.resident as Resident[]
        } as Apartment
        result.push(temp)
      });
      return NextResponse.json(result, {
        status: 200,
      });
    }
  }).catch((error) => {
    return NextResponse.json(error.response.data.message, { status: error.response.status, statusText: error.response.statusText })
  })
  return response;
}