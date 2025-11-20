// src/app/layout.tsx

import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import RTLHandler from "@/components/RTLHandler/RTLHandler";
import { I18nProvider } from "@/components/I18nProvider/I18nProvider";

// ۱. وارد کردن (Import) فونت وزیرمتن
import { vazirmatnLocal } from "../fonts/vazirmatn"; // مطمئن شوید آدرس نسبی صحیح است

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // ۲. افزودن dir="rtl" به تگ <html> برای مدیریت RTL توسط مرورگر
    <html lang="fa" dir="rtl">
      {/* ۳. اعمال کلاس فونت به body */}
      <body className={`${vazirmatnLocal.className} antialiased`}>
        <I18nProvider>
          {/* RTLHandler می‌تواند direction: rtl را به صورت جاوااسکریپتی هندل کند، 
              اما افزودن dir="rtl" به <html> بهترین روش CSS پایه است. 
          */}
          <RTLHandler />
          <ReactQueryProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </ReactQueryProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
