// import Cookies from "js-cookie";
import { get } from "http";
import { cookies } from "next/headers";

import axios from "axios";
// import { getCookie, setCookie } from "cookies-next";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import { authConfig } from "./auth.config";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const credentialsSchema = z.object({
          studentId: z.string().min(1),
          password: z.string().min(1),
        });
        const parsedCredentials = credentialsSchema.safeParse(credentials);
        // console.log("pc", parsedCredentials);
        if (!parsedCredentials.success) {
          return null;
        }

        // console.log("credentials", parsedCredentials.data);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/login`,
          {
            id: parsedCredentials.data.studentId,
            password: parsedCredentials.data.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status == 200) {
          // console.log(
          //   "success",
          //   response.status,
          //   response.data["access token"]
          // );
          const token = response.data["access token"];
          // console.log("token from api", token);
          cookies().set("token", token, {
            expires: 1,
            secure: true,
          });
          // setCookie("token", token);
          // console.log("token in auth", cookies().get("token")?.value);
          // return {};
        } else {
          // console.log("error", response.status, response.data);
        }

        // const studentIds = ["40030112067", "40030212049"]
        // studentIds.forEach((sId)=>{
        //     console.log(sId, parsedCredentials.data.studentId, sId === parsedCredentials.data.studentId);
        //     if (sId === parsedCredentials.data.studentId) {
        //         return {
        //             id: sId
        //         }
        //     }
        // })
        // for (let index = 0; index < studentIds.length; index++) {
        //     if (studentIds[index] === parsedCredentials.data.studentId) {
        //                 return {
        //                     id: studentIds[index]
        //                 }
        //             }
        // }

        return null;
      },
    }),
  ],
  callbacks: {
    // @ts-ignore
    jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: Number(user.id),
        };
      }

      return { ...token };
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id,
        },
      };
    },
  },
});
