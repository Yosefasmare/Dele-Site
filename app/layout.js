import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import StoreProvider from "./StoreProvider";

export const metadata = {
  title: "Dele-Site",
  description: "find your dream housde",
};


export default function RootLayout({ children }) {

  return (
  <StoreProvider  >
    <html >
      <body >
      <NextTopLoader  showSpinner={false} height={5} />
        {children}
      </body>
    </html>
  </StoreProvider>
  );
}
