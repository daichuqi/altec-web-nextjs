export const locales = ["zh", "en"] as const;

export type Lang = (typeof locales)[number];
export type LocalizedText = Record<Lang, string>;

export const defaultLocale: Lang = "zh";

export const languages: Record<
  Lang,
  {
    label: string;
    switchLabel: string;
    base: string;
    other: Lang;
    htmlLang: string;
    ogLocale: string;
  }
> = {
  zh: { label: "中文", switchLabel: "English", base: "", other: "en", htmlLang: "zh-CN", ogLocale: "zh_CN" },
  en: { label: "English", switchLabel: "中文", base: "/en", other: "zh", htmlLang: "en-US", ogLocale: "en_US" },
};

export function isZh(lang: Lang) {
  return lang === "zh";
}

export function localizedPath(lang: Lang, href: string) {
  return `${languages[lang].base}${href === "/" ? "" : href}` || "/";
}

export function switchLocalePath(lang: Lang, pathname: string) {
  if (lang === "zh") {
    return `/en${pathname === "/" ? "" : pathname}`;
  }

  return pathname.replace(/^\/en(?=\/|$)/, "") || "/";
}

export function pick<T>(value: Record<Lang, T>, lang: Lang) {
  return value[lang];
}

export const navItems = [
  { key: "about", href: "/about", label: { zh: "公司简介", en: "About" } },
  { key: "products", href: "/products", label: { zh: "产品中心", en: "Products" } },
  { key: "applications", href: "/applications", label: { zh: "应用方案", en: "Applications" } },
  { key: "downloads", href: "/downloads", label: { zh: "下载中心", en: "Downloads" } },
  { key: "contact", href: "/contact", label: { zh: "联系我们", en: "Contact" } },
] as const;

export const categoryDescriptions: Record<string, LocalizedText> = {
  "Temperature & Process Control": {
    zh: "用于温度、压力、流量、液位和中央空调节能等工业过程测控场景。",
    en: "PID and SCR controllers for temperature, pressure, flow, level and HVAC energy-saving control.",
  },
  "Tension & Winding Control": {
    zh: "面向纸品、印刷、包装、复合和卷绕设备的张力与同步控制。",
    en: "Controllers for web tension, speed synchronization, unwinding and winding on printing, packaging and laminating lines.",
  },
  "Tension Sensors": {
    zh: "配套张力控制系统使用的轴承式、微位移和应变片式张力检测元件。",
    en: "Bearing-type, micro-displacement and strain-gauge load cells for closed-loop tension control systems.",
  },
  "Environment, Pressure & Water Treatment": {
    zh: "覆盖温湿度、pH/ORP、恒压供水、传感器和水处理相关控制。",
    en: "Humidity, pH/ORP and constant-pressure water-supply controllers for environmental equipment and water treatment.",
  },
};

export const ui = {
  header: {
    contactSales: { zh: "联系销售", en: "Contact sales" },
  },
  footer: {
    summary: {
      zh: "深圳市亚特克电子有限公司，专注工业自动化智能过程控制仪表。",
      en: "Shenzhen ALTEC Electronics Co., Ltd. Industrial process controllers for OEMs, panel builders and maintenance teams.",
    },
    address: {
      zh: "深圳市宝安区航城街道洲石路739号恒丰工业城C6栋502B号",
      en: "Shenzhen, China",
    },
  },
  themeToggle: {
    ariaLabel: { zh: "切换深色或浅色模式", en: "Toggle dark or light mode" },
  },
  home: {
    eyebrow: { zh: "工业自动化智能过程控制仪表", en: "Industrial Automation Process Instruments" },
    title: { zh: "为工业现场提供稳定可靠的测控仪表", en: "Industrial Controllers for Temperature, Tension and Water Treatment" },
    intro: {
      zh: "亚特克专注工业自动化智能过程控制仪表的研发、生产与应用，长期服务电炉、环境试验、印刷张力、环保水处理、中央空调节能和变频供水等行业。产品覆盖温度、湿度、压力、张力、pH/ORP、称重配料等精确测控场景，并可承接行业专用仪表定制。",
      en: "ALTEC manufactures industrial process controllers for electric furnaces, environmental test equipment, printing and converting tension systems, pH/ORP water treatment, HVAC energy-saving projects and VFD constant-pressure water supply. Product lines cover temperature, humidity, pressure, tension and pH/ORP control, with manuals and model details available for engineering selection.",
    },
    ctaProducts: { zh: "进入产品中心", en: "View products" },
    ctaDownloads: { zh: "下载资料", en: "Download documents" },
    popularEyebrow: { zh: "热销型号", en: "Popular Models" },
    popularTitle: { zh: "常用控制器快速入口", en: "Fast Access to Key Controllers" },
    allProducts: { zh: "全部产品", en: "All products" },
    stats: [
      {
        title: { zh: "在售产品型号", en: "active product models" },
        text: { zh: "按过程控制、张力卷绕、环境水处理分类。", en: "Grouped by process, tension/winding, environment and water treatment." },
      },
      {
        title: { zh: "工程选型导向", en: "Engineering oriented" },
        text: { zh: "减少营销长页，保留明确入口和资料。", en: "Model pages focus on applications, inputs, outputs, specifications and related manuals." },
      },
      {
        title: { zh: "资料集中提供", en: "Document Library" },
        text: { zh: "常用说明书、通讯协议、传感器资料与软件集中整理，便于选型和维护。", en: "Manuals, protocols, sensor documents and software are organized for selection and maintenance." },
      },
    ],
    cards: [
      { href: "/about", title: { zh: "公司简介", en: "About" }, text: { zh: "了解亚特克的研发、生产与服务能力。", en: "Learn about ALTEC's R&D, production and service capability." } },
      { href: "/products", title: { zh: "产品中心", en: "Products" }, text: { zh: "按类别查看控制器产品。", en: "Compare controller models by category, function and key specifications." } },
      { href: "/applications", title: { zh: "应用方案", en: "Applications" }, text: { zh: "查看典型工业场景。", en: "Review typical wiring, measurement and control use cases." } },
      { href: "/downloads", title: { zh: "下载中心", en: "Downloads" }, text: { zh: "获取说明书、协议和软件。", en: "Download manuals, communication protocols and software utilities." } },
    ],
  },
  pages: {
    about: {
      eyebrow: { zh: "About ALTEC", en: "About ALTEC" },
      title: { zh: "公司简介", en: "About ALTEC" },
      text: {
        zh: "亚特克专注工业控制仪表研发、生产与服务，为温度、张力、pH/ORP、恒压供水等工业现场提供稳定可靠的控制产品。",
        en: "ALTEC develops and manufactures industrial controllers for temperature, tension, pH/ORP, constant-pressure water supply and related process-control applications.",
      },
      highlights: { zh: "核心能力", en: "Highlights" },
    },
    products: {
      eyebrow: { zh: "Products", en: "Products" },
      title: { zh: "产品中心", en: "Product Center" },
      text: {
        zh: "覆盖温度、张力、pH/ORP、恒压供水等控制器系列，便于按型号、用途和规格快速完成选型。",
        en: "Find ALTEC controller models for temperature, tension, pH/ORP, humidity and constant-pressure water supply. Filter by model, application and key specifications.",
      },
    },
    applications: {
      eyebrow: { zh: "Applications", en: "Applications" },
      title: { zh: "应用方案与基础知识", en: "Applications and Knowledge Base" },
      text: {
        zh: "控制基础、测量知识和典型应用资料集中整理，便于选型、接线与现场调试。",
        en: "Reference pages for control principles, measurement methods, wiring examples and common industrial applications.",
      },
      readDetails: { zh: "查看详情", en: "Read details" },
      back: { zh: "返回应用方案", en: "Back to applications" },
      technicalNote: { zh: "Technical Note", en: "Technical Note" },
      details: { zh: "详细内容", en: "Details" },
      relatedProducts: { zh: "相关产品", en: "Related Products" },
      relatedNotes: { zh: "同类资料", en: "Related Notes" },
    },
    downloads: {
      eyebrow: { zh: "Downloads", en: "Downloads" },
      title: { zh: "下载中心", en: "Download Center" },
      text: {
        zh: "常用说明书、通讯协议、传感器资料与软件集中提供，可按型号快速查找。",
        en: "Product manuals, communication protocols, sensor documents and software utilities are organized for quick lookup by model.",
      },
      groupedTitle: { zh: "技术资料库", en: "Technical Document Library" },
      emptyGroup: { zh: "该分类暂无在线文件，请联系我们确认资料。", en: "No online file in this category yet. Contact ALTEC to confirm availability." },
      categories: {
        manual: { zh: "Manual", en: "Manual" },
        datasheet: { zh: "Datasheet", en: "Datasheet" },
        software: { zh: "Software", en: "Software" },
        wiring: { zh: "Wiring Diagram", en: "Wiring Diagram" },
        selection: { zh: "Model Selection Guide", en: "Model Selection Guide" },
      },
      columns: {
        file: { zh: "文件", en: "File" },
        type: { zh: "类型", en: "Type" },
        size: { zh: "大小", en: "Size" },
        date: { zh: "日期", en: "Date" },
      },
    },
    contact: {
      eyebrow: { zh: "Contact", en: "Contact" },
      title: { zh: "联系我们", en: "Contact Us" },
      text: { zh: "如需产品选型、资料确认或定制仪表，请联系亚特克。", en: "Contact ALTEC for model selection, manual confirmation, replacement suggestions or custom controller requirements." },
      companyName: { zh: "深圳市亚特克电子有限公司", en: "Shenzhen ALTEC Electronics Co., Ltd." },
      address: { zh: "地址：深圳市宝安区航城街道洲石路739号恒丰工业城C6栋502B号", en: "Address: Shenzhen, China" },
      phone: { zh: "电话：0755-26409070 / 26416767 / 13802580359", en: "Tel: +86 0755 26409070 / 26416767" },
      mobile: { zh: "手机 / 微信：+86 138 0258 0359", en: "Mobile / WhatsApp / WeChat: +86 138 0258 0359" },
      fax: { zh: "传真：0755-26416767", en: "Fax: +86 0755 26416767" },
      hoursLabel: { zh: "工作时间：", en: "Business hours: " },
      emailLabel: { zh: "邮箱：", en: "Email: " },
      supportTitle: { zh: "资料与支持", en: "Documents & Support" },
      supportText: {
        zh: "产品说明书和软件请直接前往下载中心获取，所有可用文件均由本站直接提供。",
        en: "Manuals and software are available directly from the Download Center and hosted by this site.",
      },
      internationalTitle: { zh: "国际采购支持", en: "International Purchasing Support" },
      internationalText: {
        zh: "可协助确认英文资料、型号替换、批量采购和特殊输入/输出需求。",
        en: "English documentation, model replacement checks, bulk purchasing and input/output requirement confirmation are available for overseas buyers and engineers.",
      },
      goDownloads: { zh: "前往下载中心", en: "Go to downloads" },
    },
  },
  product: {
    back: { zh: "返回产品中心", en: "Back to products" },
    archivedNotice: {
      zh: "该型号已归档，页面保留用于历史资料查询。新项目选型请联系我们确认替代型号。",
      en: "This model is archived and retained for legacy reference. Contact us to confirm the recommended replacement for new projects.",
    },
    viewDownloads: { zh: "下载说明书", en: "Request datasheet" },
    askSelection: { zh: "联系工程师", en: "Contact engineer" },
    askReplacement: { zh: "确认替代型号", en: "Confirm replacement" },
    buyingInfoTitle: { zh: "采购判断信息", en: "Purchasing Fit Check" },
    buyingInfoText: { zh: "用于快速确认型号、应用场景和主要输入/输出是否匹配。", en: "Use this section to quickly check model fit, application area and key input/output requirements." },
    buyingFields: {
      model: { zh: "型号", en: "Model" },
      productType: { zh: "产品类型", en: "Product type" },
      applications: { zh: "典型应用", en: "Typical applications" },
      input: { zh: "输入", en: "Input" },
      output: { zh: "输出", en: "Output" },
      control: { zh: "控制方式", en: "Control mode" },
      documents: { zh: "资料", en: "Documents" },
      inquiry: { zh: "询价", en: "Inquiry" },
    },
    manualAvailable: { zh: "相关说明书可在线下载", en: "Related manual available online" },
    manualCheckRequired: { zh: "请联系确认对应资料", en: "Contact ALTEC to confirm the matching document" },
    getQuote: { zh: "获取报价", en: "Get quotation" },
    contactEngineer: { zh: "联系工程师", en: "Contact engineer" },
    highlights: { zh: "产品特点", en: "Highlights" },
    specs: { zh: "关键规格", en: "Key Specifications" },
    technicalEyebrow: { zh: "Technical Detail", en: "Technical Detail" },
    technicalDetails: { zh: "完整技术资料", en: "Technical Details" },
    relatedDownloads: { zh: "相关下载", en: "Related Downloads" },
    noDownloads: { zh: "暂无单独匹配资料，请前往下载中心查看完整资料库。", en: "No directly matched document yet. Visit the download center for the full library." },
    relatedProducts: { zh: "同类产品", en: "Related Products" },
  },
  productBrowser: {
    searchLabel: { zh: "搜索产品", en: "Search products" },
    searchPlaceholder: {
      zh: "搜索型号、产品名称或规格关键词，例如 AL808、张力、RS485",
      en: "Search model, product name or spec, e.g. AL808, tension, RS485",
    },
    clearSearch: { zh: "清除搜索", en: "Clear search" },
    allCategories: { zh: "全部分类", en: "All categories" },
    allSignals: { zh: "全部信号/控制", en: "All signals / controls" },
    allApplications: { zh: "全部应用", en: "All applications" },
    allSeries: { zh: "全部系列", en: "All series" },
    categoryFilter: { zh: "产品分类", en: "Product category" },
    signalFilter: { zh: "信号/控制", en: "Signal / control" },
    applicationFilter: { zh: "应用场景", en: "Application" },
    seriesFilter: { zh: "型号系列", en: "Model series" },
    modelsSuffix: { zh: "个型号", en: "models" },
    allProducts: { zh: "全部产品", en: "All" },
    noResultsTitle: { zh: "没有找到匹配产品", en: "No matching products" },
    noResultsText: { zh: "可以换一个型号、应用词或规格关键词再试。", en: "Try another model, application term or specification keyword." },
    categoryPrefix: { zh: "分类", en: "Category" },
    viewDetails: { zh: "查看产品详情", en: "View details" },
  },
  seo: {
    siteName: { zh: "ALTEC 亚特克", en: "ALTEC Industrial Control" },
    productListName: { zh: "ALTEC 亚特克产品", en: "ALTEC industrial controller products" },
    homeName: { zh: "首页", en: "Home" },
    productDescriptionSuffix: { zh: "适用于工业自动化过程控制应用。", en: "for industrial process control applications." },
    ogImageAlt: { zh: "ALTEC 亚特克控制器", en: "ALTEC industrial controller" },
    languageName: { zh: "Chinese", en: "English" },
  },
} as const;
