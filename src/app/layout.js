import { Noto_Sans_KR } from 'next/font/google';
import '../assets/css/styles.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const notoSans = Noto_Sans_KR({ subsets: ['latin'], variable: '--font-noto', weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });

export const metadata = {
  generator: 'Next.js',
  title: 'FC 온라인 검색 사이트 - FC.GG',
  description: 'FC 온라인 검색 사이트',
  keywords: ['FC Online, FC 온라인, FIFA Online, FIFA 온라인, 피파 온라인'],
  authors: [{ name: 'Yun' }],
  creator: [{ name: 'Yun' }],
  publisher: [{ name: 'Yun' }],
  formatDetection: {
    email: 'fcgg@outlook.kr',
  },
  icons: {
    icon: 'favicon.svg',
  },
  metadataBase: new URL('https://fconline.vercel.app/'),
  images:'https://fconline.vercel.app/image/meta/meta.jpg',
  openGraph: {
    title: 'FC 온라인 검색 사이트 - FC.GG',
    description: 'FC 온라인 검색 사이트',
    url: 'https://fconline.vercel.app/r',
    siteName: 'FC.GG',
    images:'https://fconline.vercel.app/image/meta/meta.jpg',
    locale: 'ko_KR',
    type: 'website',
    type: 'article',
    publishedTime: '2024-03-31T00:00:00.000Z',
    authors: ['Yun'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    Yeti: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FC 온라인 검색 사이트 - FC.GG',
    description: 'FC 온라인 검색 사이트',
    images: [
      'https://fconline.vercel.app/image/meta/meta.jpg',
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={notoSans.className}>
        <div className="wrap">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
