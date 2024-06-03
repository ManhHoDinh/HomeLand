import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { endpoint } from "@/constraints/endpoints";
import { Service } from "@/models/service";

export async function POST(request: NextRequest) {
  let body = await request.formData();
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: endpoint.service,
    data: body,
    headers: {
      Authorization: "Bearer " + request.cookies.get("token")?.value,
      "Content-Type": `multipart/form-data`,
    },
  };
  const response = await axios
    .request(config)
    .then((response) => {
      if (response.status == 201) {
        const element = response.data;
        return NextResponse.json(element, {
          status: 201,
        });
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
export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page");
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: endpoint.service + (page != null ? "?page=" + page : ""),
    headers: {
      Authorization: "Bearer " + request.cookies.get("token")?.value,
      "Content-Type": "application/json",
    },
  };
  const response = await axios
    .request(config)
    .then((response) => {
      if (response.status == 200) {
        const result: Service[] = [];
        response.data.data.forEach((element: Service) => {
          result.push(element);
        });
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
