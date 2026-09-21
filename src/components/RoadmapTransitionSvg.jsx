import React, { useMemo, useRef, useEffect, useCallback } from "react";

/**
 * Вычисляет полную длительность анимации roadmap (линии + узел + пульс первый цикл).
 */
export function calcRoadmapDurationMs(fromId, toId, total = 7) {
  const segmentAnimDurationMs = 520;
  const segmentDelayStepMs = 420;

  const toIndex = (toId ?? 0) - 1;
  const fromIndex = (fromId ?? 0) - 1;
  const fromIndexSafe = Math.max(0, Math.min(total - 1, fromIndex));
  const fromReached = Math.min(fromIndexSafe, toIndex);
  const animStartSeg = fromReached;
  const animEndSeg = Math.min(total - 2, toIndex - 1);
  const animSegCount = Math.max(0, animEndSeg - animStartSeg + 1);

  // Задержка пульса + один цикл пульса (2400ms)
  const lastNodeDelayMs =
    (animSegCount - 1) * segmentDelayStepMs + segmentAnimDurationMs;
  const pulseDelayMs = lastNodeDelayMs + segmentAnimDurationMs;
  const pulseOneCycleMs = 2400;

  return pulseDelayMs + pulseOneCycleMs;
}

function splitTitleIntoLines(title) {
  if (!title) return { line1: "", line2: null };

  // Если влазит в одну строку, не дробим.
  if (title.length <= 14) {
    return { line1: title, line2: null };
  }

  const words = title.split(" ").filter(Boolean);
  if (words.length <= 1) return { line1: title, line2: null };

  // Простейшее двустрочное разбиение: "всё кроме последнего" / "последнее".
  const line2 = words[words.length - 1];
  const line1 = words.slice(0, -1).join(" ");
  return { line1, line2 };
}

export default function RoadmapTransitionSvg({
  fromId,
  toId,
  total = 7,
  moduleTitles = [],
}) {
  const primary = "#b70037";
  const neutral = "#d1d5db";
  const accentBg = "#f5f5f5";
  const titleNeutral = "#6b7280";

  const toIndex = (toId ?? 0) - 1;
  const fromIndex = (fromId ?? 0) - 1;

  const x = useMemo(() => {
    const start = 70;
    const step = 100;
    return Array.from({ length: total }, (_, i) => start + i * step);
  }, [total]);

  const viewW = 800;
  const viewH = 260;
  const yBase = 135;
  const yAmp = 20;
  const nodeRadius = 13;
  const ringRadius = nodeRadius + 8;

  const labelNumYAbove = yBase - 50;
  const labelTitleYAbove1 = yBase - 34;
  const labelTitleYAbove2 = yBase - 18;

  const labelNumYBelow = yBase + 34;
  const labelTitleYBelow1 = yBase + 48;
  const labelTitleYBelow2 = yBase + 62;

  const segmentAnimDurationMs = 520;
  const segmentDelayStepMs = 420;

  const baselineD = useMemo(() => {
    let d = `M ${x[0]} ${yBase}`;
    for (let i = 0; i < total - 1; i++) {
      const x0 = x[i];
      const x1 = x[i + 1];
      const mid = (x0 + x1) / 2;
      const yCtrl = yBase + (i % 2 === 0 ? -yAmp : yAmp);
      d += ` Q ${mid} ${yCtrl} ${x1} ${yBase}`;
    }
    return d;
  }, [x, yBase, yAmp, total]);

  const segmentD = useCallback(
    (segIdx) => {
      const x0 = x[segIdx];
      const x1 = x[segIdx + 1];
      const mid = (x0 + x1) / 2;
      const yCtrl = yBase + (segIdx % 2 === 0 ? -yAmp : yAmp);
      return `M ${x0} ${yBase} Q ${mid} ${yCtrl} ${x1} ${yBase}`;
    },
    [x, yBase, yAmp],
  );

  // Refs для анимированных сегментов линии — чтобы получить getTotalLength()
  const animPathRefs = useRef({});

  const setAnimPathRef = useCallback((segIdx) => (el) => {
    if (el) animPathRefs.current[segIdx] = el;
  }, []);

  // После mount — установить точные dasharray/dashoffset по реальной длине пути
  useEffect(() => {
    Object.entries(animPathRefs.current).forEach(([, pathEl]) => {
      if (pathEl && pathEl.getTotalLength) {
        const len = pathEl.getTotalLength();
        pathEl.style.strokeDasharray = `${len}`;
        pathEl.style.strokeDashoffset = `${len}`;
      }
    });
  });

  if (!fromId || !toId) return null;
  if (toId < 1 || toId > total) return null;

  const toX = x[toIndex];
  const toY = yBase;

  // Показываем уже пройденное ДО previous модуль (`fromId`),
  // а анимируем плавное "дорисовывание" ТОЛЬКО от `fromId` до `toId`.
  const fromIndexSafe = Math.max(0, Math.min(total - 1, fromIndex));
  const fromReached = Math.min(fromIndexSafe, toIndex);
  const animStartSeg = fromReached;
  const animEndSeg = Math.min(total - 2, toIndex - 1);

  const animSegCount = Math.max(0, animEndSeg - animStartSeg + 1);

  // Задержка пульса = после того как последний узел заполнится
  const lastNodeDelayMs =
    (animSegCount - 1) * segmentDelayStepMs + segmentAnimDurationMs;
  const pulseDelayMs = lastNodeDelayMs + segmentAnimDurationMs;

  return (
    <div
      className="w-full flex justify-center"
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="260"
        viewBox={`0 0 ${viewW} ${viewH}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <rect
          x="0"
          y="0"
          width={viewW}
          height={viewH}
          rx="999"
          fill={accentBg}
          opacity="0.55"
        />

        <path
          d={baselineD}
          stroke={neutral}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="10 10"
          opacity="0.9"
        />

        {/* Красная линия ДО fromId (уже пройдено) */}
        {fromReached > 0 &&
          Array.from({ length: fromReached }, (_, segIdx) => (
            <path
              key={`static-${segIdx}`}
              d={segmentD(segIdx)}
              stroke={primary}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              opacity="0.9"
            />
          ))}

        {/* Анимируем плавно только от fromId до toId */}
        {animEndSeg >= animStartSeg &&
          Array.from({ length: animSegCount }, (_, k) => {
            const segIdx = animStartSeg + k;
            return (
              <path
                key={`anim-${segIdx}`}
                ref={setAnimPathRef(segIdx)}
                d={segmentD(segIdx)}
                stroke={primary}
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                opacity="0.95"
                className="roadmap-line-segment"
                style={{
                  animationDuration: `${segmentAnimDurationMs}ms`,
                  animationDelay: `${k * segmentDelayStepMs}ms`,
                }}
              />
            );
          })}

        {/* Узлы + подписи */}
        {Array.from({ length: total }, (_, i) => {
          const isTo = i === toIndex;
          const isBeforeFrom = i <= fromReached;
          const isInTransition = i > fromReached && i <= toIndex;

          // Узел начинает анимацию когда линия ДО него закончила рисоваться
          const segK = i - fromReached - 1;
          const nodeDelayMs =
            segK * segmentDelayStepMs + segmentAnimDurationMs;

          const title = moduleTitles[i] ?? `Модуль ${i + 1}`;
          const lines = splitTitleIntoLines(title);
          const isAbove = i % 2 === 0;

          const labelClass = isInTransition ? "roadmap-label-fill-anim" : undefined;
          const labelStyle = isInTransition
            ? {
                animationDuration: `${segmentAnimDurationMs}ms`,
                animationDelay: `${nodeDelayMs}ms`,
              }
            : undefined;

          return (
            <g key={i}>
              <text
                x={x[i]}
                y={isAbove ? labelNumYAbove : labelNumYBelow}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill={isBeforeFrom ? primary : titleNeutral}
                className={labelClass}
                style={labelStyle}
              >
                {i + 1}
              </text>
              <text
                x={x[i]}
                y={isAbove ? labelTitleYAbove1 : labelTitleYBelow1}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill={isBeforeFrom ? primary : titleNeutral}
                className={labelClass}
                style={labelStyle}
              >
                {lines.line1}
              </text>
              {lines.line2 && (
                <text
                  x={x[i]}
                  y={isAbove ? labelTitleYAbove2 : labelTitleYBelow2}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill={isBeforeFrom ? primary : titleNeutral}
                  className={labelClass}
                  style={labelStyle}
                >
                  {lines.line2}
                </text>
              )}

              <circle
                cx={x[i]}
                cy={yBase}
                r={nodeRadius}
                fill={isBeforeFrom ? primary : "#ffffff"}
                stroke={isBeforeFrom ? primary : neutral}
                strokeWidth={3}
                className={isInTransition ? "roadmap-node-fill-anim" : undefined}
                style={
                  isInTransition
                    ? {
                        animationDuration: `${segmentAnimDurationMs}ms`,
                        animationDelay: `${nodeDelayMs}ms`,
                      }
                    : undefined
                }
              />

              {/* Пульс только на новом модуле — стартует после заполнения узла */}
              {isTo && (
                <circle
                  cx={toX}
                  cy={toY}
                  r={ringRadius}
                  fill="none"
                  stroke={primary}
                  strokeWidth={3}
                  className="roadmap-pulse-ring"
                  style={{
                    animationDelay: `${pulseDelayMs}ms`,
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
