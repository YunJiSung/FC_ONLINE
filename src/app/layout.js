import { Noto_Sans_KR } from "next/font/google";
import '../assets/css/styles.css'
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const notoSans = Noto_Sans_KR({ subsets: ["latin"], variable: '--font-noto', weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });

export const metadata = {
  title: "FC 온라인 검색 사이트 - FC.GG",
  description: "FC 온라인 검색 사이트",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={notoSans.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
