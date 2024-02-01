"use server";

// import { cookies } from "next/headers";
import { signIn } from "../../../auth";

export const login = async (data: any) => {
  try {
    await signIn("credentials", {
      ...data,
      redirect: false,
    });
    // console.log("token in login", cookies().get("token")?.value);
    return "Success";
  } catch (err) {
    if ((err as Error).message.includes("CredentialsSignin")) {
      return "Invalid credentials";
    }

    console.log(err);

    return "Something went wrong";
  }
};
