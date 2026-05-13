import type { Lang } from "@/lib/i18n";
import { applicationDetailImage, productImage } from "@/lib/assets";

export type ApplicationCategoryKey = "knowledge" | "application";

export type ApplicationArticle = {
  slug: string;
  category: ApplicationCategoryKey;
  related: string[];
  title: Record<Lang, string>;
  excerpt: Record<Lang, string>;
  image: string;
  html: Record<Lang, string>;
};

export const applicationCategories = [
  {
    "key": "knowledge",
    "zh": "基础知识",
    "en": "Knowledge Base",
    "description": {
      "zh": "面向工程选型和调试的控制、测量与传感基础资料。",
      "en": "Control, measurement and sensor references for engineering selection and commissioning."
    }
  },
  {
    "key": "application",
    "zh": "应用方案",
    "en": "Application Solutions",
    "description": {
      "zh": "按产品和行业场景整理的典型系统接线与控制方案。",
      "en": "Typical wiring and control schemes organized by product and industrial scenario."
    }
  }
] as const;

export const applicationArticles: ApplicationArticle[] = [
  {
    "slug": "control-basics",
    "category": "knowledge",
    "related": [
      "AL808",
      "PC900",
      "DC220"
    ],
    "title": {
      "zh": "工业过程控制常用名词解释",
      "en": "Industrial Process Control Terms"
    },
    "excerpt": {
      "zh": "解释闭环控制、传感器、控制输出、ON/OFF、PID、曲线程序、时间比例输出和电动阀门控制等常用概念。",
      "en": "A practical reference for closed-loop control, sensors, output types, ON/OFF control, PID, ramp programs, time-proportioning output and motorized valve control."
    },
    "image": applicationDetailImage("knowledge", "Closed_Loop.gif"),
    "html": {
      "zh": "<h2>目录</h2>\n        <ul>\n          <li>PID控制与调节原理</li>\n          <li>闭环控制</li>\n          <li>传感器</li>\n          <li>控制输出</li>\n          <li>ON/OFF控制</li>\n          <li>PID控制</li>\n          <li>曲线程序控制</li>\n          <li>时间比例输出（Time Proportioning Action）</li>\n          <li>电动阀门控制</li>\n        </ul>\n\n        <h2>PID控制与调节原理</h2>\n        <p>ALTEC控制器能自动对诸如温度、湿度、压力、流量等过程变量进行测控—实际上，大多数的物理量都能用模拟信号来描述。下例中，以最常见的温度变量来说明控制原理，该原理对于其它的模拟变量也是适用的。</p>\n        <img src=\"/altec/images/applications/details/knowledge/Closed_Loop.gif\" alt=\"工业过程控制常用名词解释 diagram\">\n\n        <h2>闭环控制</h2>\n        <p>上面是一个温度闭环控制系统示意图。它由测量温度的传感器、控制器和功率调节器组成。</p>\n        <p>在工作过程中，控制器将实时测量温度和被称为“设定值”（Setting Value）的目标温度进行比较，然后通过调节输出功率使它们达到同一个温度值。</p>\n        <p>测量温度值通常被称为过程值（Process Value），或缩写为PV。</p>\n        <p>设定值和测量值之差被称为“误差信号”。 </p>\n\n        <h2>传感器</h2>\n        <p>首先，自动控制器需要对实时过程值进行测量。</p>\n        <p>ALTEC控制器几乎可以接受任何类型的传感器输入。</p>\n        <p>必要时，须在仪表内对测量值进行标定（线性化）。</p>\n        <p>在温度应用系统中，热电偶和热电阻是最常用的温度传感器，选用类型则取决于温度范围和它工作的环境。</p>\n        <p>在本目录的传感器条目中，你将得到关于热电偶和热电阻的更为详尽的信息。</p>\n        <p>在有的应用场合中，温度传感器不能（或很难）附着并固定安装，此时，可以考虑使用非接触式的红外或光学高温温度计。</p>\n        <p>ALTEC控制器能直接接受来自应变仪、压力、流量或pH传感器的信号。</p>\n        <p>在大型应用项目中，通常使用信号调节器将传感器的测量值变送为4~20mA或0~10Vdc的信号后再输入控制器。在ALTEC的系列控制器中，可以很方便地将输入标定到想得到的显示范围。</p>\n\n        <h2>控制输出</h2>\n        <p>控制器需要输出信号对加热功率、流量或者压力等过程值进行实时调节，以达到控制的目的。</p>\n        <p>主要的输出类型有：</p>\n        <P>继电器，对交流接触器或电磁阀进行操作，可用于加热/冷却应用系统。</p>\n        <p>逻辑电平，用于驱动固态继电器。固态继电器优点：寿命长、免维护和快速响应，主要应用于需高精度控温场合。</p>\n        <p>可控硅过零输出，具有与固态继电器相同的优点，应用于大功率场合更为理想。</p>\n        <p>直流电流或电压，可用于阀位控制，或驱动可控硅移相模块（用于单相或三相加热应用系统），或驱动变频器等应用场合。</p>\n\n        <h2>ON/OFF控制</h2>\n        <p>ON/OFF控制的动作如下图所示。当温度低于设定值时，加热继电器吸合，满功率运行；当温度高于设定值时，加热继电器断开，输出关闭。实测温度将在设定值上下出现振荡，振幅和周期和系统的热惯性有关，主要应用于对控温精度要求不高的场合。</p>\n        <p>测量值PV在设定值SP附近时，因波动等关系，继电器触点常发生反复动作，设定一动作回差值，即可防止继电器的反复动作。 </p>\n        <img src=\"/altec/images/applications/details/knowledge/OnOff_Control.gif\" alt=\"工业过程控制常用名词解释 diagram\">\n\n        <h2>PID控制</h2>\n        <p>在大部分工业处理中（比如，塑料挤出、金属处理或者半导体处理），要求对温度进行稳定的“直线”控制，如下图。ALTEC采用高级PID算法来达到这个要求。</p>\n        <p>PID控制也叫做“三项”控制。这三项是：</p>\n        <p>P—Proportional，比例</p>\n        <p>I—Integral，积分</p>\n        <p>D—Derivative，微分</p>\n        <p>控制器把的输出就是三面上个项目之和。</p>\n        <p>这一组合输出是误差信号的大小和持续时间和温度（或过程值）的变化速率的函数。</p>\n        <img src=\"/altec/images/applications/details/knowledge/PID_Control.gif\" alt=\"工业过程控制常用名词解释 diagram\">\n\n        <h2>曲线程序控制</h2>\n        <p>当ALTEC控制器作为曲线程序控制器使用时，相当于控制器内有一个设定值发生器和一个PID控制器。</p>\n        <p>设定值发生器按照设定的曲线不断地修改目标值（SV），PID控制器按照目标值(SV)进行控制，使得实测值(PV)跟踪目标值进行变化，达到曲线程序控制的目的。</p>\n        <img src=\"/altec/images/applications/details/knowledge/Temp_Program.gif\" alt=\"工业过程控制常用名词解释 diagram\">\n        <img src=\"/altec/images/applications/details/knowledge/Program.gif\" alt=\"工业过程控制常用名词解释 diagram\">\n\n        <h2>时间比例输出（Time Proportioning Action）</h2>\n        <p>为了获得高精度的温度控制效果，PID控制器需要根据温度偏差对输出功率从0 到 100%进行平滑调节。</p>\n        <p>时间比例输出通过改变电磁继电器、可控硅或固态继电器输出的吸合时间比来得到0 到 100%的可变功率。下面的插图形象地阐明了这一原理。</p>\n        <p>时间比例输出的动作周期时间越短，加热输出功率越均匀，控温精度越高。但频繁动作缩短电磁继电器的使用寿命。</p>\n        <p>在一般的加热系统中，采用电磁继电器，加热动作周期一般设为20秒，在热惯性较小的系统需要一个更短的动作周期。此时，通常使用固态继电器或可控硅，加热动作周期一般设为0.2秒到2秒。</p>\n        <img src=\"/altec/images/applications/details/knowledge/Time_Proportioning.gif\" alt=\"工业过程控制常用名词解释 diagram\">\n\n        <h2>电动阀门控制</h2>\n        <p>电动阀有两个绕组，其中一个用于开阀，另一个则用于关阀。电动阀的阀位控制是通过调节开阀时间或关阀时间来实现的。有的阀配备用于阀位反馈的电位计，有的则没有。</p>\n        <p>ALTEC控制器有专为电动阀位控制而设计的算法。可满足电动阀阀位控制。</p>\n        <img src=\"/altec/images/applications/details/knowledge/VP_Control.gif\" alt=\"工业过程控制常用名词解释 diagram\">",
      "en": "<h2>PID Control and Regulation</h2><p>ALTEC controllers measure and control process variables such as temperature, humidity, pressure and flow. The examples use temperature because it is common in industrial equipment, but the same principle applies to other analog variables.</p><figure><img src=\"/altec/images/applications/details/knowledge/Closed_Loop.gif\" alt=\"Closed-loop temperature control system\"><figcaption>Closed-loop temperature control system</figcaption></figure><h2>Closed-Loop Control</h2><p>A closed-loop system compares the measured process value (PV) with the target setting value (SV). The controller adjusts output power to reduce the error between PV and SV until the process reaches the required value.</p><h2>Sensors</h2><p>Automatic controllers first need a reliable measurement. ALTEC controllers accept many sensor inputs, including thermocouples, resistance temperature detectors, strain, pressure, flow and pH signals. For large systems, signal conditioners are often used to convert sensor measurements to 4-20mA or 0-10Vdc before entering the controller.</p><h2>Control Outputs</h2><p>Controllers use outputs to regulate heating power, flow, pressure or other process values. Common outputs include relays for contactors and valves, logic outputs for solid-state relays, SCR zero-cross outputs for higher-power loads, and DC current or voltage outputs for valve positioners, phase-angle power modules or variable-frequency drives.</p><h2>ON/OFF Control</h2><p>ON/OFF control switches full output on below the setpoint and switches output off above the setpoint. The process value oscillates around the setpoint, so this method is best for applications where high precision is not required. A hysteresis value prevents relay chatter near the setpoint.</p><figure><img src=\"/altec/images/applications/details/knowledge/OnOff_Control.gif\" alt=\"ON/OFF control action\"><figcaption>ON/OFF control action</figcaption></figure><h2>PID Control</h2><p>Most industrial heating processes require stable control instead of wide oscillation. PID combines proportional, integral and derivative actions. The output is based on the size of the error, how long the error persists and how quickly the process value is changing.</p><figure><img src=\"/altec/images/applications/details/knowledge/PID_Control.gif\" alt=\"PID control action\"><figcaption>PID control action</figcaption></figure><h2>Ramp and Soak Program Control</h2><p>When an ALTEC controller is used as a program controller, the instrument contains a setpoint generator and a PID controller. The generator changes SV according to the configured curve, while PID control makes PV follow that curve.</p><figure><img src=\"/altec/images/applications/details/knowledge/Temp_Program.gif\" alt=\"Temperature program curve\"><figcaption>Temperature program curve</figcaption></figure><figure><img src=\"/altec/images/applications/details/knowledge/Program.gif\" alt=\"Program control relationship\"><figcaption>Program control relationship</figcaption></figure><h2>Time-Proportioning Output</h2><p>For high-accuracy temperature control, a PID controller needs to vary output power smoothly from 0 to 100%. Time-proportioning output changes the on-time ratio of relay, SCR or solid-state relay outputs to obtain variable power. Shorter cycles deliver smoother heating, but mechanical relay life must be considered.</p><figure><img src=\"/altec/images/applications/details/knowledge/Time_Proportioning.gif\" alt=\"Time-proportioning output\"><figcaption>Time-proportioning output</figcaption></figure><h2>Motorized Valve Control</h2><p>A motorized valve normally has one winding for opening and one for closing. Valve position is controlled by adjusting open and close time. ALTEC controllers include algorithms designed for motorized valve position control.</p><figure><img src=\"/altec/images/applications/details/knowledge/VP_Control.gif\" alt=\"Motorized valve position control\"><figcaption>Motorized valve position control</figcaption></figure>"
    }
  },
  {
    "slug": "pid-control-introduction",
    "category": "knowledge",
    "related": [
      "AL808",
      "PC900",
      "TC950"
    ],
    "title": {
      "zh": "PID控制简介",
      "en": "Introduction to PID Control"
    },
    "excerpt": {
      "zh": "介绍开环控制、闭环控制、阶跃响应、PID 控制原理与参数整定的基础概念。",
      "en": "An introduction to open-loop systems, closed-loop systems, step response, PID principles and parameter tuning."
    },
    "image": productImage("AL808"),
    "html": {
      "zh": "<h2>目录</h2>\n            <ul>\n                <li>开环控制系统</li>\n                <li>闭环控制系统</li>\n                <li>阶跃响应</li>\n                <li>PID控制的原理和特点</li>\n                <li>PID控制器的参数整定</li>\n            </ul>\n\n            <p>目前工业自动化水平已成为衡量各行各业现代化水平的一个重要标志。同时，控制理论的发展也经历了古典控制理论、现代控制理论和智能控制理论三个阶段。</p>\n            <p>自动控制系统可分为开环控制系统和闭环控制系统。</p>\n            <p>一个控制系统包括控制器﹑传感器﹑变送器﹑执行机构﹑输入输出接口。控制器的输出经过输出接口﹑执行机构﹐加到被控系统上﹔控制系统的被控量﹐经过传感器﹐变送器﹐通过输入接口送到控制器。不同的控制系统﹐其传感器﹑变送器﹑执行机构是不一样的。</p>\n            <p>目前，PID控制及其控制器或智能PID控制器（仪表）已经很多，产品已在工程实际中得到了广泛的应用，有各种各样的PID控制器产品，各大公司均开发了具有PID参数自整定功能的智能调节器，其中PID控制器参数的自动调整是通过智能化调整或自校正、自适应算法来实现。有利用PID控制实现的压力、温度、流量、液位控制器，能实现PID控制功能的可编程控制器(PLC)，还有可实现PID控制的PC系统等等。</p>\n\n            <h2>开环控制系统</h2>\n            <p>开环控制系统是指被控对象的输出(被控制量)对控制器的输出没有影响。在这种控制系统中，不依赖将被控量反送回来以形成任何闭环回路。</p>\n\n            <h2>闭环控制系统</h2>\n            <p>闭环控制系统的特点是系统被控对象的输出(被控制量)会反送回来影响控制器的输出，形成一个或多个闭环。闭环控制系统有正反馈和负反馈，若反馈信号与系统给定值信号相反，则称为负反馈，若极性相同，则称为正反馈，一般闭环控制系统均采用负反馈，又称负反馈控制系统。</p>\n\n            <h2>阶跃响应</h2>\n            <p>阶跃响应是指将一个阶跃输入加到系统上时，系统的输出。稳态误差是指系统的响应进入稳态后﹐系统的期望输出与实际输出之差。控制系统的性能可以用稳、准、快三个字来描述。稳是指系统的稳定性，一个系统要能正常工作，首先必须是稳定的，从阶跃响应上看应该是收敛的﹔准是指控制系统的准确性、控制精度，通常用稳态误差来描述，它表示系统输出稳态值与期望值之差﹔快是指控制系统响应的快速性，通常用上升时间来定量描述。</p>\n\n            <h2>PID控制的原理和特点</h2>\n            <p>在工程实际中，应用最为广泛的调节器控制规律为比例、积分、微分控制，简称PID控制，又称PID调节。PID控制器问世至今已有近70年历史，它以其结构简单、稳定性好、工作可靠、调整方便而成为工业控制的主要技术之一。当被控对象的结构和参数不能完全掌握，或得不到精确的数学模型时，控制理论的其它技术难以采用时，系统控制器的结构和参数必须依靠经验和现场调试来确定，这时应用PID控制技术最为方便。即当我们不完全了解一个系统和被控对象﹐或不能通过有效的测量手段来获得系统参数时，最适合用PID控制技术。PID控制，实际中也有PI和PD控制。PID控制器就是根据系统的误差，利用比例、积分、微分计算出控制量进行控制的。</p>\n\n            <p>比例（P）控制</p>\n\n            <p>比例控制是一种最简单的控制方式。其控制器的输出与输入误差信号成比例关系。当仅有比例控制时系统输出存在稳态误差。</p>\n\n            <p>积分（I）控制</p>\n\n            <p>在积分控制中，控制器的输出与输入误差信号的积分成正比关系。对一个自动控制系统，如果在进入稳态后存在稳态误差，则称这个控制系统是有稳态误差的或简称有差系统。为了消除稳态误差，在控制器中必须引入“积分项”。积分项对误差取决于时间的积分，随着时间的增加，积分项会增大。这样，即便误差很小，积分项也会随着时间的增加而加大，它推动控制器的输出增大使稳态误差进一步减小，直到等于零。因此，比例+积分(PI)控制器，可以使系统在进入稳态后无稳态误差。</p>\n\n            <p>微分（D）控制</p>\n\n            <p>在微分控制中，控制器的输出与输入误差信号的微分（即误差的变化率）成正比关系。</p>\n            <p>自动控制系统在克服误差的调节过程中可能会出现振荡甚至失稳。其原因是由于存在有较大惯性组件（环节）或有滞后组件，具有抑制误差的作用，其变化总是落后于误差的变化。解决的办法是使抑制误差的作用的变化“超前”，即在误差接近零时，抑制误差的作用就应该是零。这就是说，在控制器中仅引入“比例”项往往是不够的，比例项的作用仅是放大误差的幅值，而目前需要增加的是“微分项”，它能预测误差变化的趋势，这样，具有比例+微分的控制器，就能够提前使抑制误差的控制作用等于零，甚至为负值，从而避免了被控量的严重超调。所以对有较大惯性或滞后的被控对象，比例+微分(PD)控制器能改善系统在调节过程中的动态特性。</p>\n\n            <h2>PID控制器的参数整定</h2>\n            <p>PID控制器的参数整定是控制系统设计的核心内容。它是根据被控过程的特性确定PID控制器的比例系数、积分时间和微分时间的大小。</p>\n            <p>PID控制器参数整定的方法很多，概括起来有两大类：</p>\n            <p>一是理论计算整定法。它主要是依据系统的数学模型，经过理论计算确定控制器参数。这种方法所得到的计算数据未必可以直接用，还必须通过工程实际进行调整和修改。</p>\n            <p>二是工程整定方法，它主要依赖工程经验，直接在控制系统的试验中进行，且方法简单、易于掌握，在工程实际中被广泛采用。</p>\n            <p>PID控制器参数的工程整定方法，主要有临界比例法、反应曲线法和衰减法。</p>\n            <p>三种方法各有其特点，其共同点都是通过试验，然后按照工程经验公式对控制器参数进行整定。但无论采用哪一种方法所得到的控制器参数，都需要在实际运行中进行最后调整与完善。</p>\n\n            <p>现在一般采用的是临界比例法。利用该方法进行PID控制器参数的整定步骤如下：</p>\n\n            <p>(1)首先预选择一个足够短的采样周期让系统工作﹔</p>\n\n            <p>(2)仅加入比例控制环节，直到系统对输入的阶跃响应出现临界振荡，记下这时的比例放大系数和临界振荡周期﹔</p>\n\n            <p>(3)在一定的控制度下通过公式计算得到PID控制器的参数。</p>",
      "en": "<h2>Control System Basics</h2><p>Industrial automation relies on controllers, sensors, transmitters, actuators and input/output interfaces. The controller output is applied to the controlled process through the actuator, while the process value is returned to the controller through measurement devices.</p><h2>Open-Loop Systems</h2><p>In an open-loop system, the output of the process is not fed back to the controller. The controller acts according to a command or preset value, but it cannot correct the result if the process changes or is disturbed.</p><h2>Closed-Loop Systems</h2><p>A closed-loop system measures the controlled variable and feeds it back to the controller. The controller compares feedback with the target value and adjusts output to reduce error. This structure is the foundation of accurate industrial process control.</p><h2>Step Response</h2><p>A step response describes how a process changes after a sudden input change. Overshoot, delay, rise time and settling behavior help engineers understand how aggressive or stable the control loop should be.</p><h2>PID Principles</h2><p>PID control combines proportional, integral and derivative actions. Proportional action responds to current error, integral action eliminates accumulated error and derivative action responds to the rate of change. Together they provide stable and accurate control for pressure, temperature, flow and level systems.</p><h2>Parameter Tuning</h2><p>PID parameters can be tuned manually or with intelligent auto-tuning. The goal is to obtain fast response with minimal overshoot, stable settling and acceptable disturbance rejection for the actual equipment.</p>"
    }
  },
  {
    "slug": "temperature-measurement-basics",
    "category": "knowledge",
    "related": [
      "AL807",
      "AL808",
      "PC900"
    ],
    "title": {
      "zh": "温度测量的基本概念",
      "en": "Temperature Measurement Basics"
    },
    "excerpt": {
      "zh": "整理温度定义、温标、温度测量仪表分类、热电偶和热电阻的基本知识。",
      "en": "Covers temperature definition, temperature scales, instrument categories, thermocouples and resistance temperature detectors."
    },
    "image": productImage("PC900"),
    "html": {
      "zh": "<h2>目录</h2>\n            <ul>\n                <li>温度定义</li>\n                <li>温度测量仪表的分类</li>\n                <li>热电偶</li>\n                <li>热电阻</li>\n            </ul>\n\n            <h2>温度定义</h2>\n            <p>温度是表征物体冷热程度的物理量。温度只能通过物体随温度变化的某些特性来间接测量，而用来量度物体温度数值的标尺叫温标。它规定了温度的读数起点（零点）和测量温度的基本单位。目前国际上用得较多的温标有华氏温标、摄氏温标、热力学温标和国际实用温标。</p>\n            <p>华氏温标（℉）规定：在标准大气压下，冰的熔点为32度，水的沸点为212度，中间划分180等分，每等分为华氏1度，符号为℉。</p>\n            <p>摄氏温度（℃）规定：在标准大气压下，冰的熔点为0度，水的沸点为100度，中间划分100等分，每第分为报氏1度，符号为℃。</p>\n            <p>热力学温标又称开尔文温标，或称绝对温标，它规定分子运动停止时的温度为绝对零度，符号为K。</p>\n            <p>国际实用温标是一个国际协议性温标，它与热力学温标相接近，而且复现精度高，使用方便。目前国际通用的温标是1975年第15届国际权度大会通过的《1968年国际实用温标-1975年修订版》，记为：IPTS-68（Rev-75）。但由于IPTS-68温示存在一定的不足，国际计量委员会在18届国际计量大会第七号决议授权予1989年会议通过了1990年国际温标ITS-90，ITS-90温标替代IPTS-68。我国自1994年1月1日起全面实施ITS-90国际温标。</p>\n\n            <h2>温度测量仪表的分类</h2>\n            <p>温度测量仪表按测温方式可分为接触式和非接触式两大类。通常来说接触式测温仪表测温仪表比较简单、可靠，测量精度较高；但因测温元件与被测介质需要进行充分的热交金刚，帮需要一定的时间才能达到热平衡，所以存在测温的延迟现象，同时受耐高温材料的限制，不能应用于很高的温度测量。非接触式仪表测温是通过热辐射原理来测量温度的，测温元件不需与被测介质接触，测温范围广，不受测温上限的限制，也不会破坏被测物体的温度场，反应速度一般也比较快；但受到物体的发射率、测量距离、烟尘和水气等外界因素的影响，其测量误差较大。</p>\n\n            <h2>热电偶</h2>\n            <p>热电偶是工业上最常用的温度检测元件之一。其优点是：</p>\n            <p>① 测量精度高。因热电偶直接与被测对象接触，不受中间介质的影响。</p>\n            <p>② 测量范围广。常用的热电偶从-50~+1600℃均可连续测量，某些特殊热电偶最低可测到-269℃（如金铁镍铬），最高可达+2800℃（如钨-铼）。</p>\n            <p>③ 构造简单，使用方便。热电偶通常是由两种不同的金属丝组成，而且不受大小和开头的限制，外有保护套管，用起来非常方便。</p>\n\n            <p>(1)．热电偶测温基本原理</p>\n\n            <p>将两种不同材料的导体或半导体A和B焊接起来，构成一个闭合回路。当导体A和B的两个执着点1和2之间存在温差时，两者之间便产生电动势,因而在回路中形成一个大小的电流,这种现象称为热电效应。热电偶就是利用这一效应来工作的。</p>\n\n            <p>(2)．热电偶的种类</p>\n\n            <p>常用热电偶可分为标准热电偶和非标准热电偶两大类。</p>\n            <p>标准热电偶是指国家标准规定了其热电势与温度的关系、允许误差、并有统一的标准分度表的热电偶，它有与其配套的显示仪表可供选用。</p>\n            <p>非标准化热电偶在使用范围或数量级上均不及标准化热电偶，一般也没有统一的分度表，主要用于某些特殊场合的测量。</p>\n            <p>我国从1988年1月1日起，热电偶和热电阻全部按IEC国际标准生产，并指定S、B、E、K、R、J、T七种标准化热电偶为我国统一设计型热电偶。</p>\n\n            <p>(3)．热电偶冷端的温度补偿</p>\n\n            <p>由于热电偶的材料一般都比较贵重（特别是采用贵金属时），而测温点到仪表的距离都很远，为了节省热电偶材料，降低成本，通常采用补偿导线把热电偶的冷端（自由端）延伸到温度比较稳定的控制室内，连接到仪表端子上。必须指出，热电偶补偿导线的作用只起延伸热电极，使热电偶的冷端移动到控制室的仪表端子上，它本身并不能消除冷端温度变化对测温的影响，不起补偿作用。因此，还需采用其他修正方法来补偿冷端温度t0≠0℃时对测温的影响。在使用热电偶补偿导线时必须注意型号相配，极性不能接错，补偿导线与热电偶连接端的温度不能超过100℃。</p>\n\n            <h2>热电阻</h2>\n            <p>热电阻是中低温区最常用的一种温度检测器。它的主要特点是测量精度高，性能稳定。其中铂热电阻的测量精确度是最高的，它不仅广泛应用于工业测温，而且被制成标准的基准仪。</p>\n\n            <p>(1)．热电阻测温原理及材料</p>\n\n            <p>热电阻测温是基于金属导体的电阻值随温度的增加而增加这一特性来进行温度测量的。</p>\n            <p>热电阻大都由纯金属材料制成，目前应用最多的是铂和铜，此外，现在已开始采用镍、锰和铑等材料制造热电阻。</p>\n\n            <p>(2)．热电阻测温系统的组成</p>\n\n            <p>热电阻测温系统一般由热电阻、连接导线和显示仪表等组成。必须注意以下两点：</p>\n            <p>①热电阻和显示仪表的分度号必须一致</p>\n            <p>②为了消除连接导线电阻变化的影响，必须采用三线制接法。</p>",
      "en": "<h2>Temperature Definition</h2><p>Temperature describes the hot or cold state of an object. It is measured indirectly through physical properties that change with temperature. A temperature scale defines the reading origin and unit. Common scales include Fahrenheit, Celsius, Kelvin and international practical temperature scales.</p><h2>Temperature Measurement Instruments</h2><p>Temperature instruments can be contact or non-contact devices. Industrial control systems most often use thermocouples and resistance temperature detectors because they are robust and can be connected directly to controllers.</p><h2>Thermocouples</h2><p>A thermocouple uses the thermal electromotive force generated by two different conductors. It is suitable for a wide temperature range and harsh industrial environments, but selection depends on the target temperature range, atmosphere and accuracy requirement.</p><h2>Resistance Temperature Detectors</h2><p>Resistance temperature detectors measure temperature through the change in electrical resistance of a material, commonly platinum. Pt100 sensors are widely used where higher accuracy and stability are required.</p>"
    }
  },
  {
    "slug": "humidity-measurement-basics",
    "category": "knowledge",
    "related": [
      "TH135",
      "TH136",
      "MTC35"
    ],
    "title": {
      "zh": "湿度测量的基本概念",
      "en": "Humidity Measurement Basics"
    },
    "excerpt": {
      "zh": "介绍湿度定义、湿度测量方法、测量方案选择和湿度传感器使用注意事项。",
      "en": "Explains humidity definition, measurement methods, solution selection and practical sensor considerations."
    },
    "image": productImage("TH135"),
    "html": {
      "zh": "<h2>目录</h2>\n        <ul>\n          <li>湿度定义</li>\n          <li>湿度测量方法</li>\n          <li>湿度测量方案的选择</li>\n          <li>湿度传感器选择的注意事项</li>\n\n        </ul>\n\n        <p>在工农业生产、气象、环保、国防、科研、航天等部门，经常需要对环境湿度进行测量及控制。对环境温、湿度的控制以及对工业材料水份值的监测与分析都已成为比较普遍的技术条件之一,但在常规的环境参数中，湿度是最难准确测量的一个参数。这是因为测量湿度要比测量温度复杂得多，温度是个独立的被测量，而湿度却受其他因素(大气压强、温度)的影响。此外，湿度的校准也是一个难题。国外生产的湿度标定设备价格十分昂贵。</p>\n\n        <h2>湿度定义</h2>\n        <p>在计量法中规定,湿度定义为“物象状态的量”。日常生活中所指的湿度为相对湿度，用RH%表示。总言之，即气体中(通常为空气中)所含水蒸气量(水蒸气压)与其空气相同情况下饱和水蒸气量(饱和水蒸气压)的百分比。</p>\n\n        <p>湿度很久以前就与生活存在着密切的关系,但用数量来进行表示较为困难。对湿度的表示方法有绝对湿度、相对湿度、露点、湿气与干气的比值（重量或体积）等等。</p>\n\n        <h2>湿度测量方法</h2>\n        <p>湿度测量从原理上划分有二、三十种之多。但湿度测量始终是世界计量领域中著名的难题之一。一个看似简单的量值，深究起来，涉及相当复杂的物理—化学理论分析和计算，初涉者可能会忽略在湿度测量中必需注意的许多因素，因而影响传感器的合理使用。</p>\n\n        <p>常见的湿度测量方法有：动态法（双压法、双温法、分流法），静态法（饱和盐法、硫酸法），露点法，干湿球法和电子式传感器法。</p>\n\n        <p>① 双压法、双温法是基于热力学P、V、T平衡原理，平衡时间较长，分流法是基于绝对湿气和绝对干空气的精确混合。由于采用了现代测控手段，这些设备可以做得相当精密，却因设备复杂，昂贵，运作费时费工，主要作为标准计量之用，其测量精度可达±2%RH以上。</p>\n\n        <p>② 静态法中的饱和盐法，是湿度测量中最常见的方法，简单易行。但饱和盐法对液、气两相的平衡要求很严，对环境温度的稳定要求较高。用起来要求等很长时间去平衡，低湿点要求更长。特别在室内湿度和瓶内湿度差值较大时，每次开启都需要平衡6~8小时。</p>\n\n        <p>③ 露点法是测量湿空气达到饱和时的温度，是热力学的直接结果，准确度高，测量范围宽。计量用的精密露点仪准确度可达±0.2℃甚至更高。但用现代光—电原理的冷镜式露点仪价格昂贵，常和标准湿度发生器配套使用。</p>\n\n        <p>④干湿球法，这是18世纪就发明的测湿方法。历史悠久，使用最普遍。干湿球法是一种间接方法，它用干湿球方程换算出湿度值，而此方程是有条件的：即在湿球附近的风速必需达到2.5m/s以上。普通用的干湿球温度计将此条件简化了，所以其准确度只有5~7%RH,干湿球也不属于静态法，不要简单地认为只要提高两支温度计的测量精度就等于提高了湿度计的测量精度。</p>\n\n        <p>⑤电子式湿度传感器法</p>\n\n        <p>电子式湿度传感器产品及湿度测量属于90年代兴起的行业, 近年来，国内外在湿度传感器研发领域取得了长足进步。湿敏传感器正从简单的湿敏元件向集成化、智能化、多参数检测的方向迅速发展，为开发新一代湿度测控系统创造了有利条件，也将湿度测量技术提高到新的水平。</p>\n\n        <h2>湿度测量方案的选择</h2>\n        <p>现代湿度测量方案最主要的有两种：干湿球测湿法，电子式湿度传感器测湿法。下面对这两种方案进行比较，以便客户选择适合自己的湿度测量方法。</p>\n\n        <p>干湿球湿度计的特点：</p>\n        <p>早在18世纪人类就发明了干湿球湿度计，干湿球湿度计的准确度还取决于干球、湿球两支温度计本身的精度；湿度计必须处于通风状态：只有纱布水套、水质、风速都满足一定要求时，才能达到规定的准确度。干湿球湿度计的准确度只有5％一7％RH。</p>\n\n        <p>干湿球测湿法采用间接测量方法，通过测量干球、湿球的温度经过计算得到湿度值，因此对使用温度没有严格限制，在高温环境下测湿不会对传感器造成损坏。</p>\n\n        <p>干湿球测湿法的维护相当简单，在实际使用中，只需定期给湿球加水及更换湿球纱布即可。与电子式湿度传感器相比，干湿球测湿法不会产生老化，精度下降等问题。所以干湿球测湿方法更适合于在高温及恶劣环境的场合使用。</p>\n\n        <p>电子式湿度传感器的特点：</p>\n\n        <p>而电子式湿度传感器是近几十年，特别是近20年才迅速发展起来的。湿度传感器生产厂在产品出厂前都要采用标准湿度发生器来逐支标定，电子式湿度传感器的准确度可以达到2％一3％RH。</p>\n\n        <p>在实际使用中，由于尘土、油污及有害气体的影响，使用时间一长，会产生老化，精度下降，湿度传感器年漂移量一般都在±2%左右，甚至更高。一般情况下，生产厂商会标明1次标定的有效使用时间为1年或2年，到期需重新标定。</p>\n\n        <p>电子式湿度传感器的精度水平要结合其长期稳定性去判断，一般说来，电子式湿度传感器的长期稳定性和使用寿命不如干湿球湿度传感器。</p>\n\n        <p>湿度传感器是采用半导体技术，因此对使用的环境温度有要求，超过其规定的使用温度将对传感器造成损坏。</p>\n\n        <p>所以电子式湿度传感器测湿方法更适合于在洁净及常温的场合使用。</p>\n\n        <h2>湿度传感器选择的注意事项</h2>\n        <p>①．选择测量范围</p>\n\n        <p>和测量重量、温度一样，选择湿度传感器首先要确定测量范围。除了气象、科研部门外，搞温、湿度测控的一般不需要全湿程(0-100％RH)测量。</p>\n\n        <p>②、选择测量精度</p>\n        <p>测量精度是湿度传感器最重要的指标，每提高—个百分点，对湿度传感器来说就是上一个台阶，甚至是上一个档次。因为要达到不同的精度，其制造成本相差很大，售价也相差甚远。所以使用者一定要量体裁衣，不宜盲目追求“高、精、尖”。</p>\n        <p>如在不同温度下使用湿度传感器，其示值还要考虑温度漂移的影响。众所周知，相对湿度是温度的函数，温度严重地影响着指定空间内的相对湿度。温度每变化0.1℃。将产生0.5％RH的湿度变化(误差)。使用场合如果难以做到恒温，则提出过高的测湿精度是不合适的。</p>\n\n        <p>多数情况下，如果没有精确的控温手段，或者被测空间是非密封的，±5％RH的精度就足够了。对于要求精确控制恒温、恒湿的局部空间，或者需要随时跟踪记录湿度变化的场合，再选用±3％RH以上精度的湿度传感器。</p>\n\n        <p>而精度高于±2％RH的要求恐怕连校准传感器的标准湿度发生器也难以做到，更何况传感器自身了。相对湿度测量仪表，即使在20—25℃下，要达到2％RH的准确度仍是很困难的。通常产品资料中给出的特性是在常温（20℃±10℃）和洁净的气体中测量的。</p>\n\n        <p>③、考虑时漂和温漂</p>\n        <p>在实际使用中，由于尘土、油污及有害气体的影响，使用时间一长，电子式湿度传器会产生老化，精度下降，电子式湿度传器年漂移量一般都在±2%左右，甚至更高。一般情况下，生产厂商会标明1次标定的有效使用时间为1年或2年，到期需重新标定。</p>\n\n        <p>④、其它注意事项</p>\n\n        <p>湿度传感器是非密封性的，为保护测量的准确度和稳定性，应尽量避免在酸性、碱性及含有机溶剂的气氛中使用。也避免在粉尘较大的环境中使用。为正确反映欲测空间的湿度，还应避免将传感器安放在离墙壁太近或空气不流通的死角处。如果被测的房间太大，就应放置多个传感器。</p>\n\n        <p>有的湿度传感器对供电电源要求比较高，否则将影响测量精度。或者传感器之间相互干扰，甚至无法工作。使用时应按照技术要求提供合适的、符合精度要求的供电电源。</p>\n        <p>传感器需要进行远距离信号传输时，要注意信号的衰减问题。当传输距离超过200m以上时，建议选用频率输出信号的湿度传感器。</p>",
      "en": "<h2>Humidity Definition</h2><p>Humidity is the amount of water vapor in a gas, most commonly air. Relative humidity (RH%) expresses the ratio between actual water vapor pressure and saturated water vapor pressure at the same condition. Humidity is harder to measure accurately than temperature because it is affected by air pressure, temperature and calibration conditions.</p><h2>Measurement Methods</h2><p>Humidity can be measured by many principles, including wet-and-dry bulb methods, dew point methods and electronic humidity sensors. Each method has its own range, accuracy, response time and maintenance requirements.</p><h2>Selecting a Measurement Method</h2><p>A suitable humidity solution depends on the environment, required accuracy, contamination risk, temperature range, response speed and maintenance conditions. Industrial applications often choose a practical balance between reliability and precision.</p><h2>Sensor Precautions</h2><p>Humidity sensors should be protected from condensation, corrosive gas, dust and mechanical damage. Installation position, air circulation and regular calibration all affect the reliability of long-term humidity control.</p>"
    }
  },
  {
    "slug": "al808-temperature-controller-applications",
    "category": "application",
    "related": [
      "AL808",
      "AL810",
      "AL830"
    ],
    "title": {
      "zh": "AL808系列温度控制器典型应用",
      "en": "AL808 Series Temperature Controller Applications"
    },
    "excerpt": {
      "zh": "展示 AL810、AL830 与可控硅功率模块组成单相、三相移相温度控制系统的典型接线方案。",
      "en": "Typical AL810 and AL830 phase-angle temperature control schemes using SCR power modules for single-phase and three-phase systems."
    },
    "image": applicationDetailImage("Driver", "AL810_SKKT.gif"),
    "html": {
      "zh": "<img src=\"/altec/images/applications/details/Driver/AL810_SKKT.gif\" alt=\"AL808系列温度控制器典型应用 diagram\">\n        <p>图1. AL810移相输出</p>\n        <img src=\"/altec/images/applications/details/Driver/AL830_SKKH_Delta.gif\" alt=\"AL808系列温度控制器典型应用 diagram\">\n        <p>图2. AL830温度控制系统 - 三角形接法</p>\n        <img src=\"/altec/images/applications/details/Driver/AL830_SKKH_Star.gif\" alt=\"AL808系列温度控制器典型应用 diagram\">\n        <p>图3. AL830温度控制系统 - 星形接法</p>\n\n        <img src=\"/altec/images/applications/details/Driver/AL830_SKKT_Delta.gif\" alt=\"AL808系列温度控制器典型应用 diagram\">\n        <p>图4. AL830温度控制系统 - 三角形接法</p>\n        \n        <img src=\"/altec/images/applications/details/Driver/AL830_SKKT_Star.gif\" alt=\"AL808系列温度控制器典型应用 diagram\">\n        <p>图5. AL830温度控制系统 - 星形接法</p>",
      "en": "<h2>Overview</h2><p>The AL808 series covers process control, AL810 single-phase SCR phase-angle control and AL830 three-phase SCR phase-angle control. These diagrams show typical heating power-control schemes for industrial temperature systems.</p><h2>AL810 Phase-Angle Output</h2><p>AL810 can output phase-angle trigger pulses to drive a single-phase SCR power module for stepless AC voltage regulation.</p><figure><img src=\"/altec/images/applications/details/Driver/AL810_SKKT.gif\" alt=\"AL810 phase-angle output\"><figcaption>AL810 phase-angle output</figcaption></figure><h2>AL830 Three-Phase Control</h2><p>AL830 outputs three-phase phase-angle trigger pulses and can be used with delta or star connected SCR power circuits.</p><figure><img src=\"/altec/images/applications/details/Driver/AL830_SKKH_Delta.gif\" alt=\"AL830 temperature control system - delta connection\"><figcaption>AL830 temperature control system - delta connection</figcaption></figure><figure><img src=\"/altec/images/applications/details/Driver/AL830_SKKH_Star.gif\" alt=\"AL830 temperature control system - star connection\"><figcaption>AL830 temperature control system - star connection</figcaption></figure><figure><img src=\"/altec/images/applications/details/Driver/AL830_SKKT_Delta.gif\" alt=\"AL830 temperature control system - delta connection\"><figcaption>AL830 temperature control system - delta connection</figcaption></figure><figure><img src=\"/altec/images/applications/details/Driver/AL830_SKKT_Star.gif\" alt=\"AL830 temperature control system - star connection\"><figcaption>AL830 temperature control system - star connection</figcaption></figure>"
    }
  },
  {
    "slug": "al808-special-functions",
    "category": "application",
    "related": [
      "AL808",
      "AL810",
      "AL830"
    ],
    "title": {
      "zh": "AL808特殊功能",
      "en": "AL808 Special Functions"
    },
    "excerpt": {
      "zh": "整理 AL808 系列的测量值变送、设定值变送、RS485 设定值传输、模拟设定、打印记录和非线性修正功能。",
      "en": "Covers AL808 retransmission, setpoint transmission, RS485 setpoint transfer, analog remote setpoint, print record and non-linear correction options."
    },
    "image": applicationDetailImage("AL808", "AL808_Print.gif"),
    "html": {
      "zh": "<h2>目录</h2>\n\t\n\t<h2>测量值变送</h2>\n\t<p>当仪表具有测量值变送功能时,仪表可以将测量数据变送为4~20mA或0~10V的模拟信号,方便用户用记录仪对测量数据进行记录。测量值的变送范围为SPL~SPH。</p>\n\t<p>变送模块采用D/A转换及光电隔离技术,变送分辨率达0.1%。</p>\n\t<p>当具有测量值变送功能时,不能同时选择数据通讯功能。</p>\n\t\n\t<h2>设定值模拟变送功能</h2>\n\t<p>当仪表具有设定值模拟变送功能时,仪表可以将设定值变送为4~20mA或0~10V的模拟信号,设定值的变送范围为SPL~SPH。此时仪表与具有模拟设定功能的仪表配合使用,可组成同步控制系统。</p>\n\t<p>变送模块采用D/A转换及光电隔离技术,变送分辨率达0.1%。</p>\n\t<p>当具有设定值模拟变送功能时,不能同时选择数据通讯功能。</p>\n\t\n\t<h2>设定值数据传输功能</h2>\n\t<p>当仪表具有设定值数据传输功能时,仪表可以按设定的时间间隔,通过RS485通讯线将设定值SV传输到下位机,与具有RS485通讯功能的下位机仪表配合使用,可组成多级同步控制系统。</p>\n\t\n\t<h2>模拟设定</h2>\n\t<p>当仪表具有模拟设定功能时,仪表可以接第2路0~10V输入信号(输入端子为11,12),用来作为仪表的设定值。</p>\n\t<p>0~10V输入信号对应的设定范围为SPL~SPH</p>\n\t\n\t<p>模拟设定功能使用得仪表能组成比值或串级调节系统,完成复杂的调节功能。</p>\n\t\n\t<h2>手动操作器</h2>\n\t<p>AL808作为手动操作器使用时,仪表主输入信号一般为标准信号(即调节器或DCS输出信号)，仪表将关闭调节功能,测量值的显示范围为0.0~100.0,直接将测量值作为输出值,对应的输出功率为0~100%。</p>\n\t<p>当AL808的输出为单相或三相可控硅移相输出时,仪表作为调功器使用。</p>\n\t<p>本手操器具有手动/自动无扰动双向切换功能,可通过面板按键A/M进行切换,也可通过短接后部端子12,13进行切换。</p>\n\t\n\t<h2>程序运行过程中的事件输出功能</h2>\n\t<p>在某些应用场合,在曲线程序运行过程中,需要完成某些特殊动作。</p>\n\t<p>例如,要求在运行第2段平台时,需控制一个继电器A1动作进行强制冷却;在运行第3段平台时,要求控制另一个继电器A2动作进行排气;控制过程结束时,控制另一个继电器动作A3接通电铃通知操作人员,等等。</p>\n\t<p>AL808具有3路事件输出,用户可以非常灵活的对3路事件输出进行设置,以方便控制各种外部设备同步或连锁工作。</p>\n\t\n\t<h2>曲线程序分段功率限制</h2>\n\t<p>在使用硅钼棒,钼丝或钨丝等作为加热元件的高温电炉中,加热丝的冷态电阻非常小,当仪表处于自动控制状态下,如果不进行功率限制,低温时仪表全功率输出,将导致加热元件损坏甚至电炉损毁的严重后果。</p>\n\t<p>AL808所具有分段功率限制功能最适合于此类高温电炉使用,用户可根据现场情况对各个温度段的输出功率进行限制。当分段功率限制功能参数P-PH设置为ON时,仪表具有分段功率限制功能。各个温度段的最大输出功率分别为PL1,PL2,...进行限制。</p>\n\t\n\t<h2>打印记录功能</h2>\n\t<p>AL808通过RS232串口与TPμP-A40S微型打印机相连接,可实时打印测量数据或记录曲线。记录纸的宽度为57mm。</p>\n\t<p>1). 接线</p>\n\t<p>AL808串口发送(端子19)与微型打印机串口接收端(第3脚)相连接；</p>\n\t<p>AL808串口接地(端子21)与微型打印机串口接地端(第5脚)相连接；</p>\n\t\n\t<p>2). 参数设置</p>\n\t<p>将AL808的通讯波特率(BAUD)设为与微打相同的波特率。</p>\n\t<p>将微打设置为8位无校验通讯方式。</p>\n\t<p>对仪表内与打印记录相关的参数按要求进行设置:打印功能(Pnt)、时间轴打印间隔(PLt)、数据打印时间间隔(Pdt)。</p>\n\t\n\t<p>当选择打印记录曲线时Pnt设为Cure</p>\n\t<p>打印分辨率=(SPH-SPL)/240 单位:℃/点</p>\n\t<p>其中:SPH为设定值最大值,SPL为设定值最小值</p>\n\t<p>注意:当Ctrl设为曲线程序控制方式,只有启动曲线运行时才记录数据或曲线。</p>\n\t<p>3). 记录格式</p>\n\t\n\t<img src=\"/altec/images/applications/details/AL808/AL808_Print.gif\" alt=\"AL808特殊功能 diagram\">\n\t\n\t<h2>非线性输入信号使用</h2>\n\t<p>在某些特定测量场合,输入信号具有非线性的特性,此时必须通过多点折线对仪表进行标定才能满足测量精度要求,AL808具有12点折线标定功能,可以满足用户对非线性物理量的测控要求。</p>\n\t<p>如AL808可应用于通过测量电流来间接测量磁场强度;通过测量光电信号来间接测量液体的浓度…</p>\n\t<p>AL808的输入信号范围为-10~50mV,因此当输入信号超过这一范围时,应将输入信号变送为-10~50mV范围再接仪表输入端。</p>\n\t<p>非线性输入信号的标定请参照说明书中关于线性过程标定的步骤,按顺序分别对P1,P2,P3,…,P12点进行标定。</p>\n\t<p>注意:标定过程中,标定的输入信号必须满足X1&lt;X2&lt;X3&lt; … &lt;X12的条件。</p>\n\t\n\t<img src=\"/altec/images/applications/details/knowledge/None_linear.gif\" alt=\"AL808特殊功能 diagram\">",
      "en": "<h2>PV Retransmission</h2><p>With measurement retransmission, the instrument converts measured data to a 4-20mA or 0-10V analog signal for recorders or upper-level systems. The transmission range is SPL to SPH, and the module uses D/A conversion with optical isolation.</p><h2>Setpoint Analog Retransmission</h2><p>With setpoint retransmission, the instrument outputs SV as a 4-20mA or 0-10V signal. It can work with instruments that accept analog setpoints to form synchronized control systems.</p><h2>Setpoint Data Transfer</h2><p>With setpoint data transfer, the instrument sends SV to lower-level instruments over RS485 at a configured interval. This supports multi-level synchronized control systems.</p><h2>Analog Remote Setpoint</h2><p>Analog setpoint input allows the controller to use a second 0-10V input signal as its setpoint. The 0-10V input corresponds to the configured SPL to SPH range.</p><h2>Print Record</h2><p>A print option can record process data through an external printer according to a configured print format.</p><figure><img src=\"/altec/images/applications/details/AL808/AL808_Print.gif\" alt=\"AL808 print function\"><figcaption>AL808 print function</figcaption></figure><h2>Non-Linear Correction</h2><p>Non-linear correction helps linearize special sensor or process relationships so that displayed and controlled values better match the actual engineering value.</p><figure><img src=\"/altec/images/applications/details/knowledge/None_linear.gif\" alt=\"Non-linear correction concept\"><figcaption>Non-linear correction concept</figcaption></figure>"
    }
  },
  {
    "slug": "pc900-special-functions",
    "category": "application",
    "related": [
      "PC900"
    ],
    "title": {
      "zh": "PC900特殊功能",
      "en": "PC900 Special Functions"
    },
    "excerpt": {
      "zh": "整理 PC900 的测量值变送、设定值变送、RS485 设定值传输、模拟设定、打印格式和非线性修正功能。",
      "en": "Covers PC900 retransmission, setpoint transmission, RS485 setpoint transfer, analog remote setpoint, print format and non-linear correction options."
    },
    "image": applicationDetailImage("knowledge", "Print_Format.gif"),
    "html": {
      "zh": "<h2>目录</h2>\n\n        <h2>测量值变送</h2>\n        <p>当仪表具有测量值变送功能时,仪表可以将测量数据变送为4~20mA或0~10V的模拟信号,方便用户用记录仪对测量数据进行记录。测量值的变送范围为SPL~SPH。</p>\n        <p>变送模块采用D/A转换及光电隔离技术,变送分辨率达0.1%。</p>\n        <p>当具有测量值变送功能时,不能同时选择数据通讯功能。</p>\n\n        <h2>设定值模拟变送功能</h2>\n        <p>当仪表具有设定值模拟变送功能时,仪表可以将设定值变送为4~20mA或0~10V的模拟信号,设定值的变送范围为SPL~SPH。此时仪表与具有模拟设定功能的仪表配合使用,可组成同步控制系统。</p>\n        <p>变送模块采用D/A转换及光电隔离技术,变送分辨率达0.1%。</p>\n        <p>当具有设定值模拟变送功能时,不能同时选择数据通讯功能。</p>\n\n        <h2>设定值数据传输功能</h2>\n        <p>当仪表具有设定值数据传输功能时,仪表可以按设定的时间间隔,通过RS485通讯线将设定值SV传输到下位机,与具有RS485通讯功能的下位机仪表配合使用,可组成多级同步控制系统。</p>\n\n        <h2>模拟设定</h2>\n        <p>当仪表具有模拟设定功能时,仪表可以接第2路0~10V输入信号(输入端子为16、17),用来作为仪表的设定值。</p>\n        <p>0~10V输入信号对应的设定范围为SPL~SPH</p>\n        <p>模拟设定功能及面板按键设定功能可以通过外部开关(端子14,15)进行切换,当开关短接时为模拟设定功能,当开关断开时为面板按键设定功能。</p>\n        <p>模拟设定功能使用得仪表能组成比值或串级调节系统,完成复杂的调节功能。</p>\n\n        <h2>手动操作器</h2>\n        <p>PC900作为手动操作器使用时,仪表主输入信号一般为标准信号(即调节器或DCS输出信号)，仪表将关闭调节功能,测量值的显示范围为0.0~100.0,直接将测量值作为输出值,对应的输出功率为0~100%。</p>\n        <p>当PC900的输出为单相或三相可控硅移相输出时,仪表作为调功器使用。</p>\n        <p>本手操器具有手动/自动无扰动双向切换功能,可通过面板按键A/M进行切换,也可通过短接后部端子14,15进行切换。</p>\n\n        <h2>程序运行过程中的事件输出功能</h2>\n        <p>在某些应用场合,在曲线程序运行过程中,需要完成某些特殊动作。</p>\n        <p>例如，要求在运行第2段平台时,需控制一个继电器A1动作进行强制冷却;在运行第3段平台时,要求控制另一个继电器A2动作进行排气;控制过程结束时,控制另一个继电器动作A3接通电铃通知操作人员,等等。</p>\n        <p>PC900具有3路事件输出,用户可以非常灵活的对3路事件输出进行设置,以方便控制各种外部设备同步或连锁工作。</p>\n\n        <h2>曲线程序分段功率限制</h2>\n        <p>在使用硅钼棒,钼丝或钨丝等作为加热元件的高温电炉中,加热丝的冷态电阻非常小,当仪表处于自动控制状态下,如果不进行功率限制,低温时仪表全功率输出,将导致加热元件损坏甚至电炉损毁的严重后果。</p>\n        <p>PC900所具有分段功率限制功能最适合于此类高温电炉使用,用户可根据现场情况对各个温度段的输出功率进行限制。当分段功率限制功能参数P-PK设置为ON时,仪表具有分段功率限制功能。各个温度段的最大输出功率分别为PL1,PL2,...进行限制。</p>\n\n        <h2>打印记录功能</h2>\n        <p>PC900通过RS232串口与TPμP-A40S微型打印机相连接,可实时打印测量数据或记录曲线。记录纸的宽度为57mm。</p>\n        <p>1). 接线</p>\n        <p>PC900串口发送(端子9)与微型打印机串口接收端(第3脚)相连接；</p>\n        <p>PC900串口接地(端子8)与微型打印机串口接地端(第5脚)相连接；</p>\n\n        <p>2). 参数设置</p>\n        <p>将PC900的通讯波特率(BAUD)设为与微打相同的波特率。</p>\n        <p>将微打设置为8位无校验通讯方式。</p>\n        <p>对仪表内与打印记录相关的参数按要求进行设置:打印功能(pnt)、时间轴打印间隔(PLT)、数据打印时间间隔(PDT)、时间(TT)、日期(DD)、月份(NN)、年份(YY)。</p>\n\n        <p>当选择打印记录曲线时(PNT设为(VRE)</p>\n        <p>打印分辨率=(SPH-SPL)/240 单位:℃/点</p>\n        <p>其中:SPH为设定值最大值,SPL为设定值最小值</p>\n        <p>注意:当(TRL设为曲线程序控制方式,只有启动曲线运行时才记录数据或曲线。</p>\n        <p>3). 记录格式</p>\n\n        <img src=\"/altec/images/applications/details/knowledge/Print_Format.gif\" alt=\"PC900特殊功能 diagram\">\n\n        <h2>线性输入信号使用</h2>\n        <p>在某些特定测量场合,输入信号具有非线性的特性,此时必须通过多点折线对仪表进行标定才能满足测量精度要求,PC900具有12点折线标定功能,可以满足用户对非线性物理量的测控要求。</p>\n        <p>如PC900可应用于通过测量电流来间接测量磁场强度;通过测量光电信号来间接测量液体的浓度…</p>\n        <p>PC900的输入信号范围为-10~50mV,因此当输入信号超过这一范围时,应将输入信号变送为-10~50mV范围再接仪表输入端。</p>\n        <p>非线性输入信号的标定请参照说明书中关于线性过程标定的步骤,按顺序分别对P1,P2,P3,…,P12点进行标定。</p>\n        <p>注意:标定过程中,标定的输入信号必须满足X1&lt;X2&lt;X3&lt; … &lt;X12的条件。</p>\n        \n        <img src=\"/altec/images/applications/details/knowledge/None_linear.gif\" alt=\"PC900特殊功能 diagram\">",
      "en": "<h2>PV and SV Retransmission</h2><p>PC900 can retransmit measured value or setpoint as a 4-20mA or 0-10V analog signal over the SPL to SPH range, making it easier to connect recorders and synchronized control equipment.</p><h2>Setpoint Data Transfer</h2><p>The controller can transmit SV to lower-level instruments through RS485. This is useful for multi-stage or multi-zone systems that need coordinated settings.</p><h2>Analog Setpoint Input</h2><p>A second 0-10V analog input can be used as the controller setpoint, with the input range mapped to SPL through SPH.</p><h2>Print Format</h2><p>The print function supports fixed record formats for process logging.</p><figure><img src=\"/altec/images/applications/details/knowledge/Print_Format.gif\" alt=\"PC900 print format\"><figcaption>PC900 print format</figcaption></figure><h2>Non-Linear Correction</h2><p>Non-linear correction improves display and control behavior where the sensor or process relationship is not naturally linear.</p><figure><img src=\"/altec/images/applications/details/knowledge/None_linear.gif\" alt=\"Non-linear correction concept\"><figcaption>Non-linear correction concept</figcaption></figure>"
    }
  },
  {
    "slug": "dc220-solution-ratio-mixing",
    "category": "application",
    "related": [
      "DC220",
      "AL808"
    ],
    "title": {
      "zh": "DC220在溶液配比中的应用",
      "en": "DC220 in Ratio Mixing Applications"
    },
    "excerpt": {
      "zh": "用于化工行业两种或多种液体按比例混合，主泵由 AL808 闭环控制，从泵由 DC220 按比例跟随。",
      "en": "A ratio-mixing solution where AL808 controls the master pump flow and DC220 controls the slave pump according to the required ratio."
    },
    "image": applicationDetailImage("DC220", "Pump_Control.gif"),
    "html": {
      "zh": "<p>在许多化工行业，需要对两种或多种液体按一定的比例进行混合。</p>\n\n        <p>在下例中，泵1作为主泵，与AL808控制器、流量传感器构成一闭环流量控制系统，流量可以由AL808控制器进行设置和控制，泵2作为从泵，与DC220控制器、流量变送器构成一流量比例控制系统，其流量配比可由DC220控制器进行设置和控制。</p>\n\n        <img src=\"/altec/images/applications/details/DC220/Pump_Control.gif\" alt=\"DC220在溶液配比中的应用 diagram\">",
      "en": "<h2>Application Background</h2><p>Many chemical processes require two or more liquids to be mixed according to a specific ratio. One pump can be treated as the master flow loop while another pump follows as a proportional flow loop.</p><h2>Control Structure</h2><p>In the example, pump 1 is the master pump controlled by an AL808 controller and flow sensor in a closed-loop flow system. Pump 2 is the slave pump controlled by DC220 and a flow transmitter. The flow ratio can be set and controlled through DC220.</p><figure><img src=\"/altec/images/applications/details/DC220/Pump_Control.gif\" alt=\"DC220 ratio mixing and pump control\"><figcaption>DC220 ratio mixing and pump control</figcaption></figure>"
    }
  },
  {
    "slug": "dc220-central-air-conditioning-energy-saving",
    "category": "application",
    "related": [
      "DC220"
    ],
    "title": {
      "zh": "DC220在中央空调节能改造中的应用",
      "en": "DC220 for Central Air-Conditioning Energy Saving"
    },
    "excerpt": {
      "zh": "通过检测冷媒水、冷却水进出口温差控制变频器调节泵速，使中央空调系统随负荷变化运行以降低能耗。",
      "en": "Uses temperature differential control to adjust pump speed by VFD so a central air-conditioning system follows load demand and reduces energy consumption."
    },
    "image": applicationDetailImage("DC220", "Air_Condition.gif"),
    "html": {
      "zh": "<h2>应用背景</h2>\n\n        <p>中央空调系统是一个庞大的设备群体，大量的统计结果表明，空调系统所消耗的电能，约占楼宇电耗的40—60%。就任何建筑物来说，选用空调系统都是按当地最热天气时所需的最大制冷量来选取择机型的，且留有 10%—15%的余量，各配套系统按最大负载量配置，这种选择不是最合理的。 在组成空调系统的各种设备中，水泵所消耗的电能约占整个空调系统的四分之一左右。早期空调的水泵普遍采用定流量工作，能源浪费非常严重。而实际运行时，中央空调的冷负荷总是在不断变化的，冷负荷变化时所需的冷媒水、冷却水的流量也不同，冷负荷大时所需的冷媒水、冷却水的流量也大，反之亦然。</p>\n\n        <p>而根据一项对中空调机组运行状态进行分析的权威调查显示，中空调机组90%的运行时间处于非满负荷运行状态。而冷冻水泵、冷却水泵以及风机在此90%的时间内仍处于100%的满负荷运行状态。这样就导致了\"大流量小温差\"的现象，使大量的电能白白浪费。</p>\n\n        <h2>中央空调系统的构成及工作原理</h2>\n\n        <p>中央空调系统主要由制冷机、冷却水循环系统、冷冻水循环系统、风机盘管系统和散热水塔组成，其系统结构如下图所示：</p>\n        <img src=\"/altec/images/applications/details/DC220/Air_Condition.gif\" alt=\"DC220在中央空调节能改造中的应用 diagram\">\n        <p>图1 中央空调原理</p>\n\n        <p>制冷机通过压缩机将制冷剂压缩成液态后送蒸发器中与冷冻水进行热交换，将冷冻水制冷，冷冻水泵将冷冻水送到各风机风中的冷却盘管中，由风机吹送冷风达到降温的目的。经蒸发后制冷剂在冷凝器中释放出热量，与冷却循环水进行热交换，由冷却水泵将带来热量的冷却水泵到散热水塔上由水塔风扇对其进行喷淋冷却，与大气之间进行热交换，将热量散发到大气中去。</p>\n\n        <p>空调系统在实际运行时，随着时间不同、使用空间以及气温变化，绝大多数时间内，实际需要的冷负荷低于设计值，但冷冻水泵和冷却水泵由工频控制，处于100%的满负荷运行状态，浪费大量电能。</p>\n\n        <h2>改造方案工作原理</h2>\n\n        <p>在原中央空调系统中增加DC220温差控制器、变频器控制冷冻水泵及冷却水泵，其系统结构如下图所示。</p>\n\n        <p>DC220温差控制器对中央空调冷媒水、冷却水的进出口水温进行检测，并根据实际的温差值控制变频器调整冷冻泵、冷却泵的工作状态（主要是转速），使系统冷媒流量跟随负荷的变化而同步变化，从而在确保中央空调系统能够满足人体对舒适度的要求的前提下，保证空调系统的能效率（COP值）总是处在最优化的节能运行状态，以此大幅度的降低系统能源消耗。</p>\n\n        <p>DC220温差控制器可以采用PID控制方式，使进出水温差控制在一个恒定值，也可以采用纯比例控制方式，此时将积分微分参数设置为OFF，冷却水泵和冷冻水泵的工作频率与温差成比例。这两种方案都能达到理想的节能效果。</p>\n        <img src=\"/altec/images/applications/details/DC220/Principle.gif\" alt=\"DC220在中央空调节能改造中的应用 diagram\">\n        <p>图2. DC220温差控制器在中央空调系统中的应用</p>",
      "en": "<h2>Application Background</h2><p>Central air-conditioning systems consume a large share of building electricity. Systems are usually selected for maximum cooling demand and often run pumps at full speed even when the load is lower, creating high-flow, low-temperature-difference operation and wasting energy.</p><h2>System Principle</h2><p>A central air-conditioning system includes a chiller, cooling-water circulation, chilled-water circulation, fan-coil units and a cooling tower. The chiller transfers heat from chilled water to cooling water, and pumps move both circuits through the system.</p><figure><img src=\"/altec/images/applications/details/DC220/Air_Condition.gif\" alt=\"Central air-conditioning system principle\"><figcaption>Central air-conditioning system principle</figcaption></figure><h2>Retrofit Scheme</h2><p>By adding DC220 temperature differential controllers and VFDs, the system measures inlet and outlet water temperature difference and adjusts chilled-water and cooling-water pump speed. The goal is to keep system efficiency optimized while meeting comfort requirements. DC220 can use PID control to maintain constant differential temperature or proportional control so pump frequency follows the temperature difference.</p><figure><img src=\"/altec/images/applications/details/DC220/Principle.gif\" alt=\"DC220 temperature differential control in central air-conditioning\"><figcaption>DC220 temperature differential control in central air-conditioning</figcaption></figure>"
    }
  },
  {
    "slug": "th135-psychrometric-humidity-control",
    "category": "application",
    "related": [
      "TH135"
    ],
    "title": {
      "zh": "TH135干湿球湿度控制器的原理及应用",
      "en": "TH135 Wet-and-Dry Bulb Humidity Control"
    },
    "excerpt": {
      "zh": "介绍干湿球湿度测量原理，以及 TH135 用 Pt100 测量干湿球温度实现工业湿度控制的应用。",
      "en": "Explains psychrometric humidity measurement and how TH135 uses Pt100 wet/dry bulb temperatures for industrial humidity control."
    },
    "image": applicationDetailImage("TH135", "Timber_Dry.gif"),
    "html": {
      "zh": "<h2>干湿球湿度计</h2>\n        <img src=\"/altec/images/applications/details/TH135/Psychrometer.jpg\" alt=\"TH135干湿球湿度控制器的原理及应用 diagram\">\n\n        <p>干湿球温度计是最普通的测定湿度的仪器，其构造如左图所示。</p>\n        <p>这种温度计由两支相同的温度计组成。一支的球部直接与空气接触，称干球。另一支的球部裹着纱布，纱布末端浸在装有蒸馏水的容器里，称湿球。水浸湿了纱布，并从纱布表面蒸发，从而带走了一部分热量，使湿球温度计的读数低于干球。纱布表面水分蒸发的多少，直接取决于空气中水蒸气的饱和程度(相对湿度)。</p>\n        <p>空气中的相对湿度越低，则纱布上的水分蒸发越快，而干湿球的温差也越大。知道干湿球的温差后，就可利用公式计算出相对湿度。</p>\n        <p>通常为了应用方便起见，可预先制好计算表格，在知道了干湿球的温度后，查表即得相对湿度。</p>\n\n        <h2>TH135湿度控制器</h2>\n        <img src=\"/altec/images/applications/details/TH135/Humidity_Pt100.gif\" alt=\"TH135干湿球湿度控制器的原理及应用 diagram\">\n        <p>TH135湿度控制器是采用高精度温度传感器Pt100测量干湿球温度，根据干湿球测湿原理研发的一种湿度测控设备，将经典的干湿球测湿方法与现代电子技术相结合，满足现代工业对湿度测控的高精度要求。</p>\n        <p>TH135湿度控制器可与加湿器及除湿器一起组成湿度测控系统，为工业及民用场合提供可靠、简便的湿度测控解决方案。</p>\n        <p>TH135湿度控制器可应用于食品加工、制药、环境监测、木材干燥等应用场合。</p>\n        \n        <h2>注意事项</h2>\n        <ul>\n          <li>包的湿布以疏松的棉织物为佳，并预先煮去上面的浆质和脂肪，以利吸水。纱布过厚，则“湿球”温度传感器的冷却不够充分，会影响测定结果。</li>\n          <li>蓄水容器不能紧接“湿球”温度传感器，应至少离开2—3cm。所用的水以蒸馏水为好。</li>\n          <li>纱布不应使用太久，不然会过多沾染灰尘，降低吸收水分的能力。</li>\n        </ul>\n\n        <h2>典型应用</h2>\n\n        <img src=\"/altec/images/applications/details/TH135/Timber_Dry.gif\" alt=\"TH135干湿球湿度控制器的原理及应用 diagram\">",
      "en": "<h2>Wet-and-Dry Bulb Hygrometer</h2><p>A wet-and-dry bulb hygrometer uses two identical thermometers. The dry bulb is exposed directly to air. The wet bulb is wrapped with gauze connected to distilled water. Evaporation from the wet gauze removes heat, causing the wet bulb reading to be lower than the dry bulb.</p><figure><img src=\"/altec/images/applications/details/TH135/Psychrometer.jpg\" alt=\"Wet-and-dry bulb psychrometer\"><figcaption>Wet-and-dry bulb psychrometer</figcaption></figure><h2>Humidity Principle</h2><p>The lower the relative humidity, the faster water evaporates from the gauze and the larger the temperature difference between dry and wet bulbs. Once the two temperatures are known, relative humidity can be calculated or found from a prepared table.</p><h2>TH135 Controller</h2><p>TH135 measures dry and wet bulb temperatures using high-accuracy Pt100 sensors. It combines the classic psychrometric method with modern electronic control to provide accurate industrial humidity measurement and control.</p><figure><img src=\"/altec/images/applications/details/TH135/Humidity_Pt100.gif\" alt=\"TH135 Pt100 wet-and-dry bulb measurement\"><figcaption>TH135 Pt100 wet-and-dry bulb measurement</figcaption></figure><h2>Typical Uses</h2><p>TH135 can work with humidifiers and dehumidifiers to form a humidity control system for food processing, pharmaceuticals, environmental monitoring, timber drying and other industrial or civil applications.</p><figure><img src=\"/altec/images/applications/details/TH135/Timber_Dry.gif\" alt=\"TH135 timber drying humidity control\"><figcaption>TH135 timber drying humidity control</figcaption></figure>"
    }
  },
  {
    "slug": "tc808-tension-control-applications",
    "category": "application",
    "related": [
      "TC818"
    ],
    "title": {
      "zh": "TC818张力控制器在张力控制系统中的应用",
      "en": "TC818 Tension Controller Applications"
    },
    "excerpt": {
      "zh": "TC818 用于磁粉离合器或磁粉制动器张力系统，支持手动、卷径半自动和全自动闭环张力控制。",
      "en": "TC818 is used with magnetic powder clutches or brakes for manual, roll-diameter semi-automatic and full closed-loop tension control."
    },
    "image": applicationDetailImage("TC808", "TC808_Unwind.gif"),
    "html": {
      "zh": "<h2>一、概述 </h2>\n          <p>TC818张力控制器具有24V/4A直流输出，主要应用于执行机构为磁粉离合器或磁粉制动器的张力系统中，适用于手动控制、半自动控制（卷径张力控制）及全自动张力控制系统。</p>\n          <p>手动张力控制器是根据收料或放料卷径的变化，人工调整离合器或制动器的励磁电流，从而获得一定的张力。</p>\n          <p>半自动张力控制器又称卷径式张力控制器，控制器能自动检测出收料或放料的卷径，并根据设定的目标张力及测量卷径，自动调整离合器或制动器的励磁电流来控制卷料的张力。</p>\n          <p>全自动张力控制器能测量卷料的实际张力，并根据设定的目标张力及实测张力经PID运算后自动调整离合器或制动器的励磁电流来控制卷料的张力。全自动张力控制器具有极高的张力控制精度，适用于对张力控制精度要求较高的场合使用。</p>\n          <p>以下为TC818张力控制器在张力控制系统中的典型应用。</p>\n\n          <h2>二、TC818在放卷部全自动张力控制系统的应用</h2>\n          <img class=\"illustration\" src=\"/altec/images/applications/details/TC808/TC808_Unwind.gif\" alt=\"TC818张力控制器在张力控制系统中的应用 diagram\">\n          <h2>三、TC818在收卷部全自动张力控制系统的应用</h2>\n          <img class=\"illustration\" src=\"/altec/images/applications/details/TC808/TC808_Wind.gif\" alt=\"TC818张力控制器在张力控制系统中的应用 diagram\">\n          <h2>四、TC818在放卷部卷径张力控制系统中的应用</h2>\n          <img class=\"illustration\" src=\"/altec/images/applications/details/TC808/TC808_Dia_Unwind.gif\" alt=\"TC818张力控制器在张力控制系统中的应用 diagram\">\n          <h2>五、TC818在收卷部卷径张力控制系统中的应用</h2>\n          <img class=\"illustration\" src=\"/altec/images/applications/details/TC808/TC808_Dia_Wind.gif\" alt=\"TC818张力控制器在张力控制系统中的应用 diagram\">\n          <h2>六、TC818在分切机中的应用</h2>\n          <img class=\"illustration\" src=\"/altec/images/applications/details/TC808/TC808_Cut.gif\" alt=\"TC818张力控制器在张力控制系统中的应用 diagram\">",
      "en": "<h2>Overview</h2><p>TC818 has a 24V/4A DC output and is mainly used in tension systems with magnetic powder clutches or magnetic powder brakes. It supports manual control, semi-automatic roll-diameter tension control and full automatic closed-loop tension control.</p><h2>Manual, Semi-Automatic and Automatic Control</h2><p>Manual tension control adjusts excitation current according to winding or unwinding roll diameter. Roll-diameter control automatically detects roll diameter and adjusts output according to target tension and measured diameter. Full automatic control measures actual web tension and uses PID calculation to adjust output for high-precision tension control.</p><h2>Typical System Diagrams</h2><p>The following diagrams show common TC818 tension system arrangements.</p><figure><img src=\"/altec/images/applications/details/TC808/TC808_Unwind.gif\" alt=\"Automatic unwinding tension control\"><figcaption>Automatic unwinding tension control</figcaption></figure><figure><img src=\"/altec/images/applications/details/TC808/TC808_Wind.gif\" alt=\"Automatic winding tension control\"><figcaption>Automatic winding tension control</figcaption></figure><figure><img src=\"/altec/images/applications/details/TC808/TC808_Dia_Unwind.gif\" alt=\"Roll-diameter unwinding tension control\"><figcaption>Roll-diameter unwinding tension control</figcaption></figure><figure><img src=\"/altec/images/applications/details/TC808/TC808_Dia_Wind.gif\" alt=\"Roll-diameter winding tension control\"><figcaption>Roll-diameter winding tension control</figcaption></figure><figure><img src=\"/altec/images/applications/details/TC808/TC808_Cut.gif\" alt=\"TC818 in a slitting machine\"><figcaption>TC818 in a slitting machine</figcaption></figure>"
    }
  },
  {
    "slug": "tc930-roll-diameter-tension-control",
    "category": "application",
    "related": [
      "TC930"
    ],
    "title": {
      "zh": "TC930卷径张力控制器典型应用",
      "en": "TC930 Roll-Diameter Tension Control Applications"
    },
    "excerpt": {
      "zh": "TC930 根据编码器或接近开关检测卷径，并按目标张力和测量卷径自动调整输出控制卷材张力。",
      "en": "TC930 detects roll diameter by encoder or proximity switch and adjusts output according to target tension and measured diameter."
    },
    "image": applicationDetailImage("TC930", "TC930_Unwind.gif"),
    "html": {
      "zh": "<h2>概述</h2>\n        <p>TC930卷径张力控制器能根据安装在辊轮上的编码器或接近开关输出的脉冲信号，检测出收料或放料的卷径，并根据设定的目标张力及测量卷径，自动调整输出信号来控制卷料的张力。</p>\n        <p>TC930卷径张力控制器输出可选模拟量（4-20mA,0-20mA，0-10V）或可控硅移相脉冲。</p>\n        <p>模拟量输出可控制变频器或其它功率单元，主要应用于执行机构为交流异步电机，电气转换机构，其它各种功率单元的张力控制系统中。</p>\n        <p>可控硅移相脉冲输出可直接触发可控硅模块，构成直流调压电源，主要应用于执行机构为力矩电机，大功率磁粉离合器，大功率磁粉制动器或直流电机的张力控制系统中。</p>\n        <p>以下为TC930卷径张力控制器在张力控制系统中的典型应用。</p>\n\n        <h2>TC930在放卷部卷径张力控制系统的应用 - 采用磁粉制动器方案</h2>\n\n        <img src=\"/altec/images/applications/details/TC930/TC930_Unwind.gif\" alt=\"TC930卷径张力控制器典型应用 diagram\">\n\n        <h2>TC930在收卷部卷径张力控制系统的应用 - 采用磁粉离合器方案</h2>\n        <img src=\"/altec/images/applications/details/TC930/TC930_Wind.gif\" alt=\"TC930卷径张力控制器典型应用 diagram\">\n\n        <h2>TC930在分切机中的应用</h2>\n        <img src=\"/altec/images/applications/details/TC930/cut.gif\" alt=\"TC930卷径张力控制器典型应用 diagram\">",
      "en": "<h2>Overview</h2><p>TC930 detects winding or unwinding diameter from pulses generated by an encoder or proximity switch installed on the roller. It adjusts output according to target tension and measured diameter to control web tension.</p><h2>Output Options</h2><p>TC930 can provide analog output such as 4-20mA, 0-20mA or 0-10V for VFDs and other power units. It can also provide SCR phase-angle trigger pulses for DC voltage regulation used with torque motors, high-power magnetic powder clutches, high-power magnetic powder brakes or DC motors.</p><h2>Typical System Diagrams</h2><p>The diagrams show roll-diameter tension control for unwinding, winding and slitting machines.</p><figure><img src=\"/altec/images/applications/details/TC930/TC930_Unwind.gif\" alt=\"Unwinding roll-diameter tension control with magnetic powder brake\"><figcaption>Unwinding roll-diameter tension control with magnetic powder brake</figcaption></figure><figure><img src=\"/altec/images/applications/details/TC930/TC930_Wind.gif\" alt=\"Winding roll-diameter tension control with magnetic powder clutch\"><figcaption>Winding roll-diameter tension control with magnetic powder clutch</figcaption></figure><figure><img src=\"/altec/images/applications/details/TC930/cut.gif\" alt=\"TC930 in a slitting machine\"><figcaption>TC930 in a slitting machine</figcaption></figure>"
    }
  },
  {
    "slug": "tc950-tension-control-applications",
    "category": "application",
    "related": [
      "TC950"
    ],
    "title": {
      "zh": "TC950张力控制器典型应用",
      "en": "TC950 Tension Controller Applications"
    },
    "excerpt": {
      "zh": "TC950 输出可控硅移相脉冲或模拟量，适用于力矩电机、磁粉离合器/制动器、直流电机和变频器张力系统。",
      "en": "TC950 provides SCR phase-angle pulse or analog output for torque motors, magnetic powder devices, DC motors and VFD tension systems."
    },
    "image": applicationDetailImage("TC950", "TC950_Wind.gif"),
    "html": {
      "zh": "<h2>概述</h2>\n\n        <p>TC950张力控制器输出信号为可控硅移相脉冲或模拟量（4-20mA,0-20mA，0-10V）。</p>\n        <p>可直接触发可控硅模块，构成直流调压电源，主要应用于执行机构为力矩电机，大功率磁粉离合器，大功率磁粉制动器或直流电机的张力控制系统中，具有自动/手动无扰切换，同步追踪及同步启停功能。</p>\n        <p>模拟量可控制变频器或其它功率单元，主要应用于执行机构为交流异步电机，电气转换机构，其它各种功率单元的张力控制系统中，具有自动/手动无扰切换，同步追踪及同步启停功能。</p>\n        <p>TC950张力控制器能测量卷料的实际张力，并根据设定的目标张力及实测张力经PID运算后自动调整输出信号来控制卷料的张力。TC950张力控制器具有极高的张力控制精度，适用于对张力控制精度要求较高的场合使用。</p>\n        <p>同步功能可以跟踪前级驱动单元的运行速度，当系统速度变化时，张力系统能快速跟踪速度的变化，改变输出值，使得整个系统能快速同步运行，并保持较小的张力波动。</p>\n        <p>以下为TC950张力控制器在张力控制系统中的典型应用。</p>\n        \n        <h2>TC950放卷部张力控制系统的应用 - 采用磁粉制动器方案</h2>\n        <img src=\"/altec/images/applications/details/TC950/TC950_RSP_Unwind.gif\" alt=\"TC950张力控制器典型应用 diagram\">\n\n        <h2>TC950在收卷部张力控制系统的应用 - 采用磁粉离合器方案</h2>\n        <img src=\"/altec/images/applications/details/TC950/TC950_RSP_Wind.gif\" alt=\"TC950张力控制器典型应用 diagram\">\n\n        <h2>TC950在收卷部张力控制系统的应用 - 采用直流电机或力矩电机方案</h2>\n        <img src=\"/altec/images/applications/details/TC950/TC950_SKCH.gif\" alt=\"TC950张力控制器典型应用 diagram\">\n\n        <h2>TC950在收卷部张力控制系统的应用 - 采用三相力矩电机驱动模块</h2>\n        <img src=\"/altec/images/applications/details/TC950/TC950_3Phase_Wind.gif\" alt=\"TC950张力控制器典型应用 diagram\">\n\n        <h2>TC950在收卷部张力控制系统的应用 - 采用交流电机方案</h2>\n        <img src=\"/altec/images/applications/details/TC950/TC950_Wind.gif\" alt=\"TC950张力控制器典型应用 diagram\">\n\n        <h2>TC950应用方案 - 速度同步张力控制系统</h2>\n        <img src=\"/altec/images/applications/details/TC950/TC950_speed_tracking.gif\" alt=\"TC950张力控制器典型应用 diagram\">",
      "en": "<h2>Overview</h2><p>TC950 can output SCR phase-angle trigger pulses or analog signals such as 4-20mA, 0-20mA and 0-10V. It can directly trigger SCR modules to form a DC voltage regulator or control VFDs and other power units.</p><h2>Closed-Loop Tension Control</h2><p>The controller measures actual web tension and compares it with the target tension. PID calculation adjusts output to control tension with high precision. Automatic/manual bumpless transfer, synchronous tracking and synchronous start-stop functions support production-line operation.</p><h2>Synchronous Tracking</h2><p>The synchronization function tracks the speed of the previous drive unit. When system speed changes, the tension section follows quickly and adjusts output to reduce tension fluctuation.</p><h2>Typical System Diagrams</h2><p>The following diagrams show TC950 applications for unwinding, winding, SCR power control, three-phase systems and speed tracking.</p><figure><img src=\"/altec/images/applications/details/TC950/TC950_RSP_Unwind.gif\" alt=\"Unwinding tension control with magnetic powder brake\"><figcaption>Unwinding tension control with magnetic powder brake</figcaption></figure><figure><img src=\"/altec/images/applications/details/TC950/TC950_RSP_Wind.gif\" alt=\"Winding tension control with magnetic powder clutch\"><figcaption>Winding tension control with magnetic powder clutch</figcaption></figure><figure><img src=\"/altec/images/applications/details/TC950/TC950_SKCH.gif\" alt=\"SCR power control scheme\"><figcaption>SCR power control scheme</figcaption></figure><figure><img src=\"/altec/images/applications/details/TC950/TC950_3Phase_Wind.gif\" alt=\"Three-phase winding tension control\"><figcaption>Three-phase winding tension control</figcaption></figure><figure><img src=\"/altec/images/applications/details/TC950/TC950_Wind.gif\" alt=\"TC950 winding tension control\"><figcaption>TC950 winding tension control</figcaption></figure><figure><img src=\"/altec/images/applications/details/TC950/TC950_speed_tracking.gif\" alt=\"TC950 speed tracking application\"><figcaption>TC950 speed tracking application</figcaption></figure>"
    }
  },
  {
    "slug": "ph-orp800-water-treatment-control",
    "category": "application",
    "related": [
      "pH/ORP800"
    ],
    "title": {
      "zh": "pH/ORP800酸碱度/氧化还原控制器典型应用",
      "en": "pH/ORP800 Water Treatment Control Applications"
    },
    "excerpt": {
      "zh": "展示 pH/ORP800 用于反应釜酸碱度/氧化还原控制和在线 pH/ORP 控制的典型方案。",
      "en": "Typical pH/ORP800 schemes for reactor pH/ORP control and online water-treatment control."
    },
    "image": applicationDetailImage("PH_ORP800", "pHORP_Control.gif"),
    "html": {
      "zh": "<h2>反应釜pH/ORP控制</h2>\n        <img src=\"/altec/images/applications/details/PH_ORP800/pHORP_Control.gif\" alt=\"pH/ORP800酸碱度/氧化还原控制器典型应用 diagram\">\n\n        <h2>pH/ORP在线控制</h2>\n        <img src=\"/altec/images/applications/details/PH_ORP800/pHORP_Online.gif\" alt=\"pH/ORP800酸碱度/氧化还原控制器典型应用 diagram\">",
      "en": "<h2>Reactor pH/ORP Control</h2><p>pH/ORP800 can be used in mixing tanks and reactors to monitor pH or oxidation-reduction potential and drive dosing or control equipment according to the process requirement.</p><figure><img src=\"/altec/images/applications/details/PH_ORP800/pHORP_Control.gif\" alt=\"Reactor pH/ORP control\"><figcaption>Reactor pH/ORP control</figcaption></figure><h2>Online pH/ORP Control</h2><p>For water-treatment systems, online measurement allows continuous control and alarm monitoring of pH or ORP values.</p><figure><img src=\"/altec/images/applications/details/PH_ORP800/pHORP_Online.gif\" alt=\"pH/ORP online control\"><figcaption>pH/ORP online control</figcaption></figure>"
    }
  },
  {
    "slug": "cpc316-constant-pressure-water-supply",
    "category": "application",
    "related": [
      "CPC316"
    ],
    "title": {
      "zh": "CPC316变频恒压供水控制器典型应用",
      "en": "CPC316 Constant-Pressure Water Supply Applications"
    },
    "excerpt": {
      "zh": "展示 CPC316 在多泵变频恒压供水中的 3 主泵+辅泵、4 泵循环和变频固定工作模式。",
      "en": "Typical CPC316 multi-pump constant-pressure water-supply modes including auxiliary pump, four-pump loop and fixed VFD operation."
    },
    "image": applicationDetailImage("CPC316", "CPC316_3Pumps_G.gif"),
    "html": {
      "zh": "<h2>3主泵+1辅泵工作模式(辅泵工频运行)</h2>\n          <img class=\"illustration\" src=\"/altec/images/applications/details/CPC316/CPC316_3Pumps_G.gif\" alt=\"CPC316变频恒压供水控制器典型应用 diagram\">\n          <h2>3主泵+1辅泵工作模式(辅泵变频运行)</h2>\n          <img class=\"illustration\" src=\"/altec/images/applications/details/CPC316/CPC316_3Pumps_B.gif\" alt=\"CPC316变频恒压供水控制器典型应用 diagram\">\n          <h2>4泵循环工作模式</h2>\n          <img class=\"illustration\" src=\"/altec/images/applications/details/CPC316/CPC316_4Pumps_Loop.gif\" alt=\"CPC316变频恒压供水控制器典型应用 diagram\">\n          <h2>变频固定工作模式(1+6)</h2>\n          <img class=\"illustration\" src=\"/altec/images/applications/details/CPC316/CPC316_7Pumps.gif\" alt=\"CPC316变频恒压供水控制器典型应用 diagram\">\n          \n          <p>CPC316变频恒压供水控制器详细使用说明请见<a href=\"/altec/downloads/CPC316.pdf\" download>说明书(PDF)</a>。</p>\n          <a class=\"top\" href=\"#top\">回到页首</a>",
      "en": "<h2>Overview</h2><p>CPC316 is used for variable-frequency constant-pressure water supply. It supports single-pump and multi-pump configurations and can coordinate main and auxiliary pumps according to system pressure demand.</p><h2>Typical Working Modes</h2><p>The diagrams show common CPC316 water-supply control modes.</p><figure><img src=\"/altec/images/applications/details/CPC316/CPC316_3Pumps_G.gif\" alt=\"3 main pumps + 1 auxiliary pump, auxiliary pump at power frequency\"><figcaption>3 main pumps + 1 auxiliary pump, auxiliary pump at power frequency</figcaption></figure><figure><img src=\"/altec/images/applications/details/CPC316/CPC316_3Pumps_B.gif\" alt=\"3 main pumps + 1 auxiliary pump, auxiliary pump with VFD\"><figcaption>3 main pumps + 1 auxiliary pump, auxiliary pump with VFD</figcaption></figure><figure><img src=\"/altec/images/applications/details/CPC316/CPC316_4Pumps_Loop.gif\" alt=\"Four-pump loop operation\"><figcaption>Four-pump loop operation</figcaption></figure><figure><img src=\"/altec/images/applications/details/CPC316/CPC316_7Pumps.gif\" alt=\"Fixed VFD operation mode (1+6)\"><figcaption>Fixed VFD operation mode (1+6)</figcaption></figure>"
    }
  }
];

export function applicationSlug(slug: string) {
  return slug;
}

export function getApplicationBySlug(slug: string) {
  return applicationArticles.find((article) => article.slug === slug);
}
