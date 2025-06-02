import type { Metadata } from "next";
import { dmSans } from "@/assets/fonts/font";
import "./globals.css";
import ReduxProvider from "@/store/provider";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Back Link Dashboard",
  description: "Back Link Dashboard",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className={`antialiased `}>
        <ReduxProvider>
          <main>
            {children}
          </main>
          <ToastContainer position="top-right" autoClose={3000} />
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
