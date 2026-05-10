"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  ChevronRight,
  Download,
  Factory,
  FileDown,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";

type Lang = "zh" | "en";

const productGallery = [
  ["AL808", "Process Controller", "/altec/products/AL808.jpg"],
  ["AL810", "Temperature Controller", "/altec/products/AL810.jpg"],
  ["AL830", "Temperature Controller", "/altec/products/AL830.jpg"],
  ["PC900", "Programmable Controller", "/altec/products/PC900.jpg"],
  ["D4", "4-Channel Temperature Controller", "/altec/products/D4.jpg"],
  ["DC220", "Temperature Differential Controller", "/altec/products/DC220.jpg"],
  ["TC818", "Tension Controller", "/altec/products/TC818.jpg"],
  ["TC808", "Tension Controller", "/altec/products/TC808.jpg"],
  ["TC930", "Radius Tension Controller", "/altec/products/TC930.jpg"],
  ["TC950", "Tension Controller", "/altec/products/TC950.jpg"],
  ["TH135", "Humidity Controller", "/altec/products/TH135.jpg"],
  ["TH136", "Humidity Controller", "/altec/products/TH136.jpg"],
  ["MTC35", "Temperature-Humidity Controller", "/altec/products/MTC35.jpg"],
  ["AL210", "Winding Controller", "/altec/products/AL210.jpg"],
  ["pH/ORP800", "pH/ORP Controller", "/altec/products/PH800.jpg"],
  ["CPC316", "Constant Pressure Controller", "/altec/products/CPC316.jpg"],
  ["AL807", "Temperature Controller", "/altec/products/AL807.jpg"],
];

const downloads = [
  ["AL807 Instruction Manual", "174K", "03/29/2006", "http://www.china-altec.com/DownloadFile/AL807_EN.pdf"],
  ["AL808/AL809/AL810/AL830 Manual V6.7", "750K", "05/23/2005", "http://www.china-altec.com/DownloadFile/AL808_V67.pdf"],
  ["AL808 Communication Protocol", "73K", "01/03/2005", "http://www.china-altec.com/DownloadFile/AL808CommsProtocol.pdf"],
  ["PC900 Temperature Controller Manual", "621K", "04/30/2005", "http://www.china-altec.com/DownloadFile/PC900_EN.pdf"],
  ["D4 Temperature Controller Manual", "530K", "07/22/2005", "http://www.china-altec.com/DownloadFile/D4.pdf"],
  ["DC220 Temperature Differential Controller Manual", "881K", "11/06/2006", "http://www.china-altec.com/DownloadFile/DC220_EN.pdf"],
  ["TC808 Tension Controller Manual", "568K", "04/14/2005", "http://www.china-altec.com/DownloadFile/TC808_EN.pdf"],
  ["TC818 Tension Controller Manual V4.00", "614K", "05/20/2009", "http://www.china-altec.com/DownloadFile/TC818_V4_EN.pdf"],
  ["TC930 Radius Tension Controller Manual", "751K", "06/12/2009", "http://www.china-altec.com/DownloadFile/TC930.pdf"],
  ["TC950 Tension Controller Manual", "810K", "05/18/2005", "http://www.china-altec.com/DownloadFile/TC950_EN.pdf"],
  ["SUP Series Tension Sensor Manual", "118K", "07/13/2006", "http://www.china-altec.com/DownloadFile/SUP_LoadCell_EN.pdf"],
  ["HTS Series Tension Sensor Manual", "185K", "06/18/2007", "http://www.china-altec.com/DownloadFile/HTS_Tension_Sensor.pdf"],
  ["TH135 Humidity Controller Manual", "375K", "06/14/2005", "http://www.china-altec.com/DownloadFile/TH135.pdf"],
  ["TH136 Humidity Controller Manual", "348K", "01/03/2005", "http://www.china-altec.com/DownloadFile/TH136_EN.pdf"],
  ["AL210 Winding Controller Manual", "284K", "01/03/2005", "http://www.china-altec.com/DownloadFile/AL210.pdf"],
  ["pH/ORP800 Controller Manual", "429K", "05/21/2007", "http://www.china-altec.com/DownloadFile/PH_ORP800_EN.pdf"],
  ["CPC316 Constant Pressure Controller Manual", "397K", "06/19/2009", "http://www.china-altec.com/DownloadFile/CPC316_EN.pdf"],
  ["AL808 Communication Test Software", "RAR", "Software", "http://www.china-altec.com/DownloadFile/AL808TEST.rar"],
];

const applications = [
  {
    title: "TC808 Applications",
    zhTitle: "TC808 张力控制应用",
    image: "/altec/applications/TC808_Unwind.gif",
    text: "Unwinding and constant tension control for converting lines.",
    zh: "用于放卷和卷材生产线的恒张力控制。",
    href: "http://www.china-altec.com/english/applications/TC808_app.htm",
  },
  {
    title: "TC930 Applications",
    zhTitle: "TC930 卷径张力应用",
    image: "/altec/applications/cut.gif",
    text: "Radius tension control for slitting and cutting processes.",
    zh: "用于分切、裁切工艺的卷径张力控制。",
    href: "http://www.china-altec.com/english/applications/TC930_app.htm",
  },
  {
    title: "TC950 Applications",
    zhTitle: "TC950 收卷张力应用",
    image: "/altec/applications/TC950_Wind.gif",
    text: "Winding tension control for stable material handling.",
    zh: "用于稳定收卷和材料输送的张力控制。",
    href: "http://www.china-altec.com/english/applications/TC950_app.htm",
  },
  {
    title: "TH135 Applications",
    zhTitle: "TH135 干湿球湿度应用",
    image: "/altec/applications/TimberDrying.gif",
    text: "Humidity control for timber drying and environmental chambers.",
    zh: "用于木材干燥和环境试验设备的湿度控制。",
    href: "http://www.china-altec.com/english/applications.htm",
  },
  {
    title: "pH/ORP800 Applications",
    zhTitle: "pH/ORP800 水处理应用",
    image: "/altec/applications/pH_Mix.gif",
    text: "pH and ORP monitoring for mixing and water treatment systems.",
    zh: "用于混合、水处理系统的酸碱度和氧化还原监测。",
    href: "http://www.china-altec.com/english/applications.htm",
  },
];

const copy = {
  zh: {
    nav: ["产品", "应用", "图库", "下载", "联系"],
    consult: "咨询",
    lang: "EN",
    eyebrow: "深圳市亚特克电子有限公司",
    heroTitle: "以精密控制，让产线更稳定。",
    heroText:
      "面向温度、湿度、压力、张力、pH/ORP 与恒压供水的工业过程控制仪表，重新设计为清晰、高端、可浏览的现代官网。",
    primary: "探索产品",
    secondary: "下载资料",
    stats: [["18+", "产品系列"], ["5", "应用场景"], ["2003", "官网始建"]],
    productsTitle: "产品如设备本身一样清晰",
    productsText: "从原站 Gallery 整理的产品矩阵，以更大的留白和更直接的产品视觉展示。",
    appsTitle: "应用板块",
    appsText: "内容来自英文应用页，覆盖张力、卷径、收卷、湿度和 pH/ORP 等典型工业现场。",
    galleryTitle: "产品图库",
    galleryText: "来自原站 Products Gallery 的完整产品图集合。",
    downloadsTitle: "下载中心",
    downloadsText: "内容来自英文下载页，包含说明书、通讯协议、传感器手册和测试软件。",
    downloadAction: "下载",
    capabilityTitle: "高可靠控制，从研发到定制",
    capabilityText:
      "亚特克专注工业自动化智能过程控制仪表，具备独立开发能力，可按行业需求承接专用仪表开发与生产。",
    contactTitle: "联系亚特克",
    contactText: "深圳市宝安区航城街道洲石路739号恒丰工业城C6栋502B号",
    footer: "深圳市亚特克电子有限公司",
  },
  en: {
    nav: ["Products", "Applications", "Gallery", "Downloads", "Contact"],
    consult: "Call",
    lang: "中文",
    eyebrow: "Shenzhen ALTEC Electronics Co., Ltd.",
    heroTitle: "Precision control for calmer production lines.",
    heroText:
      "Industrial process controllers for temperature, humidity, pressure, tension, pH/ORP and constant-pressure water systems, rebuilt as a premium bilingual site.",
    primary: "Explore products",
    secondary: "Downloads",
    stats: [["18+", "Product lines"], ["5", "Applications"], ["2003", "Website since"]],
    productsTitle: "A clearer stage for every controller",
    productsText: "A refined product matrix rebuilt from the original Products Gallery.",
    appsTitle: "Applications",
    appsText: "Sourced from the English applications page: tension, radius, winding, humidity and pH/ORP use cases.",
    galleryTitle: "Products Gallery",
    galleryText: "The complete visual product set from the original Products Gallery.",
    downloadsTitle: "Download Center",
    downloadsText: "Manuals, communication protocols, sensor documents and test software from the English downloads page.",
    downloadAction: "Download",
    capabilityTitle: "Reliable control, from R&D to custom instruments",
    capabilityText:
      "ALTEC focuses on intelligent industrial process controllers and supports custom instrument development for specialized industries.",
    contactTitle: "Contact ALTEC",
    contactText: "4F, Building 6, Tianan Industrial Zone, Nanshan, Shenzhen, China",
    footer: "Shenzhen ALTEC Electronics Co., Ltd.",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("zh");
  const t = copy[lang];
  const localizedDownloads = useMemo(
    () =>
      downloads.map(([title, size, date, href]) => ({
        title: lang === "zh" ? title.replace("Manual", "说明书").replace("Controller", "控制器") : title,
        size,
        date,
        href,
      })),
    [lang],
  );

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/75 backdrop-blur-2xl">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#" className="text-sm font-semibold tracking-tight" aria-label="ALTEC home">
            ALTEC
          </a>
          <nav className="hidden items-center gap-8 text-xs font-medium text-[#424245] md:flex">
            {t.nav.map((item) => (
              <a key={item} href={`#${item}`} className="transition hover:text-black">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLang(lang === "zh" ? "en" : "zh")}
              className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#1d1d1f] px-3 text-xs font-semibold text-white transition hover:bg-black"
              aria-label="Switch language"
            >
              <Globe2 size={14} />
              {t.lang}
            </button>
            <a href="tel:+8675526409070" className="hidden text-xs font-semibold text-[#0066cc] sm:inline">
              {t.consult}
            </a>
          </div>
        </div>
      </header>

      <section className="relative isolate overflow-hidden pt-12">
        <div className="mx-auto flex min-h-[760px] max-w-7xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#6e6e73] shadow-sm">
            <Sparkles size={16} className="text-[#0071e3]" />
            {t.eyebrow}
          </p>
          <h1 className="max-w-5xl text-6xl font-semibold leading-[0.96] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
            {t.heroTitle}
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-8 text-[#6e6e73] sm:text-2xl sm:leading-9">{t.heroText}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={`#${t.nav[0]}`} className="rounded-full bg-[#0071e3] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0077ed]">
              {t.primary}
            </a>
            <a href={`#${t.nav[3]}`} className="inline-flex items-center gap-1 rounded-full px-5 py-3 text-sm font-semibold text-[#0066cc] transition hover:bg-white">
              {t.secondary}
              <ChevronRight size={16} />
            </a>
          </div>
          <div className="relative mt-16 h-[310px] w-full max-w-5xl sm:h-[390px]">
            <Image src="/altec/products/PC900.jpg" alt="PC900" width={520} height={390} priority className="absolute left-1/2 top-0 w-[58%] max-w-[520px] -translate-x-1/2 drop-shadow-2xl" />
            <Image src="/altec/products/TC818.jpg" alt="TC818" width={280} height={210} className="absolute bottom-2 left-[5%] w-[30%] max-w-[280px] drop-shadow-xl" />
            <Image src="/altec/products/PH800.jpg" alt="pH/ORP800" width={260} height={195} className="absolute bottom-0 right-[7%] w-[28%] max-w-[260px] drop-shadow-xl" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-3 gap-px overflow-hidden rounded-[28px] bg-black/10 text-center">
        {t.stats.map(([value, label]) => (
          <div key={label} className="bg-white px-4 py-8">
            <div className="text-4xl font-semibold tracking-tight">{value}</div>
            <div className="mt-2 text-sm text-[#6e6e73]">{label}</div>
          </div>
        ))}
      </section>

      <section id={t.nav[0]} className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <SectionIntro title={t.productsTitle} text={t.productsText} />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {productGallery.slice(0, 6).map(([model, type, image]) => (
            <article key={model} className="group overflow-hidden rounded-[32px] bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative aspect-[1.25]">
                <Image src={image} alt={model} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-contain transition duration-500 group-hover:scale-105" />
              </div>
              <h3 className="mt-8 text-3xl font-semibold tracking-tight">{model}</h3>
              <p className="mt-2 text-[#6e6e73]">{type}</p>
            </article>
          ))}
        </div>
      </section>

      <section id={t.nav[1]} className="bg-[#111113] px-5 py-24 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro title={t.appsTitle} text={t.appsText} dark />
          <div className="mt-12 grid gap-5 lg:grid-cols-5">
            {applications.map((app) => (
              <a key={app.title} href={app.href} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-[28px] bg-[#1d1d20]">
                <div className="relative aspect-[1.15] bg-white">
                  <Image src={app.image} alt={app.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold tracking-tight">{lang === "zh" ? app.zhTitle : app.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/60">{lang === "zh" ? app.zh : app.text}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id={t.nav[2]} className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <SectionIntro title={t.galleryTitle} text={t.galleryText} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {productGallery.map(([model, type, image]) => (
            <article key={model} className="rounded-[26px] bg-white p-6 text-center shadow-sm">
              <div className="relative mx-auto aspect-square max-w-[220px]">
                <Image src={image} alt={model} fill sizes="25vw" className="object-contain" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{model}</h3>
              <p className="mt-1 text-sm text-[#6e6e73]">{type}</p>
            </article>
          ))}
        </div>
      </section>

      <section id={t.nav[3]} className="bg-white px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro title={t.downloadsTitle} text={t.downloadsText} />
          <div className="mt-12 overflow-hidden rounded-[30px] border border-black/10">
            {localizedDownloads.map((item) => (
              <a key={`${item.title}-${item.href}`} href={item.href} target="_blank" rel="noreferrer" className="grid gap-3 border-b border-black/10 px-6 py-5 transition last:border-b-0 hover:bg-[#f5f5f7] md:grid-cols-[1fr_110px_130px_96px] md:items-center">
                <div className="flex items-center gap-3 font-semibold">
                  <FileDown size={19} className="text-[#0071e3]" />
                  {item.title}
                </div>
                <span className="text-sm text-[#6e6e73]">{item.size}</span>
                <span className="text-sm text-[#6e6e73]">{item.date}</span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#0066cc]">
                  {t.downloadAction}
                  <Download size={15} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[36px] bg-[#1d1d1f] p-10 text-white sm:p-14">
            <BookOpen size={34} className="text-[#2997ff]" />
            <h2 className="mt-10 max-w-2xl text-5xl font-semibold tracking-[-0.035em]">{t.capabilityTitle}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/66">{t.capabilityText}</p>
          </div>
          <div className="grid gap-6">
            {[
              lang === "zh" ? "PID 自整定与通用输入" : "PID auto-tuning and universal inputs",
              lang === "zh" ? "RS232/485 通讯可选" : "Optional RS232/485 communication",
              lang === "zh" ? "支持行业专用仪表定制" : "Custom instruments for specialized industries",
            ].map((item) => (
              <div key={item} className="flex items-center gap-4 rounded-[28px] bg-white p-7 text-lg font-semibold shadow-sm">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e8f2ff] text-[#0071e3]">
                  <Check size={18} />
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id={t.nav[4]} className="border-t border-black/10 bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <Factory size={34} className="text-[#0071e3]" />
            <h2 className="mt-6 text-5xl font-semibold tracking-[-0.035em]">{t.contactTitle}</h2>
            <p className="mt-5 text-lg leading-8 text-[#6e6e73]">{t.contactText}</p>
          </div>
          <div className="grid gap-4">
            <Info icon={MapPin} text={lang === "zh" ? "深圳市宝安区航城街道洲石路739号恒丰工业城C6栋502B号" : "Shenzhen, China"} />
            <Info icon={Phone} text="+86 0755 26409070 / 26416767" />
            <div className="flex items-center gap-4 rounded-3xl bg-[#f5f5f7] p-6">
              <Mail className="text-[#0071e3]" size={22} />
              <Image src="/altec/legacy/e_m_a_i_l.png" alt="ALTEC email" width={112} height={18} />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#f5f5f7] px-5 py-8 text-xs text-[#6e6e73] sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 md:flex-row">
          <span>{t.footer}</span>
          <a href="https://beian.miit.gov.cn/" className="hover:text-[#1d1d1f]">粤ICP备13003237号</a>
        </div>
      </footer>
    </main>
  );
}

function SectionIntro({ title, text, dark = false }: { title: string; text: string; dark?: boolean }) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <h2 className={`text-5xl font-semibold tracking-[-0.04em] sm:text-6xl ${dark ? "text-white" : "text-[#1d1d1f]"}`}>
        {title}
      </h2>
      <p className={`mt-5 text-xl leading-8 ${dark ? "text-white/62" : "text-[#6e6e73]"}`}>{text}</p>
    </div>
  );
}

function Info({ icon: Icon, text }: { icon: typeof MapPin; text: string }) {
  return (
    <div className="flex items-center gap-4 rounded-3xl bg-[#f5f5f7] p-6">
      <Icon className="text-[#0071e3]" size={22} />
      <span className="font-semibold">{text}</span>
    </div>
  );
}
