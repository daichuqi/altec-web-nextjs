import { downloadAsset, productDetailImage } from "@/lib/assets";
import type { LocalizedText } from "@/lib/i18n";

type DetailAnchor = {
  id: string;
  label: LocalizedText;
};

export type ProductDetailIntroSection = {
  kind: "intro";
  title: LocalizedText;
  paragraphs: LocalizedText[];
  anchors?: DetailAnchor[];
};

export type ProductDetailTableSection = {
  kind: "table";
  id?: string;
  title: LocalizedText;
  description?: LocalizedText;
  columns: [LocalizedText, LocalizedText];
  rows: Array<{
    label: LocalizedText;
    value: LocalizedText;
  }>;
};

export type ProductDetailImageSection = {
  kind: "images";
  id?: string;
  title: LocalizedText;
  description?: LocalizedText;
  images: Array<{
    src: string;
    alt: LocalizedText;
    caption: LocalizedText;
  }>;
};

export type ProductDetailDocumentSection = {
  kind: "documents";
  id?: string;
  title: LocalizedText;
  description?: LocalizedText;
  documents: Array<{
    title: LocalizedText;
    href: string;
    type: string;
  }>;
};

export type StructuredProductDetailSection =
  | ProductDetailIntroSection
  | ProductDetailTableSection
  | ProductDetailImageSection
  | ProductDetailDocumentSection;

export type StructuredProductDetail = {
  sections: StructuredProductDetailSection[];
};

const tableColumns: [LocalizedText, LocalizedText] = [
  { zh: "项目", en: "Item" },
  { zh: "说明", en: "Description" },
];

const standardAnchors: DetailAnchor[] = [
  { id: "model-coding", label: { zh: "型号编码", en: "Model coding" } },
  { id: "wiring", label: { zh: "接线图", en: "Wiring" } },
  { id: "dimensions", label: { zh: "外形尺寸", en: "Dimensions" } },
  { id: "specifications", label: { zh: "规格参数", en: "Specifications" } },
  { id: "documents", label: { zh: "资料下载", en: "Documents" } },
];

const seriesManualDocuments: ProductDetailDocumentSection["documents"] = [
  {
    title: { zh: "AL808 / AL809 / AL810 / AL830 V6.7 中文说明书", en: "AL808 / AL809 / AL810 / AL830 V6.7 Chinese manual" },
    href: downloadAsset("AL808_V67.pdf"),
    type: "PDF",
  },
  {
    title: { zh: "AL808 / AL809 / AL810 / AL830 V6.4 英文说明书", en: "AL808 / AL809 / AL810 / AL830 V6.4 English manual" },
    href: downloadAsset("AL808_V64_EN.pdf"),
    type: "PDF",
  },
  {
    title: { zh: "AL808 / AL809 / AL810 / AL830 V6.4 中文说明书", en: "AL808 / AL809 / AL810 / AL830 V6.4 Chinese manual" },
    href: downloadAsset("AL808_V64.pdf"),
    type: "PDF",
  },
  {
    title: { zh: "AL808 通讯协议", en: "AL808 communication protocol" },
    href: downloadAsset("AL808CommsProtocol.pdf"),
    type: "PDF",
  },
];

const phaseControlOptionRows: ProductDetailTableSection["rows"] = [
  {
    label: { zh: "通讯", en: "Communication" },
    value: {
      zh: "0 无通讯，232 RS-232，422 RS-422，485 RS-485",
      en: "0 none, 232 RS-232, 422 RS-422, 485 RS-485",
    },
  },
  {
    label: { zh: "程序控制", en: "Program control" },
    value: {
      zh: "QP4、QP8、QP16、QP30 可选，分别对应 4 / 8 / 16 / 30 段程序控制",
      en: "QP4, QP8, QP16 and QP30 options for 4 / 8 / 16 / 30-segment program control",
    },
  },
  {
    label: { zh: "信号与记录选件", en: "Signal and record options" },
    value: {
      zh: "So 输出信号缓变，Svtr 设定值变送，Pvtr 测量值变送，Rem 模拟遥控设定，Prt 打印记录",
      en: "So soft output, Svtr SV transmission, Pvtr PV transmission, Rem remote setpoint and Prt print record",
    },
  },
];

const phaseControlCommonSpecRows: ProductDetailTableSection["rows"] = [
  {
    label: { zh: "输入信号", en: "Input signals" },
    value: {
      zh: "可编程热电偶、热电阻、mV 及标准信号输入，可按应用扩展输入信号",
      en: "Programmable thermocouple, RTD, mV and standard signal inputs, with input expansion according to application needs",
    },
  },
  {
    label: { zh: "测量精度", en: "Measurement accuracy" },
    value: { zh: "±0.2% FS ± 1 digit", en: "±0.2% FS ± 1 digit" },
  },
  {
    label: { zh: "采样周期", en: "Sampling period" },
    value: { zh: "125 ms", en: "125 ms" },
  },
  {
    label: { zh: "控制算法", en: "Control algorithm" },
    value: {
      zh: "PID 调节算法，支持 PID 自整定和分段输出功率限制",
      en: "PID control with auto-tuning and segmented output-power limiting",
    },
  },
  {
    label: { zh: "报警方式", en: "Alarm modes" },
    value: {
      zh: "上限、下限、上偏差、下偏差等报警模式，支持上电免除报警",
      en: "High, low, high-deviation and low-deviation alarm modes, with power-on alarm suppression",
    },
  },
  {
    label: { zh: "数字通讯", en: "Digital communication" },
    value: {
      zh: "RS-232 / RS-485 选配",
      en: "Optional RS-232 / RS-485",
    },
  },
  {
    label: { zh: "面板尺寸", en: "Panel size" },
    value: { zh: "96 x 96 mm", en: "96 x 96 mm" },
  },
  {
    label: { zh: "电源", en: "Power supply" },
    value: {
      zh: "100-240 VAC, 50/60 Hz；24 VAC/DC, 50/60 Hz",
      en: "100-240 VAC, 50/60 Hz; 24 VAC/DC, 50/60 Hz",
    },
  },
  {
    label: { zh: "工作环境", en: "Operating environment" },
    value: {
      zh: "0-50°C，≤85% RH，无凝露",
      en: "0-50°C, <=85% RH, non-condensing",
    },
  },
];

export const productStructuredDetails: Record<string, StructuredProductDetail> = {
  AL808: {
    sections: [
      {
        kind: "intro",
        title: {
          zh: "结构化技术资料",
          en: "Structured technical reference",
        },
        paragraphs: [
          {
            zh: "AL808 / AL809 / AL810 / AL830 系列用于工业温度与过程控制，可按面板尺寸、主输出、辅助输出、报警、通讯和选件组合型号。",
            en: "The AL808 / AL809 / AL810 / AL830 series is an industrial PID process controller family. Model selection is based on panel size, main output, auxiliary output, alarm, communication and optional functions.",
          },
          {
            zh: "以下内容把原 rich HTML 拆为可维护的型号编码、端子接线、外形尺寸、规格参数和文件下载分组，便于后续逐个产品迁移。",
            en: "The detail below is modeled as maintainable sections for model coding, wiring, dimensions, specifications and documents, so engineering and purchasing users can check fit quickly.",
          },
        ],
        anchors: standardAnchors,
      },
      {
        kind: "table",
        id: "model-coding",
        title: {
          zh: "型号编码",
          en: "Model coding",
        },
        description: {
          zh: "订货时通常按基本型号、面板尺寸、OUT1、OUT2、ALARM1、通讯和选件组合确认。",
          en: "A purchase model is normally confirmed by basic model, panel size, OUT1, OUT2, ALARM1, communication and options.",
        },
        columns: tableColumns,
        rows: [
          {
            label: { zh: "基本型号", en: "Basic model" },
            value: {
              zh: "AL808、AL809、AL810、AL830",
              en: "AL808, AL809, AL810, AL830",
            },
          },
          {
            label: { zh: "面板尺寸", en: "Panel size" },
            value: {
              zh: "空白、D、E、M、A、B，对应不同面板尺寸规格",
              en: "Blank, D, E, M, A, B for different panel size formats",
            },
          },
          {
            label: { zh: "OUT1 / OUT2", en: "OUT1 / OUT2" },
            value: {
              zh: "0 无输出，R 继电器，L 逻辑电平，T 单相过零触发，3T 三相过零触发，D 连续电流输出",
              en: "0 no output, R relay, L logic, T single-phase zero-cross SCR trigger, 3T three-phase zero-cross SCR trigger, D continuous current output",
            },
          },
          {
            label: { zh: "ALARM1", en: "ALARM1" },
            value: {
              zh: "0 无报警，R 继电器报警输出",
              en: "0 no alarm, R relay alarm output",
            },
          },
          {
            label: { zh: "通讯", en: "Communication" },
            value: {
              zh: "0 无通讯，232，422，485",
              en: "0 none, 232, 422, 485",
            },
          },
          {
            label: { zh: "选件", en: "Options" },
            value: {
              zh: "QP4 / QP8 / QP16 / QP32 程序控制，Rem 远程设定，Pvtr 测量值变送，Svtr 设定值变送，Prt 打印，Clk 实时时钟",
              en: "QP4 / QP8 / QP16 / QP32 program control, Rem remote setpoint, Pvtr PV transmission, Svtr SV transmission, Prt printing, Clk real-time clock",
            },
          },
        ],
      },
      {
        kind: "images",
        id: "dimensions",
        title: {
          zh: "面板与外形尺寸",
          en: "Panel and dimensions",
        },
        images: [
          {
            src: productDetailImage("AL808", "AL808_Panel.gif"),
            alt: { zh: "AL808 面板说明图", en: "AL808 front panel reference" },
            caption: { zh: "面板显示与按键", en: "Front panel display and keys" },
          },
          {
            src: productDetailImage("AL808", "AL808_dim.gif"),
            alt: { zh: "AL808 外形尺寸图", en: "AL808 dimension drawing" },
            caption: { zh: "外形与开孔尺寸", en: "Outline and cutout dimensions" },
          },
        ],
      },
      {
        kind: "images",
        id: "wiring",
        title: {
          zh: "端子接线参考",
          en: "Wiring reference",
        },
        description: {
          zh: "不同壳体与输出组合的端子定义不同，采购和工程确认时应以对应型号说明书为准。",
          en: "Terminal assignments vary by enclosure and output option. Confirm the final wiring against the manual for the selected model.",
        },
        images: [
          {
            src: productDetailImage("AL808", "AL808_Wiring.gif"),
            alt: { zh: "AL808 标准接线图", en: "AL808 standard wiring diagram" },
            caption: { zh: "AL808 标准接线", en: "AL808 standard wiring" },
          },
          {
            src: productDetailImage("AL808", "AL808DE_Wiring.gif"),
            alt: { zh: "AL808D / AL808E 接线图", en: "AL808D / AL808E wiring diagram" },
            caption: { zh: "AL808D / AL808E 接线", en: "AL808D / AL808E wiring" },
          },
          {
            src: productDetailImage("AL808", "AL808M_Wiring.gif"),
            alt: { zh: "AL808M 接线图", en: "AL808M wiring diagram" },
            caption: { zh: "AL808M 接线", en: "AL808M wiring" },
          },
          {
            src: productDetailImage("AL808", "AL808AB_Wire.gif"),
            alt: { zh: "AL808A / AL808B 接线图", en: "AL808A / AL808B wiring diagram" },
            caption: { zh: "AL808A / AL808B 接线", en: "AL808A / AL808B wiring" },
          },
          {
            src: productDetailImage("AL808", "AL808_Single_Phase.gif"),
            alt: { zh: "AL808 单相可控硅触发接线", en: "AL808 single-phase SCR trigger wiring" },
            caption: { zh: "单相可控硅触发", en: "Single-phase SCR trigger" },
          },
          {
            src: productDetailImage("AL808", "AL808_Three_Phase.gif"),
            alt: { zh: "AL808 三相可控硅触发接线", en: "AL808 three-phase SCR trigger wiring" },
            caption: { zh: "三相可控硅触发", en: "Three-phase SCR trigger" },
          },
        ],
      },
      {
        kind: "table",
        id: "specifications",
        title: {
          zh: "主要规格参数",
          en: "Key specifications",
        },
        columns: tableColumns,
        rows: [
          {
            label: { zh: "测量精度", en: "Measurement accuracy" },
            value: { zh: "±0.2% FS + 1 digit", en: "±0.2% FS + 1 digit" },
          },
          {
            label: { zh: "采样周期", en: "Sampling period" },
            value: { zh: "125 ms", en: "125 ms" },
          },
          {
            label: { zh: "输入信号", en: "Input signals" },
            value: {
              zh: "热电偶 J、K、E、R、S、T、B、N；热电阻 Pt100、Cu50；线性电流/电压信号",
              en: "Thermocouple J, K, E, R, S, T, B, N; RTD Pt100, Cu50; linear current and voltage inputs",
            },
          },
          {
            label: { zh: "输出方式", en: "Output modes" },
            value: {
              zh: "继电器、SSR 逻辑电平、可控硅过零触发、可控硅移相触发、模拟量输出",
              en: "Relay, SSR logic, SCR zero-cross trigger, SCR phase-angle trigger and analog output",
            },
          },
          {
            label: { zh: "控制算法", en: "Control algorithm" },
            value: {
              zh: "改进型 PID，支持自整定、手动/自动控制和程序控制选件",
              en: "Advanced PID with auto-tuning, manual/automatic control and optional program control",
            },
          },
          {
            label: { zh: "通讯接口", en: "Communication" },
            value: {
              zh: "RS-232 / RS-422 / RS-485 选配",
              en: "Optional RS-232 / RS-422 / RS-485",
            },
          },
          {
            label: { zh: "工作环境", en: "Operating environment" },
            value: {
              zh: "0-50°C，≤85% RH，无凝露",
              en: "0-50°C, <=85% RH, non-condensing",
            },
          },
        ],
      },
      {
        kind: "documents",
        id: "documents",
        title: {
          zh: "相关技术资料",
          en: "Related technical documents",
        },
        documents: [
          ...seriesManualDocuments,
          {
            title: { zh: "AL808 通讯说明", en: "AL808 communication guide" },
            href: downloadAsset("AL808_COM.pdf"),
            type: "PDF",
          },
        ],
      },
    ],
  },
  AL810: {
    sections: [
      {
        kind: "intro",
        title: {
          zh: "结构化技术资料",
          en: "Structured technical reference",
        },
        paragraphs: [
          {
            zh: "AL810 是面向可控硅单相移相电路的工业调节器，可输出单相移相脉冲，适用于电阻性负载、电感性负载、变压器一次侧和整流调压装置。",
            en: "The AL810 is an industrial single-phase SCR phase-angle controller. It outputs phase-angle trigger pulses for resistive loads, inductive loads, transformer primaries and rectifier voltage-regulation systems.",
          },
          {
            zh: "本页按采购和工程确认场景整理型号编码、外形安装、端子接线、触发电路和规格参数。",
            en: "This page organizes model coding, dimensions, mounting, terminal wiring, SCR trigger circuits and specifications for purchasing and engineering checks.",
          },
        ],
        anchors: standardAnchors,
      },
      {
        kind: "table",
        id: "model-coding",
        title: { zh: "型号编码", en: "Model coding" },
        description: {
          zh: "AL810 通常按通讯功能和可选功能确认完整订货型号。",
          en: "The AL810 purchase model is normally confirmed by communication interface and optional functions.",
        },
        columns: tableColumns,
        rows: [
          {
            label: { zh: "基本型号", en: "Basic model" },
            value: {
              zh: "AL810 单相可控硅移相控制器",
              en: "AL810 single-phase SCR phase-angle controller",
            },
          },
          ...phaseControlOptionRows,
          {
            label: { zh: "型号示例", en: "Model example" },
            value: {
              zh: "AL810/485/QP8 表示带 RS-485 通讯、8 段程序控制的单相移相控制器",
              en: "AL810/485/QP8 indicates a single-phase phase-angle controller with RS-485 communication and 8-segment program control",
            },
          },
        ],
      },
      {
        kind: "images",
        id: "dimensions",
        title: { zh: "面板、外形与安装", en: "Panel, dimensions and mounting" },
        images: [
          {
            src: productDetailImage("AL810", "AL810_Panel.gif"),
            alt: { zh: "AL810 面板说明图", en: "AL810 front panel reference" },
            caption: { zh: "面板显示与按键", en: "Front panel display and keys" },
          },
          {
            src: productDetailImage("AL810", "AL810_Dim.gif"),
            alt: { zh: "AL810 外形尺寸图", en: "AL810 dimension drawing" },
            caption: { zh: "外形尺寸", en: "Outline dimensions" },
          },
          {
            src: productDetailImage("AL810", "AL810_Mounting.gif"),
            alt: { zh: "AL810 安装尺寸图", en: "AL810 mounting drawing" },
            caption: { zh: "安装尺寸", en: "Mounting dimensions" },
          },
        ],
      },
      {
        kind: "images",
        id: "wiring",
        title: { zh: "端子接线与触发电路", en: "Wiring and trigger circuits" },
        description: {
          zh: "可控硅接线与负载类型、模块形式有关，现场接线前应核对说明书和电气设计图。",
          en: "SCR wiring depends on load type and module configuration. Confirm the manual and panel wiring design before field wiring.",
        },
        images: [
          {
            src: productDetailImage("AL810", "AL810_Wiring.gif"),
            alt: { zh: "AL810 端子接线图", en: "AL810 terminal wiring diagram" },
            caption: { zh: "端子接线", en: "Terminal wiring" },
          },
          {
            src: productDetailImage("AL810", "AL810_SCR1.gif"),
            alt: { zh: "AL810 可控硅触发电路一", en: "AL810 SCR trigger circuit 1" },
            caption: { zh: "单相可控硅触发电路", en: "Single-phase SCR trigger circuit" },
          },
          {
            src: productDetailImage("AL810", "AL810_SCR.gif"),
            alt: { zh: "AL810 可控硅触发电路二", en: "AL810 SCR trigger circuit 2" },
            caption: { zh: "单相调压接线参考", en: "Single-phase voltage-regulation wiring reference" },
          },
        ],
      },
      {
        kind: "table",
        id: "specifications",
        title: { zh: "主要规格参数", en: "Key specifications" },
        columns: tableColumns,
        rows: [
          ...phaseControlCommonSpecRows,
          {
            label: { zh: "输出方式", en: "Output mode" },
            value: {
              zh: "可控硅单相移相触发脉冲输出",
              en: "Single-phase SCR phase-angle trigger pulse output",
            },
          },
        ],
      },
      {
        kind: "documents",
        id: "documents",
        title: { zh: "相关技术资料", en: "Related technical documents" },
        description: {
          zh: "AL810 资料归入 AL808 / AL809 / AL810 / AL830 系列说明书。",
          en: "AL810 documentation is included in the AL808 / AL809 / AL810 / AL830 series manuals.",
        },
        documents: seriesManualDocuments,
      },
    ],
  },
  AL830: {
    sections: [
      {
        kind: "intro",
        title: {
          zh: "结构化技术资料",
          en: "Structured technical reference",
        },
        paragraphs: [
          {
            zh: "AL830 是面向可控硅三相移相电路的工业调节器，适用于三相星形、三角形接法的大功率电炉、整流调压和工业电压调节应用。",
            en: "The AL830 is an industrial three-phase SCR phase-angle controller for high-power electric furnaces, rectifier regulation and industrial three-phase voltage-control systems.",
          },
          {
            zh: "本页将原 rich HTML 拆成型号编码、外形安装、三相接线、典型功率电路和规格参数，方便工程师快速核对。",
            en: "This page splits the legacy rich HTML into model coding, dimensions, mounting, three-phase wiring, typical power circuits and specifications for fast engineering review.",
          },
        ],
        anchors: standardAnchors,
      },
      {
        kind: "table",
        id: "model-coding",
        title: { zh: "型号编码", en: "Model coding" },
        description: {
          zh: "AL830 通常按可选功能确认完整订货型号；通讯和特殊要求建议询价时同步确认。",
          en: "The AL830 purchase model is normally confirmed by optional functions. Confirm communication and special requirements during quotation.",
        },
        columns: tableColumns,
        rows: [
          {
            label: { zh: "基本型号", en: "Basic model" },
            value: {
              zh: "AL830 三相可控硅移相控制器",
              en: "AL830 three-phase SCR phase-angle controller",
            },
          },
          {
            label: { zh: "可选功能", en: "Options" },
            value: {
              zh: "QP4、QP8、QP16、QP30 程序控制；So 输出信号缓变；Svtr / Pvtr 变送；Rem 模拟遥控设定；Prt 打印记录",
              en: "QP4, QP8, QP16 and QP30 program control; So soft output; Svtr / Pvtr transmission; Rem remote setpoint; Prt print record",
            },
          },
          {
            label: { zh: "型号示例", en: "Model example" },
            value: {
              zh: "AL830/QP8 表示带 8 段程序控制功能的三相移相控制器",
              en: "AL830/QP8 indicates a three-phase phase-angle controller with 8-segment program control",
            },
          },
        ],
      },
      {
        kind: "images",
        id: "dimensions",
        title: { zh: "面板、外形与安装", en: "Panel, dimensions and mounting" },
        images: [
          {
            src: productDetailImage("AL830", "AL830_Panel.gif"),
            alt: { zh: "AL830 面板说明图", en: "AL830 front panel reference" },
            caption: { zh: "面板显示与按键", en: "Front panel display and keys" },
          },
          {
            src: productDetailImage("AL830", "AL830_Dim.gif"),
            alt: { zh: "AL830 外形尺寸图", en: "AL830 dimension drawing" },
            caption: { zh: "外形尺寸", en: "Outline dimensions" },
          },
          {
            src: productDetailImage("AL830", "AL830_Mounting.gif"),
            alt: { zh: "AL830 安装尺寸图", en: "AL830 mounting drawing" },
            caption: { zh: "安装尺寸", en: "Mounting dimensions" },
          },
        ],
      },
      {
        kind: "images",
        id: "wiring",
        title: { zh: "端子接线与功率电路", en: "Wiring and power circuits" },
        description: {
          zh: "三相功率回路必须结合负载、可控硅模块和柜内保护设计确认，不建议只凭页面图示直接接线。",
          en: "Three-phase power wiring must be confirmed together with load type, SCR module and protection design. Do not wire from the web diagrams alone.",
        },
        images: [
          {
            src: productDetailImage("AL830", "AL830_Wiring.gif"),
            alt: { zh: "AL830 端子接线图", en: "AL830 terminal wiring diagram" },
            caption: { zh: "端子接线", en: "Terminal wiring" },
          },
          {
            src: productDetailImage("AL830", "AL830_Diode.gif"),
            alt: { zh: "AL830 三相整流调压接线图", en: "AL830 three-phase rectifier voltage-control wiring" },
            caption: { zh: "三相整流调压", en: "Three-phase rectifier voltage control" },
          },
          {
            src: productDetailImage("AL830", "AL830_Single_Phase.gif"),
            alt: { zh: "AL830 单相可控硅电路", en: "AL830 single-phase SCR circuit" },
            caption: { zh: "单相可控硅电路", en: "Single-phase SCR circuit" },
          },
          {
            src: productDetailImage("AL830", "AL830_Double_Phase.gif"),
            alt: { zh: "AL830 两相可控硅电路", en: "AL830 two-phase SCR circuit" },
            caption: { zh: "两相可控硅电路", en: "Two-phase SCR circuit" },
          },
          {
            src: productDetailImage("AL830", "AL830_Bridge.gif"),
            alt: { zh: "AL830 桥式整流控制电路", en: "AL830 bridge rectifier control circuit" },
            caption: { zh: "桥式整流控制", en: "Bridge rectifier control" },
          },
        ],
      },
      {
        kind: "table",
        id: "specifications",
        title: { zh: "主要规格参数", en: "Key specifications" },
        columns: tableColumns,
        rows: [
          ...phaseControlCommonSpecRows,
          {
            label: { zh: "输出方式", en: "Output mode" },
            value: {
              zh: "可控硅三相移相触发脉冲输出",
              en: "Three-phase SCR phase-angle trigger pulse output",
            },
          },
        ],
      },
      {
        kind: "documents",
        id: "documents",
        title: { zh: "相关技术资料", en: "Related technical documents" },
        description: {
          zh: "AL830 资料归入 AL808 / AL809 / AL810 / AL830 系列说明书。",
          en: "AL830 documentation is included in the AL808 / AL809 / AL810 / AL830 series manuals.",
        },
        documents: seriesManualDocuments,
      },
    ],
  },
};
