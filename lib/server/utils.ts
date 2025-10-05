import { cookies, headers } from "next/headers";


export async function getBearerToken(): Promise<string> {
    const cookieStore = await cookies();

    let token = cookieStore.get("fideb-auth-token")?.value;

    if (!token) {
        const authorization = (await headers()).get("Authorization");
        token = authorization?.substring(7);
    }

    if (!token) {
        throw new Error("Token not found");
    }

    return `Bearer ${ token }`;
}
