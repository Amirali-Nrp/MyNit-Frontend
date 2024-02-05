"use client";

import React, { useEffect, useState } from "react";

import { apiPath } from "@/constants/index.constants";
import { Box } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

import StudentCard from "@/components/studentCard/StudentCard";

export default function AdminPanel() {
  const [students, setStudens] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiPath}/students`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => setStudens(res.data))
      .catch((err) => console.log("error in Admin Panel", err));
  }, []);

  return (
    <Box className="my-24 flex w-2/5 flex-col gap-3">
      {students.map(({ id, name, entry, college, period }) => {
        return (
          <StudentCard
            id={id}
            name={name}
            entry={entry}
            college={college}
            period={period}
          />
        );
      })}
    </Box>
  );
}
