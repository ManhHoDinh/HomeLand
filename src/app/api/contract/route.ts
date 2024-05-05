import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { endpoint } from "@/constraints/endpoints";
import { Contract } from "@/models/contract";

export async function POST(request: NextRequest) {
  let body = await request.formData();
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: endpoint.contract,
    data: body,
    headers: {
      Authorization: "Bearer " + request.cookies.get("token")?.value,
      "Content-Type": "application/json",
    },
  };
  const response = await axios
    .request(config)
    .then((response) => {
      if (response.status == 201) {
        const element = response.data;
        //   const temp = {
        //     contract_id:
        //   } as Contract
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
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: endpoint.contract ,
    headers: {
      Authorization: "Bearer " + request.cookies.get("token")?.value,
      "Content-Type": "application/json",
    },
  };
  const response = await axios
    .request(config)
    .then((response) => {
      if (response.status == 200) {
        const result: Contract[] = [];
        response.data.data.forEach((element: Contract) => {
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
