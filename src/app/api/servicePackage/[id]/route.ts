import { NextRequest, NextResponse } from "next/server";
import { endpoint } from "../../../../constraints/endpoints";
import axios from "axios";

export async function PATCH(request: NextRequest, { params }: { params: any }) {
  const data = await request.formData();
  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: endpoint.servicePackage + "/" + params.id,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const response = await axios
    .request(config)
    .then((response) => {
      if (response.status == 200) {
        console.log(response.data);
        return NextResponse.json(response.data, {
          status: 200,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return NextResponse.json(
        {
          message: error.response.data.message,
          constraints: error.response.data.constraints,
        },
        {
          status: error.response.status,
          statusText: error.response.statusText,
        }
      );
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
    url: endpoint.servicePackage + "/" + params.id,
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
