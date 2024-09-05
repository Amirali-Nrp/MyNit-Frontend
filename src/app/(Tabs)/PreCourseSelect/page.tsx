"use client";

import React, { useState } from "react";

import { usePreSelectDataStorage } from "@/storage/storage";
import showToast from "@/utils/showToast";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

import { Eligible } from "@/types/userTypes";

import CourseSelect from "@/components/preCourseSelect/CourseSelect";
import ScheduleTable from "@/components/ScheduleTable";
import TableHeading from "@/components/ScheduleTable/TableHeading";

export default function PreCourseSelect() {
  const [isLoading, setIsLoading] = useState(false);
  const { courseData, setCourseData } = usePreSelectDataStorage();

  const handleSave = () => {
    setIsLoading(true);
    const Ids = courseData.map((data) => data.courseID);
    // console.log("Ids", Ids);
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/units/choose`,
        {
          selected: Ids,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .then(() => showToast("با موفقیت ذخیره شد", "success", 3000))
      .catch(() => showToast("خطایی رخ داد", "error", 3000));
    setIsLoading(false);
  };

  return (
    <div className="my-24 flex w-4/5 flex-col gap-6">
      <ScheduleTable />
      {/* <TableHeading /> */}

      <CourseSelect
        store={courseData}
        setStore={(data: Eligible[]) => setCourseData(data)}
      />
      <Button
        variant="contained"
        sx={{ fontFamily: "Vazirmatn", width: "100%" }}
        onClick={handleSave}
      >
        {isLoading ? (
          <div className="flex w-full items-center justify-center">
            <CircularProgress size={25} color="inherit" />
          </div>
        ) : (
          <span>ذخیره</span>
        )}
      </Button>
    </div>
  );
}
