"use client";

import React from "react";

import { usePreSelectDataStorage } from "@/storage/storage";
import { Button } from "@mui/material";

import { Eligible } from "@/types/userTypes";

import CourseSelect from "@/components/preCourseSelect/CourseSelect";
import ScheduleTable from "@/components/ScheduleTable";
import TableHeading from "@/components/ScheduleTable/TableHeading";

export default function PreCourseSelect() {
  const { courseData, setCourseData } = usePreSelectDataStorage();

  return (
    <div className="my-24 w-4/5">
      <ScheduleTable />
      {/* <TableHeading /> */}
      <CourseSelect
        store={courseData}
        setStore={(data: Eligible[]) => setCourseData(data)}
      />
      {/* <Button
        variant="contained"
        className="my-10 bg-blue-500 px-5"
        sx={{ fontFamily: "Vazirmatn" }}
      >
        ذخیره
      </Button> */}
    </div>
  );
}
