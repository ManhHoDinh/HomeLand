import { endpoint } from "@/constraints/endpoints";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: any }) {
  const apartmentIds = await request.nextUrl.searchParams.getAll("apartmentIds")
  console.log(apartmentIds)
  const response = await axios
    .post(`${endpoint.floor}/${params.id}/addApartment`, undefined, {
      params: {
        apartmentIds: apartmentIds,
      },
      paramsSerializer: {
        indexes: null
      }
    })
    .then((response) => {
      if (response.status == 201) {
        return NextResponse.json(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
      return NextResponse.json(error.response.data.message, {
        status: error.response.status,
        statusText: error.response.statusText,
      });
    });
  return response;
}