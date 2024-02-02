"use client";

// import { cookies } from "next/headers";
import axios from "axios";
// import { getCookie } from "cookies-next";
import Cookies from "js-cookie";
import { useQuery, type UseQueryResult } from "react-query";

import { Course, Eligible, Student, Term } from "@/types/userTypes";

export default function useTest(
  id: FormDataEntryValue | null
): UseQueryResult<Student> {
  // console.log("id in use test", id);
  // Cookies.set("token", "test", { expires: 1, secure: true });
  console.log("token in use test", Cookies.get("token"));
  return useQuery<Student>({
    queryKey: ["test", id],
    queryFn: async (): Promise<Student> => {
      const res = await axios.get<Student>(`https://jubilant-disco-4jx77wj47jjfqrg6-8000.app.github.dev/units`, {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log("data in fetch", res.data);
      return res.data;
    },
  });
}
