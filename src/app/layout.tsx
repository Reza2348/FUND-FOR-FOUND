import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import RTLHandler from "@/components/RTLHandler/RTLHandler";
import { I18nProvider } from "@/components/I18nProvider/I18nProvider";
import { vazirmatnLocal } from "../fonts/vazirmatn";
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatnLocal.className} antialiased`}>
        <ThemeProvider>
          <I18nProvider>
            <RTLHandler />
            <ReactQueryProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </ReactQueryProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
