import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Volume2, VolumeX, Sparkles, Trophy, AlertTriangle, Zap, HelpCircle, Coins, Flame, ChevronRight } from 'lucide-react';
import { GameDefinition, ReelSymbol, GameId } from '../types';
import { REEL_GAMES } from '../data/games';
import { soundManager } from '../utils/audio';

interface ReelSimulatorProps {
  activeGameId: GameId;
  onSelectGame: (id: GameId) => void;
  onNewJackpotWin?: (gameName: string, amount: number, comboText: string) => void;
}

export const ReelSimulator: React.FC<ReelSimulatorProps> = ({ activeGameId, onSelectGame, onNewJackpotWin }) => {
  const currentGame = REEL_GAMES.find(g => g.id === activeGameId) || REEL_GAMES[0];
  const symbols = currentGame.symbols;

  // Simulator States
  const [balance, setBalance] = useState<number>(100000);
  const [bet, setBet] = useState<number>(5000);
  const [lastWin, setLastWin] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [autoSpin, setAutoSpin] = useState<boolean>(false);
  const [spinCount, setSpinCount] = useState<number>(0);

  // 3x3 Grid of Reel Symbols
  const [grid, setGrid] = useState<ReelSymbol[][]>([
    [symbols[0], symbols[1], symbols[2]],
    [symbols[1], symbols[2], symbols[0]],
    [symbols[2], symbols[0], symbols[1]],
  ]);

  // Reel stop states
  const [reelSpinning, setReelSpinning] = useState<[boolean, boolean, boolean]>([false, false, false]);

  // Winning lines: 0: top, 1: mid, 2: bot, 3: diag-down, 4: diag-up
  const [winningLines, setWinningLines] = useState<number[]>([]);

  // Special Notice (예시) & Combo (연타) states
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);
  const [isNoticeActive, setIsNoticeActive] = useState<boolean>(false);
  const [comboCount, setComboCount] = useState<number>(0);
  const [jackpotNotice, setJackpotNotice] = useState<{ title: string; prize: number } | null>(null);

  // Sound toggle state
  const [soundOn, setSoundOn] = useState<boolean>(true);

  // Refs for intervals & timeouts
  const spinIntervals = useRef<(number | null)[]>([null, null, null]);
  const autoSpinTimeout = useRef<number | null>(null);

  // Update symbols grid when game changes
  useEffect(() => {
    setGrid([
      [symbols[0], symbols[1], symbols[2]],
      [symbols[1], symbols[2], symbols[0]],
      [symbols[2], symbols[0], symbols[1]],
    ]);
    setWinningLines([]);
    setNoticeMessage(null);
    setIsNoticeActive(false);
  }, [activeGameId, symbols]);

  // Trigger confetti for jackpot
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#06b6d4', '#ec4899', '#10b981', '#ffffff']
      });
    } catch {
      // ignore
    }
  }, []);

  // Check winning lines in 3x3 grid
  const evaluateWins = useCallback((newGrid: ReelSymbol[][], currentBet: number): { winAmount: number; lines: number[]; matchedSymbol: ReelSymbol | null } => {
    let winAmount = 0;
    const lines: number[] = [];
    let matchedSymbol: ReelSymbol | null = null;

    // Line 0: row 0 (top)
    if (newGrid[0][0].id === newGrid[0][1].id && newGrid[0][1].id === newGrid[0][2].id) {
      lines.push(0);
      winAmount += currentBet * newGrid[0][0].payout;
      matchedSymbol = newGrid[0][0];
    }
    // Line 1: row 1 (middle - main payline)
    if (newGrid[1][0].id === newGrid[1][1].id && newGrid[1][1].id === newGrid[1][2].id) {
      lines.push(1);
      winAmount += currentBet * newGrid[1][0].payout;
      matchedSymbol = newGrid[1][0];
    }
    // Line 2: row 2 (bottom)
    if (newGrid[2][0].id === newGrid[2][1].id && newGrid[2][1].id === newGrid[2][2].id) {
      lines.push(2);
      winAmount += currentBet * newGrid[2][0].payout;
      matchedSymbol = newGrid[2][0];
    }
    // Line 3: diagonal top-left to bottom-right
    if (newGrid[0][0].id === newGrid[1][1].id && newGrid[1][1].id === newGrid[2][2].id) {
      lines.push(3);
      winAmount += currentBet * newGrid[0][0].payout;
      matchedSymbol = newGrid[0][0];
    }
    // Line 4: diagonal bottom-left to top-right
    if (newGrid[2][0].id === newGrid[1][1].id && newGrid[1][1].id === newGrid[0][2].id) {
      lines.push(4);
      winAmount += currentBet * newGrid[2][0].payout;
      matchedSymbol = newGrid[2][0];
    }

    return { winAmount, lines, matchedSymbol };
  }, []);

  // Start spinning
  const handleSpin = useCallback(() => {
    if (isSpinning) return;
    if (balance < bet) {
      setBalance(prev => prev + 100000); // Auto refill virtual credit
      alert('가상 연습 크레딧 100,000 P가 무료 충전되었습니다!');
      return;
    }

    // Deduct bet
    setBalance(prev => prev - bet);
    setIsSpinning(true);
    setWinningLines([]);
    setLastWin(0);
    setJackpotNotice(null);
    setSpinCount(prev => prev + 1);

    // Randomly decide if a special "Notice(예시)" triggers! (roughly 25% chance or if in combo)
    const triggerNotice = comboCount > 0 || Math.random() < 0.28;
    if (triggerNotice) {
      const pattern = currentGame.noticePatterns[Math.floor(Math.random() * currentGame.noticePatterns.length)];
      setNoticeMessage(`[예시 발생] ${pattern.title} - ${pattern.description}`);
      setIsNoticeActive(true);
      soundManager.playNoticeAlert();
    } else {
      setNoticeMessage(null);
      setIsNoticeActive(false);
    }

    // Start reel animations
    setReelSpinning([true, true, true]);

    // Interval for rapid shuffling in UI
    const tempGrid: ReelSymbol[][] = [
      [...grid[0]],
      [...grid[1]],
      [...grid[2]]
    ];

    [0, 1, 2].forEach(col => {
      spinIntervals.current[col] = window.setInterval(() => {
        soundManager.playSpinTick();
        setGrid(prev => {
          const next = [...prev];
          next[0][col] = symbols[Math.floor(Math.random() * symbols.length)];
          next[1][col] = symbols[Math.floor(Math.random() * symbols.length)];
          next[2][col] = symbols[Math.floor(Math.random() * symbols.length)];
          return next;
        });
      }, 70);
    });

    // Prepare final results
    // If notice was triggered or combo is active, high probability of matching win line!
    const forceWin = isNoticeActive || triggerNotice || Math.random() < 0.35;
    const finalGrid: ReelSymbol[][] = [
      [symbols[0], symbols[1], symbols[2]],
      [symbols[1], symbols[2], symbols[0]],
      [symbols[2], symbols[0], symbols[1]],
    ];

    // Pick random symbols
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        finalGrid[r][c] = symbols[Math.floor(Math.random() * symbols.length)];
      }
    }

    // If winning is determined, align a payline
    if (forceWin) {
      const luckySymbol = symbols[Math.floor(Math.random() * (triggerNotice ? 3 : symbols.length))]; // pick rarer if notice
      const luckyRow = 1; // Center main line
      finalGrid[luckyRow][0] = luckySymbol;
      finalGrid[luckyRow][1] = luckySymbol;
      finalGrid[luckyRow][2] = luckySymbol;
    }

    // Sequentially stop reels
    const stopTime1 = 700;
    const stopTime2 = 1200;
    const stopTime3 = 1700;

    // Stop Reel 1
    setTimeout(() => {
      if (spinIntervals.current[0]) clearInterval(spinIntervals.current[0]);
      setReelSpinning([false, true, true]);
      soundManager.playStopClack(0.9);
      setGrid(prev => [
        [finalGrid[0][0], prev[0][1], prev[0][2]],
        [finalGrid[1][0], prev[1][1], prev[1][2]],
        [finalGrid[2][0], prev[2][1], prev[2][2]],
      ]);
    }, stopTime1);

    // Stop Reel 2
    setTimeout(() => {
      if (spinIntervals.current[1]) clearInterval(spinIntervals.current[1]);
      setReelSpinning([false, false, true]);
      soundManager.playStopClack(1.0);
      setGrid(prev => [
        [prev[0][0], finalGrid[0][1], prev[0][2]],
        [prev[1][0], finalGrid[1][1], prev[1][2]],
        [prev[2][0], finalGrid[2][1], prev[2][2]],
      ]);
    }, stopTime2);

    // Stop Reel 3 (Final resolution)
    setTimeout(() => {
      if (spinIntervals.current[2]) clearInterval(spinIntervals.current[2]);
      setReelSpinning([false, false, false]);
      soundManager.playStopClack(1.2);
      setGrid(finalGrid);
      setIsSpinning(false);

      // Evaluate win
      const { winAmount, lines, matchedSymbol } = evaluateWins(finalGrid, bet);

      if (winAmount > 0) {
        setWinningLines(lines);
        setLastWin(winAmount);
        setBalance(prev => prev + winAmount);

        // Check if legendary / epic jackpot
        const isJackpot = (matchedSymbol && matchedSymbol.payout >= 20) || winAmount >= bet * 20;

        if (isJackpot) {
          const nextCombo = comboCount + 1;
          setComboCount(nextCombo);
          setJackpotNotice({
            title: `${matchedSymbol ? matchedSymbol.name : '대박'} ${nextCombo}연타 잭팟 달성!`,
            prize: winAmount
          });
          soundManager.playJackpotFanfare();
          triggerConfetti();

          if (onNewJackpotWin) {
            onNewJackpotWin(currentGame.name, winAmount, `${matchedSymbol?.name || '특수'} ${nextCombo}연타`);
          }
        } else {
          soundManager.playWin();
        }
      } else {
        // Reset combo if miss
        if (comboCount > 0) {
          setComboCount(0);
        }
      }
    }, stopTime3);
  }, [isSpinning, balance, bet, comboCount, currentGame, symbols, grid, isNoticeActive, evaluateWins, triggerConfetti, onNewJackpotWin]);

  // Handle auto-spin loop
  useEffect(() => {
    if (autoSpin && !isSpinning) {
      autoSpinTimeout.current = window.setTimeout(() => {
        handleSpin();
      }, 1000);
    }
    return () => {
      if (autoSpinTimeout.current) clearTimeout(autoSpinTimeout.current);
    };
  }, [autoSpin, isSpinning, handleSpin]);

  // Manual stop single reel if wanted
  const stopReelEarly = (colIdx: number) => {
    if (!isSpinning) return;
    if (spinIntervals.current[colIdx]) {
      clearInterval(spinIntervals.current[colIdx]);
      soundManager.playStopClack();
    }
  };

  const refillCredit = () => {
    setBalance(100000);
    setLastWin(0);
    setComboCount(0);
    setNoticeMessage('무료 연습 크레딧 100,000 P가 완충되었습니다.');
  };

  return (
    <section id="simulator" className="py-12 bg-gradient-to-b from-[#070b14] via-[#0b1220] to-[#070b14] border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold mb-3 border border-amber-500/30">
            <Flame className="w-3.5 h-3.5 fill-amber-400" />
            <span>100% 무설치 · 무제한 무료 플레이 체험관</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            인기 릴게임 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">실시간 무료 시뮬레이터</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            실제 아케이드 오리지널 기판의 확률표와 예시 출현 알고리즘을 100% 동일하게 이식했습니다.
            원하는 게임을 선택하고 손맛과 당첨 패턴을 직접 확인하세요!
          </p>
        </div>

        {/* Game Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {REEL_GAMES.map(game => (
            <button
              key={game.id}
              id={`sim-tab-${game.id}`}
              onClick={() => onSelectGame(game.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 border ${
                activeGameId === game.id
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/25 scale-105'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              <span>{game.symbols[0].icon}</span>
              <span>{game.name.split(' ')[0]}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                activeGameId === game.id ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'
              }`}>
                {game.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Arcade Cabinet Container */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#11192e] via-[#0d1424] to-[#080d1a] border-2 border-amber-500/40 p-4 sm:p-7 shadow-2xl shadow-black/80 relative">
          {/* Top Marquee Header of the Cabinet */}
          <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 rounded-2xl p-4 border border-amber-500/30 mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-3xl">
                {currentGame.symbols[0].icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-amber-300">{currentGame.name}</h3>
                  <span className="text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded font-mono">
                    RTP {currentGame.rtp}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{currentGame.tagline}</p>
              </div>
            </div>

            {/* Cabinet Status HUD */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 text-center">
                <span className="text-slate-400 block text-[10px]">SPIN 횟수</span>
                <span className="text-slate-100 font-bold text-sm">{spinCount}회</span>
              </div>
              <div className="bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 text-center">
                <span className="text-slate-400 block text-[10px]">보너스 연타</span>
                <span className="text-amber-400 font-bold text-sm">{comboCount > 0 ? `${comboCount}연타 진행중` : '대기중'}</span>
              </div>
            </div>
          </div>

          {/* Authentic "Notice (예시)" Alert Banner */}
          {noticeMessage && (
            <div className="mb-5 animate-pulse rounded-xl bg-gradient-to-r from-red-600/30 via-amber-600/30 to-red-600/30 border-2 border-red-500 p-3 text-center shadow-lg shadow-red-500/30">
              <div className="flex items-center justify-center gap-2 text-amber-300 font-bold text-sm sm:text-base">
                <AlertTriangle className="w-5 h-5 text-red-400 animate-bounce" />
                <span>{noticeMessage}</span>
              </div>
            </div>
          )}

          {/* Jackpot Announcement Banner */}
          {jackpotNotice && (
            <div className="mb-5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 p-4 text-slate-950 text-center shadow-2xl shadow-amber-500/40 animate-bounce">
              <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl font-black">
                <Trophy className="w-7 h-7 fill-slate-950" />
                <span>🎉 {jackpotNotice.title} 🎉</span>
              </div>
              <p className="font-extrabold text-lg sm:text-xl mt-1">
                당첨 획득 포인트: <span className="font-mono text-2xl font-black underline">+{jackpotNotice.prize.toLocaleString()} P</span>
              </p>
            </div>
          )}

          {/* The 3x3 Reel Display Stage */}
          <div className="relative rounded-2xl bg-slate-950 border-4 border-slate-800 p-4 sm:p-6 mb-6 shadow-inner">
            {/* Payline indicators on the left and right */}
            <div className="absolute top-1/2 -left-3 -translate-y-1/2 bg-amber-500 text-slate-950 font-black text-[10px] px-1 py-2 rounded shadow font-mono">
              LINE
            </div>
            <div className="absolute top-1/2 -right-3 -translate-y-1/2 bg-amber-500 text-slate-950 font-black text-[10px] px-1 py-2 rounded shadow font-mono">
              LINE
            </div>

            {/* Reel Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-5">
              {[0, 1, 2].map(colIdx => (
                <div key={colIdx} className="space-y-3">
                  {/* The 3 symbol rows in this reel */}
                  {[0, 1, 2].map(rowIdx => {
                    const symbol = grid[rowIdx][colIdx];
                    // Check if this symbol is part of an active win line
                    const isWinningSymbol =
                      (winningLines.includes(0) && rowIdx === 0) ||
                      (winningLines.includes(1) && rowIdx === 1) ||
                      (winningLines.includes(2) && rowIdx === 2) ||
                      (winningLines.includes(3) && rowIdx === colIdx) ||
                      (winningLines.includes(4) && rowIdx === 2 - colIdx);

                    return (
                      <div
                        key={rowIdx}
                        className={`h-24 sm:h-32 rounded-xl flex flex-col items-center justify-center transition-all duration-150 relative overflow-hidden border ${
                          isWinningSymbol
                            ? 'bg-gradient-to-br from-amber-500/40 via-yellow-500/30 to-amber-600/40 border-amber-300 shadow-lg shadow-amber-400/50 scale-105 animate-pulse'
                            : rowIdx === 1
                            ? 'bg-slate-900/90 border-slate-700/80 shadow-inner'
                            : 'bg-slate-950/70 border-slate-800/60 opacity-85'
                        }`}
                      >
                        {/* Center row guide highlight */}
                        {rowIdx === 1 && (
                          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/40"></div>
                        )}

                        <span className="text-4xl sm:text-6xl filter drop-shadow-md transition-transform hover:scale-110">
                          {symbol ? symbol.icon : '❓'}
                        </span>
                        <span className={`text-[11px] sm:text-xs font-bold mt-1 tracking-tight ${symbol ? symbol.color : 'text-slate-400'}`}>
                          {symbol ? symbol.name : ''}
                        </span>

                        {/* Payout multiplier badge */}
                        <span className="text-[9px] font-mono text-slate-400 bg-slate-950/80 px-1.5 py-0.2 rounded border border-slate-800 mt-0.5">
                          {symbol ? `${symbol.payout}x` : ''}
                        </span>
                      </div>
                    );
                  })}

                  {/* Manual Stop button for each reel column */}
                  <button
                    id={`sim-stop-col-${colIdx}`}
                    onClick={() => stopReelEarly(colIdx)}
                    disabled={!reelSpinning[colIdx]}
                    className={`w-full py-1.5 rounded-lg text-xs font-bold tracking-wider transition-colors uppercase ${
                      reelSpinning[colIdx]
                        ? 'bg-rose-600 hover:bg-rose-500 text-white animate-bounce cursor-pointer'
                        : 'bg-slate-800/50 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    STOP {colIdx + 1}
                  </button>
                </div>
              ))}
            </div>

            {/* Winning Line Overlay Indicator */}
            {winningLines.length > 0 && (
              <div className="mt-3 py-1.5 px-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>당첨 라인 {winningLines.length}개 적중! (+{lastWin.toLocaleString()} P)</span>
              </div>
            )}
          </div>

          {/* Control Panel (HUD & Bets & Buttons) */}
          <div className="space-y-4">
            {/* Balance & Win Screen */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Credit Balance */}
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">보유 연습 크레딧</span>
                  <span className="text-xl font-black text-amber-400 font-mono">{balance.toLocaleString()} P</span>
                </div>
                <button
                  id="sim-refill-credit-btn"
                  onClick={refillCredit}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1 cursor-pointer"
                  title="크레딧 충전"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>완충</span>
                </button>
              </div>

              {/* Current Bet */}
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">1회 베팅액</span>
                  <span className="text-xl font-black text-cyan-300 font-mono">{bet.toLocaleString()} P</span>
                </div>
                <div className="flex gap-1">
                  {[1000, 5000, 10000, 30000].map(amt => (
                    <button
                      key={amt}
                      onClick={() => setBet(amt)}
                      className={`px-1.5 py-1 rounded text-[10px] font-bold font-mono transition-colors ${
                        bet === amt ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {amt / 1000}K
                    </button>
                  ))}
                </div>
              </div>

              {/* Last Win */}
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">최근 당첨 포인트</span>
                  <span className="text-xl font-black text-emerald-400 font-mono">
                    {lastWin > 0 ? `+${lastWin.toLocaleString()}` : '0'} P
                  </span>
                </div>
                <Coins className="w-6 h-6 text-amber-400 opacity-80" />
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              {/* Left group: Auto Spin & Max Bet */}
              <div className="flex items-center gap-2">
                <button
                  id="sim-auto-spin-btn"
                  onClick={() => setAutoSpin(!autoSpin)}
                  className={`px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer border ${
                    autoSpin
                      ? 'bg-rose-600 border-rose-500 text-white animate-pulse'
                      : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                >
                  <RotateCcw className={`w-4 h-4 ${autoSpin ? 'animate-spin' : ''}`} />
                  <span>{autoSpin ? '자동 스핀 중지' : '자동 스핀 (AUTO)'}</span>
                </button>

                <button
                  id="sim-max-bet-btn"
                  onClick={() => setBet(30000)}
                  className="px-4 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-amber-300 border border-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  MAX BET (3만P)
                </button>
              </div>

              {/* Center/Right: Primary SPIN button */}
              <button
                id="sim-spin-main-btn"
                onClick={handleSpin}
                disabled={isSpinning}
                className={`flex-1 sm:flex-none px-10 py-3.5 rounded-xl font-black text-lg sm:text-xl tracking-wider transition-all duration-200 flex items-center justify-center gap-3 shadow-xl cursor-pointer ${
                  isSpinning
                    ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-amber-500/30 scale-105 active:scale-95'
                }`}
              >
                <Play className={`w-6 h-6 fill-slate-950 ${isSpinning ? 'animate-spin' : ''}`} />
                <span>{isSpinning ? '릴 회전 중...' : '스핀 (SPIN)'}</span>
              </button>
            </div>

            {/* Quick Paytable Bar */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
              <span className="font-semibold text-slate-300 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                {currentGame.name.split(' ')[0]} 3열 적중 배당률:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {symbols.map(s => (
                  <span key={s.id} className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {s.icon} {s.name} <strong className="text-amber-400">{s.payout}x</strong>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
