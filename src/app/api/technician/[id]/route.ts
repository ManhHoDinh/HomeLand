import { endpoint } from "@/constraints/endpoints";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, { params }: { params: any }) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: endpoint.technician + "/" + params.id,
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

export async function POST(request: NextRequest, { params }: { params: any }) {
  const data = await request.formData();
  data.delete("_method")
  const response = await axios
    .patch(endpoint.technician + "/" + params.id, data)
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
export async function DELETE(
  request: NextRequest,
  { params }: { params: any }
) {
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: endpoint.technician + "/" + params.id,
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
