import React from "react";
import { useRouter } from "next/navigation";

import { Avatar, Box, Typography } from "@mui/material/index";

interface StudentCardProps {
  id: number;
  name: string;
  entry: string;
  college: string;
  period: string;
}

export default function StudentCard({
  id,
  name,
  entry,
  college,
  period,
}: StudentCardProps) {
  const router = useRouter();

  return (
    <Box
      className="flex h-24 flex-row justify-between rounded-full bg-slate-100"
      sx={{ direction: "rtl" }}
    >
      <Box className="mr-2 flex h-full w-fit flex-row">
        <Box className="flex items-center">
          <Avatar sx={{ width: "72px", height: "72px" }} />
        </Box>
        <Box className="mx-4 flex flex-col justify-center">
          <Typography
            sx={{
              fontSize: "20px",
              fontFamily: "Vazirmatn",
              fontWeight: "500",
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              fontFamily: "Vazirmatn",
              fontWeight: "300",
              color: "#bf361b",
            }}
          >
            {id}
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              fontFamily: "Vazirmatn",
              fontWeight: "300",
              color: "#1976d2",
            }}
          >
            {college} - {period}
          </Typography>
        </Box>
      </Box>
      <Box className="ml-2 flex items-center">
        <button
          className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#2893fd]"
          style={{ fontFamily: "Vazirmatn" }}
          onClick={() => router.push(`/StudentInfo/${id}`)}
        >
          نمایش
        </button>
      </Box>
    </Box>
  );
}
