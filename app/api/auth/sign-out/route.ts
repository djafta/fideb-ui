import { NextResponse } from "next/server";

const FIDEB_API_URL = process.env.FIDEB_API_URL;

export async function DELETE() {

    const response = await fetch(`${ FIDEB_API_URL }/auth/logout`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        return new Response(JSON.stringify({ error: "Failed to sign out" }), {
            status: response.status,
            headers: { "Content-Type": "application/json" },
        });
    }

    const rs = new NextResponse(null, {
        status: 204
    })

    rs.cookies.delete("fideb-auth-token");

    return rs;
}