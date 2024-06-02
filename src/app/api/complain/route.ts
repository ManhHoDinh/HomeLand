import { endpoint } from "@/constraints/endpoints";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: endpoint.complain,
    headers: {
      Authorization: "Bearer " + request.cookies.get("token")?.value,
      "Content-Type": "application/json",
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

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const response = await axios
    .post(endpoint.complain, data)
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

