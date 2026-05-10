export type Lang = "zh" | "en";

export const languages: Record<Lang, { label: string; base: string; other: Lang }> = {
  zh: { label: "中文", base: "", other: "en" },
  en: { label: "English", base: "/en", other: "zh" },
};

export const contactEmail = "daiweiyi.altec@gmail.com";

export const navItems = [
  { key: "about", href: "/about", zh: "公司简介", en: "About" },
  { key: "products", href: "/products", zh: "产品中心", en: "Products" },
  { key: "applications", href: "/applications", zh: "应用方案", en: "Applications" },
  { key: "gallery", href: "/gallery", zh: "产品图库", en: "Gallery" },
  { key: "downloads", href: "/downloads", zh: "下载中心", en: "Downloads" },
  { key: "contact", href: "/contact", zh: "联系我们", en: "Contact" },
];

export const aboutContent = {
  zh: {
    paragraphs: [
      "深圳市亚特克电子有限公司专业从事工业自动化智能过程控制仪表的研究开发及生产应用，在工业自动化领域有丰富的实践经验。",
      "已涉足的主要领域及产品有电炉行业的温度控制器、环境试验设备的湿度控制器、纸品印刷及凹版印刷行业的张力控制器及速度同步控制器、环保行业的 pH/ORP 控制器、建筑机械行业的称重配料控制器、楼宇中央空调节能的温差控制器、变频供水泵群压力控制器等。所生产的产品适用于温度、湿度、压力、张力、线速度、转速、计数、长度、pH 值、称重配料、电机软启动等工业领域的精确测控及记录。",
      "深圳市亚特克电子有限公司具有较强的独立产品开发能力，所有产品都是自主开发的高技术产品，技术上不仅在国内处于领先水平，与市场上同级别进口仪表相比，也具备更高的性能价格比。本公司有能力承接特型仪表的开发及生产。",
      "公司始终坚持“质量第一，服务至上”的质量方针，为广大用户提供可靠的产品及满意的服务，根据客户的特殊需求，承接订制了许多行业的专用仪表。",
    ],
    productSummary:
      "公司主要产品有：AL807/AL808/AL809/AL810/AL830 系列工业调节器、PC900 系列温度控制器、AL808 压力控制器、TC818/TC808 张力控制器、TC930/TC950 系列张力控制器、MC320 速度同步控制器、pH/ORP 控制器、AL210 绕线机控制器、MTC35 系列小型温湿度控制器和工控软件。",
    highlights: ["工业自动化过程控制", "自主研发产品", "特型仪表开发生产", "质量第一，服务至上"],
  },
  en: {
    paragraphs: [
      "Shenzhen ALTEC Electronics Co., Ltd. specializes in the research, development, production and application of intelligent industrial process control instruments, with extensive practical experience in industrial automation.",
      "Its products and application areas include temperature controllers for electric furnace industries, humidity controllers for environmental test equipment, tension and speed synchronization controllers for paper, printing and gravure printing industries, pH/ORP controllers for environmental protection, weighing and batching controllers for construction machinery, temperature differential controllers for central air-conditioning energy saving, and variable-frequency constant-pressure water supply controllers.",
      "ALTEC has strong independent product development capability. Its products are self-developed high-technology instruments with competitive performance and value, and the company can undertake the development and production of special-purpose instruments.",
      "The company follows the quality policy of quality first and service foremost, providing reliable products and responsive service while supporting customized instruments for specific industry needs.",
    ],
    productSummary:
      "Main products include AL807/AL808/AL809/AL810/AL830 industrial controllers, PC900 temperature controllers, AL808 pressure controllers, TC818/TC808/TC930/TC950 tension controllers, MC320 speed synchronization controllers, pH/ORP controllers, AL210 winding controllers, MTC35 compact temperature-humidity controllers and industrial control software.",
    highlights: ["Industrial process control", "Self-developed products", "Custom instrument development", "Quality first, service foremost"],
  },
};

export const productCategories = [
  {
    zh: "温度与过程控制",
    en: "Temperature & Process Control",
    items: ["AL807", "AL808", "AL810", "AL830", "PC900", "D4", "DC220"],
  },
  {
    zh: "张力与卷绕控制",
    en: "Tension & Winding Control",
    items: ["TC808", "TC818", "TC930", "TC950", "AL210"],
  },
  {
    zh: "环境、压力与水处理",
    en: "Environment, Pressure & Water Treatment",
    items: ["TH135", "TH136", "MTC35", "pH/ORP800", "PCP310", "CPC316"],
  },
];

export const products = [
  { model: "AL807", zh: "温度控制器", en: "Temperature Controller", image: "/altec/products/AL807.jpg", category: "Temperature & Process Control" },
  { model: "AL808", zh: "工业调节器", en: "Process Controller", image: "/altec/products/AL808.jpg", category: "Temperature & Process Control" },
  { model: "AL810", zh: "温度控制器", en: "Temperature Controller", image: "/altec/products/AL810.jpg", category: "Temperature & Process Control" },
  { model: "AL830", zh: "温度控制器", en: "Temperature Controller", image: "/altec/products/AL830.jpg", category: "Temperature & Process Control" },
  { model: "PC900", zh: "可编程控制器", en: "Programmable Controller", image: "/altec/products/PC900.jpg", category: "Temperature & Process Control" },
  { model: "D4", zh: "四通道温度控制器", en: "4-Channel Temperature Controller", image: "/altec/products/D4.jpg", category: "Temperature & Process Control" },
  { model: "DC220", zh: "温差控制器", en: "Temperature Differential Controller", image: "/altec/products/DC220.jpg", category: "Temperature & Process Control" },
  { model: "TC818", zh: "张力控制器", en: "Tension Controller", image: "/altec/products/TC818.jpg", category: "Tension & Winding Control" },
  { model: "TC808", zh: "张力控制器", en: "Tension Controller", image: "/altec/products/TC808.jpg", category: "Tension & Winding Control" },
  { model: "TC930", zh: "卷径张力控制器", en: "Radius Tension Controller", image: "/altec/products/TC930.jpg", category: "Tension & Winding Control" },
  { model: "TC950", zh: "张力控制器", en: "Tension Controller", image: "/altec/products/TC950.jpg", category: "Tension & Winding Control" },
  { model: "AL210", zh: "绕线机控制器", en: "Winding Controller", image: "/altec/products/AL210.jpg", category: "Tension & Winding Control" },
  { model: "TH135", zh: "干湿球式湿度控制器", en: "Humidity Controller", image: "/altec/products/TH135.jpg", category: "Environment, Pressure & Water Treatment" },
  { model: "TH136", zh: "湿度控制器", en: "Humidity Controller", image: "/altec/products/TH136.jpg", category: "Environment, Pressure & Water Treatment" },
  { model: "MTC35", zh: "温湿度控制器", en: "Temperature-Humidity Controller", image: "/altec/products/MTC35.jpg", category: "Environment, Pressure & Water Treatment" },
  { model: "pH/ORP800", zh: "酸碱度控制器", en: "pH/ORP Controller", image: "/altec/products/PH800.jpg", category: "Environment, Pressure & Water Treatment" },
  { model: "PCP310", zh: "压力控制器", en: "Pressure Controller", image: "/altec/products/CPC316.jpg", category: "Environment, Pressure & Water Treatment" },
  { model: "CPC316", zh: "变频恒压供水控制器", en: "Constant Pressure Controller", image: "/altec/products/CPC316.jpg", category: "Environment, Pressure & Water Treatment" },
];

export function productSlug(model: string) {
  return model.toLowerCase().replace("ph/orp", "ph-orp").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function getProductBySlug(slug: string) {
  return products.find((product) => productSlug(product.model) === slug);
}

type LocalizedText = Record<Lang, string>;

export type ProductDetail = {
  overview: LocalizedText;
  highlights: Record<Lang, string[]>;
  specs: Array<{ label: LocalizedText; value: LocalizedText }>;
};

export const productDetails: Record<string, ProductDetail> = {
  AL807: {
    overview: {
      zh: "AL807 系列温度控制器支持多种热电偶和铂电阻温度传感器，具备加热/冷却控制和报警功能，适合工业现场的高精度恒温控制。",
      en: "The AL807 temperature controller supports thermocouple and platinum resistance inputs, with heating/cooling control and alarm functions for precise industrial temperature control.",
    },
    highlights: {
      zh: ["多种热电偶、Pt100 输入", "加热/冷却控制", "PID 控制，抗干扰能力强", "96×96、48×96、96×48、72×72 多种面板尺寸"],
      en: ["Thermocouple and Pt100 inputs", "Heating/cooling control", "PID control with strong noise immunity", "Multiple panel sizes: 96×96, 48×96, 96×48 and 72×72"],
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
      en: "The AL808/AL809 process controller uses advanced PID control with auto-tuning and segmented output power limiting for temperature, pressure, flow, level and humidity control.",
    },
    highlights: {
      zh: ["PID 自整定", "自由输入与量程设置", "开关量或模拟量输出", "自动/手动切换和正/反作用切换"],
      en: ["PID auto-tuning", "Free input and range setup", "Switching or analog output", "Auto/manual and direct/reverse control switching"],
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
      en: "The AL810 is a single-phase SCR phase-angle controller for voltage regulation on resistive loads, inductive loads, transformer primaries and rectifier control systems.",
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
      en: "The AL830 is a three-phase SCR phase-angle controller for high-power electric furnaces, rectifier regulation and industrial three-phase voltage control.",
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
      zh: "PC900/PC410 系列具备 10 条 × 16 段温度曲线、分段输出功率限制和时间事件输出，特别适合实验电炉、环境实验设备等多曲线控温场合。",
      en: "The PC900/PC410 series provides 10 programs with 16 segments each, output power limiting and timed event output for laboratory furnaces and environmental test equipment.",
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
      en: "The D4 four-channel temperature controller measures and controls four temperature loops for multi-zone systems such as plastic extruders and packaging machinery.",
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
      en: "The DC220 temperature differential controller controls two-point temperature difference with output, communication and PV/differential transmission options.",
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
      en: "The TC818 tension controller supports constant web tension control, directly driving magnetic powder clutches or brakes with auxiliary analog outputs and communication options.",
    },
    highlights: {
      zh: ["24V/4A 或 36V/3A 主输出", "辅助模拟输出可选", "RS232/RS485 通讯", "适合放卷、收卷和恒张力系统"],
      en: ["24V/4A or 36V/3A main output", "Optional auxiliary analog outputs", "RS232/RS485 communication", "For unwinding, winding and constant-tension systems"],
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
      en: "The TC808 tension controller accepts micro-displacement or strain-gauge tension sensors, drives magnetic powder clutches/brakes, and supports roll diameter measurement.",
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
      en: "The TC930 roll-diameter tension controller uses diameter input for compensation in slitting, cutting and unwinding applications.",
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
      zh: "TC950 张力控制器提供模拟量、PWM 和单相移相脉冲输出，可用于高精度恒张力控制系统，并可直接配合三相力矩电机模块。",
      en: "The TC950 tension controller provides analog, PWM and single-phase phase-angle outputs for high-precision constant tension control and torque motor module control.",
    },
    highlights: {
      zh: ["4-20mA、0-10V、0-5V、PWM、Y1 输出", "可控制 AL33 三相力矩电机模块", "张力变送可选", "RS232/RS485 通讯"],
      en: ["4-20mA, 0-10V, 0-5V, PWM and Y1 outputs", "Controls AL33 three-phase torque motor module", "Optional tension transmission", "RS232/RS485 communication"],
    },
    specs: [
      { label: { zh: "测量精度", en: "Accuracy" }, value: { zh: "满量程 ±0.2%FS ±1 个字", en: "±0.2% FS ±1 digit" } },
      { label: { zh: "采样周期", en: "Sampling period" }, value: { zh: "100 ms", en: "100 ms" } },
      { label: { zh: "主输出", en: "Main output" }, value: { zh: "4-20mA、0-10V、0-5V、PWM、单相移相脉冲", en: "4-20mA, 0-10V, 0-5V, PWM and single-phase phase-angle pulse" } },
      { label: { zh: "典型方案", en: "Typical solution" }, value: { zh: "输出 0-5V 控制 AL33 三相力矩电机模块", en: "0-5V output to AL33 three-phase torque motor module" } },
    ],
  },
  AL210: {
    overview: {
      zh: "AL210 绕线计数控制器专为高速绕线机配套设计，适合变压器、微电机、中周、电感、吊扇、镇流器和马达线圈绕组。",
      en: "The AL210 winding counter controller is designed for high-speed winding machines used for transformers, micro motors, inductors, fan coils, ballasts and motor windings.",
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
  TH135: {
    overview: {
      zh: "TH135 干湿球湿度控制器用于需要干湿球法测量湿度的工业和环境设备，支持控制输出、通讯和变送等扩展功能。",
      en: "The TH135 dry/wet bulb humidity controller is used in industrial and environmental equipment requiring psychrometric humidity control with output, communication and transmission options.",
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
      en: "The TH136 humidity controller provides flexible outputs, alarms, communication and options for environmental and industrial humidity control.",
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
      en: "The MTC35 compact controller series covers single-loop temperature, dual-loop temperature, humidity, temperature-humidity, energy-saving air-conditioning and differential temperature control.",
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
      en: "The pH/ORP800 controller is used for water treatment and mixing systems, accepting pH/ORP electrodes with two-point calibration, control output and communication options.",
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
  PCP310: {
    overview: {
      zh: "PCP310 压力控制器面向恒压供水、补水和过程压力控制应用，可配套变频器实现稳定压力控制。",
      en: "The PCP310 pressure controller is intended for constant-pressure water supply, replenishment and process pressure control with VFD systems.",
    },
    highlights: {
      zh: ["压力闭环控制", "适合恒压供水与补水系统", "模拟量主输出", "可配套变频器使用"],
      en: ["Closed-loop pressure control", "For constant-pressure water and replenishment systems", "Analog main output", "Works with VFD systems"],
    },
    specs: [
      { label: { zh: "典型应用", en: "Typical applications" }, value: { zh: "恒压供水、锅炉补水、换热系统补水、过程压力控制", en: "Constant-pressure water supply, boiler replenishment, heat-exchange replenishment and process pressure control" } },
      { label: { zh: "输入信号", en: "Input signals" }, value: { zh: "压力变送器及标准模拟信号", en: "Pressure transmitter and standard analog signals" } },
      { label: { zh: "主输出", en: "Main output" }, value: { zh: "模拟量输出，可用于变频器控制", en: "Analog output for VFD control" } },
      { label: { zh: "系统能力", en: "System capability" }, value: { zh: "适合单泵或多泵压力控制方案", en: "Suitable for single-pump or multi-pump pressure control" } },
    ],
  },
  CPC316: {
    overview: {
      zh: "CPC316 变频恒压供水控制器用于单泵或多泵恒压供水控制，支持模拟主输出、实时时钟和通讯接口。",
      en: "The CPC316 constant-pressure water-supply controller supports single-pump or multi-pump VFD control with analog output, real-time clock and communication options.",
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
    zh: "TC808 张力控制应用",
    en: "TC808 Applications",
    image: "/altec/applications/TC808_Unwind.gif",
    zhText: "用于放卷和卷材生产线的恒张力控制。",
    enText: "Unwinding and constant tension control for converting lines.",
    related: "TC808",
  },
  {
    zh: "TC930 卷径张力应用",
    en: "TC930 Applications",
    image: "/altec/applications/cut.gif",
    zhText: "用于分切、裁切工艺的卷径张力控制。",
    enText: "Radius tension control for slitting and cutting processes.",
    related: "TC930",
  },
  {
    zh: "TC950 收卷张力应用",
    en: "TC950 Applications",
    image: "/altec/applications/TC950_Wind.gif",
    zhText: "用于稳定收卷和材料输送的张力控制。",
    enText: "Winding tension control for stable material handling.",
    related: "TC950",
  },
  {
    zh: "TH135 干湿球湿度应用",
    en: "TH135 Applications",
    image: "/altec/applications/TimberDrying.gif",
    zhText: "用于木材干燥和环境试验设备的湿度控制。",
    enText: "Humidity control for timber drying and environmental chambers.",
    related: "TH135",
  },
  {
    zh: "pH/ORP800 水处理应用",
    en: "pH/ORP800 Applications",
    image: "/altec/applications/pH_Mix.gif",
    zhText: "用于混合、水处理系统的酸碱度和氧化还原监测。",
    enText: "pH and ORP monitoring for mixing and water treatment systems.",
    related: "pH/ORP800",
  },
];

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
  ["TC930 Radius Tension Controller Manual", "751K", "06/12/2009", "TC930.pdf"],
  ["TC950 Tension Controller Manual", "810K", "05/18/2005", "TC950_EN.pdf"],
  ["TC950 中文说明书", "810K", "05/18/2005", "TC950.pdf"],
  ["SUP Series Tension Sensor Manual", "118K", "07/13/2006", "SUP_LoadCell_EN.pdf"],
  ["SUP 系列张力传感器说明书", "118K", "07/13/2006", "SUP_LoadCell.pdf"],
  ["HTS Series Tension Sensor Manual", "185K", "06/18/2007", "HTS_Tension_Sensor.pdf"],
  ["CTS Series Tension Sensor Manual", "173K", "10/20/2005", "CTS_Tension_Sensor_EN.pdf"],
  ["CTS 系列张力传感器说明书", "173K", "10/20/2005", "CTS_Tension_Sensor.pdf"],
  ["LX Series Tension Sensor Manual", "222K", "07/26/2007", "LX_Tension_Sensor_EN.pdf"],
  ["LX 系列张力传感器说明书", "222K", "07/26/2007", "LX_Tension_Sensor.pdf"],
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
  href: `/altec/downloads/${file}`,
  type: String(file).endsWith(".rar") ? "Software" : "PDF",
}));
