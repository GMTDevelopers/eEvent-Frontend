import "./globals.css";
import { Open_Sans } from 'next/font/google';
import Navbar from "./navbar/page";
import Footer from "./footer/footer";
import { ModalProvider } from "./(components)/ModalProvider/ModalProvider";
import { AuthProvider } from "./contexts/AuthContext";

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  title: "E-events, The marketplace for all things EVENTS!",
  description: "Compare vendors, chat directly, and book securely. We make event planning simple, transparent & safe.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={openSans.className}>
      <body>
        <AuthProvider>
          <ModalProvider>
            <Navbar />
            {children}
            <Footer />
          </ModalProvider>
        </AuthProvider>  
      </body>
    </html>
  );
}
