import { endpoint } from "@/constraints/endpoints";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest, { params }: { params: any }) {
  const response = await axios
    .get(`${endpoint.repairInvoice}/${params.id}`)
    .then((response) => {
      if (response.status == 200) {
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

export async function POST(request: NextRequest, { params }: { params: any }) {
  const data = await request.json();
  console.log(data);
  const response = await axios
    .post(`${endpoint.repairInvoice}/${params.id}`, data)
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
export async function DELETE(request: NextRequest, { params }: { params: any }) {
    const response = await axios.delete(`${endpoint.repairInvoice}/${params.id}`)
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


