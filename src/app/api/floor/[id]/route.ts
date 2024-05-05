import { endpoint } from "@/constraints/endpoints";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, { params }: { params: any }) {
  const decodedId = decodeURIComponent(params.id);
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: endpoint.floor + "/" + decodedId,
    headers: {
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

export async function PATCH(request: NextRequest, { params }: { params: any }) {
  const data = await request.json();
  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: endpoint.floor + "/" + params.id,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
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
export async function DELETE(
  request: NextRequest,
  { params }: { params: any }
) {
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: endpoint.floor + "/" + params.id,
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
