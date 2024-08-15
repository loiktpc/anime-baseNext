"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "../components/ThemeProvider";
import "./index.scss";
import { Inter as FontSans } from "next/font/google";
import Header from "./components/header";
import Footer from "./components/footer";
// import { useEffect, useState, useRef } from "react";
// import { IntlProvider } from "react-intl";
// import { LOCALES } from "./language/type";
// import { messages } from "./language/message";
// import { useAppDispatch } from "./store/store";
// import { setLanguae } from "./language/languageSlice";
// import { useAppSelector } from "./store/store";
import ReduxProvider from "./store/redux-provider";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <ReduxProvider>
                <body
                    suppressHydrationWarning={true}
                    className={cn(
                        "min-h-screen bg-background font-sans antialiased",
                        fontSans.variable
                    )}
                >
                    <Header />
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <main>{children}</main>
                    </ThemeProvider>
                    <Footer />
                </body>
            </ReduxProvider>
        </html>
    );
}
