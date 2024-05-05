import { endpoint } from "@/constraints/endpoints";
import { Employee } from "@/models/employee";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, { params }: { params: any }) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: endpoint.feedback + "/" + params.id,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + request.cookies.get("token")?.value,
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
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: endpoint.feedback + "/" + params.id,
    headers: {
      "Content-Type": "multipart/form-data",
      'Authorization': "Bearer " + request.cookies.get("token")?.value,
    },
    data: data,
  };
  console.log(endpoint.feedback + "/" + params.id)
  const response = await axios
    .request(config)
    .then((response) => {
      console.log(response.status);
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

export async function PATCH(request: NextRequest, { params }: { params: any }) {
  const data = await request.json();
  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: endpoint.employee + "/" + params.id,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + request.cookies.get("token")?.value,
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
    url: endpoint.feedback + "/" + params.id,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + request.cookies.get("token")?.value,
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