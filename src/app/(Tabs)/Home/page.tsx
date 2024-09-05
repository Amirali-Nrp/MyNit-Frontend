"use client";

import { useRouter } from "next/navigation";

import { Box, Button, Typography } from "@mui/material";
import { GrPlan } from "react-icons/gr";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RxCounterClockwiseClock } from "react-icons/rx";

const Home = () => {
  const nav = useRouter();
  return (
    <Box className="m-24 flex w-full flex-col items-center justify-center gap-4 md:w-fit md:flex-row md:p-4">
      <Button
        onClick={() => {
          nav.replace("/PreCourseSelect");
        }}
        variant="contained"
        className=" flex h-full w-full flex-col items-center gap-4 rounded-xl border-2 border-[#002] bg-white p-10 md:w-1/2"
        sx={{
          direction: "rtl",
          "&:hover": {
            backgroundColor: "#eee",
          },
          border: "2px solid black",
          backgroundColor: "#fff",
        }}
      >
        <GrPlan color="#000" size={50} />
        <Typography
          sx={{ fontFamily: "Vazirmatn", color: "black" }}
          variant="h6"
        >
          مشاهده دروس قابل اخذ ترم آینده
        </Typography>
      </Button>
      <Button
        onClick={() => {
          nav.replace("/Chart");
        }}
        variant="contained"
        className=" flex h-full w-full flex-col items-center gap-4 rounded-xl border-2 border-[#002] bg-white p-10  md:w-1/2"
        sx={{
          direction: "rtl",
          "&:hover": {
            backgroundColor: "#eee",
          },
          border: "2px solid black",
          backgroundColor: "#fff",
        }}
      >
        <RxCounterClockwiseClock color="#000" size={50} />
        <Typography
          sx={{ fontFamily: "Vazirmatn", color: "black" }}
          variant="h6"
        >
          مشاهده ترم های اخیر
        </Typography>
      </Button>
      <Button
        onClick={() => {
          nav.replace("/AddCourses");
        }}
        variant="contained"
        className=" flex h-full w-full flex-col items-center gap-4 rounded-xl border-2 border-[#002] bg-white p-10  md:w-1/2"
        sx={{
          direction: "rtl",
          "&:hover": {
            backgroundColor: "#eee",
          },
          border: "2px solid black",
          backgroundColor: "#fff",
        }}
      >
        <IoIosAddCircleOutline color="#000" size={50} />
        <Typography
          sx={{ fontFamily: "Vazirmatn", color: "black" }}
          variant="h6"
        >
          افزودن اطلاعات
        </Typography>
      </Button>
    </Box>
  );
};

export default Home;
