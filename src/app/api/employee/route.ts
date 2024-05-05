import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { endpoint } from "@/constraints/endpoints";
import { cookies } from "next/headers";
export async function GET(request: NextRequest) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: endpoint.employee,
    headers: {
      "Authorization": "Bearer " + request.cookies.get("token")?.value,
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
  console.log(data)
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: endpoint.employee,
    headers: {
      "Content-Type": "multipart/form-data",
      'Authorization': "Bearer " + request.cookies.get("token")?.value,
    },
    data: data,
  };
  console.log(endpoint.employee)
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