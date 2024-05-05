import { endpoint } from "@/constraints/endpoints";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: any }) {
        const apartmentId = await request.nextUrl.searchParams.get("apartmentId")
        const response = await axios
                .delete(`${endpoint.floor}/${params.id}/deleteApartment`, {
                        params: {
                                apartmentId: apartmentId,
                        }
                })
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