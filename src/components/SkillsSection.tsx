import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import type { CardData } from '../types';

interface Props {
  data: CardData;
}

const catAccents = [
  { color: 'rgba(0,113,227,0.85)', glow: 'rgba(0,113,227,0.15)' },
  { color: 'rgba(48,185,165,0.85)', glow: 'rgba(48,185,165,0.14)' },
  { color: 'rgba(140,90,220,0.85)', glow: 'rgba(140,90,220,0.13)' },
  { color: 'rgba(220,130,60,0.85)', glow: 'rgba(220,130,60,0.13)' },
];

export default function SkillsSection({ data }: Props) {
  const { ref, inView } = useInView();
  const [visibleCount, setVisibleCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const profile = data.profile;
  const allTags = profile.skillCategories.flatMap((c) => c.skills);

  useEffect(() => {
    if (!inView) return;
    let count = 0;
    const tick = () => {
      count += 1;
      setVisibleCount(count);
      if (count < allTags.length) {
        timerRef.current = setTimeout(tick, 48);
      }
    };
    timerRef.current = setTimeout(tick, 120);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [inView, allTags.length]);

  let globalIdx = 0;

  return (
    <section id="skills" className="section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="section-header">
        <h2 className="section-title">技能专长</h2>
        <p className="section-subtitle">6年实战积累的核心技术栈</p>
      </div>
      <div className="skills-grid">
        {profile.skillCategories.map((cat, catIdx) => {
          const accent = catAccents[catIdx % catAccents.length];
          return (
            <div key={cat.name} className="skill-cat-card glass-card">
              <div
                className="skill-cat-indicator"
                style={{ background: accent.color }}
              />
              <h3 className="skill-cat-name" style={{ color: accent.color }}>
                {cat.name}
              </h3>
              <div className="skill-tags">
                {cat.skills.map((skill) => {
                  const tagIdx = globalIdx++;
                  return (
                    <span
                      key={skill}
                      className={`skill-pill ${visibleCount > tagIdx ? 'visible' : ''}`}
                      style={{
                        '--pill-color': accent.color,
                        '--pill-glow': accent.glow,
                        transitionDelay: `${tagIdx * 0.04}s`,
                      } as React.CSSProperties}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
