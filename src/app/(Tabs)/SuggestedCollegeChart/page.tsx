"use client";

import useGetChart from "@/core/api/use-getchart";
import { useStudentStorage } from "@/storage/storage";
import { CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import ChartTable from "@/components/chartTable/ChartTable";

export default function SuggestedCollegeChart() {
  const { studentId } = useStudentStorage();

  const {
    data: studentInfo,
    isLoading,
    isSuccess,
    isError,
  } = useGetChart(studentId);

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
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, lg: 2, xl: 3 }}
        >
          {studentInfo &&
            // @ts-ignore
            studentInfo.terms?.map((chart, Idx) => {
              return (
                <Grid key={Idx} item xs={1} className="flex justify-center">
                  <ChartTable
                    semester={chart.term_number}
                    courses={chart.courses}
                    totalUnits={chart.total_units}
                  />
                </Grid>
              );
            })}
        </Grid>
      )}
    </div>
  );
}
