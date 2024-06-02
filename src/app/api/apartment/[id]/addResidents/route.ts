import { endpoint } from "@/constraints/endpoints";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: any }) {
  const residentIds = await request.nextUrl.searchParams.getAll("residentIds");
  const response = await axios
    .post(`${endpoint.apartment}/${params.id}/addResidents`, undefined, {
      params: {
        residentIds: residentIds,
      },
      paramsSerializer: {
        indexes: null,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + request.cookies.get("token")?.value,
      },
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
