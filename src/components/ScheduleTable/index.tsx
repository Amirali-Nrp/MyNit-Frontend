"use client";

import React, { useEffect } from "react";

import { WEEK_DAYS_EN, WEEK_DAYS_FA } from "@/constants/index.constants";
import {
  usePreSelectDataStorage,
  useWeeklyPlanStorage,
} from "@/storage/storage";
import { getCourseWeeklyPlan } from "@/utils/selectedCourses.utils";
import { Grid } from "@mui/material";

import { TWeeklyPlan } from "@/types/userTypes";

import TableHeading from "./TableHeading";
import TableRow from "./TableRow";

function ScheduleTable() {
  const { courseData } = usePreSelectDataStorage();
  const { weeklyPlan, setWeeklyPlan } = useWeeklyPlanStorage();
  // console.log("looole", courseData);
  // console.log("weeklyPlan", weeklyPlan);

  useEffect(() => {
    const coursePlans = courseData?.map((course) =>
      getCourseWeeklyPlan(course)
    );
    // console.log("coursePlans", coursePlans, courseData);
    const week: TWeeklyPlan = {};
    // if (coursePlans === undefined) return;
    for (const coursePlan of coursePlans) {
      for (const dayPlan of coursePlan) {
        const {
          day,
          courseName,
          time,
          courseID,
          totalUnit,
          practicalUnit,
          professor,
          description,
        } = dayPlan;
        week[day] = [
          ...(week[day] || []),
          {
            courseID,
            courseName,
            time,
            practicalUnit,
            totalUnit,
            professor,
            description,
          },
        ];
      }
    }
    setWeeklyPlan(week);
  }, [courseData]);

  return (
    <Grid container sx={{ direction: "rtl", bgcolor: "white", mb: 10 }}>
      <TableHeading />
      {WEEK_DAYS_EN.map((day, Idx) => (
        // @ts-ignore
        <TableRow key={Idx} day={WEEK_DAYS_FA[Idx]} plan={weeklyPlan[day]} />
      ))}
    </Grid>
  );
}

export default ScheduleTable;
