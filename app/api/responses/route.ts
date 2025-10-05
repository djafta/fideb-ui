import { NextRequest, NextResponse } from "next/server";
import { getBearerToken } from "@/lib/server/utils";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const situation = searchParams.get("situation");
  const skip = searchParams.get("skip");
  const take = searchParams.get("take");
  const organization = searchParams.get("organization");
  const manager = searchParams.get("manager");
  const entity = searchParams.get("entity");
  const branch = searchParams.get("branch");
  const nuit = searchParams.get("nuit");
  const client = searchParams.get("client");
  const reference = searchParams.get("reference");
  const status = searchParams.get("status");

  const url = new URL(`${ process.env.FIDEB_API_URL }/responses`);

  if (organization) url.searchParams.set("organization", organization);
  if (manager) url.searchParams.set("manager", manager);
  if (branch) url.searchParams.set("branch", branch);
  if (nuit) url.searchParams.set("nuit", nuit);
  if (client) url.searchParams.set("client", client);
  if (entity) url.searchParams.set("entity", entity);
  if (situation) url.searchParams.set("situation", situation);
  if (skip) url.searchParams.set("skip", skip);
  if (take) url.searchParams.set("take", take);
  if (reference) url.searchParams.set("reference", reference);
  if (status) url.searchParams.set("status", status);

  const authorization = await getBearerToken();

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": authorization,
    },
    next: {
      tags: [`responses`, url.toString()],
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
