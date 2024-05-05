import { NextRequest, NextResponse } from "next/server";
import { endpoint } from "../../../../constraints/endpoints";
import axios from "axios";
import { Invoice } from "../../../../models/invoice";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: endpoint.invoice + "/" + params.id,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios
    .request(config)
    .then((response) => {
      if (response.status == 200) {
        const result: Invoice = response.data;
        console.log(result);
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
