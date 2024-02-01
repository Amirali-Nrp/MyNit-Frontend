import { Key } from "react";

import { Divider, Typography } from "@mui/material";

import { Reqs } from "@/types/userTypes";

import EndRow from "./EndRow";
import HeadRow from "./HeadRow";
import Semester from "./Semester";
import TableRow from "./TableRow";

type ChartDataProps = {
  semester: number;
  courses: {
    id: number;
    name: string;
    units: number;
    pre_reqs: Reqs[];
    co_reqs: Reqs[];
    passed: string;
    mark: number;
  }[];
  totalUnits: number;
  totalPassedUnits?: number;
  totalGrade?: number;
  isRemaining?: boolean;
};

const ChartTable = ({
  semester,
  courses,
  totalUnits,
  totalPassedUnits,
  totalGrade,
  isRemaining = false,
}: ChartDataProps) => {
  return (
    <div
      className="flex min-h-[340px] w-[430px] flex-col justify-between rounded-md border-2 border-[#000] bg-[#ececec]"
      style={{ direction: "rtl" }}
    >
      <div>
        <Semester id={semester} />
        <HeadRow />
        {courses &&
          courses.map((row, Idx: Key | null | undefined) => {
            return (
              <TableRow
                key={Idx}
                id={row.id}
                name={row.name}
                units={row.units}
                pre_reqs={row.pre_reqs}
                co_reqs={row.co_reqs}
                passed={row.passed}
                mark={row.mark}
                isRemaining={isRemaining}
              />
            );
          })}
      </div>
      <EndRow
        totalUnits={totalUnits}
        totalPassedUnits={totalPassedUnits}
        totalGrade={totalGrade}
      />
    </div>
  );
};

export default ChartTable;
