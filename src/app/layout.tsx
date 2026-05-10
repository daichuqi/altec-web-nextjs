import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { company, siteUrl } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: company.brand,
  title: {
    default: "ALTEC 亚特克 | 工业自动化过程控制仪表厂家",
    template: "%s",
  },
  description:
    "深圳市亚特克电子有限公司专注工业自动化智能过程控制仪表，提供温度控制器、张力控制器、pH/ORP 控制器、恒压供水控制器和温湿度控制器。",
  keywords: [
    "ALTEC",
    "亚特克",
    "深圳市亚特克电子有限公司",
    "工业自动化",
    "过程控制仪表",
    "温度控制器",
    "张力控制器",
    "pH ORP 控制器",
    "恒压供水控制器",
    "温湿度控制器",
  ],
  authors: [{ name: company.name }],
  creator: company.name,
  publisher: company.name,
  category: "industrial automation",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: company.brand,
    locale: "zh_CN",
    alternateLocale: ["en_US"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
