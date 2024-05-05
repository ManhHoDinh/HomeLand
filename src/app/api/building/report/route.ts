import { endpoint } from "@/constraints/endpoints";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export async function GET(request: NextRequest) {
  const response = await axios
    .get(`${endpoint.building}/report`)
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
