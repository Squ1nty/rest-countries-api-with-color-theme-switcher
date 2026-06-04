import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./contextFiles/ThemeContext";
import { HistoryProvider } from "./contextFiles/HistoryContext";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
});


export const metadata: Metadata = {
  title: "Country Selector",
  description: "Frontend Mentor Challenge - REST Countries API with color theme switcher",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>){
  return(
    <html lang="en" className={`${nunitoSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <HistoryProvider>
            {children}
          </HistoryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
