import { endpoint } from "@/constraints/endpoints";
import { Apartment } from "@/models/apartment";
import { Resident } from "@/models/resident";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: endpoint.apartment + "/" + params.id,
    headers: {
      "Content-Type": "application/json",
      'Authorization': "Bearer " + request.cookies.get("token")?.value,

    },
  };
  const response = await axios
    .request(config)
    .then((response) => {
      if (response.status == 200) {
        const temp = {
          apartment_id: response.data.apartment_id,
          width: response.data.width,
          length: response.data.length,
          name: response.data.name,
          rent: response.data.rent,
          bathroom: response.data.number_of_bathroom,
          bedroom: response.data.number_of_bedroom,
          images: response.data.imageURLs,
          status: response.data.status,
          description: response.data.description,
          floorId: response.data.floor_id,
          buildingId: response.data.building_id,
          residents: response.data.residents as Resident[]
        } as Apartment;
        const result: Apartment = temp;

        return NextResponse.json(result, {
          status: 200,
        });
      }
    })
    .catch((error) => {
      return NextResponse.json(error.response.data.message, {
        status: error.response.status,
        statusText: error.response.statusText,
      });
    });
  return response;
}
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.formData();
  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: endpoint.apartment + "/" + params.id,
    headers: {
      'Authorization': "Bearer " + request.cookies.get("token")?.value,
    },
    data: body
  };
  const response = await axios
    .request(config)
    .then((response) => {
      if (response.status == 200) {
        const temp = {
          apartment_id: response.data.apartment_id,
          width: response.data.width,
          length: response.data.length,
          name: response.data.name,
          rent: response.data.rent,
          bathroom: response.data.number_of_bathroom,
          bedroom: response.data.number_of_bedroom,
          images: response.data.imageURLs,
          status: response.data.status,
          description: response.data.description,
          floorId: response.data.floor_id,
          buildingId: response.data.building_id,
          resident: response.data.resident as Resident[]
        } as Apartment;
        const result: Apartment = temp;

        return NextResponse.json(result, {
          status: 200,
        });
      }
    })
    .catch((error) => {
      console.log(error)
      if (error.response.data.message = "images fail to validate any of the following constrains")
        console.log(error.response.data.constraints)
      return NextResponse.json({ message: error.response.data.message, constraints: error.response.data.constraints }, {
        status: error.response.status,
        statusText: error.response.statusText,
      });
    });
  return response;
}

