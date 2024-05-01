import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { authed_routes } from "./constants/routes";
import axios from "axios";

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const access_token = cookieStore.get("token");

  // if (
  //   request.nextUrl.pathname.startsWith("/") &&
  //   request.nextUrl.pathname.endsWith("/")
  // ) {
  //   const tokens = {
  //     access_token: access_token,
  //   };

  //   if (tokens.access_token === undefined) {
  //     return NextResponse.rewrite(new URL("/", request.url));
  //   }

  //   try {
  //     const resposne = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authorize`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         access_token: tokens.access_token.value,
  //       }),
  //     });

  //     const result = await resposne.json();
  //     if (result.detail === "unauthorized") {
  //       return NextResponse.redirect(new URL("/", request.url));
  //     }
  //     return NextResponse.redirect(new URL("/Home", request.url));
  //   } catch (e) {
  //     // console.log(e);
  //   }

  //   return NextResponse.rewrite(new URL("/", request.url));
  // } else
  if (authed_routes.includes(request.nextUrl.pathname)) {
    const tokens = {
      access_token: access_token,
    };

    if (tokens.access_token === undefined) {
      // console.log("token undifined");
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/authorize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_token: tokens.access_token.value,
          }),
        }
      );
      const result = await response.json();
      // console.log(tokens.access_token.value, result)
      // console.log("res", result);
      if (result.detail === "unauthorized") {
        // console.log("unauthorized");
        return NextResponse.redirect(new URL("/", request.url));
      }
      else if (result.detail === "authorized") {
        return NextResponse.rewrite(
        new URL(request.nextUrl.pathname, request.url)
      );
    }
    } catch (e) {
      // console.log("middleware error",e);
    }

    // console.log("default");
    return NextResponse.redirect(new URL("/", request.url));
  }
}
