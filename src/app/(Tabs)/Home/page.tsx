"use client";

import { Box, Button, Typography } from "@mui/material";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { GrPlan } from "react-icons/gr";
import {useRouter} from "next/navigation"

const Home = () => {
  const nav = useRouter();
  return <Box className="w-1/2 m-24 p-4 flex flex-row gap-4 items-center justify-center">
    <Button
      onClick={() => {nav.replace("/PreCourseSelect")}}
      variant="contained"
      className=" items-center rounded-xl border-2 border-[#002] bg-white flex flex-col gap-4 w-1/2 p-10 h-full"
      sx={{direction: "rtl", "&:hover": {
        backgroundColor: '#eee',
      },
      border: "2px solid black"
    }}
    >
      <GrPlan color="#000" size={50} />
      <Typography sx={{fontFamily: "Vazirmatn", color: "black"}} variant="h6">مشاهده دروس قابل اخذ ترم آینده</Typography>
    </Button>
    <Button
      onClick={() => {nav.replace("/Chart")}}
      variant="contained"
      className=" items-center rounded-xl border-2 border-[#002] bg-white flex flex-col gap-4 w-1/2 p-10  h-full"
      sx={{direction: "rtl", "&:hover": {
        backgroundColor: '#eee',
      },
      border: "2px solid black"

    }}
    >
      <RxCounterClockwiseClock color="#000" size={50}/>
      <Typography sx={{fontFamily: "Vazirmatn", color: "black"}} variant="h6">مشاهده ترم های اخیر</Typography>
    </Button>
  </Box>
};

export default Home;
