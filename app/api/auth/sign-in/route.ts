import { NextRequest, NextResponse } from "next/server";

const FIDEB_API_URL = process.env.FIDEB_API_URL;

export async function POST(request: NextRequest) {
    const { username, password } = await request.json();

    const response = await fetch(`${ FIDEB_API_URL }/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        return new Response(JSON.stringify({ error: "Failed to sign in" }), {
            status: response.status,
            headers: { "Content-Type": "application/json" },
        });
    }

    const data = await response.json();
    const token = data.data.token;

    const cookie = `fideb-auth-token=${ token }; Path=/; HttpOnly; Secure; SameSite=Strict`;

    return NextResponse.json(data, {
        status: 200,
        headers: {
            "Set-Cookie": cookie,
            "Content-Type": "application/json",
        },
    });
}