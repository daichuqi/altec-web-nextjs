import Image from "next/image";
import {
  ArrowUpRight,
  BadgeCheck,
  CircuitBoard,
  Factory,
  Gauge,
  Mail,
  MapPin,
  Phone,
  Settings2,
  ShieldCheck,
  Zap,
} from "lucide-react";

const navItems = ["产品", "应用", "能力", "联系"];

const products = [
  {
    name: "AL808 工业调节器",
    image: "/altec/products/AL808.jpg",
    category: "温度 / 过程控制",
    points: ["PID 自整定", "通用输入", "RS232/485 可选"],
  },
  {
    name: "PC900 可编程控制器",
    image: "/altec/products/PC900.jpg",
    category: "10x16 段曲线程序",
    points: ["时间温度曲线", "多种输出", "事件输出可选"],
  },
  {
    name: "TC818 张力控制器",
    image: "/altec/products/TC818.jpg",
    category: "印刷 / 纸品张力",
    points: ["卷材张力控制", "高亮显示", "行业专用参数"],
  },
  {
    name: "PH800 pH/ORP 控制器",
    image: "/altec/products/PH800.jpg",
    category: "环保水处理",
    points: ["酸碱度控制", "氧化还原控制", "过程监测"],
  },
  {
    name: "TH136 湿度控制器",
    image: "/altec/products/TH136.jpg",
    category: "环境试验设备",
    points: ["湿度测控", "稳定调节", "清晰界面"],
  },
  {
    name: "CPC316 恒压供水控制器",
    image: "/altec/products/CPC316.jpg",
    category: "泵群压力控制",
    points: ["变频恒压", "楼宇节能", "压力闭环"],
  },
];

const applications = [
  "电炉与热处理温度控制",
  "包装机械与塑料挤出",
  "纸品、印刷、凹版印刷张力控制",
  "环境试验设备温湿度控制",
  "水处理 pH/ORP 过程控制",
  "中央空调与变频供水节能改造",
];

const capabilities = [
  {
    icon: CircuitBoard,
    title: "自主研发",
    text: "面向工业自动化过程控制的硬件、算法与应用经验沉淀。",
  },
  {
    icon: Settings2,
    title: "定制仪表",
    text: "可按行业需求承接特型仪表开发、生产与参数适配。",
  },
  {
    icon: ShieldCheck,
    title: "可靠服务",
    text: "坚持质量第一、服务至上，为用户提供稳定产品与支持。",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f5ef] text-[#17201d]">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f6f5ef]/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#" className="flex items-center gap-3" aria-label="ALTEC 首页">
            <span className="grid size-10 place-items-center bg-[#163f36] text-sm font-black tracking-wide text-white">
              AT
            </span>
            <span>
              <span className="block text-lg font-bold leading-5">ALTEC 亚特克</span>
              <span className="block text-xs text-[#53605b]">Industrial Process Controllers</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-[#40504a] md:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item}`} className="transition hover:text-[#006c68]">
                {item}
              </a>
            ))}
          </nav>
          <a
            href="tel:+8675526409070"
            className="inline-flex h-10 items-center gap-2 bg-[#c84b31] px-4 text-sm font-semibold text-white transition hover:bg-[#a93d27]"
          >
            <Phone size={16} />
            咨询
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-black/10">
        <div className="absolute inset-y-0 right-0 hidden w-[48%] overflow-hidden bg-[#dde8e2] lg:block">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(246,245,239,0.9),rgba(0,108,104,0.18)_48%,rgba(200,75,49,0.2))]" />
          <div className="absolute right-10 top-16 h-[520px] w-[520px] border border-[#163f36]/15" />
          <Image
            src="/altec/products/PC900.jpg"
            alt="PC900 可编程控制器"
            width={360}
            height={270}
            priority
            className="absolute right-24 top-28 h-auto w-[360px] object-contain drop-shadow-2xl"
          />
          <Image
            src="/altec/products/TC818.jpg"
            alt="TC818 张力控制器"
            width={240}
            height={180}
            className="absolute bottom-28 right-14 h-auto w-[240px] object-contain drop-shadow-xl"
          />
          <Image
            src="/altec/products/PH800.jpg"
            alt="PH800 pH/ORP 控制器"
            width={210}
            height={158}
            className="absolute bottom-20 left-16 h-auto w-[210px] object-contain drop-shadow-xl"
          />
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#f6f5ef] to-transparent" />
        </div>
        <div className="mx-auto grid min-h-[680px] max-w-7xl content-center px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 border border-[#006c68]/25 bg-white/60 px-3 py-2 text-sm font-semibold text-[#006c68]">
              <BadgeCheck size={16} />
              深圳市亚特克电子有限公司
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.05] text-[#13241f] sm:text-6xl lg:text-7xl">
              精密工业过程控制仪表
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#41514c]">
              专业从事工业自动化智能过程控制仪表的研究开发、生产与应用，覆盖温度、湿度、压力、张力、线速度、pH/ORP、称重配料等测控场景。
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#产品"
                className="inline-flex h-12 items-center justify-center gap-2 bg-[#163f36] px-6 font-semibold text-white transition hover:bg-[#0e2d27]"
              >
                查看产品
                <ArrowUpRight size={18} />
              </a>
              <a
                href="#联系"
                className="inline-flex h-12 items-center justify-center border border-[#163f36]/25 px-6 font-semibold text-[#163f36] transition hover:bg-white"
              >
                获取方案建议
              </a>
            </div>
            <div className="mt-12 grid max-w-2xl grid-cols-3 border-y border-black/10">
              {[
                ["2003", "官网始建"],
                ["18+", "产品系列"],
                ["6", "主要行业"],
              ].map(([value, label]) => (
                <div key={label} className="py-5 pr-4">
                  <div className="text-3xl font-black text-[#c84b31]">{value}</div>
                  <div className="mt-1 text-sm text-[#5a6762]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="产品" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#006c68]">Product Lines</p>
            <h2 className="mt-3 text-4xl font-black text-[#13241f]">核心产品矩阵</h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-[#53605b]">
            从原站产品总览整理：AL807/AL808/AL810/AL830、PC900、D4、TC808/TC818/TC930/TC950、TH135/TH136、MTC35、AL210、pH/ORP800、CPC316 等。
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.name}
              className="group bg-white p-5 shadow-sm ring-1 ring-black/8 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#eef0eb]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-6 transition group-hover:scale-105"
                />
              </div>
              <p className="mt-5 text-sm font-semibold text-[#c84b31]">{product.category}</p>
              <h3 className="mt-2 text-xl font-black text-[#17201d]">{product.name}</h3>
              <ul className="mt-4 space-y-2 text-sm text-[#53605b]">
                {product.points.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <span className="size-1.5 bg-[#006c68]" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="应用" className="bg-[#13241f] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Factory className="mb-6 text-[#f0c45c]" size={42} />
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#f0c45c]">Applications</p>
            <h2 className="mt-3 text-4xl font-black">面向真实产线的控制方案</h2>
            <p className="mt-5 leading-8 text-white/72">
              原站应用资料覆盖基础知识、工业过程控制常用概念、PID、温湿度测量，以及多类控制器的典型应用。
            </p>
          </div>
          <div className="grid gap-px overflow-hidden bg-white/12 sm:grid-cols-2">
            {applications.map((item, index) => (
              <div key={item} className="bg-[#13241f] p-6">
                <div className="mb-8 text-sm font-bold text-[#f0c45c]">{String(index + 1).padStart(2, "0")}</div>
                <h3 className="text-xl font-bold">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="能力" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#006c68]">Capabilities</p>
            <h2 className="mt-3 text-4xl font-black text-[#13241f]">研发、生产、定制一体化</h2>
            <p className="mt-5 leading-8 text-[#53605b]">
              亚特克拥有独立产品开发能力，产品定位为高性价比工业控制仪表，并可承接行业专用仪表定制。
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, text }) => (
              <div key={title} className="border border-black/10 bg-white p-6">
                <Icon className="text-[#006c68]" size={32} />
                <h3 className="mt-8 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#53605b]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="联系" className="border-t border-black/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#c84b31]">Contact</p>
            <h2 className="mt-3 text-4xl font-black text-[#13241f]">联系亚特克</h2>
            <p className="mt-5 max-w-xl leading-8 text-[#53605b]">
              地址、电话、传真和备案信息来自原官网。邮箱原站以图片展示，已保留为可视化信息来源。
            </p>
          </div>
          <div className="grid gap-4 text-[#17201d]">
            <div className="flex gap-4 border border-black/10 p-5">
              <MapPin className="mt-1 shrink-0 text-[#006c68]" size={22} />
              <div>
                <div className="font-bold">深圳市宝安区航城街道洲石路739号恒丰工业城C6栋502B号</div>
                <div className="mt-1 text-sm text-[#53605b]">邮编：518054</div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <a href="tel:+8675526409070" className="flex gap-4 border border-black/10 p-5 transition hover:bg-[#f6f5ef]">
                <Phone className="text-[#006c68]" size={22} />
                <span>0755-26409070</span>
              </a>
              <div className="flex gap-4 border border-black/10 p-5">
                <Gauge className="text-[#006c68]" size={22} />
                <span>传真：0755-26416767</span>
              </div>
            </div>
            <div className="flex items-center gap-4 border border-black/10 p-5">
              <Mail className="text-[#006c68]" size={22} />
              <Image src="/altec/legacy/e_m_a_i_l.png" alt="ALTEC email" width={112} height={18} />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#0d1714] px-5 py-8 text-sm text-white/70 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>Copyright © 深圳市亚特克电子有限公司 (2003-2019)</div>
          <a href="https://beian.miit.gov.cn/" className="inline-flex items-center gap-2 hover:text-white">
            <Zap size={15} />
            粤ICP备13003237号
          </a>
        </div>
      </footer>
    </main>
  );
}
