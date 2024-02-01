import React from "react";

import { TABLE_HEADER_TIME_LIST } from "@/constants/index.constants";
import { e2p } from "@/formatDateAndTime";
import { usePreSelectDataStorage } from "@/storage/storage";
import calculateDayRow from "@/utils/calculateDayRow";
import { Grid, Typography } from "@mui/material";

import { TDailyPlan } from "@/types/userTypes";

export default function TableRow({
  day,
  plan,
}: {
  day: string;
  plan: TDailyPlan[];
}) {
  // console.log("cn", calculateDayRow(plan, day));

  const { courseData, setCourseData } = usePreSelectDataStorage();

  const removeSelectedCourse = (cid: string) => {
    setCourseData(courseData?.filter((c) => c.courseID !== cid));
  };

  return (
    <Grid
      container
      sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
    >
      <Grid
        item
        xs={(1 / TABLE_HEADER_TIME_LIST.length) * 12}
        sx={{
          border: "1px solid #000000",
          height: "100%",
          pr: "2px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <h1 className="" style={{ fontFamily: "Vazirmatn" }}>
          {day}
        </h1>
      </Grid>

      <Grid
        item
        xs={
          ((TABLE_HEADER_TIME_LIST.length - 1) /
            TABLE_HEADER_TIME_LIST.length) *
          12
        }
        sx={{
          minHeight: 90,
          border: "1px solid #000000",
          display: "flex",
        }}
      >
        {calculateDayRow(plan, day)?.map(
          ({
            time,
            courseName,
            courseID,
            professor,
            description,
            timeScale,
          }) => {
            return courseName === "NOT_A_COURSE" ? (
              <Grid
                key={courseID}
                xs={(timeScale / (TABLE_HEADER_TIME_LIST.length - 1)) * 12}
                sx={{
                  border: "none",
                }}
              ></Grid>
            ) : (
              <Grid
                item
                xs={(timeScale / (TABLE_HEADER_TIME_LIST.length - 1)) * 12}
                sx={{
                  border: "1px solid #000000",
                  borderBottom: "none",
                  borderTop: "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  cursor: "pointer",
                  wordBreak: "break-word",
                }}
                onClick={() => removeSelectedCourse(courseID)}
              >
                <Typography
                  component="p"
                  variant="body1"
                  // color="primary.contrastText"
                  fontSize="12px"
                  fontFamily="Vazirmatn"
                  mx={1}
                >
                  {`${e2p(courseName)} (گروه ${e2p(courseID.split("_")[1])})`}
                </Typography>
                <Typography
                  component="p"
                  variant="body2"
                  fontFamily="Vazirmatn"
                  color="primary.light"
                >
                  {professor}
                </Typography>
                <Typography
                  component="p"
                  variant="subtitle2"
                  fontFamily="Vazirmatn"
                  // color="primary.contrastText"
                >
                  {e2p(time.from)} تا {e2p(time.to)}
                </Typography>
              </Grid>
            );
          }
        )}
      </Grid>
    </Grid>
  );
}
