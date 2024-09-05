"use client";

import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";

import "@/components/login/button.css";

import { useRouter } from "next/navigation";

export default function Home() {
  const defaultTheme = createTheme();
  const router = useRouter();

  return (
    <div className="absolute h-full w-full bg-[url('/assets/nit-map.png')] bg-cover">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src="/assets/logo.png" />
            <Typography
              component="h1"
              variant="h5"
              sx={{
                margin: "20px",
                fontFamily: "Vazirmatn",
                fontSize: "21px",
                fontWeight: "550",
                color: "white",
              }}
            >
              سامانه هوشمند انتخاب واحد
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                gap: 2,
              }}
            >
              <button
                className="button-48"
                onClick={() => router.push("/SignUp")}
              >
                <span>ثبت نام</span>
              </button>
              <button
                className="button-48"
                onClick={() => router.push("/Login")}
              >
                <span>ورود</span>
              </button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
