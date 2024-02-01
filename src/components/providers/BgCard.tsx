import React from "react";

import { Box } from "@mui/material";

export default function BgCard({ children }: { children: React.ReactNode }) {
  return (
    <Box className="my-24 items-center rounded-xl border-2 border-[#002] bg-white p-20 ">
      {children}
    </Box>
  );
}
