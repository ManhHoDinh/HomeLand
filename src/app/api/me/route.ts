import { endpoint } from "@/constraints/endpoints";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: endpoint.me,
        headers: {
            Authorization: "Bearer " + request.cookies.get("token")?.value,
            "Content-Type": "application/json",
        },
    };

    const response = await axios
        .request(config)
        .then((response) => {
            if (response.status == 200) {
                return NextResponse.json(response.data.profile as Profile);
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