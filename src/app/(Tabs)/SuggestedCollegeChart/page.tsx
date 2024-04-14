"use client";

import useGetChart from "@/core/api/use-getchart";
import { useStudentStorage } from "@/storage/storage";
import { CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

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
      className="my-24 w-4/5 items-center rounded-xl border-2 border-[#002] bg-white p-20 px-48"
      style={{ direction: "rtl" }}
    >
      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <Grid
          container
          spacing={5}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ justifyContent: "center" }}
        >
          {studentInfo &&
            // @ts-ignore
            studentInfo.terms?.map((chart, Idx) => {
              return (
                <Grid key={Idx} xs={8} className="flex justify-center">
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
