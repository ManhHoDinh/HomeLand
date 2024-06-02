import { NextRequest, NextResponse } from "next/server";
import { endpoint } from "@/constraints/endpoints";
import axios from "axios";
export async function GET(request: NextRequest, { params }: { params: any }) {
    console.log(params.id)
    const response = await axios.get(`${endpoint.complain}/building/${params.id}`)
      .then((response) => {
        if (response.status == 200) {
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