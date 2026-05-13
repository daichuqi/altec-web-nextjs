import type { Lang, LocalizedText } from "@/lib/i18n";
import { applicationCoverImage, downloadAsset, productImage } from "@/lib/assets";
export type { Lang, LocalizedText } from "@/lib/i18n";

export const contactEmail = "daiweiyi.altec@gmail.com";
export const contactPhone = "+86 755 26409070 / 26416767";
export const contactMobile = "+86 138 0258 0359";
export const contactBusinessHours = {
  zh: "周一至周五 09:00-18:00（中国时间）",
  en: "Monday-Friday, 09:00-18:00 China time",
} satisfies LocalizedText;

export const aboutContent = {
  zh: {
    paragraphs: [
      "深圳市亚特克电子有限公司专业从事工业自动化智能过程控制仪表的研究开发及生产应用，在工业自动化领域有丰富的实践经验。",
      "已涉足的主要领域及产品有电炉行业的温度控制器、环境试验设备的湿度控制器、纸品印刷及凹版印刷行业的张力控制器及速度同步控制器、环保行业的 pH/ORP 控制器、建筑机械行业的称重配料控制器、楼宇中央空调节能的温差控制器、变频供水泵群压力控制器等。所生产的产品适用于温度、湿度、压力、张力、线速度、转速、计数、长度、pH 值、称重配料、电机软启动等工业领域的精确测控及记录。",
      "深圳市亚特克电子有限公司具有较强的独立产品开发能力，所有产品都是自主开发的高技术产品，技术上不仅在国内处于领先水平，与市场上同级别进口仪表相比，也具备更高的性能价格比。本公司有能力承接特型仪表的开发及生产。",
      "公司始终坚持“质量第一，服务至上”的质量方针，为广大用户提供可靠的产品及满意的服务，根据客户的特殊需求，承接订制了许多行业的专用仪表。",
    ],
    productSummary:
      "公司主要产品有：AL807/AL808/AL809/AL810/AL830 系列工业调节器、PC900 系列温度控制器、AL808 压力控制器、TC818/TC930/TC950 系列张力控制器、MC320 速度同步控制器、pH/ORP 控制器、AL210 绕线机控制器、MTC35 系列小型温湿度控制器和工控软件。",
    highlights: ["工业自动化过程控制", "自主研发产品", "特型仪表开发生产", "质量第一，服务至上"],
  },
  en: {
    paragraphs: [
      "Shenzhen ALTEC Electronics Co., Ltd. develops and manufactures industrial process-control instruments for automation equipment, production lines and utility systems.",
      "The product range includes temperature controllers for electric furnaces, humidity controllers for environmental test equipment, tension and speed-synchronization controllers for paper, printing and gravure lines, pH/ORP controllers for water treatment, weighing and batching controllers for construction machinery, temperature-differential controllers for HVAC energy saving, and VFD constant-pressure water-supply controllers.",
      "ALTEC designs its own controller platforms and supports special-purpose instrument development when standard models do not match the required input, output, panel size or control function.",
      "The company focuses on reliable products, maintainable documentation and responsive support for model selection, replacement and custom controller requirements.",
    ],
    productSummary:
      "Main product lines include AL807/AL808/AL809/AL810/AL830 PID and SCR controllers, PC900 programmable temperature controllers, TC818/TC930/TC950 tension controllers, MC320 speed-synchronization controllers, pH/ORP controllers, AL210 winding controllers, MTC35 compact temperature-humidity controllers and industrial control software.",
    highlights: ["Industrial process control", "Temperature, tension and pH/ORP controllers", "Custom instrument development", "Selection support and documentation"],
  },
};

export const productCategories = [
  {
    zh: "温度与过程控制",
    en: "Temperature & Process Control",
    items: ["AL808", "AL810", "AL830", "AL807", "PC900", "DC220"],
  },
  {
    zh: "张力与卷绕控制",
    en: "Tension & Winding Control",
    items: ["TC818", "TC930", "TC950", "AL210"],
  },
  {
    zh: "环境、压力与水处理",
    en: "Environment, Pressure & Water Treatment",
    items: ["TH135", "TH136", "MTC35", "pH/ORP800", "CPC316"],
  },
  {
    zh: "张力传感器",
    en: "Tension Sensors",
    items: ["CTS", "HTS", "LXA", "SUP"],
  },
];

export type ProductStatus = "active" | "archived";

export type Product = {
  model: string;
  displayModel?: string;
  zh: string;
  en: string;
  image: string;
  category: string;
  status?: ProductStatus;
};

export const products: Product[] = [
  { model: "AL808", zh: "工业调节器", en: "Process Controller", image: productImage("AL808"), category: "Temperature & Process Control" },
  { model: "AL810", zh: "温度控制器", en: "Temperature Controller", image: productImage("AL810"), category: "Temperature & Process Control" },
  { model: "AL830", zh: "温度控制器", en: "Temperature Controller", image: productImage("AL830"), category: "Temperature & Process Control" },
  { model: "AL807", zh: "温度控制器", en: "Temperature Controller", image: productImage("AL807"), category: "Temperature & Process Control" },
  { model: "PC900", displayModel: "PC900/PC410/PC400", zh: "可编程控制器", en: "Programmable Controller", image: productImage("PC900"), category: "Temperature & Process Control" },
  { model: "D4", zh: "四通道温度控制器", en: "4-Channel Temperature Controller", image: productImage("D4"), category: "Temperature & Process Control", status: "archived" },
  { model: "DC220", zh: "温差控制器", en: "Temperature Differential Controller", image: productImage("DC220"), category: "Temperature & Process Control" },
  { model: "TC818", zh: "张力控制器", en: "Tension Controller", image: productImage("TC818"), category: "Tension & Winding Control" },
  { model: "TC808", zh: "张力控制器", en: "Tension Controller", image: productImage("TC808"), category: "Tension & Winding Control", status: "archived" },
  { model: "TC930", zh: "卷径张力控制器", en: "Roll-Diameter Tension Controller", image: productImage("TC930"), category: "Tension & Winding Control" },
  { model: "TC950", zh: "张力控制器", en: "Tension Controller", image: productImage("TC950"), category: "Tension & Winding Control" },
  { model: "AL210", zh: "绕线机控制器", en: "Winding Controller", image: productImage("AL210"), category: "Tension & Winding Control" },
  { model: "CTS", zh: "张力传感器", en: "Tension Sensor", image: productImage("CTS"), category: "Tension Sensors" },
  { model: "HTS", zh: "张力传感器", en: "Tension Sensor", image: productImage("HTS"), category: "Tension Sensors" },
  { model: "LXA", zh: "微位移张力传感器", en: "Micro-displacement Tension Sensor", image: productImage("LXA"), category: "Tension Sensors" },
  { model: "SUP", zh: "应变片式张力传感器", en: "Strain-gauge Tension Sensor", image: productImage("SUP"), category: "Tension Sensors" },
  { model: "TH135", zh: "干湿球式湿度控制器", en: "Humidity Controller", image: productImage("TH135"), category: "Environment, Pressure & Water Treatment" },
  { model: "TH136", zh: "湿度控制器", en: "Humidity Controller", image: productImage("TH136"), category: "Environment, Pressure & Water Treatment" },
  { model: "MTC35", zh: "温湿度控制器", en: "Temperature-Humidity Controller", image: productImage("MTC35"), category: "Environment, Pressure & Water Treatment" },
  { model: "pH/ORP800", zh: "酸碱度控制器", en: "pH/ORP Controller", image: productImage("pH/ORP800"), category: "Environment, Pressure & Water Treatment" },
  { model: "CPC316", zh: "变频恒压供水控制器", en: "VFD Constant-Pressure Water-Supply Controller", image: productImage("CPC316"), category: "Environment, Pressure & Water Treatment" },
];

export const activeProducts = products.filter((product) => product.status !== "archived");

export const archivedProducts = products.filter((product) => product.status === "archived");

export function productSlug(model: string) {
  return model.toLowerCase().replace("ph/orp", "ph-orp").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function productDisplayName(product: Pick<Product, "model" | "displayModel">) {
  return product.displayModel ?? product.model;
}

export function getProductBySlug(slug: string) {
  return products.find((product) => productSlug(product.model) === slug);
}

export type ProductDetail = {
  overview: LocalizedText;
  highlights: Record<Lang, string[]>;
  specs: Array<{ label: LocalizedText; value: LocalizedText }>;
};

export type ProductSelectionGuide = {
  productType: LocalizedText;
  applications: LocalizedText[];
  input: LocalizedText;
  output: LocalizedText;
  control: LocalizedText;
  modelSeries: string;
  filters: {
    signalControl: LocalizedText[];
    applications: LocalizedText[];
  };
};

const temperatureApplications = [
  { zh: "电炉与热处理设备", en: "Electric furnaces and heat-treatment equipment" },
  { zh: "环境试验与恒温设备", en: "Environmental test and constant-temperature equipment" },
];

const tensionApplications = [
  { zh: "印刷、复合与包装生产线", en: "Printing, laminating and packaging lines" },
  { zh: "放卷、收卷与分切设备", en: "Unwinding, winding and slitting equipment" },
];

export const productSelectionGuides: Record<string, ProductSelectionGuide> = {
  AL807: {
    productType: { zh: "温度控制器", en: "Temperature controller" },
    applications: temperatureApplications,
    input: { zh: "热电偶、Pt100 热电阻", en: "Thermocouple and Pt100 RTD" },
    output: { zh: "继电器、SSR 逻辑电平、可控硅过零输出", en: "Relay, SSR logic and SCR zero-crossing output" },
    control: { zh: "PID 加热/冷却控制，报警输出", en: "PID heating/cooling control with alarm output" },
    modelSeries: "AL807",
    filters: {
      signalControl: [
        { zh: "热电偶 / RTD", en: "Thermocouple / RTD" },
        { zh: "PID 控制", en: "PID control" },
      ],
      applications: temperatureApplications,
    },
  },
  AL808: {
    productType: { zh: "工业过程调节器", en: "Industrial process controller" },
    applications: [
      { zh: "温度、压力、流量、液位、湿度过程控制", en: "Temperature, pressure, flow, level and humidity loops" },
      { zh: "设备面板与自动化控制柜", en: "Equipment panels and automation cabinets" },
    ],
    input: { zh: "热电偶、RTD、mV 及标准模拟信号", en: "Thermocouple, RTD, mV and standard analog signals" },
    output: { zh: "继电器、逻辑、SCR、模拟量输出可选", en: "Relay, logic, SCR and analog output options" },
    control: { zh: "PID 自整定，自动/手动与正/反作用切换", en: "PID auto-tuning with auto/manual and direct/reverse switching" },
    modelSeries: "AL808 / AL809 / AL810 / AL830",
    filters: {
      signalControl: [
        { zh: "通用模拟输入", en: "Universal analog input" },
        { zh: "PID 控制", en: "PID control" },
        { zh: "RS485 通讯", en: "RS485 communication" },
      ],
      applications: [
        { zh: "过程控制", en: "Process control" },
        { zh: "电炉与热处理设备", en: "Electric furnaces and heat-treatment equipment" },
      ],
    },
  },
  AL810: {
    productType: { zh: "单相 SCR 移相调节器", en: "Single-phase SCR phase-angle controller" },
    applications: [
      { zh: "单相电压调节与电加热控制", en: "Single-phase voltage regulation and electric heating control" },
      { zh: "变压器一次侧与整流调压装置", en: "Transformer primary-side and rectifier voltage regulation" },
    ],
    input: { zh: "热电偶、RTD、mV 及标准信号", en: "Thermocouple, RTD, mV and standard signals" },
    output: { zh: "单相可控硅移相触发脉冲", en: "Single-phase SCR phase-angle trigger pulses" },
    control: { zh: "PID 自整定，分段输出功率限制", en: "PID auto-tuning with segmented output-power limiting" },
    modelSeries: "AL810",
    filters: {
      signalControl: [
        { zh: "SCR 移相", en: "SCR phase-angle" },
        { zh: "PID 控制", en: "PID control" },
      ],
      applications: temperatureApplications,
    },
  },
  AL830: {
    productType: { zh: "三相 SCR 移相调节器", en: "Three-phase SCR phase-angle controller" },
    applications: [
      { zh: "大功率三相电炉与工业加热", en: "High-power three-phase furnaces and industrial heating" },
      { zh: "三相整流与调压系统", en: "Three-phase rectifier and voltage-regulation systems" },
    ],
    input: { zh: "热电偶、RTD、mV 及标准信号", en: "Thermocouple, RTD, mV and standard signals" },
    output: { zh: "三相可控硅移相触发脉冲", en: "Three-phase SCR phase-angle trigger pulses" },
    control: { zh: "PID 自整定，星形/三角形 SCR 电路支持", en: "PID auto-tuning with star/delta SCR circuit support" },
    modelSeries: "AL830",
    filters: {
      signalControl: [
        { zh: "SCR 移相", en: "SCR phase-angle" },
        { zh: "三相控制", en: "Three-phase control" },
      ],
      applications: temperatureApplications,
    },
  },
  PC900: {
    productType: { zh: "可编程温度控制器", en: "Programmable temperature controller" },
    applications: [
      { zh: "实验电炉与多段升温曲线", en: "Laboratory furnaces and multi-segment temperature profiles" },
      { zh: "环境试验设备", en: "Environmental test equipment" },
    ],
    input: { zh: "热电偶、RTD 及标准过程信号", en: "Thermocouple, RTD and standard process signals" },
    output: { zh: "继电器、逻辑、模拟量、单/三相 SCR 输出", en: "Relay, logic, analog and single/three-phase SCR outputs" },
    control: { zh: "10 条 × 16 段程序曲线，PID 自整定", en: "10 programs x 16 segments with PID auto-tuning" },
    modelSeries: "PC900 / PC410 / PC400",
    filters: {
      signalControl: [
        { zh: "程序控制", en: "Program control" },
        { zh: "PID 控制", en: "PID control" },
      ],
      applications: temperatureApplications,
    },
  },
  D4: {
    productType: { zh: "四通道温度控制器", en: "4-channel temperature controller" },
    applications: [
      { zh: "塑料挤出机与包装机械", en: "Plastic extruders and packaging machinery" },
      { zh: "多区恒温控制系统", en: "Multi-zone constant-temperature systems" },
    ],
    input: { zh: "K/E/J/S 热电偶、Pt100 及标准信号", en: "K/E/J/S thermocouples, Pt100 and standard signals" },
    output: { zh: "SSR 电压与继电器输出", en: "SSR voltage and relay outputs" },
    control: { zh: "四通道 PID 温度测控", en: "Four-channel PID temperature measurement and control" },
    modelSeries: "D4",
    filters: {
      signalControl: [
        { zh: "多通道控制", en: "Multi-channel control" },
        { zh: "PID 控制", en: "PID control" },
      ],
      applications: temperatureApplications,
    },
  },
  DC220: {
    productType: { zh: "温差控制器", en: "Temperature differential controller" },
    applications: [
      { zh: "中央空调节能控制", en: "HVAC energy-saving control" },
      { zh: "换热与双点温差测控", en: "Heat-exchange and two-point differential temperature control" },
    ],
    input: { zh: "双路温度测量输入", en: "Dual temperature measurement inputs" },
    output: { zh: "继电器、逻辑、SCR、0-10mA、4-20mA、0-5V、0-10V", en: "Relay, logic, SCR, 0-10mA, 4-20mA, 0-5V and 0-10V" },
    control: { zh: "温差控制、比值控制、测量值/温差值变送", en: "Differential control, ratio control and PV/differential transmission" },
    modelSeries: "DC220",
    filters: {
      signalControl: [
        { zh: "温差控制", en: "Differential temperature" },
        { zh: "模拟量输出", en: "Analog output" },
      ],
      applications: [
        { zh: "暖通空调", en: "HVAC" },
        { zh: "过程控制", en: "Process control" },
      ],
    },
  },
  TC818: {
    productType: { zh: "闭环张力控制器", en: "Closed-loop tension controller" },
    applications: tensionApplications,
    input: { zh: "张力传感器输入，通讯与辅助模拟量可选", en: "Tension sensor input with optional communication and auxiliary analog signals" },
    output: { zh: "24V/4A 或 36V/3A，直接驱动磁粉离合器/制动器", en: "24V/4A or 36V/3A for direct magnetic powder clutch/brake drive" },
    control: { zh: "恒张力闭环控制", en: "Closed-loop constant-tension control" },
    modelSeries: "TC818",
    filters: {
      signalControl: [
        { zh: "张力传感器", en: "Tension sensor" },
        { zh: "磁粉制动/离合", en: "Magnetic powder brake/clutch" },
      ],
      applications: tensionApplications,
    },
  },
  TC808: {
    productType: { zh: "张力控制器", en: "Tension controller" },
    applications: tensionApplications,
    input: { zh: "微位移或应变片式张力传感器，接近开关/编码器卷径输入", en: "Micro-displacement or strain-gauge tension sensor, proximity switch/encoder diameter input" },
    output: { zh: "24V/4A 主输出，张力变送可选", en: "24V/4A main output with optional tension transmission" },
    control: { zh: "张力控制、卷径测量、通讯可选", en: "Tension control, roll-diameter measurement and optional communication" },
    modelSeries: "TC808",
    filters: {
      signalControl: [
        { zh: "张力传感器", en: "Tension sensor" },
        { zh: "卷径测量", en: "Roll diameter" },
      ],
      applications: tensionApplications,
    },
  },
  TC930: {
    productType: { zh: "卷径张力控制器", en: "Roll-diameter tension controller" },
    applications: [
      { zh: "分切、裁切与放卷设备", en: "Slitting, cutting and unwinding equipment" },
      { zh: "卷径变化补偿张力控制", en: "Tension compensation as roll diameter changes" },
    ],
    input: { zh: "卷径输入与张力设定信号", en: "Roll-diameter input and tension setting signals" },
    output: { zh: "磁粉制动器/离合器控制输出", en: "Magnetic powder brake/clutch control output" },
    control: { zh: "按卷径变化进行张力补偿", en: "Tension compensation based on roll diameter" },
    modelSeries: "TC930",
    filters: {
      signalControl: [
        { zh: "卷径测量", en: "Roll diameter" },
        { zh: "磁粉制动/离合", en: "Magnetic powder brake/clutch" },
      ],
      applications: tensionApplications,
    },
  },
  TC950: {
    productType: { zh: "收卷张力控制器", en: "Winding tension controller" },
    applications: [
      { zh: "收卷张力与速度跟踪", en: "Winding tension and speed tracking" },
      { zh: "材料输送与卷绕设备", en: "Material handling and winding equipment" },
    ],
    input: { zh: "张力、速度或控制设定相关信号", en: "Tension, speed or control setting signals" },
    output: { zh: "磁粉制动/离合与 SCR 模块接线支持", en: "Magnetic powder brake/clutch output with SCR module wiring support" },
    control: { zh: "收卷张力控制与速度同步", en: "Winding tension control and speed synchronization" },
    modelSeries: "TC950",
    filters: {
      signalControl: [
        { zh: "张力控制", en: "Tension control" },
        { zh: "速度同步", en: "Speed synchronization" },
      ],
      applications: tensionApplications,
    },
  },
  AL210: {
    productType: { zh: "绕线机控制器", en: "Winding controller" },
    applications: [
      { zh: "绕线机控制", en: "Winding machine control" },
      { zh: "计数与材料输送控制", en: "Counting and material handling control" },
    ],
    input: { zh: "设备启停、计数与控制信号", en: "Machine start/stop, count and control signals" },
    output: { zh: "绕线设备控制输出", en: "Winding machine control outputs" },
    control: { zh: "绕线过程控制", en: "Winding process control" },
    modelSeries: "AL210",
    filters: {
      signalControl: [
        { zh: "绕线控制", en: "Winding control" },
        { zh: "计数控制", en: "Counting control" },
      ],
      applications: [
        { zh: "绕线设备", en: "Winding equipment" },
        { zh: "卷绕设备", en: "Winding and rewinding equipment" },
      ],
    },
  },
  CTS: {
    productType: { zh: "轴承座式张力传感器", en: "Bearing-type tension sensor" },
    applications: tensionApplications,
    input: { zh: "卷材张力机械载荷", en: "Mechanical web-tension load" },
    output: { zh: "张力检测信号，配套张力控制器使用", en: "Tension detection signal for tension controllers" },
    control: { zh: "闭环张力检测", en: "Closed-loop tension measurement" },
    modelSeries: "CTS",
    filters: {
      signalControl: [{ zh: "张力传感器", en: "Tension sensor" }],
      applications: tensionApplications,
    },
  },
  HTS: {
    productType: { zh: "轴承座式张力传感器", en: "Bearing-type tension sensor" },
    applications: tensionApplications,
    input: { zh: "卷材张力机械载荷", en: "Mechanical web-tension load" },
    output: { zh: "张力检测信号，配套张力控制器使用", en: "Tension detection signal for tension controllers" },
    control: { zh: "闭环张力检测", en: "Closed-loop tension measurement" },
    modelSeries: "HTS",
    filters: {
      signalControl: [{ zh: "张力传感器", en: "Tension sensor" }],
      applications: tensionApplications,
    },
  },
  LXA: {
    productType: { zh: "微位移张力传感器", en: "Micro-displacement tension sensor" },
    applications: tensionApplications,
    input: { zh: "卷材张力引起的微位移", en: "Micro-displacement caused by web tension" },
    output: { zh: "200mV 等张力检测信号", en: "Tension detection signal such as 200mV" },
    control: { zh: "张力闭环反馈检测", en: "Closed-loop tension feedback measurement" },
    modelSeries: "LXA",
    filters: {
      signalControl: [{ zh: "张力传感器", en: "Tension sensor" }],
      applications: tensionApplications,
    },
  },
  SUP: {
    productType: { zh: "应变片式张力传感器", en: "Strain-gauge tension sensor" },
    applications: tensionApplications,
    input: { zh: "卷材张力机械载荷", en: "Mechanical web-tension load" },
    output: { zh: "应变片张力检测信号", en: "Strain-gauge tension detection signal" },
    control: { zh: "闭环张力反馈检测", en: "Closed-loop tension feedback measurement" },
    modelSeries: "SUP",
    filters: {
      signalControl: [{ zh: "张力传感器", en: "Tension sensor" }],
      applications: tensionApplications,
    },
  },
  TH135: {
    productType: { zh: "干湿球式湿度控制器", en: "Dry/wet bulb humidity controller" },
    applications: [
      { zh: "木材干燥设备", en: "Timber drying equipment" },
      { zh: "环境试验与湿度控制", en: "Environmental test and humidity control" },
    ],
    input: { zh: "干湿球温度测量", en: "Dry/wet bulb temperature measurement" },
    output: { zh: "湿度控制输出", en: "Humidity control output" },
    control: { zh: "干湿球湿度测控", en: "Dry/wet bulb humidity measurement and control" },
    modelSeries: "TH135",
    filters: {
      signalControl: [{ zh: "湿度控制", en: "Humidity control" }],
      applications: [
        { zh: "环境试验", en: "Environmental test" },
        { zh: "干燥设备", en: "Drying equipment" },
      ],
    },
  },
  TH136: {
    productType: { zh: "湿度控制器", en: "Humidity controller" },
    applications: [
      { zh: "环境试验设备", en: "Environmental test equipment" },
      { zh: "工业湿度控制", en: "Industrial humidity control" },
    ],
    input: { zh: "湿度测量输入", en: "Humidity measurement input" },
    output: { zh: "湿度控制输出", en: "Humidity control output" },
    control: { zh: "湿度测量与控制", en: "Humidity measurement and control" },
    modelSeries: "TH136",
    filters: {
      signalControl: [{ zh: "湿度控制", en: "Humidity control" }],
      applications: [{ zh: "环境试验", en: "Environmental test" }],
    },
  },
  MTC35: {
    productType: { zh: "小型温湿度控制器", en: "Compact temperature-humidity controller" },
    applications: [
      { zh: "温湿度控制箱与环境设备", en: "Temperature-humidity cabinets and environmental equipment" },
      { zh: "小型设备面板安装", en: "Compact equipment panel installation" },
    ],
    input: { zh: "温度/湿度测量输入", en: "Temperature and humidity measurement inputs" },
    output: { zh: "温湿度控制输出", en: "Temperature and humidity control outputs" },
    control: { zh: "温湿度测控", en: "Temperature-humidity measurement and control" },
    modelSeries: "MTC35",
    filters: {
      signalControl: [
        { zh: "温湿度控制", en: "Temperature-humidity control" },
        { zh: "小型面板", en: "Compact panel" },
      ],
      applications: [{ zh: "环境试验", en: "Environmental test" }],
    },
  },
  "pH/ORP800": {
    productType: { zh: "pH/ORP 控制器", en: "pH/ORP controller" },
    applications: [
      { zh: "环保水处理与混合系统", en: "Water treatment and mixing systems" },
      { zh: "酸碱度与氧化还原监测", en: "pH and oxidation-reduction monitoring" },
    ],
    input: { zh: "pH/ORP 电极信号", en: "pH/ORP electrode signal" },
    output: { zh: "继电器、模拟量和通讯输出可选", en: "Relay, analog and communication output options" },
    control: { zh: "pH/ORP 测量、报警与控制", en: "pH/ORP measurement, alarm and control" },
    modelSeries: "pH/ORP800",
    filters: {
      signalControl: [
        { zh: "pH/ORP", en: "pH/ORP" },
        { zh: "模拟量输出", en: "Analog output" },
      ],
      applications: [
        { zh: "水处理", en: "Water treatment" },
        { zh: "过程控制", en: "Process control" },
      ],
    },
  },
  CPC316: {
    productType: { zh: "变频恒压供水控制器", en: "VFD constant-pressure water-supply controller" },
    applications: [
      { zh: "楼宇供水与泵组控制", en: "Building water supply and pump group control" },
      { zh: "变频恒压系统", en: "VFD constant-pressure systems" },
    ],
    input: { zh: "压力变送器与泵组控制信号", en: "Pressure transmitter and pump-control signals" },
    output: { zh: "变频器与泵组控制输出", en: "VFD and pump group control outputs" },
    control: { zh: "恒压供水控制", en: "Constant-pressure water-supply control" },
    modelSeries: "CPC316",
    filters: {
      signalControl: [
        { zh: "压力控制", en: "Pressure control" },
        { zh: "VFD 控制", en: "VFD control" },
      ],
      applications: [
        { zh: "供水系统", en: "Water supply" },
        { zh: "楼宇设备", en: "Building services" },
      ],
    },
  },
};

export const productDetails: Record<string, ProductDetail> = {
  AL807: {
    overview: {
      zh: "AL807 系列温度控制器支持多种热电偶和铂电阻温度传感器，具备加热/冷却控制和报警功能，适合工业现场的高精度恒温控制。",
      en: "The AL807 temperature controller accepts thermocouple and Pt100 RTD inputs and provides heating/cooling control with alarm functions for industrial temperature loops.",
    },
    highlights: {
      zh: ["多种热电偶、Pt100 输入", "加热/冷却控制", "PID 控制，抗干扰能力强", "96×96、48×96、96×48、72×72 多种面板尺寸"],
      en: ["Thermocouple and Pt100 RTD inputs", "Heating/cooling control", "PID control with strong noise immunity", "Panel sizes: 96×96, 48×96, 96×48 and 72×72"],
    },
    specs: [
      { label: { zh: "测量精度", en: "Accuracy" }, value: { zh: "满量程 ±0.2% + 1 个数字位", en: "±0.2% FS + 1 digit" } },
      { label: { zh: "显示分辨率", en: "Display resolution" }, value: { zh: "1°C", en: "1°C" } },
      { label: { zh: "采样周期", en: "Sampling period" }, value: { zh: "125 ms", en: "125 ms" } },
      { label: { zh: "输出方式", en: "Outputs" }, value: { zh: "继电器、SSR 逻辑电平、可控硅过零输出", en: "Relay, SSR logic level and SCR zero-crossing output" } },
    ],
  },
  AL808: {
    overview: {
      zh: "AL808/AL809 系列工业调节器采用先进 PID 调节算法，支持自整定和分段输出功率限制，适合温度、压力、流量、液位、湿度等过程量精确控制。",
      en: "The AL808/AL809 process controller provides PID auto-tuning, configurable input ranges and segmented output-power limiting for temperature, pressure, flow, level and humidity loops.",
    },
    highlights: {
      zh: ["PID 自整定", "自由输入与量程设置", "开关量或模拟量输出", "自动/手动切换和正/反作用切换"],
      en: ["PID auto-tuning", "Configurable input range", "Relay, logic, SCR or analog output options", "Auto/manual and direct/reverse control switching"],
    },
    specs: [
      { label: { zh: "系列型号", en: "Series models" }, value: { zh: "AL808、AL809、AL810、AL830", en: "AL808, AL809, AL810 and AL830" } },
      { label: { zh: "通讯", en: "Communication" }, value: { zh: "RS232、RS422、RS485 可选", en: "Optional RS232, RS422 and RS485" } },
      { label: { zh: "可选功能", en: "Options" }, value: { zh: "曲线程序控制、输出缓变、测量值/设定值变送、模拟遥控设定、打印记录", en: "Ramp/soak program, soft output, PV/SV transmission, remote setpoint and print record" } },
      { label: { zh: "适用对象", en: "Process variables" }, value: { zh: "温度、压力、流量、液位、湿度", en: "Temperature, pressure, flow, level and humidity" } },
    ],
  },
  AL810: {
    overview: {
      zh: "AL810 是面向可控硅单相移相电路的工业调节器，可输出单相移相脉冲，适用于电阻性负载、电感性负载、变压器一次侧和整流调压装置。",
      en: "The AL810 outputs single-phase SCR phase-angle trigger pulses for voltage regulation on resistive loads, inductive loads, transformer primaries and rectifier systems.",
    },
    highlights: {
      zh: ["单相可控硅移相脉冲输出", "PID 自整定", "分段输出功率限制", "移相精度高，接线简洁"],
      en: ["Single-phase SCR phase-angle pulse output", "PID auto-tuning", "Segmented output power limiting", "High phase-angle accuracy and simple wiring"],
    },
    specs: [
      { label: { zh: "输入信号", en: "Input" }, value: { zh: "热电偶、热电阻、mV 及标准信号，可扩充输入", en: "Thermocouple, RTD, mV and standard signals, with expandable input support" } },
      { label: { zh: "测量精度", en: "Accuracy" }, value: { zh: "±0.2%FS ±1 个字", en: "±0.2% FS ±1 digit" } },
      { label: { zh: "通讯", en: "Communication" }, value: { zh: "RS232、RS422、RS485 可选", en: "Optional RS232, RS422 and RS485" } },
      { label: { zh: "曲线控制", en: "Program control" }, value: { zh: "4、8、16、30 段曲线程序控制可选", en: "Optional 4, 8, 16 or 30-segment program control" } },
    ],
  },
  AL830: {
    overview: {
      zh: "AL830 面向可控硅三相移相电路，适用于三相星形及三角形接法的大功率电炉、整流调压和工业电压调节应用。",
      en: "The AL830 is a three-phase SCR phase-angle controller for high-power electric furnaces, rectifier regulation and industrial three-phase voltage-control systems.",
    },
    highlights: {
      zh: ["三相移相脉冲输出", "适合星形/三角形接法", "PID 自整定", "大功率三相调压"],
      en: ["Three-phase phase-angle pulse output", "Star/delta SCR circuit support", "PID auto-tuning", "High-power three-phase voltage regulation"],
    },
    specs: [
      { label: { zh: "输入信号", en: "Input" }, value: { zh: "热电偶、热电阻、mV 及标准信号", en: "Thermocouple, RTD, mV and standard signals" } },
      { label: { zh: "采样周期", en: "Sampling period" }, value: { zh: "125 ms", en: "125 ms" } },
      { label: { zh: "报警方式", en: "Alarm modes" }, value: { zh: "上限、下限、上偏差、下偏差及上电免除报警", en: "High, low, deviation and power-on alarm suppression modes" } },
      { label: { zh: "通讯", en: "Communication" }, value: { zh: "RS232、RS485", en: "RS232 and RS485" } },
    ],
  },
  PC900: {
    overview: {
      zh: "PC900/PC410/PC400 系列具备 10 条 × 16 段温度曲线、分段输出功率限制和时间事件输出，特别适合实验电炉、环境实验设备等多曲线控温场合。",
      en: "The PC900/PC410/PC400 series provides 10 programs with 16 segments per program, output-power limiting and timed event output for laboratory furnaces, environmental chambers and repeatable profile control.",
    },
    highlights: {
      zh: ["10 条 × 16 段温度曲线", "时间事件输出", "PID 自整定", "多种模拟量和可控硅输出"],
      en: ["10 × 16-segment temperature programs", "Timed event output", "PID auto-tuning", "Analog, SSR and SCR output options"],
    },
    specs: [
      { label: { zh: "型号尺寸", en: "Model sizes" }, value: { zh: "PC900 96×96，PC400 48×96，PC410 96×48", en: "PC900 96×96, PC400 48×96, PC410 96×48" } },
      { label: { zh: "输出", en: "Outputs" }, value: { zh: "继电器、逻辑电平、模拟量、单/三相过零、单/三相移相", en: "Relay, logic level, analog, single/three-phase zero-crossing and phase-angle outputs" } },
      { label: { zh: "控制算法", en: "Control algorithm" }, value: { zh: "PID 调节及自整定", en: "PID control with auto-tuning" } },
      { label: { zh: "典型应用", en: "Typical applications" }, value: { zh: "实验电炉、环境实验设备、温度/压力/流量/液位/湿度控制", en: "Laboratory furnaces, environmental chambers and process control" } },
    ],
  },
  D4: {
    overview: {
      zh: "D4 系列四通道温度控制器可同时测量和控制 4 路温度，适用于塑料挤出机、包装机械等多区恒温控制系统。",
      en: "The D4 four-channel temperature controller measures and controls four temperature loops in multi-zone systems such as plastic extruders and packaging machinery.",
    },
    highlights: {
      zh: ["4 路温度测控", "适合多区恒温系统", "PID 调节算法", "SSR 电压和继电器输出"],
      en: ["Four temperature control loops", "Multi-zone constant-temperature systems", "PID control algorithm", "SSR voltage and relay outputs"],
    },
    specs: [
      { label: { zh: "输入信号", en: "Input" }, value: { zh: "K、E、J、S 热电偶，PT100 热电阻及标准信号", en: "K, E, J, S thermocouples, PT100 RTD and standard signals" } },
      { label: { zh: "测量精度", en: "Accuracy" }, value: { zh: "±0.5%FS ±1 个字", en: "±0.5% FS ±1 digit" } },
      { label: { zh: "采样速度", en: "Sampling speed" }, value: { zh: "1.28 秒", en: "1.28 seconds" } },
      { label: { zh: "面板尺寸", en: "Panel size" }, value: { zh: "96×96 mm", en: "96×96 mm" } },
    ],
  },
  DC220: {
    overview: {
      zh: "DC220 温差控制器用于测量和控制两点温差，支持常规控制输出、通讯和测量/温差值变送，适合中央空调节能和换热系统。",
      en: "The DC220 temperature-differential controller measures and controls the temperature difference between two points, with relay, SCR, analog, communication and PV/differential transmission options.",
    },
    highlights: {
      zh: ["温差测控", "继电器、SSR、可控硅和模拟量输出", "RS232/RS485 通讯", "测量值或温差值变送"],
      en: ["Differential temperature control", "Relay, SSR, SCR and analog outputs", "RS232/RS485 communication", "PV or differential-value transmission"],
    },
    specs: [
      { label: { zh: "输出", en: "Outputs" }, value: { zh: "继电器、逻辑电平、可控硅过零、0-10mA、4-20mA、0-5V、0-10V", en: "Relay, logic level, SCR zero-crossing, 0-10mA, 4-20mA, 0-5V and 0-10V" } },
      { label: { zh: "通讯距离", en: "Communication distance" }, value: { zh: "RS232 12m，RS485 1.2km", en: "RS232 12m, RS485 1.2km" } },
      { label: { zh: "可选功能", en: "Options" }, value: { zh: "测量值变送、温差值变送、比值控制", en: "PV transmission, differential transmission and ratio control" } },
      { label: { zh: "报警", en: "Alarm" }, value: { zh: "继电器报警输出可选", en: "Optional relay alarm output" } },
    ],
  },
  TC818: {
    overview: {
      zh: "TC818 张力控制器用于卷材生产线的恒张力控制，主输出可直接驱动磁粉离合器或磁粉制动器，并提供辅助模拟输出与通讯接口。",
      en: "The TC818 tension controller is used for constant web-tension control on unwinding and winding lines. The main output can drive magnetic powder clutches or brakes directly, with auxiliary analog outputs and communication options.",
    },
    highlights: {
      zh: ["24V/4A 或 36V/3A 主输出", "辅助模拟输出可选", "RS232/RS485 通讯", "适合放卷、收卷和恒张力系统"],
      en: ["24V/4A or 36V/3A main output", "Auxiliary analog outputs available", "RS232/RS485 communication", "For unwinding, winding and constant-tension systems"],
    },
    specs: [
      { label: { zh: "主输出", en: "Main output" }, value: { zh: "24V/4A 或 36V/3A，驱动磁粉离合器/制动器", en: "24V/4A or 36V/3A for magnetic powder clutch/brake" } },
      { label: { zh: "辅助输出", en: "Auxiliary outputs" }, value: { zh: "0-5V、0-10V、4-20mA、-5V 至 +5V", en: "0-5V, 0-10V, 4-20mA, -5V to +5V" } },
      { label: { zh: "通讯", en: "Communication" }, value: { zh: "RS232、RS485 可选", en: "Optional RS232 and RS485" } },
      { label: { zh: "控制对象", en: "Control object" }, value: { zh: "卷材张力闭环控制", en: "Closed-loop web tension control" } },
    ],
  },
  TC808: {
    overview: {
      zh: "TC808 张力控制器支持微位移和应变片式张力传感器输入，可驱动磁粉离合器或制动器，并支持卷径测量和张力变送。",
      en: "The TC808 tension controller accepts micro-displacement or strain-gauge tension sensor inputs, drives magnetic powder clutches or brakes, and supports roll-diameter measurement.",
    },
    highlights: {
      zh: ["张力传感器输入", "24V/4A 主输出", "卷径测量", "张力变送与通讯可选"],
      en: ["Tension sensor input", "24V/4A main output", "Roll diameter measurement", "Optional tension transmission and communication"],
    },
    specs: [
      { label: { zh: "输入信号", en: "Input signals" }, value: { zh: "微位移传感器 200mV/5V 供电；应变片传感器 20mV/10V 供电", en: "Micro-displacement sensor 200mV/5V supply; strain gauge sensor 20mV/10V supply" } },
      { label: { zh: "卷径测量", en: "Diameter measurement" }, value: { zh: "接近开关或编码器，NPN 输出，最高 15kHz", en: "Proximity switch or encoder, NPN output, up to 15kHz" } },
      { label: { zh: "测量精度", en: "Accuracy" }, value: { zh: "±0.2% + 1 个字", en: "±0.2% + 1 digit" } },
      { label: { zh: "采样周期", en: "Sampling period" }, value: { zh: "100 ms", en: "100 ms" } },
    ],
  },
  TC930: {
    overview: {
      zh: "TC930 是卷径张力控制器，通过卷径输入实现张力控制，适用于分切、裁切、放卷等需要随卷径变化补偿的场景。",
      en: "The TC930 roll-diameter tension controller uses roll-diameter input to compensate tension during slitting, cutting and unwinding applications.",
    },
    highlights: {
      zh: ["卷径式张力控制", "4-20mA、0-5V、0-10V 输出", "零张力报警", "RS232/RS485 或变送输出可选"],
      en: ["Roll-diameter tension control", "4-20mA, 0-5V or 0-10V output", "Zero-tension alarm", "Optional RS232/RS485 or transmission output"],
    },
    specs: [
      { label: { zh: "卷径输入", en: "Diameter input" }, value: { zh: "接近开关或编码器，NPN 输出，最高 15kHz", en: "Proximity switch or encoder, NPN output, up to 15kHz" } },
      { label: { zh: "输出", en: "Outputs" }, value: { zh: "两路 0-20mA、4-20mA 输出，移相脉冲输出", en: "Two 0-20mA/4-20mA outputs and phase-angle pulse output" } },
      { label: { zh: "环境", en: "Environment" }, value: { zh: "0-50°C，相对湿度 ≤85%", en: "0-50°C, relative humidity ≤85%" } },
      { label: { zh: "算法", en: "Algorithm" }, value: { zh: "卷径式张力控制", en: "Roll-diameter tension control" } },
    ],
  },
  TC950: {
    overview: {
      zh: "TC950 张力控制器接收 0-50mV 张力信号，提供模拟量、PWM、单相或三相移相输出，适用于高精度恒张力、速度同步、收放卷和功率单元驱动系统。",
      en: "The TC950 tension controller accepts a 0-50mV tension signal and provides analog, PWM, single-phase and three-phase phase-angle outputs for high-precision constant tension, speed tracking, winding/unwinding and power-unit control.",
    },
    highlights: {
      zh: ["4-20mA、0-10V、0-5V、PWM、Y1/Y3 输出", "支持 RSP、SKCH、变频器和 AL33 力矩电机模块", "自动/手动切换与同步追踪", "零张力报警、张力变送与 RS232/RS485 通讯"],
      en: ["4-20mA, 0-10V, 0-5V, PWM, Y1 and Y3 outputs", "Supports RSP, SKCH, inverter and AL33 torque-motor modules", "Automatic/manual operation and synchronous tracking", "Zero-tension alarm, tension transmission and RS232/RS485 communication"],
    },
    specs: [
      { label: { zh: "测量精度", en: "Accuracy" }, value: { zh: "满量程 ±0.2%FS ±1 个字", en: "±0.2% FS ±1 digit" } },
      { label: { zh: "采样周期", en: "Sampling period" }, value: { zh: "100 ms", en: "100 ms" } },
      { label: { zh: "张力输入", en: "Tension input" }, value: { zh: "0-50mV", en: "0-50mV" } },
      { label: { zh: "主输出", en: "Main output" }, value: { zh: "4-20mA、0-20mA、0-10V、0-5V、PWM、单相/三相移相脉冲", en: "4-20mA, 0-20mA, 0-10V, 0-5V, PWM, single-phase and three-phase phase-angle outputs" } },
      { label: { zh: "显示与报警", en: "Display and alarm" }, value: { zh: "双 4 位 LED 显示，零张力报警，继电器常开触点 250VAC/3A", en: "Dual 4-digit LED displays, zero-tension alarm, NO relay contact 250VAC/3A" } },
      { label: { zh: "典型方案", en: "Typical solutions" }, value: { zh: "RSP 功率单元、SKCH 可控硅模块、变频器、AL33 三相力矩电机模块", en: "RSP power unit, SKCH SCR module, inverter and AL33 three-phase torque-motor module" } },
    ],
  },
  AL210: {
    overview: {
      zh: "AL210 绕线计数控制器专为高速绕线机配套设计，适合变压器、微电机、中周、电感、吊扇、镇流器和马达线圈绕组。",
      en: "The AL210 winding counter controller is designed for high-speed winding machines used in transformer, micro-motor, inductor, fan-coil, ballast and motor-coil production.",
    },
    highlights: {
      zh: ["正反转加减计数", "加速度、最高转速、预停减速圈数可设", "双刹车和紧急刹车", "可直接控制 300W 直流电机"],
      en: ["Forward/reverse up-down counting", "Configurable acceleration, max speed and pre-stop turns", "Dual brake and emergency brake", "Direct 300W DC motor control"],
    },
    specs: [
      { label: { zh: "外形尺寸", en: "Size" }, value: { zh: "120×60 mm", en: "120×60 mm" } },
      { label: { zh: "记忆功能", en: "Memory" }, value: { zh: "掉电记忆", en: "Power-off memory" } },
      { label: { zh: "计数传感器", en: "Counting sensor" }, value: { zh: "配套光电计数传感器", en: "Supplied photoelectric counting sensor" } },
      { label: { zh: "产量", en: "Production count" }, value: { zh: "自动产量计数及显示", en: "Automatic production count and display" } },
    ],
  },
  CTS: {
    overview: {
      zh: "CTS 系列张力传感器采用轴承式结构，适合卷材张力检测，可选不同外径、轴承内径和 250N 至 1000N 量程。",
      en: "The CTS bearing-type tension sensor series is used for web-tension measurement, with multiple outer diameters, bearing bores and 250N to 1000N capacity ranges.",
    },
    highlights: {
      zh: ["轴承式张力检测", "250N、300N、500N、1000N 量程", "2mV/V 灵敏度", "航空插头接线"],
      en: ["Bearing-type tension sensing", "250N, 300N, 500N and 1000N ranges", "2mV/V rated output", "Aviation connector wiring"],
    },
    specs: [
      { label: { zh: "型号", en: "Models" }, value: { zh: "CTS105-17、CTS125-25", en: "CTS105-17 and CTS125-25" } },
      { label: { zh: "供桥电压", en: "Excitation" }, value: { zh: "6-12 VDC", en: "6-12 VDC" } },
      { label: { zh: "非线性/滞后/重复性", en: "Linearity / Hysteresis / Repeatability" }, value: { zh: "0.1% F.S.", en: "0.1% F.S." } },
      { label: { zh: "重量", en: "Weight" }, value: { zh: "4 kg", en: "4 kg" } },
    ],
  },
  HTS: {
    overview: {
      zh: "HTS 系列张力传感器提供 100N 至 500N 量程，适合卷材设备张力检测，配套尺寸图、安装图、接线图和受力分析。",
      en: "The HTS tension sensor series covers 100N to 500N ranges for web-tension measurement and includes dimension, mounting, wiring and force-analysis drawings.",
    },
    highlights: {
      zh: ["100N 至 500N 量程", "2mV/V 灵敏度", "6-12VDC 供桥", "结构紧凑，重量 1.8kg"],
      en: ["100N to 500N ranges", "2mV/V rated output", "6-12VDC excitation", "Compact 1.8kg body"],
    },
    specs: [
      { label: { zh: "量程", en: "Rated capacity" }, value: { zh: "100N、150N、200N、300N、500N", en: "100N, 150N, 200N, 300N and 500N" } },
      { label: { zh: "输入/输出电阻", en: "Input / Output impedance" }, value: { zh: "≥350Ω / 350±1Ω", en: "≥350Ω / 350±1Ω" } },
      { label: { zh: "非线性", en: "Non-linearity" }, value: { zh: "0.1% F.S.", en: "0.1% F.S." } },
      { label: { zh: "插头", en: "Connector" }, value: { zh: "X14K4P / X14J4A", en: "X14K4P / X14J4A" } },
    ],
  },
  LXA: {
    overview: {
      zh: "LXA 系列微位移张力传感器通过滚轮施加负载，使板簧产生微位移并转换为张力信号，支持 5V 或 24V 供电版本。",
      en: "The LXA micro-displacement tension sensor converts roller load into a displacement-based tension signal, with 5V and 24V supply versions for different controller inputs.",
    },
    highlights: {
      zh: ["150N 至 1000N 额定载荷", "微位移检测原理", "5V/0-200mV 或 24V/0-10V 输出", "基座、悬挂、侧壁安装"],
      en: ["150N to 1000N rated load", "Micro-displacement sensing principle", "5V/0-200mV or 24V/0-10V output", "Floor, ceiling or wall mounting"],
    },
    specs: [
      { label: { zh: "额定载荷", en: "Rated load" }, value: { zh: "150N、300N、500N、1000N", en: "150N, 300N, 500N and 1000N" } },
      { label: { zh: "工作电源", en: "Power supply" }, value: { zh: "DC 5V/20mA 或 DC 24V/20mA", en: "DC 5V/20mA or DC 24V/20mA" } },
      { label: { zh: "外形尺寸", en: "Dimensions" }, value: { zh: "134×48×78 mm", en: "134×48×78 mm" } },
      { label: { zh: "适用环境", en: "Environment" }, value: { zh: "0-40°C", en: "0-40°C" } },
    ],
  },
  SUP: {
    overview: {
      zh: "SUP 系列应变片式张力传感器覆盖 SUP1、SUP6、SUP62、SUP63、SUP91、SUP94 多种结构和量程，适合高精度张力检测。",
      en: "The SUP strain-gauge tension sensor series includes SUP1, SUP6, SUP62, SUP63, SUP91 and SUP94 structures for precision web-tension measurement.",
    },
    highlights: {
      zh: ["多结构、多量程选择", "2.0±10% mV/V 输出灵敏度", "0.02% F.S. 非线性", "支持现场标定"],
      en: ["Multiple structures and ranges", "2.0±10% mV/V rated output", "0.02% F.S. non-linearity", "Supports calibration"],
    },
    specs: [
      { label: { zh: "可选量程", en: "Capacity range" }, value: { zh: "20kg 至 600kg，按型号不同配置", en: "20kg to 600kg depending on model" } },
      { label: { zh: "输入/输出电阻", en: "Input / Output impedance" }, value: { zh: "410±30Ω / 350±3Ω", en: "410±30Ω / 350±3Ω" } },
      { label: { zh: "推荐供桥电压", en: "Recommended excitation" }, value: { zh: "10V，最大 15V", en: "10V, maximum 15V" } },
      { label: { zh: "安全/极限超载", en: "Safe / Ultimate overload" }, value: { zh: "150% F.S. / 300% F.S.（SUP91 为 200% F.S.）", en: "150% F.S. / 300% F.S. (SUP91: 200% F.S.)" } },
    ],
  },
  TH135: {
    overview: {
      zh: "TH135 干湿球湿度控制器用于需要干湿球法测量湿度的工业和环境设备，支持控制输出、通讯和变送等扩展功能。",
      en: "The TH135 dry/wet bulb humidity controller is used in industrial and environmental equipment that requires psychrometric humidity measurement, with control, communication and transmission options.",
    },
    highlights: {
      zh: ["干湿球湿度控制", "继电器、SSR、可控硅和模拟量输出", "RS232/RS485 通讯", "适合木材干燥和环境试验设备"],
      en: ["Dry/wet bulb humidity control", "Relay, SSR, SCR and analog outputs", "RS232/RS485 communication", "For timber drying and environmental test equipment"],
    },
    specs: [
      { label: { zh: "输出", en: "Outputs" }, value: { zh: "继电器、逻辑电平、可控硅过零、模拟量", en: "Relay, logic level, SCR zero-crossing and analog output" } },
      { label: { zh: "通讯", en: "Communication" }, value: { zh: "RS232 12m，RS485 1.2km", en: "RS232 12m, RS485 1.2km" } },
      { label: { zh: "报警", en: "Alarm" }, value: { zh: "继电器报警输出可选", en: "Optional relay alarm output" } },
      { label: { zh: "典型应用", en: "Typical applications" }, value: { zh: "木材干燥、环境试验、湿度控制", en: "Timber drying, environmental testing and humidity control" } },
    ],
  },
  TH136: {
    overview: {
      zh: "TH136 湿度控制器提供多种输出、报警、通讯和可选功能，适用于环境湿度测控及工业湿度控制场合。",
      en: "The TH136 humidity controller provides relay, logic, SCR or analog output options, alarm functions and communication for environmental and industrial humidity control.",
    },
    highlights: {
      zh: ["湿度测控", "96×96 与 72×72 面板尺寸", "多种控制输出", "通讯和报警可选"],
      en: ["Humidity measurement and control", "96×96 and 72×72 panel sizes", "Multiple control outputs", "Optional communication and alarms"],
    },
    specs: [
      { label: { zh: "外形尺寸", en: "Panel size" }, value: { zh: "96×96×100 mm；72×72×100 mm 可选", en: "96×96×100 mm; optional 72×72×100 mm" } },
      { label: { zh: "输出", en: "Outputs" }, value: { zh: "继电器、逻辑电平、可控硅过零、模拟量", en: "Relay, logic level, SCR zero-crossing and analog output" } },
      { label: { zh: "通讯", en: "Communication" }, value: { zh: "RS232、RS485 可选", en: "Optional RS232 and RS485" } },
      { label: { zh: "报警", en: "Alarm" }, value: { zh: "继电器报警输出", en: "Relay alarm output" } },
    ],
  },
  MTC35: {
    overview: {
      zh: "MTC35 系列小型温湿度控制器包含单路温度、双回路温度、单路湿度、温湿度、节能空调和温差控制等软件功能。",
      en: "The MTC35 compact controller series covers single-loop temperature, dual-loop temperature, humidity, temperature-humidity, energy-saving HVAC and differential-temperature control functions.",
    },
    highlights: {
      zh: ["F10/F20/F30/F40/C20/C21 多功能版本", "温度、湿度或温湿度组合输入", "1 路或 2 路继电器输出", "小型化安装"],
      en: ["F10/F20/F30/F40/C20/C21 function versions", "Temperature, humidity or combined inputs", "One or two relay outputs", "Compact installation"],
    },
    specs: [
      { label: { zh: "软件功能", en: "Functions" }, value: { zh: "温度、湿度、温湿度、空调节能、温差控制", en: "Temperature, humidity, temp-humidity, energy-saving HVAC and differential temperature control" } },
      { label: { zh: "输入", en: "Inputs" }, value: { zh: "1T、1H、1T1H、2T", en: "1T, 1H, 1T1H and 2T" } },
      { label: { zh: "输出", en: "Outputs" }, value: { zh: "无输出、1 路继电器、2 路继电器", en: "No output, one relay or two relays" } },
      { label: { zh: "资料", en: "Manuals" }, value: { zh: "F10、F11、F20、F22、F30、F40、C20、C30 多版本说明书", en: "Manuals available for F10, F11, F20, F22, F30, F40, C20 and C30 variants" } },
    ],
  },
  "pH/ORP800": {
    overview: {
      zh: "pH/ORP800 酸碱度/氧化还原控制器用于水处理和混合系统，可接 pH/ORP 电极，支持两点标定、控制输出、通讯和测量值变送。",
      en: "The pH/ORP800 controller is used in water-treatment and mixing systems. It accepts pH or ORP electrode inputs and supports two-point calibration, control output, communication and measured-value transmission.",
    },
    highlights: {
      zh: ["pH/ORP 电极输入", "LCD 或 LED 显示", "两点标定", "Hi/Lo 两组控制"],
      en: ["pH/ORP electrode input", "LCD or LED display", "Two-point calibration", "Hi/Lo dual control"],
    },
    specs: [
      { label: { zh: "输入", en: "Input" }, value: { zh: "pH/ORP 电极", en: "pH/ORP electrode" } },
      { label: { zh: "采样周期", en: "Sampling period" }, value: { zh: "125 ms", en: "125 ms" } },
      { label: { zh: "控制方式", en: "Control mode" }, value: { zh: "Hi/Lo 两组控制，继电器单刀双掷触点，最大 250VAC/3A", en: "Hi/Lo dual control, relay SPDT contact, max 250VAC/3A" } },
      { label: { zh: "电源", en: "Power" }, value: { zh: "85-264VAC，45/60Hz", en: "85-264VAC, 45/60Hz" } },
    ],
  },
  CPC316: {
    overview: {
      zh: "CPC316 变频恒压供水控制器用于单泵或多泵恒压供水控制，支持模拟主输出、实时时钟和通讯接口。",
      en: "The CPC316 VFD constant-pressure water-supply controller supports single-pump and multi-pump systems, with analog main output, optional real-time clock and communication interfaces.",
    },
    highlights: {
      zh: ["单泵或多泵变频控制", "4-20mA 或 0-10V 主输出", "实时时钟可选", "RS232/RS485 通讯"],
      en: ["Single or multi-pump VFD control", "4-20mA or 0-10V main output", "Optional real-time clock", "RS232/RS485 communication"],
    },
    specs: [
      { label: { zh: "主输出", en: "Main output" }, value: { zh: "A420 4-20mA；V10 0-10V", en: "A420 4-20mA; V10 0-10V" } },
      { label: { zh: "泵控制", en: "Pump control" }, value: { zh: "S 单泵变频控制；M 多泵变频控制", en: "S single-pump VFD control; M multi-pump VFD control" } },
      { label: { zh: "时钟", en: "Clock" }, value: { zh: "可选实时时钟功能", en: "Optional real-time clock" } },
      { label: { zh: "通讯", en: "Communication" }, value: { zh: "RS232、RS485 可选", en: "Optional RS232 and RS485" } },
    ],
  },
};

export const applications = [
  {
    zh: "TC818 张力控制应用",
    en: "TC818 Applications",
    image: applicationCoverImage("TC808_Unwind.gif"),
    zhText: "用于放卷和卷材生产线的恒张力控制。",
    enText: "Constant web-tension control for unwinding and converting lines.",
    related: "TC818",
  },
  {
    zh: "TC930 卷径张力应用",
    en: "TC930 Applications",
    image: applicationCoverImage("cut.gif"),
    zhText: "用于分切、裁切工艺的卷径张力控制。",
    enText: "Roll-diameter tension compensation for slitting and cutting processes.",
    related: "TC930",
  },
  {
    zh: "TC950 收卷张力应用",
    en: "TC950 Applications",
    image: applicationCoverImage("TC950_Wind.gif"),
    zhText: "用于稳定收卷和材料输送的张力控制。",
    enText: "Winding tension and speed-tracking control for stable material handling.",
    related: "TC950",
  },
  {
    zh: "TH135 干湿球湿度应用",
    en: "TH135 Applications",
    image: applicationCoverImage("TimberDrying.gif"),
    zhText: "用于木材干燥和环境试验设备的湿度控制。",
    enText: "Dry/wet bulb humidity control for timber drying and environmental chambers.",
    related: "TH135",
  },
  {
    zh: "pH/ORP800 水处理应用",
    en: "pH/ORP800 Applications",
    image: applicationCoverImage("pH_Mix.gif"),
    zhText: "用于混合、水处理系统的酸碱度和氧化还原监测。",
    enText: "pH and ORP monitoring for mixing and water treatment systems.",
    related: "pH/ORP800",
  },
];

export type DownloadCategory = "manual" | "datasheet" | "software" | "wiring" | "selection";

function downloadCategory(title: string, file: string): DownloadCategory {
  const value = `${title} ${file}`.toLowerCase();

  if (value.endsWith(".rar") || value.includes("software")) {
    return "software";
  }

  if (value.includes("wire") || value.includes("wiring")) {
    return "wiring";
  }

  if (value.includes("datasheet") || value.includes("data sheet")) {
    return "datasheet";
  }

  if (value.includes("selection") || value.includes("model coding")) {
    return "selection";
  }

  return "manual";
}

export const downloads = [
  ["AL807 Instruction Manual", "174K", "03/29/2006", "AL807_EN.pdf"],
  ["AL807 中文说明书", "265K", "03/29/2006", "AL807.pdf"],
  ["AL808/AL809/AL810/AL830 Manual V6.7", "750K", "05/23/2005", "AL808_V67.pdf"],
  ["AL808/AL809/AL810/AL830 Manual V6.4", "400K", "01/03/2005", "AL808_V64_EN.pdf"],
  ["AL808/AL809/AL810/AL830 中文说明书 V6.4", "801K", "01/03/2005", "AL808_V64.pdf"],
  ["AL808/AL809/AL810/AL830 Manual V6.0", "413K", "01/03/2005", "AL808_V60_EN.pdf"],
  ["AL808/AL809/AL810/AL830 中文说明书 V6.0", "613K", "01/03/2005", "AL808_V60.pdf"],
  ["AL808 Communication Protocol", "73K", "01/03/2005", "AL808CommsProtocol.pdf"],
  ["AL808 通讯协议", "134K", "01/03/2005", "AL808_COM.pdf"],
  ["PC900 Temperature Controller Manual", "621K", "04/30/2005", "PC900_EN.pdf"],
  ["PC900 中文说明书", "885K", "04/30/2005", "PC900.pdf"],
  ["D4 Temperature Controller Manual", "530K", "07/22/2005", "D4.pdf"],
  ["DC220 Temperature Differential Controller Manual", "881K", "11/06/2006", "DC220_EN.pdf"],
  ["DC220 中文说明书", "881K", "11/06/2006", "DC220.pdf"],
  ["TC808 Tension Controller Manual", "568K", "04/14/2005", "TC808_EN.pdf"],
  ["TC808 中文说明书", "568K", "04/14/2005", "TC808.pdf"],
  ["TC818 Tension Controller Manual V4.00", "614K", "05/20/2009", "TC818_V4_EN.pdf"],
  ["TC818 中文说明书 V4.00", "614K", "05/20/2009", "TC818_V4.pdf"],
  ["TC930 Roll-Diameter Tension Controller Manual", "751K", "06/12/2009", "TC930.pdf"],
  ["TC950 Tension Controller Manual", "810K", "05/18/2005", "TC950_EN.pdf"],
  ["TC950 中文说明书", "810K", "05/18/2005", "TC950.pdf"],
  ["TC950-Y1 with SKCH Series SCR Module Wiring", "238K", "05/18/2005", "TC950_SKCH_Wire.pdf"],
  ["SUP Series Tension Sensor Manual", "118K", "07/13/2006", "SUP_LoadCell_EN.pdf"],
  ["SUP 系列张力传感器说明书", "118K", "07/13/2006", "SUP_LoadCell.pdf"],
  ["HTS Series Tension Sensor Manual", "185K", "06/18/2007", "HTS_Tension_Sensor.pdf"],
  ["CTS Series Tension Sensor Manual", "173K", "10/20/2005", "CTS_Tension_Sensor_EN.pdf"],
  ["CTS 系列张力传感器说明书", "173K", "10/20/2005", "CTS_Tension_Sensor.pdf"],
  ["LXA Series Tension Sensor Manual", "222K", "07/26/2007", "LXA_Tension_Sensor_EN.pdf"],
  ["LXA 系列张力传感器说明书", "222K", "07/26/2007", "LXA_Tension_Sensor.pdf"],
  ["TH135 Humidity Controller Manual", "375K", "06/14/2005", "TH135.pdf"],
  ["TH136 Humidity Controller Manual", "348K", "01/03/2005", "TH136_EN.pdf"],
  ["TH136 中文说明书", "348K", "01/03/2005", "TH136.pdf"],
  ["AL210 Winding Controller Manual", "284K", "01/03/2005", "AL210.pdf"],
  ["pH/ORP800 Controller Manual", "429K", "05/21/2007", "PH_ORP800_EN.pdf"],
  ["pH/ORP800 中文说明书", "429K", "05/21/2007", "PH_ORP800.pdf"],
  ["pH Probe Instruction Manual", "54K", "01/03/2005", "pH_Sensor_Manual.pdf"],
  ["CPC316 Constant Pressure Controller Manual", "397K", "06/19/2009", "CPC316_EN.pdf"],
  ["CPC316 中文说明书", "397K", "06/19/2009", "CPC316.pdf"],
  ["MTC35-F10 Instruction Manual", "172K", "06/21/2006", "MTC35_F10_EN.pdf"],
  ["MTC35-F10 中文说明书", "172K", "06/21/2006", "MTC35_F10.pdf"],
  ["MTC35-F11 Instruction Manual", "156K", "06/21/2006", "MTC35_F11_EN.pdf"],
  ["MTC35-F11 中文说明书", "156K", "06/21/2006", "MTC35_F11.pdf"],
  ["MTC35-F20 Instruction Manual", "176K", "06/21/2006", "MTC35_F20_EN.pdf"],
  ["MTC35-F20 中文说明书", "176K", "06/21/2006", "MTC35_F20.pdf"],
  ["MTC35-F30 Instruction Manual", "187K", "06/21/2006", "MTC35_F30_EN.pdf"],
  ["MTC35-F30 中文说明书", "187K", "06/21/2006", "MTC35_F30.pdf"],
  ["MTC35-F40 Instruction Manual", "183K", "06/21/2006", "MTC35_F40_EN.pdf"],
  ["MTC35-F40 中文说明书", "183K", "06/21/2006", "MTC35_F40.pdf"],
  ["MTC35-C20 Instruction Manual", "172K", "06/21/2006", "MTC35_C20_EN.pdf"],
  ["MTC35-C20 中文说明书", "172K", "06/21/2006", "MTC35_C20.pdf"],
  ["MTC35-C30 Instruction Manual", "156K", "06/21/2006", "MTC35_C30_EN.pdf"],
  ["MTC35-C30 中文说明书", "156K", "06/21/2006", "MTC35_C30.pdf"],
  ["MTC35-F22 Instruction Manual", "160K", "06/14/2006", "MTC35_F22_EN.pdf"],
  ["MTC35-F22 中文说明书", "160K", "06/14/2006", "MTC35_F22.pdf"],
  ["AL808 Communication Test Software", "RAR", "Software", "AL808TEST.rar"],
].map(([title, size, date, file]) => ({
  title,
  size,
  date,
  file,
  href: downloadAsset(file),
  category: downloadCategory(String(title), String(file)),
  type: String(file).endsWith(".rar") ? "Software" : "PDF",
}));
