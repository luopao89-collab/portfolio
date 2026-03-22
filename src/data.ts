export type ProjectLayout = 'half' | 'full-img-left' | 'full-img-right';

export const transitionData = {
  line1: "Selected",
  line2: "Works"
};

export interface Project {
  id: number;
  title: string;
  category: string;
  company: string;
  duration?: string;
  description: string;
  tags: string[];
  image: string;
  layout: ProjectLayout;
  details?: {
    tools: string;
    fonts: string;
    type: string;
    role: string;
    challenge: string;
    solution: string;
    impact: { label: string; value: string }[];
    results: string[];
  };
}

export const projects: Project[] = [
  {
    id: 1,
    title: "浣洗小程序",
    category: "衣锦浣香",
    company: "衣锦浣香电子商务有限公司",
    duration: "6个月",
    description: "高品质洗护C2F平台核心产品。主导全流程体验重塑，规避返工并提升核心转化率。",
    tags: ["Figma", "PRD撰写", "流程梳理"],
    image: "/浣洗小程序首图.png",
    layout: "full-img-left",
    details: {
      tools: "Figma, PRD撰写, 流程梳理",
      fonts: "PingFang SC / DIN",
      type: "企业商业项目",
      role: "主导设计 / 产品协作",
      challenge: "洗护业务涉及复杂的SKU以及后台物流流转。前端需呈现极简的“一键预约”体验，且团队面临外包成本高、沟通效率低的痛点。",
      solution: "重构前端下单链路，优化浣洗小程序的下单体验与界面视觉，使下单转化率成功提升 35%。配合输出 PRD 及流程图，独立输出高保真交互稿，为团队节省约 10 万元外包成本。",
      impact: [
        { value: "+35%", label: "转化率提升" },
        { value: "10W+", label: "节省外包成本" },
        { value: "90%+", label: "需求通过率" }
      ],
      results: [
        "/zb1.png", "/zb2.png", "/zb3.png", "/zb4.png", "/zb6.png", "/zb7.png", 
        "/zb8.png", "/zb9.png", "/zb10.png", "/zb11.png", "/zb12.png", "/zb13.png", "/zb14.png"
      ]
    }
  },
  {
    id: 11,
    title: "浣洗众包APP",
    category: "衣锦浣香",
    company: "衣锦浣香电子商务有限公司",
    duration: "6个月",
    description: "为洗护业务量身打造的众包物流配送端APP，优化骑手接单与配送体验。",
    tags: ["移动端设计", "物流配送"],
    image: "/浣洗首页展示图@2x.png",
    layout: "half",
    details: {
      tools: "Figma, 移动端交互设计",
      fonts: "PingFang SC / DIN",
      type: "物流配送端APP",
      role: "UI/UX设计",
      challenge: "骑手在派送过程中需要在复杂的外部环境下快速接单、查看路线及确认衣物状态，对界面的清晰度和操作效率要求极高。",
      solution: "采用大字号、高对比度的信息层级设计，简化接单和取送件的交互步骤，确保骑手能单手高效完成核心操作。",
      impact: [
        { value: "高效", label: "接单效率" },
        { value: "显著下降", label: "操作失误率" }
      ],
      results: [
        "/hx-1.png", "/hx-2.png", "/hx-3.png", "/hx-4.png", "/hx-5.png", 
        "/hx-6.png", "/hx-7.png", "/hx-8.png", "/hx-9.png", "/hx-10.png"
      ]
    }
  },
  {
    id: 2,
    title: "如意邻里电商与快递平台",
    category: "圆通集团",
    company: "浙江圆嘉商贸有限公司 (圆通集团)",
    description: "圆通集团旗下商贸核心C端产品，融合社区电商与快递流转，亚运会期间承接千万级大促流量。",
    tags: ["SKETCH", "大促视觉"],
    image: "/如意邻里首图.png",
    layout: "half",
    details: {
      tools: "Figma, Sketch, 原型设计",
      fonts: "PingFang SC / Roboto",
      type: "社区电商与快递平台",
      role: "核心UI/UX设计",
      challenge: "平台融合了社区电商与快递流转双重业务，在亚运会等大促期间流量巨大，用户需在复杂业务线中获得清晰的操作指引。",
      solution: "通过模块化设计重构首页与核心链路，强化核心业务入口，优化快递流转状态展示，提升了整体视觉层级和易用性。",
      impact: [
        { value: "千万级", label: "承接大促流量" },
        { value: "大幅提升", label: "用户体验" }
      ],
      results: [
        "/LL1@2x.png", "/LL2@2x.png", "/LL3@2x.png", "/LL4@2x.png", "/LL5@2x.png", 
        "/LL6@2x.png", "/LL7@2x.png", "/LL8@2x.png", "/LL9@2x.png", "/LL10@2x.png", 
        "/LL11@2x.png", "/LL12@2x.png", "/LL13@2x.png"
      ]
    }
  },
  {
    id: 3,
    title: "食堂管理后台",
    category: "圆通集团",
    company: "浙江圆嘉商贸有限公司 (圆通集团)",
    description: "针对复杂权限与用餐流转的企业级B端系统，大幅提升后勤管理与统计效率。",
    tags: ["B端组件库", "后台系统"],
    image: "/食堂系统首图.png",
    layout: "half",
    details: {
      tools: "Figma, B端组件库",
      fonts: "PingFang SC",
      type: "企业级B端系统",
      role: "UI/UX交互设计",
      challenge: "企业食堂管理涉及复杂的角色权限、菜品排期、就餐统计等，原有的数据录入方式繁琐且易出错。",
      solution: "建立统一的B端设计规范，优化表单录入与数据统计图表展示，降低后勤人员的学习成本和操作时间。",
      impact: [
        { value: "显著提升", label: "管理效率" },
        { value: "降低", label: "学习成本" }
      ],
      results: [
        "/GL1@2x.png", "/GL2@2x.png", "/GL3@2x.png", "/GL4@2x.png", "/GL5@2x.png", 
        "/GL6@2x.png", "/GL7@2x.png"
      ]
    }
  },
  {
    id: 10,
    title: "圆梦与爱同行",
    category: "圆通集团",
    company: "浙江圆嘉商贸有限公司 (圆通集团)",
    duration: "公益项目",
    description: "一款专为残障等特殊人群提供就业机会与职业技能培训的爱心公益平台，通过无障碍设计连接社会资源。",
    tags: ["无障碍设计", "公益平台", "社会创新"],
    image: "/圆梦与爱同行首图.png",
    layout: "full-img-right",
    details: {
      tools: "Figma, 适老化/无障碍设计, 用户调研",
      fonts: "Alibaba PuHuiTi / DIN",
      type: "公益就业服务平台",
      role: "UI/UX交互设计",
      challenge: "特殊人群在使用常规软件时面临极高的认知和操作门槛。平台需要通过极致的无障碍设计，帮助他们顺畅地获取就业信息、完成技能学习，并降低企业的招工对接难度。",
      solution: "重构信息层级，采用超大字号、高对比度色彩及语音辅助等无障碍交互规范（WCAG）。将复杂的求职流程极简化为“听得懂、点得准”的卡片式操作，打造有温度、零门槛的公益服务体验。",
      impact: [
        { value: "零门槛", label: "无障碍体验" },
        { value: "高效对接", label: "就业成功率" }
      ],
      results: [
        "/YM1@2x.png", "/YM2@2x.png", "/YM3@2x.png", "/YM4@2x.png", 
        "/YM5@2x.png", "/YM6@2x.png", "/YM7@2x.png", "/YM8@2x.png"
      ]
    }
  },
  {
    id: 12,
    title: "云仓可视化",
    category: "圆通集团",
    company: "浙江圆嘉商贸有限公司 (圆通集团)",
    description: "通过数据可视化手段，实时监控云仓物流数据与仓储状态，辅助管理层决策。",
    tags: ["数据大屏", "可视化"],
    image: "/云仓可视首图.png",
    layout: "half",
    details: {
      tools: "Figma, 数据可视化设计",
      fonts: "PingFang SC / DIN",
      type: "数据大屏可视化",
      role: "视觉与交互设计",
      challenge: "庞大的仓储数据和物流信息需要直观、清晰地呈现给管理层，以便快速做出调度决策。",
      solution: "提炼核心数据指标，运用科技感与未来感的设计风格，打造清晰的多维数据可视化面板。",
      impact: [
        { value: "直观", label: "数据展现" },
        { value: "高效", label: "决策辅助" }
      ],
      results: ["/DP2@2x.png"]
    }
  },
  {
    id: 4,
    title: "数据大屏",
    category: "盈安科技",
    company: "广西盈安信息科技有限公司",
    duration: "8个月",
    description: "多维度的数据可视化展示大屏，实时呈现业务核心指标与转化数据。",
    tags: ["数据可视化", "大屏呈现", "界面设计"],
    image: "/停车系统首图.png",
    layout: "full-img-right",
    details: {
      tools: "Figma, 数据可视化",
      fonts: "PingFang SC / Roboto",
      type: "数据可视化大屏",
      role: "视觉呈现",
      challenge: "如何将多维度的复杂业务数据通过一块大屏清晰、直观地传达给业务人员。",
      solution: "梳理数据层级，设计具有科技感的暗黑系界面结构，通过合理的图表类型突出核心数据指标。",
      impact: [
        { value: "清晰", label: "业务呈现" },
        { value: "高", label: "数据洞察" }
      ],
      results: ["/DP1@2x.png"]
    }
  },
  {
    id: 6,
    title: "窃理商城 1.3",
    category: "川平景煜",
    company: "柳州川平景煜供应链管理服务有限公司",
    duration: "4个月",
    description: "从0到1主导窃理商城UI视觉体系搭建与电商营销链路设计，打造高转化率的C端购物体验。",
    tags: ["电商设计", "从0到1", "营销链路"],
    image: "/窈理商城首页.png",
    layout: "full-img-left",
    details: {
      tools: "Figma, 移动端交互设计, 视觉规范",
      fonts: "PingFang SC / DIN",
      type: "C端电商APP",
      role: "主导UI设计",
      challenge: "作为一款全新的电商APP，需要在短时间内建立起具有辨识度且值得信赖的品牌视觉体系。同时，如何合理规划首页复杂的导购层级与营销模块（如拼团、限时抢购等），以在上线初期就能有效刺激用户购买欲望，是一大难点。",
      solution: "从0到1构建了基于微质感与高饱和度的营销色彩体系，奠定品牌基调。精心规划首页与商品详情页布局，针对核心营销玩法进行专项UI设计，强化利益点透出，打造极短的用户决策路径与流畅的购物体验。",
      impact: [
        { value: "显著提升", label: "活动转化率" },
        { value: "全面升级", label: "品牌视觉" }
      ],
      results: [
        "/S1@2x.png", "/s2@2x.png", "/S3@2x.png", "/S4@2x.png", "/S5@2x.png", "/S6@2x.png"
      ]
    }
  }
];