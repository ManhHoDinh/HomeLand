import { endpoint } from "@/constraints/endpoints";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const queryString = request.nextUrl.searchParams.get('query')
    const baseUrl = endpoint.technician + '/search'
    const response = await axios.get(baseUrl , {
        params: {
            query: queryString
        }
    }).then((response) => {
        console.log(response.status)
      if (response.status == 200) {
        return NextResponse.json(response.data);
      }
    }).catch((error) =>{
      console.log(error)
      return NextResponse.json(error.response.data.message, { status: error.response.status, statusText: error.response.statusText })})
    return response;
  }