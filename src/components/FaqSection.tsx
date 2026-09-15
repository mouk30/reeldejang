import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageCircle } from 'lucide-react';
import { FAQ_LIST } from '../data/games';
import { FaqItem } from '../types';

interface FaqSectionProps {
  onOpenContactModal: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenContactModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', '일반', '게임방법', '안전검증', '모바일'];

  const filteredFaqs = FAQ_LIST.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="faq" className="py-14 bg-[#0a0f1d] border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 text-purple-400 text-xs font-bold mb-3 border border-purple-500/30">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>구글 검색 빈출 질문 FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            릴게임 이용자 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400">자주 묻는 질문 (FAQ)</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            초보자부터 베테랑 매니아까지 가장 궁금해하시는 핵심 사항들을 명쾌하게 정리해 드립니다.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setOpenIndex(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-500/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat === 'all' ? '전체 질문' : cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-all duration-200"
              >
                <button
                  id={`faq-toggle-${idx}`}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-850 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold flex items-center justify-center font-mono shrink-0">
                      Q{idx + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-100">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="shrink-0 text-slate-400">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-amber-400" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 1:1 Inquiries Banner */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">원하는 답변을 찾지 못하셨나요?</h4>
              <p className="text-xs text-slate-400">포털 전문 상담팀이 24시간 실시간 1:1 문의를 지원합니다.</p>
            </div>
          </div>

          <button
            id="faq-ask-direct-btn"
            onClick={onOpenContactModal}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-500/25 transition-all shrink-0 cursor-pointer"
          >
            24시간 1:1 실시간 문의하기
          </button>
        </div>
      </div>
    </section>
  );
};
