import { endpoint } from './../../../../../constraints/endpoints/index';
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export async function PATCH(request: NextRequest, { params }: { params: any }) {
    
    const response = await axios
      .patch(`${endpoint.task}/${params.id}/done`)
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