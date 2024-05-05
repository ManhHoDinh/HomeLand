import axios from "axios";
import { NextResponse } from "next/server";
import { endpoint } from "@/constraints/endpoints";
import { cookies } from "next/headers";
import { UserProfile } from "@/libs/UserProfile";

export async function POST(request: Request) {
  let body = await request.json();
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: endpoint.login,
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
  };
  const response = await axios
    .request(config)
    .then(async (response) => {
      if (response.status == 201) {
        const data = response.data;
        cookies().set("token", data.access_token);
        return await axios
          .get(endpoint.me, {
            headers: { Authorization: "Bearer " + data.access_token },
          })
          .then((res) => {
            return NextResponse.json(
              { id: res.data.id, role: data.role },
              {
                status: 200,
                headers: { "Set-Cookie": `token=${data.access_token}` },
              }
            );
          })
          .catch((err) => {
            console.log(err);
            return NextResponse.json("Something unexpected had happened", {
              status: 500,
              statusText: "Internal service",
            });
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
