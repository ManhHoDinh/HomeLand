import { NextRequest, NextResponse } from "next/server";
import { endpoint } from "../../../../constraints/endpoints";
import axios from "axios";
import { Service } from "../../../../models/service";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: endpoint.service + "/" + params.id,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios
    .request(config)
    .then((response) => {
      if (response.status == 200) {
        const result: Service = response.data;
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
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.formData();
  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: endpoint.service + "/" + params.id,
    headers: {
      'Authorization': "Bearer " + request.cookies.get("token")?.value,
    },
    data: body
  };
  const response = await axios
    .request(config)
    .then((response) => {
      if (response.status == 200) {
        return NextResponse.json(response.data, {
          status: 200,
        });
      }
    })
    .catch((error) => {
      console.log(error)
      if (error.response.data.message = "images fail to validate any of the following constrains")
        console.log(error.response.data.constraints)
      return NextResponse.json({ message: error.response.data.message, constraints: error.response.data.constraints }, {
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
    url: endpoint.service + "/" + params.id,
    headers: {
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
