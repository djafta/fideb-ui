import { NextRequest, NextResponse } from "next/server";
import { getBearerToken } from "@/lib/server/utils";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ reference: string }> }) {
  const authorization = await getBearerToken();
  const { reference } = await params;

  if (reference) {
    const url = new URL(`${ process.env.FIDEB_API_URL }/discounts/${ reference }`);

    const body = await request.json();

    console.log({ body })

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authorization,
      },
      body: JSON.stringify(body),
    })

    const data = response.json();

    return NextResponse.json(data)
  }

  return NextResponse.error();
}