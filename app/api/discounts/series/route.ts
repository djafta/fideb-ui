import { NextResponse } from "next/server";
import { getBearerToken } from "@/lib/server/utils";

const FIDEB_API_URL = process.env.FIDEB_API_URL;

export async function GET() {

    const authorization = await getBearerToken();

    if (!authorization) {
        return NextResponse.redirect('/sign-in', {
            status: 302,
            headers: {
                "Content-Type": "application/json",
                "Location": "/sign-in",
            },
        });
    }

    const response = await fetch(`${ FIDEB_API_URL }/discounts/series`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authorization,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch stats");
    }

    const data = await response.json();

    return NextResponse.json(data, {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}