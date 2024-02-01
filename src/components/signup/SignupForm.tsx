"use client";

import React from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import Cookie from "js-cookie";

import "@/components/login/button.css";

export default function SignupForm() {
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const signupData = {
      id: data.get("studentNumber"),
      name: data.get("name"),
      password: data.get("password"),
    };
    console.log("signupData", signupData);
    const res = await axios
      .post("http://0.0.0.0:8080/signup", signupData)
      .then((res) => {
        if (res.status == 200) {
          Cookie.set("token", res.data["access token"], {
            expires: 1,
            secure: true,
          });
          router.push(`/Home`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 1, direction: "rtl" }}
    >
      <Typography
        sx={{
          fontFamily: "Vazirmatn",
          textAlign: "center",
          fontSize: "21px",
          fontWeight: "550",
        }}
      >
        ثبت نام
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="studentNumber"
        label="شماره دانشجویی"
        name="studentNumber"
        // autoComplete=""
        autoFocus
        InputProps={{
          sx: { borderRadius: 50 },
          inputMode: "numeric",
          // pattern: "[0-9]*",
        }}
        InputLabelProps={{
          sx: { fontFamily: "vazirmatn" },
        }}
        // helperText={}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="name"
        label="نام"
        type="text"
        id="name"
        autoComplete="current-password"
        InputProps={{ sx: { borderRadius: 50 } }}
        InputLabelProps={{
          sx: { fontFamily: "vazirmatn" },
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="رمزعبور"
        type="password"
        id="password"
        autoComplete="current-password"
        InputProps={{ sx: { borderRadius: 50 } }}
        InputLabelProps={{
          sx: { fontFamily: "vazirmatn" },
        }}
      />
      {/* <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label={
          <Typography fontFamily="Vazirmatn">مرا به خاطر بسپار</Typography>
        }
        sx={{ marginLeft: 1, direction: "rtl" }}
      /> */}
      <button className="button-48">
        <span>ثبت نام</span>
      </button>
    </Box>
  );
}
