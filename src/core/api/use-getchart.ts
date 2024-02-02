import axios from "axios";
import Cookies from "js-cookie";
import { useQuery, type UseQueryResult } from "react-query";

import { Course, Eligible, Student, Term } from "@/types/userTypes";

const useGetChart = (id: FormDataEntryValue | null): UseQueryResult<Term[]> => {
  console.log("id in use get chart", id);
  return useQuery<Term[]>({
    queryKey: ["chart", id],
    queryFn: async (): Promise<Term[]> => {
      const res = await axios.get<Term[]>(`https://jubilant-disco-4jx77wj47jjfqrg6-8000.app.github.dev/chart`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      // console.log("data in fetch", res.data)
      return res.data;
    },
  });
};

export default useGetChart;
