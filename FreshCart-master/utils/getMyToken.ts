import { decode, JWT } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() :Promise<JWT|undefined>{
    const mycookies = await cookies();
    const myTokenCookies = mycookies.get("__Secure-next-auth.session-token")?.value || 
    mycookies.get("next-auth.session-token")?.value;
    const myTokenAfterDecoded = await decode({token:myTokenCookies , secret: process.env.BETTER_AUTH_SECRET!});
    if(myTokenAfterDecoded)return myTokenAfterDecoded;
}