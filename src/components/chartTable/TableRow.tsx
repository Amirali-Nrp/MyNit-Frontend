import { PropsWithChildren } from "react";

import { Tooltip, Typography } from "@mui/material";
import { BsDash, BsFillCheckCircleFill } from "react-icons/bs";
import { FaTimesCircle } from "react-icons/fa";

import { Reqs } from "@/types/userTypes";

interface Props extends PropsWithChildren<any> {
  id: number;
  name: string;
  units: number;
  pre_reqs: Reqs[];
  co_reqs: Reqs[];
  passed: string;
  mark: number;
  isRemaining?: boolean;
}

const TableRow = ({
  id,
  name,
  units,
  pre_reqs,
  co_reqs,
  passed,
  mark,
  isRemaining = false,
}: Props) => {
  const reqs = [...pre_reqs, ...co_reqs];
  return (
    <div
      className={`flex flex-row border-b-2 border-black bg-opacity-80 ${
        passed == "passed" && !isRemaining
          ? "bg-green-400"
          : passed == "failed" && !isRemaining
            ? "bg-red-400"
            : "bg-white"
      }`}
    >
      <div className="flex w-[70px] items-center justify-center border-l-[1px] border-black ">
        <Typography
          sx={{ fontFamily: "Vazirmatn", fontSize: 14, textAlign: "center" }}
        >
          {id}
        </Typography>
      </div>
      <div className="flex w-[170px] items-center justify-center border-x-[1px] border-black">
        <Typography
          sx={{ fontFamily: "Vazirmatn", fontSize: 14, textAlign: "center" }}
        >
          {name}
        </Typography>
      </div>
      <div className="flex w-[40px] items-center justify-center border-x-[1px] border-black">
        <Typography
          sx={{ fontFamily: "Vazirmatn", fontSize: 14, textAlign: "center" }}
        >
          {units}
        </Typography>
      </div>
      <div className="flex w-[100px] items-center justify-center border-x-[1px] border-black">
        <div className="flex flex-col">
          {pre_reqs.map((course, Idx) => {
            return (
              <Tooltip
                title={
                  <Typography
                    sx={{
                      fontFamily: "Vazirmatn",
                      fontSize: 12,
                      textAlign: "end",
                    }}
                  >
                    {course.name}
                  </Typography>
                }
              >
                <Typography
                  key={Idx}
                  sx={{
                    fontFamily: "Vazirmatn",
                    fontSize: 14,
                    textAlign: "center",
                  }}
                >
                  {course.id}
                </Typography>
              </Tooltip>
            );
          })}
          {co_reqs.map((course, Idx) => {
            return (
              <Tooltip
                title={
                  <Typography
                    sx={{
                      fontFamily: "Vazirmatn",
                      fontSize: 12,
                      textAlign: "end",
                    }}
                  >
                    {course.name}
                  </Typography>
                }
              >
                <Typography
                  key={Idx}
                  sx={{
                    fontFamily: "Vazirmatn",
                    fontSize: 14,
                    textAlign: "center",
                  }}
                >
                  ({course.id})
                </Typography>
              </Tooltip>
            );
          })}
        </div>
      </div>
      <div className="flex max-war  w-[51px] items-center justify-center border-r-[1px] border-black">
        <Tooltip
          title={
            <Typography
              sx={{ fontFamily: "Vazirmatn", fontSize: 12, textAlign: "end" }}
            >
              {passed == "passed" && !isRemaining
                ? "قبول"
                : passed == "failed" && !isRemaining
                  ? "رد"
                  : "گذرانده نشده"}
              <br />
              {(passed === "passed" || passed === "failed") && !isRemaining
                ? `نمره : ${mark}`
                : ""}
            </Typography>
          }
        >
          <div>
            {passed == "passed" && !isRemaining ? (
              <BsFillCheckCircleFill />
            ) : passed == "failed" && !isRemaining ? (
              <FaTimesCircle />
            ) : (
              <BsDash />
            )}
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default TableRow;
