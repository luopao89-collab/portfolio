/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ArrowUp, Download, Star, Mail, Phone } from 'lucide-react';
import { projects, Project, transitionData } from './data';
import Resume from './components/Resume';
import ProjectDetail from './components/ProjectDetail';
import { ScrollSweepRevealText } from './components/ScrollSweepRevealText';

const CompanyProjectBlock = ({ group, index, onSelectProject }: { group: { category: string; company: string; projects: Project[] }, index: number, onSelectProject: (p: Project) => void }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-idx'));
            if (!isNaN(idx)) {
              setActiveIndex(idx);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const spies = document.querySelectorAll(`.spy-${index}`);
    spies.forEach((spy) => observer.observe(spy));

    return () => observer.disconnect();
  }, [index, group.projects.length]);

  const activeProject = group.projects[activeIndex];

  return (
    <div id={`group-${index}`} className="relative w-full overflow-x-clip" style={{ height: `${group.projects.length * 100}vh` }}>
      {/* Scroll Spies */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {group.projects.map((_, i) => (
          <div key={i} className={`spy-${index} w-full h-[100vh]`} data-idx={i}></div>
        ))}
      </div>

      {/* Sticky Content */}
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col lg:flex-row items-start gap-6 lg:gap-12 px-6 py-24 lg:py-32">
        {/* Left Side */}
        <div className="w-full lg:w-1/3 flex flex-col z-10 max-h-[40vh] lg:max-h-none overflow-y-auto hide-scrollbar">
          <h3 className="text-4xl md:text-5xl font-black mb-4">{group.category}</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-12">
            {group.company}。在此期间主要负责前端产品体验梳理与高保真UI交付。
          </p>

          {/* Project Options (Thumbnails) */}
          <div className="flex flex-col gap-6">
            {group.projects.map((p, i) => (
              <div 
                key={p.id} 
                className={`relative cursor-pointer transition-all duration-500 flex items-center gap-6 ${i === activeIndex ? 'opacity-100' : 'opacity-30 hover:opacity-60 grayscale hover:grayscale-0'}`}
                onClick={() => {
                  const spy = document.querySelector(`.spy-${index}[data-idx="${i}"]`);
                  if (spy) spy.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div className="w-24 h-16 md:w-36 md:h-24 shrink-0 rounded-sm overflow-hidden border border-white/10">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                </div>
                {i === activeIndex && (
                  <div className="w-2 h-2 bg-[#ff2e55] shrink-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side (Absolute Matrix) */}
        <div className="w-full lg:w-2/3 h-[50vh] lg:h-[70vh] relative rounded-3xl overflow-hidden bg-[#0a0a0a] shrink-0">
          {group.projects.map((p, pIdx) => (
            <div 
              key={p.id}
              className="absolute top-0 left-0 w-full h-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group cursor-pointer"
              style={{ transform: `translateY(${(pIdx - activeIndex) * 100}%)` }}
              onClick={() => onSelectProject(p)}
            >
              <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105 opacity-80 group-hover:opacity-100" />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-1000"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex justify-between items-end">
                <div className="transform transition-transform duration-700 group-hover:-translate-y-4">
                  <h4 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">{p.title}</h4>
                  <div className="flex flex-wrap gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {p.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] md:text-xs font-medium text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-4 shrink-0">
                  <button 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100"
                  >
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [showResume, setShowResume] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('全部');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => setIsAppLoading(false), 600);
        setTimeout(() => setShowPreloader(false), 2000);
      }
      setLoadingProgress(progress);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleSelectProject = (p: Project) => {
    setSelectedProject(p);
    setTimeout(() => setIsDrawerOpen(true), 10);
  };

  const handleCloseProject = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedProject(null), 700);
  };

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isDrawerOpen]);


  const filteredProjects = activeFilter === '全部' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const groupedProjects = useMemo(() => {
    const groups: { category: string; company: string; projects: Project[] }[] = [];
    filteredProjects.forEach(p => {
      let group = groups.find(g => g.category === p.category);
      if (!group) {
        group = { category: p.category, company: p.company, projects: [] };
        groups.push(group);
      }
      group.projects.push(p);
    });
    return groups;
  }, [filteredProjects]);

  // Scroll to top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      // Calculate position accounting for the 80px fixed navbar
      const yOffset = -80; 
      const y = portfolioSection.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#ff2e55] selection:text-white">
      {/* Preloader */}
      {showPreloader && (
        <div 
          className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${!isAppLoading ? '-translate-y-full' : 'translate-y-0'}`}
        >
          <div className={`text-6xl md:text-9xl font-black text-white font-mono tracking-tighter transition-transform duration-500 ${!isAppLoading ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'}`}>
            {loadingProgress}<span className="text-[#ff2e55]">.</span>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-3xl font-black tracking-tighter flex items-center gap-1">
            <span className="text-white">JING</span>
            <span className="text-[#ff2e55]">JING</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-sm font-medium">
            <a href="#about" className="hover:text-[#ff2e55] transition-colors">关于我</a>
            <a href="#portfolio" className="hover:text-[#ff2e55] transition-colors">作品集</a>
            <a href="#contact" className="hover:text-[#ff2e55] transition-colors">联系方式</a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="about" className="pt-40 pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center relative">
          
          <div className={`stagger-item ${isAppLoading ? 'stagger-hidden' : 'stagger-visible'} inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8`} style={{ transitionDelay: '200ms' }}>
            <span className="w-2 h-2 rounded-full bg-[#ff2e55] animate-pulse"></span>
            <span className="text-sm font-mono tracking-wider text-gray-300">目前正在寻找新的工作机会</span>
          </div>

          <h1 className={`stagger-item ${isAppLoading ? 'stagger-hidden' : 'stagger-visible'} text-[12vw] md:text-[150px] font-black leading-[0.85] tracking-tighter mb-12 uppercase flex flex-col items-center`} style={{ transitionDelay: '400ms' }}>
            <ScrollSweepRevealText className="block" textClassName="flex flex-col items-center">
              <span className="text-white">HUANG</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-400 to-gray-600">JINGJING</span>
            </ScrollSweepRevealText>
            <span className="block text-4xl md:text-6xl mt-6 text-[#ff2e55] tracking-widest">PRODUCT & EXPERIENCE</span>
          </h1>
          
          <p className={`stagger-item ${isAppLoading ? 'stagger-hidden' : 'stagger-visible'} max-w-4xl text-lg md:text-xl text-gray-400 leading-relaxed mb-16 font-light`} style={{ transitionDelay: '600ms' }}>
            你好，我是黄晶晶，习惯从真实业务与用户需求出发，用务实的设计驱动产品落地与转化。
          </p>
          
          <button 
            onClick={() => setShowResume(true)}
            className={`stagger-item ${isAppLoading ? 'stagger-hidden' : 'stagger-visible'} group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all`}
            style={{ transitionDelay: '800ms' }}
          >
            查看完整简历
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          </button>
        </section>

        {/* Stats Section */}
        <section className={`stagger-item ${isAppLoading ? 'stagger-hidden' : 'stagger-visible'} py-24 border-y border-white/5 bg-[#0a0a0a]`} style={{ transitionDelay: '1000ms' }}>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl md:text-6xl font-black text-[#ff2e55] mb-4">5+</div>
              <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">年行业经验</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black text-white mb-4">0-1</div>
              <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">主导落地项目</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black text-[#ff2e55] mb-4">B / C</div>
              <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">多端设计经验</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black text-white mb-4">100%</div>
              <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">高标准研发交付</div>
            </div>
          </div>
        </section>

        {/* Marquee Section */}
        <section className="py-32 overflow-hidden bg-[#050505] flex flex-col justify-center relative">
          {/* Top Ribbon - Core Design Skills */}
          <div className="relative flex overflow-x-hidden text-slate-500 py-2 transform scale-110 -translate-y-6 md:-translate-y-8">
            <div className="animate-marquee whitespace-nowrap flex items-center w-max">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-8 px-4 text-4xl md:text-5xl font-black uppercase tracking-tighter">
                  <span>像素级视觉打磨</span><span>•</span>
                  <span>复杂系统架构重构</span><span>•</span>
                  <span>高保真交互原型</span><span>•</span>
                  <span>多端响应式适配</span><span>•</span>
                  <span>模块化组件库搭建</span><span>•</span>
                  <span>情感化体验设计</span><span>•</span>
                  <span>动效与微交互</span><span>•</span>
                  <span>可用性测试研究</span><span>•</span>
                </div>
              ))}
            </div>
          </div>

          {/* Middle Ribbon (Red) - Business & Product Thinking */}
          <div className="relative flex overflow-x-hidden bg-[#ff2e55] text-black py-5 transform -rotate-2 scale-110 z-10 shadow-2xl -my-8">
            <div className="animate-marquee whitespace-nowrap flex items-center w-max">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-8 px-4 text-5xl md:text-6xl font-black uppercase tracking-tighter">
                  <span>产品商业逻辑拆解</span><span>•</span>
                  <span>数据驱动转化提升</span><span>•</span>
                  <span>从 0 到 1 独立孵化</span><span>•</span>
                  <span>营销视觉与增长</span><span>•</span>
                  <span>MVP 敏捷验证</span><span>•</span>
                  <span>电商运营思维</span><span>•</span>
                  <span>用户生命周期洞察</span><span>•</span>
                  <span>业务目标导向</span><span>•</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Ribbon - Execution & Soft Skills */}
          <div className="relative flex overflow-x-hidden text-white py-2 transform scale-110 translate-y-6 md:translate-y-8">
            <div className="animate-marquee-reverse whitespace-nowrap flex items-center w-max">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-8 px-4 text-4xl md:text-5xl font-black uppercase tracking-tighter">
                  <span>极速高标准交付</span><span>•</span>
                  <span>研发无缝协同对接</span><span>•</span>
                  <span>设计规范制定推行</span><span>•</span>
                  <span>敏捷迭代与反馈</span><span>•</span>
                  <span>独立解决问题能力</span><span>•</span>
                  <span>跨部门沟通驱动力</span><span>•</span>
                  <span>持续学习与自我进化</span><span>•</span>
                  <span>细节控与体验强迫症</span><span>•</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gap Year / Micro-Entrepreneurship Section */}
        <div className="relative z-10 bg-[#050505]">
          
          {/* Screen 1: Shopee E-commerce */}
          <section className="sticky top-0 w-full h-screen bg-[#050505] flex flex-col justify-center overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 w-full pt-20">
              <div className="mb-8 md:mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">自由探索与微型创业</h2>
                    <div className="flex items-center gap-4 text-[#ff2e55] font-mono text-sm font-bold tracking-widest uppercase">
                      <span>Gap Year</span>
                      <span className="w-1 h-1 rounded-full bg-[#ff2e55]"></span>
                      <span>2025.01 - 2026.03</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-12 items-center max-h-[calc(100vh-240px)] overflow-y-auto hide-scrollbar pb-10">
              <div className="lg:w-[55%]">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff2e55]/10 border border-[#ff2e55]/20 text-[#ff2e55] font-mono text-xs font-bold tracking-widest uppercase mb-3">
                  01 / 独立电商 MVP 探索
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-white mb-3">Shopee 跨境电商 (新加坡站)</h3>
                <p className="text-base text-gray-400 leading-relaxed mb-5">
                  Gap Year 期间的独立项目。以“宠物经济”为切入点，在新加坡市场进行从 0 到 1 的店铺搭建。这段“自负盈亏”的实战，彻底打碎了我的“纯设计视角”，重塑了我对商业设计的认知。
                </p>
                
                <ul className="space-y-4 text-gray-300 mb-6">
                  <li className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                      <span className="text-base">🔄</span>
                    </div>
                    <div>
                      <strong className="text-white text-base block mb-1 italic">优势：一个人跑通跨境电商全流程</strong>
                      <span className="text-gray-400 text-sm leading-relaxed block">失败与反思：从软件采集选品、上架修图到投流发货，我走通了0到1。但也痛彻领悟：靠“无脑采集”根本没有护城河。前端图做得再好，没有供应链和价格优势，根本换不来利润。</span>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-[#ffcc00]/10 flex items-center justify-center shrink-0 mt-0.5 border border-[#ffcc00]/20">
                      <span className="text-base text-[#ffcc00]">⚡</span>
                    </div>
                    <div>
                      <strong className="text-white text-base block mb-1 italic">优势：摸透了跨境履约与资金痛点</strong>
                      <span className="text-gray-400 text-sm leading-relaxed block">失败与反思：实际操作才发现，退货、丢件、漫长的回款周期和高昂的运费，轻易就能吃掉所有利润。以前以为做电商就是做视觉，现在明白跨境的本质是“算账”和“供应链”。</span>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-[#ff6b00]/10 flex items-center justify-center shrink-0 mt-0.5 border border-[#ff6b00]/20">
                      <span className="text-base text-[#ff6b00]">💡</span>
                    </div>
                    <div>
                      <strong className="text-white text-base block mb-1 italic">优势：带着“老板视角”做设计</strong>
                      <span className="text-gray-400 text-sm leading-relaxed block">失败与反思：自己真金白银烧过广告费，才懂运营每天面临的生存压力。这治好了我作为设计师的“自嗨”，现在接需求，我能立刻共情业务端的焦虑，做东西直奔“卖货”和“降本”。</span>
                    </div>
                  </li>
                </ul>

                <div className="flex gap-3">
                  <div className="flex-1 bg-[#111] px-4 py-4 rounded-2xl border border-white/5 text-center">
                    <div className="text-xl font-black text-white mb-1">MVP</div>
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">敏捷商业试错</div>
                  </div>
                  <div className="flex-1 bg-[#111] px-4 py-4 rounded-2xl border border-white/5 text-center">
                    <div className="text-xl font-black text-white mb-1">0-1</div>
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">全链路探索</div>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-[45%] w-full aspect-video md:aspect-[4/3] rounded-[32px] overflow-hidden relative group">
                <img src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=1600" alt="Pet Products E-commerce" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80"></div>
              </div>
            </div>
            </div>
          </section>

          {/* Screen 2: Offline Retail */}
          <section className="sticky top-0 w-full h-screen bg-[#050505] flex flex-col justify-center overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 w-full pt-20">
              <div className="flex flex-col lg:flex-row-reverse gap-12 items-center max-h-[calc(100vh-120px)] overflow-y-auto hide-scrollbar pb-10">
              <div className="lg:w-[55%]">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 font-mono text-xs font-bold tracking-widest uppercase mb-3">
                  02 / 线下商业初探
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-white mb-3">线下微型商业 (摆摊)</h3>
                <p className="text-base text-gray-400 leading-relaxed mb-5">
                  告别屏幕，去夜市卖过烧烤，也卖过水果酸奶。用真金白银和体力透支，换来了对线下零售最接地气的真实体感。
                </p>

                <ul className="space-y-4 text-gray-300 mb-6">
                  <li className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                      <span className="text-base">🔄</span>
                    </div>
                    <div>
                      <strong className="text-white text-base block mb-1 italic">优势：对“损耗”的切肤之痛</strong>
                      <span className="text-gray-400 text-sm leading-relaxed block">为了保证口感，坚持用新鲜食材。结果就是：水果酸奶稍微卖不掉就会发酸，烧烤备菜多了第二天只能扔。这让我真正懂得了什么是“库存损耗”，现在做任何业务，我都会本能地先算隐性成本。</span>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                      <span className="text-base">⚡</span>
                    </div>
                    <div>
                      <strong className="text-white text-base block mb-1 italic">优势：看透了残酷的“收支利润比”</strong>
                      <span className="text-gray-400 text-sm leading-relaxed block">每天买菜、串串、切水果到凌晨，站摊到半夜，精力完全透支。看着一晚上几百块的流水挺热闹，刨去摊位费、水电、食材和折损，纯利少得可怜。这种毒打让我对“投入产出比”有了极其务实的判断。</span>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                      <span className="text-base">💡</span>
                    </div>
                    <div>
                      <strong className="text-white text-base block mb-1 italic">优势：放下身段的“街头沟通力”</strong>
                      <span className="text-gray-400 text-sm leading-relaxed block">从坐在写字楼里画图，到在烟熏火燎的街头大声吆喝、应对各种砍价和突发状况。这段充满烟火气的经历，彻底治好了我设计的“清高”，让我学会了用最接地气的方式解决现场问题。</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="lg:w-[45%] w-full aspect-video md:aspect-[4/3] rounded-[32px] overflow-hidden relative group">
                <img src="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=1600" alt="Offline Market" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80"></div>
              </div>
            </div>
            </div>
          </section>

          {/* Screen 3: Life & Skills */}
          <section className="sticky top-0 w-full h-screen bg-[#050505] flex flex-col justify-center overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 w-full pt-20">
              <div className="bg-[#0a0a0a] border border-white/5 rounded-[40px] p-8 md:p-12 flex flex-col lg:flex-row justify-between items-center gap-10 relative overflow-hidden max-h-[calc(100vh-120px)] overflow-y-auto hide-scrollbar">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#ff2e55]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
              
              <div className="max-w-2xl relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 font-mono text-xs font-bold tracking-widest uppercase mb-4">
                  03 / 技能储备
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-8">个人技能与认知迭代</h3>
                <ul className="space-y-6 text-gray-400 text-base leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="text-[#ff2e55] mt-1 text-xl">✦</span>
                    <div>
                      <strong className="text-gray-200">考取 C1 驾照：</strong>
                      <span className="text-sm">在脱离企业框架的这段时间里，完成了这项重要的人生技能打卡，拓展了物理世界的出行半径。</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#ff2e55] mt-1 text-xl">✦</span>
                    <div>
                      <strong className="text-gray-200">AI 工具深度使用：</strong>
                      <span className="text-sm">主动拥抱技术变革，熟练将各类前沿 AI 工具融入日常工作流，极大提升了单兵作战的效率。</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#ff2e55] mt-1 text-xl">✦</span>
                    <div>
                      <strong className="text-gray-200">跟上流行与网感：</strong>
                      <span className="text-sm">保持高强度冲浪，时刻关注最新的商业模式、流行文化与审美趋势。拒绝信息茧房，确保认知始终在线。</span>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4 shrink-0 relative z-10 w-full lg:w-auto">
                <div className="px-6 py-6 rounded-3xl bg-[#111] border border-white/5 text-center flex flex-col items-center justify-center">
                  <div className="text-4xl mb-3">🚗</div>
                  <div className="text-xs text-gray-500 font-mono uppercase tracking-wider font-bold">C1 驾照</div>
                </div>
                <div className="px-6 py-6 rounded-3xl bg-[#111] border border-white/5 text-center flex flex-col items-center justify-center">
                  <div className="text-4xl mb-3">🤖</div>
                  <div className="text-xs text-gray-500 font-mono uppercase tracking-wider font-bold">AI 工具</div>
                </div>
                <div className="px-6 py-6 rounded-3xl bg-[#111] border border-white/5 text-center col-span-2 flex flex-col items-center justify-center">
                  <div className="text-4xl mb-3">🌊</div>
                  <div className="text-xs text-gray-500 font-mono uppercase tracking-wider font-bold">流行嗅觉 & 网感</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spacer to keep the last screen sticky for a bit longer before Portfolio appears */}
        <div className="h-[50vh]"></div>
        </div>

        {/* Portfolio Section */}
        <section id="portfolio" className="relative z-20 w-full bg-[#050505]">
          <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-12 h-px bg-gray-500"></span>
                  <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">Selected Portfolio</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter">
                  <ScrollSweepRevealText>精选作品</ScrollSweepRevealText>
                </h2>
              </div>
            </div>

            {/* Portfolio List Grouped by Company */}
            <div className="flex flex-col gap-y-32">
              {groupedProjects.map((group, index) => (
                <CompanyProjectBlock 
                  key={group.category} 
                  group={group} 
                  index={index} 
                  onSelectProject={handleSelectProject} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 border-t border-white/5 bg-[#050505] text-center">
          <h2 className="text-[10vw] md:text-[100px] font-bold leading-tight tracking-normal mb-8">
            随时欢迎 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-[#ff2e55]">联系我</span>
          </h2>
          
          <a href="mailto:1784591207@qq.com" className="inline-block text-4xl md:text-6xl font-bold mb-32 hover:text-[#ff2e55] transition-colors relative group">
            1784591207@qq.com
            <span className="absolute -bottom-4 left-0 w-full h-1.5 bg-[#ff2e55] rounded-full transform origin-left transition-transform group-hover:scale-x-110"></span>
          </a>

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 max-w-7xl mx-auto border-t border-white/5 pt-8">
            <p>© 2026 HUANG JINGJING. ALL RIGHTS RESERVED.</p>
            <p className="mt-4 md:mt-0">CRAFTED WITH PASSION IN DIGITAL PRODUCTS & INNOVATION.</p>
          </div>
        </section>
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-4">
        {showScrollTop && (
          <button 
            onClick={scrollToTop}
            className="w-14 h-14 bg-[#111] border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#222] transition-all shadow-lg"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showResume && <Resume onClose={() => setShowResume(false)} />}
      </AnimatePresence>
      <ProjectDetail project={selectedProject} onClose={handleCloseProject} isOpen={isDrawerOpen} />
    </div>
  );
}
