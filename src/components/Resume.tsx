import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Download, Star, Mail, Phone, MapPin, Briefcase, Target, Loader2, X } from 'lucide-react';
import { ScrollSweepRevealText } from './ScrollSweepRevealText';

// -----------------------
// Advanced Timeline Item (PRD Specification)
// -----------------------
const AdvancedTimelineItem = ({ 
  title, 
  date, 
  company, 
  desc, 
  achievements, 
  isLast = false,
  status,
  innerRef
}: any) => {
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    if (status !== 'upcoming') {
      setHasRevealed(true);
    }
  }, [status]);

  const easing = 'cubic-bezier(0.16, 1, 0.3, 1)';

  return (
    <div ref={innerRef} className="relative pl-12 md:pl-16 pb-20 group">
      {/* --- 1. Base Layer (Static Path) --- */}
      {!isLast && <div className="absolute left-[11px] top-[24px] bottom-0 w-[2px] bg-white/10 z-0"></div>}

      {/* --- 2. Red Light Flow Layer (Active/Passed) --- */}
      {!isLast && (
        <div 
          className={`absolute left-[11px] top-[24px] bottom-0 w-[2px] bg-gradient-to-b from-[#ff2e55] via-[#ff2e55]/80 to-transparent z-10 origin-top transition-transform duration-[4000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${status !== 'upcoming' ? 'scale-y-100' : 'scale-y-0'}`}
        ></div>
      )}

      {/* --- 3. Cooldown Mask Layer (Passed only) --- */}
      {!isLast && (
        <div 
          className={`absolute left-[11px] top-[24px] bottom-0 w-[2px] bg-[#333] z-20 origin-top transition-transform duration-[4000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${status === 'passed' ? 'scale-y-100' : 'scale-y-0'}`}
        ></div>
      )}

      {/* --- Node Indicator (Halo & Dot) --- */}
      <div className="absolute left-0 top-[4px] flex items-center justify-center w-6 h-6 z-30">
        <div 
          className={`absolute w-full h-full rounded-full border-[1.5px] border-[#ff2e55] transition-all duration-[1000ms] ease-out 
            ${status === 'active' ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
        ></div>
        
        <div 
          className={`rounded-full transition-all duration-700 ease-out 
            ${status === 'active' ? 'w-2.5 h-2.5 bg-[#ff2e55] shadow-[0_0_15px_rgba(255,46,85,1)]' : 
              status === 'passed' ? 'w-1.5 h-1.5 bg-gray-500 shadow-none' : 
              'w-1.5 h-1.5 bg-gray-700 shadow-none opacity-50'}`}
        ></div>
      </div>

      {/* --- Content Card (Smooth Translation) --- */}
      <div 
        className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] 
          ${hasRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
          <h4 className="text-[20px] font-bold text-white transition-colors">{title}</h4>
          <span className="px-3 py-1 bg-[#1a1a1a] text-gray-400 group-hover:bg-[#ff2e55]/20 group-hover:text-[#ff2e55] rounded-full text-[13px] font-bold tracking-wide transition-colors duration-300">{date}</span>
        </div>
        <p className="text-gray-400 font-medium mb-2 flex items-center gap-2 text-[14px]">
          <Briefcase className="w-4 h-4 text-gray-500 group-hover:text-gray-400 transition-colors duration-300" />
          {company}
        </p>
        <p className="text-[13px] text-gray-500 mb-4 leading-relaxed">{desc}</p>
        
        <div className="bg-[#141414] border border-white/5 rounded-[20px] p-5">
          <h5 className="text-gray-300 group-hover:text-[#ff2e55] font-bold mb-3 flex items-center gap-2 text-[14px] transition-colors duration-300">
            <Target className="w-4 h-4 text-gray-500 group-hover:text-[#ff2e55] transition-colors duration-300" />
            {achievements.title}
          </h5>
          <div className="space-y-3 text-[13px] text-gray-400 leading-relaxed">
            {achievements.items.map((item: any, i: number) => (
              <p key={i}><strong className="text-gray-200 font-bold">{item.label}</strong>{item.text}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// -----------------------
// Experience Section Data
// -----------------------

export default function Resume({ onClose }: { onClose: () => void }) {
  const resumeRef = useRef<HTMLDivElement>(null);
  
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(-1);

  useEffect(() => {
    const container = document.getElementById('resume-scroll-container');
    if (!container) return;

    const handleScroll = () => {
      const vh = window.innerHeight;
      const triggerActive = vh * 0.75; // Activate when top of element hits 75% of viewport height
      let newActiveIndex = -1;

      timelineRefs.current.forEach((el, index) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < triggerActive) {
            newActiveIndex = index;
          }
        }
      });

      setActiveTimelineIndex(newActiveIndex);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check after a short delay to ensure layout is ready
    setTimeout(handleScroll, 100);

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const experienceData = [
    {
      title: "自由探索与微型创业 (Gap Year)",
      date: "2025.01 - 2026.03",
      company: "独立电商运营 / 线下商业初探",
      desc: "职业过渡期，探索商业闭环与真实用户需求，深化“看数据、重转化”的商业嗅觉与营销策略。",
      achievements: {
        title: "核心产出与业务沉淀",
        items: [
          { label: "Shopee跨境电商运营：", text: "从0到1独立搭建并运营虾皮店铺，负责视觉包装及商品详情页排版。通过点击与转化数据持续迭代视觉物料，深化了“视觉驱动转化”的商业逻辑。" },
          { label: "线下商业微型零售：", text: "与合伙人筹备线下摆摊。负责受众调研、选品策略及视觉陈列，近距离观察并收集用户真实反馈。" },
          { label: "个人生活与技能沉淀：", text: "规划职业过渡期休整，考取C1驾照，提升综合生活技能，为重新投入职场做好精力储备。" }
        ]
      }
    },
    {
      title: "UI设计师",
      date: "2024.10 - 2024.12",
      company: "柳州川平景煜供应链管理服务有限公司",
      desc: "专注于供应链管理与企业服务。并行支持B端管理、C端电商及线下智能终端等多条业务线的设计迭代。",
      achievements: {
        title: "多端业务线架构与设计迭代",
        items: [
          { label: "C端电商与营销链路：", text: "负责窃理商城1.3版本UI视觉升级。针对“券玩法”等营销模块专项优化，提升用户活动转化体验。" },
          { label: "B端及软硬件终端：", text: "参与内部“商学院”后台界面设计；负责线下“智能柜”及“终端项目”屏幕UI，统一多端视觉规范。" }
        ]
      }
    },
    {
      title: "UI设计兼产品协作",
      date: "2024.03 - 2024.09",
      company: "衣锦浣香电子商务有限公司",
      desc: "高品质洗护C2F平台(员工500人)，专注互联网+生活服务。主导UI/交互全流程，推动跨团队协作。",
      achievements: {
        title: "核心项目与业绩：浣洗小程序",
        items: [
          { label: "主导全流程UI设计：", text: "负责“浣洗”小程序全流程UI设计，独立输出高保真交互稿，节省约 10 万元外包成本。" },
          { label: "业务增长突破：", text: "主导“粤邮洗护”平台流程设计和界面优化，优化用户体验路径，下单转化率提升 25%。" }
        ]
      }
    },
    {
      title: "UI设计工程师",
      date: "2021.06 - 2023.12",
      company: "浙江圆嘉商贸有限公司 (圆通集团)",
      desc: "负责圆通旗下所有商贸业务。负责“如意邻里”小程序UI及“云仓-可视化大屏”设计。",
      achievements: {
        title: "现象级项目：亚运会直播与系统设计",
        items: [
          { label: "亚运会千万级大促：", text: "独立完成“如意邻里”电商板块设计。亚运会期间上线专场直播界面，引导订单2000+笔，GMV破1000万。" },
          { label: "B端权限系统效率：", text: "设计“如意食堂”系统，就餐核验效率提升 3 倍，人力成本下降 50%。" }
        ]
      }
    },
    {
      title: "UI设计师",
      date: "2018.11 - 2021.06",
      company: "广西盈安信息科技有限公司",
      desc: "高新技术企业，软件开发商。负责产品原型构思与 UI 交互设计，实现从 0 到 1 的孵化。",
      achievements: {
        title: "核心项目与转化成果",
        items: [
          { label: "APP设计落地：", text: "独立设计“聚单” APP 界面，优化拉新与注册路径，提升注册转化率 25%。" },
          { label: "迭代落地：", text: "主导“盈安宝”物业系统三轮迭代设计，成功落地 3 个小区进行试点。" }
        ]
      }
    }
  ];

  return (
    <motion.div 
      id="resume-scroll-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 bg-[#0a0a0a] overflow-y-auto text-white"
    >
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" onClick={(e) => { e.preventDefault(); onClose(); }} className="text-3xl font-black tracking-tighter flex items-center gap-1">
            <span className="text-white">JING</span>
            <span className="text-[#ff2e55]">JING</span>
          </a>
          
          <div className="hidden md:flex items-center gap-10 text-sm font-medium">
            <a href="#about" onClick={onClose} className="hover:text-[#ff2e55] transition-colors">关于我</a>
            <a href="#portfolio" onClick={onClose} className="hover:text-[#ff2e55] transition-colors">作品集</a>
            <a href="#contact" onClick={onClose} className="hover:text-[#ff2e55] transition-colors">联系方式</a>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-12 bg-[#0a0a0a]" ref={resumeRef}>
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6"
        >
          <div>
            <button 
              onClick={onClose}
              data-html2canvas-ignore="true"
              className="text-gray-400 hover:text-white flex items-center gap-2 mb-4 text-sm transition-colors"
            >
              ← 返回首页
            </button>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <ScrollSweepRevealText className="inline-block" textClassName="text-white flex items-center gap-4">
                <span>RESUME</span>
                <span className="text-[#ff2e55]">简历</span>
              </ScrollSweepRevealText>
            </h1>
          </div>
          <a 
            href="/黄晶晶_个人简历.pdf"
            download="黄晶晶_个人简历.pdf"
            data-html2canvas-ignore="true"
            className="flex items-center gap-2 bg-white text-black px-8 py-3.5 rounded-full font-bold hover:bg-gray-200 transition-colors shadow-lg"
          >
            <Download className="w-5 h-5" />
            下载简历
          </a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Profile Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-[#0f0f0f] rounded-[32px] overflow-hidden border border-white/5 flex flex-col"
            >
              <div className="h-[320px] bg-gradient-to-b from-gray-800 to-[#0f0f0f] relative shrink-0">
                <img src="/头像.png" alt="Profile" className="w-full h-full object-cover object-[center_20%] [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]" referrerPolicy="no-referrer" />
                <div className="absolute bottom-4 left-8 w-20 h-20 bg-[#ff2e55] rounded-full flex items-center justify-center border-[6px] border-[#0f0f0f] shadow-lg">
                  <Star className="text-white" size={28} fill="transparent" strokeWidth={2} />
                </div>
              </div>
              <div className="px-8 pb-8 pt-4 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-3xl font-black text-white tracking-wider">黄晶晶</h3>
                  <span className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded">1994.11</span>
                </div>
                <p className="text-[#ff2e55] font-bold tracking-wide mb-6">UI / 交互设计师</p>
                
                <div className="h-px w-full bg-white/10 mb-6 mt-auto"></div>
                
                <div className="space-y-4 text-gray-400 text-sm">
                  <div className="flex items-center gap-3">
                    <Mail size={16} />
                    <span>1784591207@qq.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} />
                    <span>190-2692-2022</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-[#111] rounded-3xl p-8"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-[#ff2e55]">⚏</span> 专业技能
              </h3>
              
              <div className="mb-8">
                <p className="text-sm text-gray-400 mb-4">核心能力</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-[#ff2e55]/20 text-[#ff2e55] rounded-lg text-sm border border-[#ff2e55]/30">全链路闭环设计</span>
                  <span className="px-3 py-1.5 bg-white/5 text-gray-300 rounded-lg text-sm border border-white/10">界面规范构建</span>
                  <span className="px-3 py-1.5 bg-[#ff2e55]/20 text-[#ff2e55] rounded-lg text-sm border border-[#ff2e55]/30">视觉营销与高转化</span>
                  <span className="px-3 py-1.5 bg-white/5 text-gray-300 rounded-lg text-sm border border-white/10">跨部门敏捷协作</span>
                  <span className="px-3 py-1.5 bg-white/5 text-gray-300 rounded-lg text-sm border border-white/10">软硬件多端适配</span>
                  <span className="px-3 py-1.5 bg-white/5 text-gray-300 rounded-lg text-sm border border-white/10">PRD/原型构建</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-4">设计与辅助工具</p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Figma / Axure / 墨刀</span>
                      <span className="text-[#ff2e55]">95%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#ff2e55] w-[95%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>PS / Illustrator / Sketch</span>
                      <span className="text-purple-500">90%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 w-[90%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>AI 提效 (Midjourney/ChatGPT)</span>
                      <span className="text-gray-400">85%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-400 w-[85%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Core Strengths */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="flex items-center mb-8">
                <span className="w-8 h-1 bg-[#ff2e55] mr-4"></span>
                <h3 className="text-2xl md:text-3xl font-black tracking-widest uppercase text-white">
                  CORE STRENGTHS <span className="text-gray-500 font-medium text-lg md:text-xl tracking-normal ml-2">/ 核心优势</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                {/* Card 1 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="relative bg-[#0f0f0f] border border-white/5 rounded-[32px] p-6 lg:p-8 overflow-hidden group hover:border-white/10 transition-colors flex flex-col"
                >
                  <div className="absolute -bottom-6 -right-2 text-[100px] lg:text-[120px] font-black text-[#2a1f3d]/40 leading-none pointer-events-none group-hover:text-[#2a1f3d]/60 transition-colors">01</div>
                  <h4 className="text-lg lg:text-xl font-bold text-white mb-4 relative z-10 leading-snug">扎实的界面与<br/>交互设计落地</h4>
                  <p className="text-gray-400 leading-relaxed relative z-10 text-xs lg:text-sm">
                    5年经验，能独立完成从需求对接到高保真UI交付。不仅能输出美观的C端页面，也熟练处理B端复杂的表单和大屏，确保设计稿符合开发逻辑。
                  </p>
                </motion.div>

                {/* Card 2 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  className="relative bg-[#0f0f0f] border border-white/5 rounded-[32px] p-6 lg:p-8 overflow-hidden group hover:border-white/10 transition-colors flex flex-col"
                >
                  <div className="absolute -bottom-6 -right-2 text-[100px] lg:text-[120px] font-black text-[#2a1f3d]/40 leading-none pointer-events-none group-hover:text-[#2a1f3d]/60 transition-colors">02</div>
                  <h4 className="text-lg lg:text-xl font-bold text-white mb-4 relative z-10 leading-snug">懂点业务的<br/>务实设计</h4>
                  <p className="text-gray-400 leading-relaxed relative z-10 text-xs lg:text-sm">
                    有真实的电商运营经历（自己开过店），这让我明白设计不能只看好看，更要看能不能引导用户点击、降低理解门槛。习惯在设计前先理清业务流程。
                  </p>
                </motion.div>

                {/* Card 3 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 }}
                  className="relative bg-[#0f0f0f] border border-white/5 rounded-[32px] p-6 lg:p-8 overflow-hidden group hover:border-white/10 transition-colors flex flex-col"
                >
                  <div className="absolute -bottom-6 -right-2 text-[100px] lg:text-[120px] font-black text-[#2a1f3d]/40 leading-none pointer-events-none group-hover:text-[#2a1f3d]/60 transition-colors">03</div>
                  <h4 className="text-lg lg:text-xl font-bold text-white mb-4 relative z-10 leading-snug">规范搭建与<br/>AI 工具辅助</h4>
                  <p className="text-gray-400 leading-relaxed relative z-10 text-xs lg:text-sm">
                    习惯在项目中维护 UI 组件库，保证团队页面风格统一，方便前端复用。日常会使用 AI (如 Midjourney、ChatGPT) 寻找灵感或生成基础素材，提高做图效率。
                  </p>
                </motion.div>
              </div>
            </motion.section>

            {/* Experience */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.0 }}
            >
              <h3 className="text-[28px] font-bold mb-8 flex items-center gap-3">
                <span className="w-1 h-7 bg-[#ff2e55]"></span>
                工作经历
              </h3>
              
              <div className="relative ml-3 pb-8">
                <div className="space-y-0">
                  {experienceData.map((exp, index) => {
                    const status = index === activeTimelineIndex ? 'active' : index < activeTimelineIndex ? 'passed' : 'upcoming';
                    return (
                      <AdvancedTimelineItem 
                        key={index}
                        {...exp}
                        isLast={index === experienceData.length - 1}
                        status={status}
                        innerRef={(el: HTMLDivElement) => timelineRefs.current[index] = el}
                      />
                    );
                  })}
                </div>
              </div>
            </motion.section>

            {/* Education */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-[28px] font-bold mb-8 flex items-center gap-3">
                <span className="w-1 h-7 bg-[#ff2e55]"></span>
                教育经历
              </h3>
              
              <div className="relative border-l border-[#333] ml-3 pb-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative pl-8"
                >
                  <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-[#333] border-[3px] border-[#0a0a0a]"></div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                    <div className="flex items-center gap-3">
                      <h4 className="text-[20px] font-bold text-white">艺术设计</h4>
                      <span className="px-2 py-0.5 bg-white/10 text-gray-300 rounded text-xs">本科</span>
                    </div>
                    <span className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-[13px] font-bold tracking-wide">2014.09 - 2018.07</span>
                  </div>
                  <p className="text-gray-300 font-medium flex items-center gap-2 text-[14px]">
                    <span className="text-lg">🎓</span> 广西民族大学相思湖学院
                  </p>
                </motion.div>
              </div>
            </motion.section>

          </div>
        </div>

        {/* Footer Decoration */}
        <motion.div 
          data-html2canvas-ignore="true"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="mt-24 relative overflow-hidden rounded-[40px] bg-[#111] p-12 md:p-20 text-center border border-white/5"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#ff2e55] to-transparent opacity-50"></div>
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#ff2e55] rounded-full blur-[100px] opacity-20"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-black/50 border border-white/10 flex items-center justify-center mb-8">
              <Star className="w-6 h-6 text-[#ff2e55]" />
            </div>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight mb-6">期待与您的合作</h3>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              感谢您花时间阅读我的简历。如果您对我的经历感兴趣，或有任何设计相关的想法，欢迎随时与我交流。
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm font-bold text-gray-500 uppercase tracking-widest">
              <span>Huang Jingjing</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff2e55]"></span>
              <span>UI / UX Designer</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff2e55]"></span>
              <span>Available for work</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
