"use client";

import React, { useEffect } from "react";

import useTest from "@/core/api/use-test";
import { useStudentStorage } from "@/storage/storage";
import { CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import getChartData from "@/dict/Chart.dict";

import ChartTable from "@/components/chartTable/ChartTable";

export default function Chart() {
  const { studentId } = useStudentStorage();

  const {
    data: studentInfo,
    isLoading,
    isSuccess,
    isError,
  } = useTest(studentId);

  return (
    <div
      className="m-24 w-full items-center rounded-xl border-2 border-[#002] bg-white py-16"
      style={{ direction: "rtl" }}
    >
      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 1, lg: 2, xl: 3 }}
          >
            {studentInfo &&
              studentInfo.terms?.map((chart, Idx) => {
                return (
                  <Grid key={Idx} item xs={1} className="flex justify-center">
                    <ChartTable
                      semester={chart.term_number}
                      courses={chart.courses}
                      totalUnits={chart.total_units}
                      totalPassedUnits={chart.total_passed}
                      totalGrade={chart.grade}
                    />
                  </Grid>
                );
              })}
          </Grid>
          {/* <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Array.from(Array(7)).map((_, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <div className="h-10 w-24 bg-red-500">xs=2</div>
              </Grid>
            ))}
          </Grid> */}
          <Typography fontFamily={"Vazirmatn"} className="mr-28 mt-12 text-lg">
            مجموع واحد های پاس شده : {studentInfo?.passed_units}
          </Typography>
        </>
      )}
    </div>
  );
}
