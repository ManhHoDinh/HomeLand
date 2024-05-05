import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { endpoint } from "@/constraints/endpoints";
export async function GET(request: NextRequest) {
  const response = await axios
    .get(endpoint.manager)
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
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: endpoint.manager,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
  };
  const response = await axios
    .request(config)
    .then((response) => {
      if (response.status == 201) {
        return NextResponse.json(response.data);
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
