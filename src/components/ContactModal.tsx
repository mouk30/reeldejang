import React, { useState } from 'react';
import { X, Send, ShieldCheck, MessageCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetSiteName?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, targetSiteName }) => {
  const [submitted, setSubmitted] = useState(false);
  const [telegramId, setTelegramId] = useState('');
  const [inquiryType, setInquiryType] = useState('site-verification');
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setTelegramId('');
    setContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-[#0e1627] border-2 border-cyan-500/40 shadow-2xl shadow-black overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
              <Send className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {targetSiteName ? `${targetSiteName} 안전 검증 연결` : '24시간 1:1 안전 검증 센터'}
              </h3>
              <p className="text-xs text-slate-400">먹튀 예방 및 공식 보증 가입 코드 안내</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
                ✓
              </div>
              <h4 className="text-lg font-bold text-white">문의가 정상 접수되었습니다!</h4>
              <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                기재해 주신 메신저 또는 텔레그램으로 전담 검증관이 1분 이내 실시간 답변을 전달해 드립니다.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-amber-300">
                공식 텔레그램 직접 연결: @ReelGameKorea24
              </div>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs cursor-pointer"
              >
                닫기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  본 포털을 통해 발급되는 보증 코드는 <strong>최대 5억원 먹튀 보상 책임제</strong>가 자동 적용됩니다.
                </span>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">문의 유형</label>
                <select
                  value={inquiryType}
                  onChange={e => setInquiryType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="site-verification">안전 보증 사이트 직영 주소 및 코드 문의</option>
                  <option value="game-rule">릴게임 족보 및 예시 공략 질문</option>
                  <option value="mobile-support">스마트폰 접속 및 모바일 설치 지원</option>
                  <option value="scam-report">타사 먹튀 사이트 제보 및 피해 상담</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">텔레그램 아이디 또는 연락처</label>
                <input
                  type="text"
                  required
                  value={telegramId}
                  onChange={e => setTelegramId(e.target.value)}
                  placeholder="@아이디 또는 010-XXXX-XXXX"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">상세 문의 내용</label>
                <textarea
                  rows={3}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="궁금하신 점이나 안내받고 싶으신 사이트명을 적어주세요."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>실시간 문의 접수하기</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
