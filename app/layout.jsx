import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import BottemNav from "@/components/BottemNav/BottemNav";
import ThemeContext from "@/Context/ThemeContext/ThemeContext";
import AuthProvider from "@/Context/AuthContext/AuthContext";
import ToasterContext from "@/Context/ToastContext/ToastContext";
import QueryContextProvider from "@/Context/QueryContext/QueryContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NoteMe X",
  description: "Share your educational notes and skills with others..",
};

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <QueryContextProvider>
            <ThemeContext>
              <ToasterContext />
              <Navbar />
              <BottemNav />
              {children}
            </ThemeContext>
          </QueryContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
