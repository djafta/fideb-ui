import { NextRequest, NextResponse } from "next/server";
import { getBearerToken } from "@/lib/server/utils";

export async function GET(request: NextRequest, { params }: { params: Promise<{ reference: string }> }) {
  const authorization = await getBearerToken();
  const { reference } = await params;

  if (reference) {
    const url = new URL(`${ process.env.FIDEB_API_URL }/discounts/${ reference }/timeline`);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authorization,
      },
    })

    const data = await response.json();

    return NextResponse.json(data)
  }

  return NextResponse.error();
}