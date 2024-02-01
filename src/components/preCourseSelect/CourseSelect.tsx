"use client";

import * as React from "react";

import useTest from "@/core/api/use-test";
import {
  useFilteredDaysStorage,
  usePreSelectStorage,
  useStudentStorage,
} from "@/storage/storage";
import { filterCoursesByDay } from "@/utils/filterCoursesByDay";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { Eligible } from "@/types/userTypes";

import List from "./List";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface props {
  disableCheck?: boolean;
  store: Eligible[];
  setStore: (data: Eligible[]) => void;
}

export default function BasicTabs({
  disableCheck = false,
  store,
  setStore,
}: props) {
  const [value, setValue] = React.useState(0);

  const { studentId } = useStudentStorage();

  const {
    data: studentInfo,
    isLoading,
    isSuccess,
    isError,
  } = useTest(studentId);

  const courses = filterCoursesByDay(studentInfo?.eligibles ?? []);

  const technical =
    courses && courses.filter((item) => item.collegeID === "12");

  const oloompaye =
    courses && courses.filter((item) => item.collegeID === "11");

  const maaref = courses && courses.filter((item) => item.collegeID === "16");

  const varzesh = courses && courses.filter((item) => item.collegeID === "29");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // console.log("data", studentInfo);
  // console.log("paye", oloompaye);

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        direction: "rtl",
        borderRadius: 2,
        border: "2px solid #2c2c2c",
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={<Typography fontFamily="Vazirmatn">تخصصی</Typography>}
            {...a11yProps(0)}
          />
          <Tab
            label={<Typography fontFamily="Vazirmatn">علوم پایه</Typography>}
            {...a11yProps(1)}
          />
          <Tab
            label={<Typography fontFamily="Vazirmatn">عمومی</Typography>}
            {...a11yProps(2)}
          />
          <Tab
            label={
              <Typography fontFamily="Vazirmatn">تربیت بدنی و ورزش</Typography>
            }
            {...a11yProps(3)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <List
          data={technical ?? []}
          disableCheck={disableCheck}
          courseData={store}
          setCourseData={(data: Eligible[]) => setStore(data)}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <List
          data={oloompaye ?? []}
          courseData={store}
          setCourseData={(data: Eligible[]) => setStore(data)}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <List
          data={maaref ?? []}
          courseData={store}
          disableCheck={disableCheck}
          setCourseData={(data: Eligible[]) => setStore(data)}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <List
          data={varzesh ?? []}
          courseData={store}
          disableCheck={disableCheck}
          setCourseData={(data: Eligible[]) => setStore(data)}
        />
      </CustomTabPanel>
    </Box>
  );
}
