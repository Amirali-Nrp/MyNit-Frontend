import NextAuth from "next-auth";

declare module "@auth/core/types" {
  interface User {
    id: string;
  }

  interface Session {
    user: {
      id: string;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
  }
}