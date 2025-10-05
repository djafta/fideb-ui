import { NextRequest, NextResponse } from "next/server";
import { getBearerToken } from "@/lib/server/utils";

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;

    const type = searchParams.get("type");
    const skip = searchParams.get("skip");
    const take = searchParams.get("take");

    const authorization = await getBearerToken();

    if (type) {
        const response = await fetch(`${ process.env.FIDEB_API_URL }/requests?type=${ type }&skip=${ skip }&take=${ take }`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authorization,
            },
            next: {
                tags: [`${ type }-requests`],
            },
        })

        const data = await response.json();

        return NextResponse.json(data, {
            status: response.status,
            headers: {
                "Content-Type": "application/json",
            },
        })
    }

    const response = await fetch(`${ process.env.FIDEB_API_URL }/requests?&skip=${ skip }&take=${ take }`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authorization,
        },
        next: {
            tags: [`requests`],
        },
    })

    const data = await response.json();

    return NextResponse.json(data, {
        status: response.status,
        headers: {
            "Content-Type": "application/json",
        },
    })
}
