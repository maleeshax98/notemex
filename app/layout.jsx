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
  icons: {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    url: '/logo_notemex.png',
  },
};

export const dynamic = "force-dynamic";
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
              <link rel="icon" href="/logo_notemex.png" sizes="any" />
              {children}
            </ThemeContext>
          </QueryContextProvider>
        </AuthProvider>
        <script type="text/javascript" src="https://www.payhere.lk/lib/payhere.js"></script>
      </body>
    </html>
  );
}
