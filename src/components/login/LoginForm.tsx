"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useStudentStorage } from "@/storage/storage";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
// import { setCookie } from "cookies-next";
import Cookie from "js-cookie";

import { login } from "@/lib/actions/login.action";

import { fetchData } from "../fetchData";

import "./button.css";

import { apiPath } from "@/constants/index.constants";
import showToast from "@/utils/showToast";
import { CircularProgress } from "@mui/material";
import axios from "axios";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // console.log("token in form", getCookie("token"));

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    let message = null;
    const data = new FormData(event.currentTarget);
    const loginData = {
      id: data.get("studentNumber"),
      password: data.get("password"),
    };
    console.log("loginData", loginData);
    // const result = await login(loginData);
    // console.log("result", result);
    // if (result === "Success") {
    //   router.push(`/Home`);
    // }
    if (loginData.id == "") {
      message = (
        <p style={{ fontFamily: "Vazirmatn" }}>
          لطفا شماره دانشجویی را وارد نمایید
        </p>
      );
      showToast(message, "error", 3000);
      setIsLoading(false);

      return null;
    }
    if (loginData.password == "") {
      message = (
        <p style={{ fontFamily: "Vazirmatn" }}>لطفا رمزعبور را وارد نمایید</p>
      );
      showToast(message, "error", 3000);
      setIsLoading(false);

      return null;
    }
    const res = await axios
      .post(`${apiPath}/login`, loginData)
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
        // console.log("err in login", err.response.data);
        if (err.response.data.detail == "id or password is wrong.") {
          message = (
            <p style={{ fontFamily: "Vazirmatn" }}>
              شماره دانشجویی یا رمزعبور نادرست است
            </p>
          );
          showToast(message, "error", 3000);
        }
      });
    setIsLoading(false);
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
        ورود به حساب کاربری
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
      <Typography
        sx={{
          fontFamily: "Vazirmatn",
          // textAlign: "center",
          fontSize: "16px",
          // fontWeight: "550",
        }}
      >
        حساب کاربری ندارید؟ <Link href="/SignUp">ثبت نام کنید</Link>
      </Typography>
      <button className="button-48">
        {isLoading ? (
          <div className="flex w-full items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <span>ورود</span>
        )}
      </button>
    </Box>
  );
}
