import { NextRequest, NextResponse } from "next/server";
import { endpoint } from "../../../../constraints/endpoints";
import { Service } from "../../../../models/service";
import axios from "axios";

export async function POST(request: NextRequest) {
    let body = await request.formData();
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: endpoint.searchService,
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