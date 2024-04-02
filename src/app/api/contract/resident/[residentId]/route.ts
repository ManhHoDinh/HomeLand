import { endpoint } from "@/constraints/endpoints";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, { params }: { params: any }) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: endpoint.contract + "/resident/" + params.residentId,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + request.cookies.get("token")?.value,
    },
  };

  const response = await axios
    .request(config)
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