import type { Metadata } from "next";
import { dmSans } from "@/assets/fonts/font";
import "./globals.css";
import ReduxProvider from "@/store/provider";

export const metadata: Metadata = {
  title: "Toneop Eats CRM",
  description: "Toneop Eats CRM",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className={`antialiased`}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
