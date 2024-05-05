import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { endpoint } from "@/constraints/endpoints";
import { Invoice } from "../../../../models/invoice";

export async function GET(request: NextRequest) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: endpoint.invoice + "/used/findAll",
      headers: {
        Authorization: "Bearer " + request.cookies.get("token")?.value,
        "Content-Type": "application/json",
      },
    };
    const response = await axios
      .request(config)
      .then((response) => {
        if (response.status == 200) {
          const result: Invoice[] = [];
          response.data.forEach((element: Invoice) => {
            result.push(element);
          });
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
      console.log(response);
    
    return response;
  }
  