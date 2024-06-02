import { endpoint } from "@/constraints/endpoints";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: any }) {
    const managerId = await request.nextUrl.searchParams.get("managerId")
    const response = await axios
      .post(`${ endpoint.building }/${params.id}/deleteManager`, undefined, {
        params: {
            managerId: managerId,
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