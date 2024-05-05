import { endpoint } from "@/constraints/endpoints";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: any }) {
    let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: endpoint.vehicle + "/" + params.id,
        headers: {
            Authorization: "Bearer " + request.cookies.get("token")?.value,

            "Content-Type": "application/json",
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

export async function PATCH(request: NextRequest, { params }: { params: any }) {
    const data = await request.json()
    let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: endpoint.vehicle + "/" + params.id,
        headers: {
            Authorization: "Bearer " + request.cookies.get("token")?.value,
            "Content-Type": "application/json",
        },
        data: data
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