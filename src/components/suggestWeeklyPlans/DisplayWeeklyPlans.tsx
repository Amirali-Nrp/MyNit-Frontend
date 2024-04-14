import React, { useEffect, useState } from "react";

import { WEEK_DAYS_EN, WEEK_DAYS_FA } from "@/constants/index.constants";
import {
  useSuggestedPlansStorage,
  useWeeklyPlanStorage,
} from "@/storage/storage";
import { getCourseWeeklyPlan } from "@/utils/selectedCourses.utils";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { RiRestartLine } from "react-icons/ri";

import { TWeeklyPlan } from "@/types/userTypes";

import TableHeading from "../ScheduleTable/TableHeading";
import TableRow from "../ScheduleTable/TableRow";

export default function DisplayWeeklyPlans() {
  const { plans, setPlans } = useSuggestedPlansStorage();
  const { weeklyPlan, setWeeklyPlan } = useWeeklyPlanStorage();
  const [planNum, setPlanNum] = useState(0);
  // console.log(plans[0]?.courses);

  useEffect(() => {
    const coursePlans = plans[planNum]?.courses?.map((course) =>
      getCourseWeeklyPlan(course)
    );
    // console.log("coursePlans", coursePlans, plans[planNum]?.courses);
    const week: TWeeklyPlan = {};
    // if (coursePlans === undefined) return;
    // @ts-ignore
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
  }, [plans[planNum]?.courses]);

  return (
    <Box>
      <Grid container sx={{ direction: "rtl", bgcolor: "white", mb: 3 }}>
        <TableHeading />
        {WEEK_DAYS_EN.map((day, Idx) => (
          // @ts-ignore
          <TableRow key={Idx} day={WEEK_DAYS_FA[Idx]} plan={weeklyPlan[day]} />
        ))}
      </Grid>
      <Box className="flex w-fit flex-col items-center gap-2">
        <Typography sx={{ fontFamily: "Vazirmatn", fontWeight: 500 }}>
          برنامه ی {planNum + 1} از {plans.length}
        </Typography>
        <Box className="flex flex-row">
          <Button
            variant="contained"
            style={{
              fontFamily: "Vazirmatn",
              margin: 3,
              backgroundColor: "#1976d2",
            }}
            onClick={() =>
              planNum !== plans.length - 1 ? setPlanNum(planNum + 1) : ""
            }
          >
            بعدی
          </Button>
          <Button
            variant="contained"
            style={{
              fontFamily: "Vazirmatn",
              margin: 3,
              backgroundColor: "#1976d2",
            }}
            onClick={() => (planNum !== 0 ? setPlanNum(planNum - 1) : "")}
          >
            قبلی
          </Button>
          <Button
            variant="contained"
            style={{
              fontFamily: "Vazirmatn",
              margin: 3,
              backgroundColor: "#1976d2",
            }}
            onClick={() => setPlans([])}
          >
            <RiRestartLine />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
