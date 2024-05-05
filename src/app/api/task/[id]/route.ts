import { endpoint } from "@/constraints/endpoints";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, { params }: { params: any }) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: endpoint.task + "/" + params.id,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios
    .request(config)  
    .then((response) => {
      if (response.status == 200) {
        const result = response.data;
        return NextResponse.json(result);
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