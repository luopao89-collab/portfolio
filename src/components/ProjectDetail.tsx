import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Project } from '../data';

export default function ProjectDetail({ project, onClose, isOpen }: { project: Project | null, onClose: () => void, isOpen: boolean }) {
  const [render, setRender] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setRender(true), 10);
      document.body.style.overflow = 'hidden';
    } else {
      setRender(false);
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project?.details?.results) return;
    setActiveImageIndex((prev) => 
      prev !== null && prev < project.details!.results.length - 1 ? prev + 1 : prev
    );
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project?.details?.results) return;
    setActiveImageIndex((prev) => 
      prev !== null && prev > 0 ? prev - 1 : prev
    );
  };

  if (!project) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-end justify-center pointer-events-none`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-[#050505]/80 backdrop-blur-xl transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto ${render ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div 
        className={`relative w-full md:w-[85%] lg:w-[75%] xl:w-[65%] max-w-6xl h-[100vh] md:h-[95vh] bg-white text-black md:rounded-[40px] overflow-hidden shadow-2xl pointer-events-auto transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${render ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 md:top-8 md:right-8 lg:top-10 lg:right-10 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors z-50 shadow-sm border border-gray-200"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex-1 overflow-y-auto relative">
          {/* Header Image */}
          <div className="h-[40vh] md:h-[55vh] w-full relative px-4 md:px-8 lg:px-12 pt-4 md:pt-8 lg:pt-12">
            <div className="w-full h-full rounded-[20px] overflow-hidden relative">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
            </div>
          </div>

          <div className="px-6 md:px-12 lg:px-20 py-8 relative z-10 max-w-5xl mx-auto -mt-24 md:-mt-32 bg-white rounded-[30px] shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 mb-12">
          {/* Title Section */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-[#ff2e55]/10 text-[#ff2e55] rounded-full text-[13px] font-bold tracking-widest flex items-center gap-2 border border-[#ff2e55]/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff2e55] animate-pulse"></span>
                {project.category}
              </span>
              {project.duration && (
                <span className="px-4 py-1.5 bg-gray-100/80 text-gray-500 rounded-full text-[13px] font-medium tracking-widest border border-gray-200/50">
                  项目周期: {project.duration}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-black tracking-tight leading-[1.1] mb-10 text-gray-900">
              {project.title}
            </h1>
            
            <div className="h-px w-full bg-gradient-to-r from-gray-200 via-gray-100 to-transparent my-10"></div>

            {/* Meta Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="group">
                <p className="text-[11px] text-gray-400 mb-2 flex items-center gap-2 font-bold tracking-widest uppercase">
                  <span className="text-[#ff2e55] text-base group-hover:scale-110 transition-transform">⚏</span> 设计工具
                </p>
                <p className="font-bold text-[15px] text-gray-800 leading-snug">{project.details?.tools || project.tags.join(', ')}</p>
              </div>
              <div className="group">
                <p className="text-[11px] text-gray-400 mb-2 flex items-center gap-2 font-bold tracking-widest uppercase">
                  <span className="text-[#ff2e55] text-base group-hover:scale-110 transition-transform">T</span> 界面规范
                </p>
                <p className="font-bold text-[15px] text-gray-800 leading-snug">{project.details?.fonts || 'PingFang SC / DIN'}</p>
              </div>
              <div className="group">
                <p className="text-[11px] text-gray-400 mb-2 flex items-center gap-2 font-bold tracking-widest uppercase">
                  <span className="text-[#ff2e55] text-base group-hover:scale-110 transition-transform">◎</span> 商业类型
                </p>
                <p className="font-bold text-[15px] text-gray-800 leading-snug">{project.details?.type || '企业商业项目'}</p>
              </div>
              <div className="group">
                <p className="text-[11px] text-gray-400 mb-2 flex items-center gap-2 font-bold tracking-widest uppercase">
                  <span className="text-[#ff2e55] text-base group-hover:scale-110 transition-transform">☆</span> 负责内容
                </p>
                <p className="font-bold text-[15px] text-gray-800 leading-snug">{project.details?.role || '主导设计'}</p>
              </div>
            </div>
            
            <div className="h-px w-full bg-gradient-to-r from-gray-200 via-gray-100 to-transparent my-10"></div>
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-gray-50 rounded-[24px] p-8 md:p-10 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-3 text-gray-900">
                <span className="w-10 h-10 rounded-full bg-[#ff2e55]/10 flex items-center justify-center text-[#ff2e55] text-xl">⚡</span> 
                设计挑战
              </h3>
              <p className="text-gray-600 leading-loose text-[15px]">
                {project.details?.challenge || project.description}
              </p>
            </div>
            <div className="bg-gray-50 rounded-[24px] p-8 md:p-10 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-3 text-gray-900">
                <span className="w-10 h-10 rounded-full bg-purple-600/10 flex items-center justify-center text-purple-600 text-xl">💡</span> 
                解决方案
              </h3>
              <p className="text-gray-600 leading-loose text-[15px]">
                {project.details?.solution || "通过深入的业务调研与用户洞察，重构了核心业务流程，并建立了一套可复用的设计规范，有效提升了开发效率与用户体验。"}
              </p>
            </div>
          </div>

          {/* Final Results */}
          <div>
            <h3 className="text-[11px] font-black text-gray-400 tracking-[0.2em] uppercase mb-10 flex items-center gap-4">
              <span className="w-8 h-px bg-gray-300"></span>
              FINAL RESULTS <span className="font-bold text-gray-500 ml-2">最终成果展示</span>
            </h3>
            <div className="space-y-12">
              {project.details?.results ? (
                project.details.results.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="rounded-[24px] overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex justify-center transition-all duration-500 cursor-pointer relative"
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt={`Result ${idx + 1}`} className="w-full max-w-4xl h-auto object-contain" />
                  </div>
                ))
              ) : (
                <div 
                  className="rounded-[24px] overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex justify-center transition-all duration-500 cursor-pointer relative"
                  onClick={() => setActiveImageIndex(0)}
                >
                  <img src={project.image} alt="Result" className="w-full max-w-4xl h-auto object-contain" />
                </div>
              )}
            </div>
          </div>

          {/* Footer Thanks Section */}
          <div className="mt-32 mb-16 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-16"></div>
            <div className="w-1.5 h-1.5 bg-[#ff2e55] mb-8 rounded-full animate-pulse"></div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-12 text-center flex flex-col items-center gap-2">
              THANKS FOR WATCHING
              <span className="text-sm font-medium text-gray-400 tracking-[0.2em] uppercase mt-2">感谢观看</span>
            </h2>
            <button 
              onClick={onClose}
              className="group relative px-8 py-3.5 rounded-full bg-gray-900 text-white font-medium hover:bg-black transition-all shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">关闭作品</span>
              <X className="w-4 h-4 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>
        </div>
      </div>

      {/* Lightbox / Image Viewer */}
      {activeImageIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl transition-opacity duration-300 pointer-events-auto">
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveImageIndex(null); }}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-50 text-white"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12" onClick={(e) => { e.stopPropagation(); setActiveImageIndex(null); }}>
            <img 
              src={project.details?.results ? project.details.results[activeImageIndex] : project.image} 
              alt={`View ${activeImageIndex + 1}`} 
              className="max-w-full max-h-full object-contain cursor-default"
              onClick={(e) => e.stopPropagation()}
            />

            {project.details?.results && project.details.results.length > 1 && (
              <>
                <button 
                  onClick={handlePrevImage}
                  className={`absolute left-4 md:left-8 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-50 text-white backdrop-blur-md ${activeImageIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
                  disabled={activeImageIndex === 0}
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button 
                  onClick={handleNextImage}
                  className={`absolute right-4 md:right-8 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-50 text-white backdrop-blur-md ${activeImageIndex === project.details.results.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
                  disabled={activeImageIndex === project.details.results.length - 1}
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
                
                {/* Image Counter */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-white text-sm font-medium tracking-widest">
                  {activeImageIndex + 1} / {project.details.results.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
