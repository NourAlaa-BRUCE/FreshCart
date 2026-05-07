import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.BETTER_AUTH_SECRET,
        secureCookie: process.env.NEXTAUTH_URL?.startsWith("https://")
    })
    console.log("NODE_ENV:", process.env.NODE_ENV)
    console.log("token from midlleware ", token);
    const ProtectedRoutes = ["/profile", "/cart", "/allorders", "/wishlist", "/checkout"].some((e) => { return req.nextUrl.pathname.startsWith(e) })
    const GuestRoutes = ["/login", "/signup"].some((e) => { return req.nextUrl.pathname === e })
    if (ProtectedRoutes && !token)
        return NextResponse.redirect(process.env.URL!)
    if (GuestRoutes && token)
        return NextResponse.redirect(process.env.URL!)
    return NextResponse.next()
}

export const config = {
    matcher: ["/profile", "/profile/addresses", "/profile/settings", "/cart", "/checkout", "/wishlist", "/allorders", "/login", "/signup"]
}
