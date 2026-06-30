import { useState, useEffect } from 'react';
import { ChevronDown, TrendingUp } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import type { CardData } from '../types';

interface Props {
  data: CardData;
}

export default function ProjectsSection({ data }: Props) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const { ref, inView } = useInView();
  const [visibleCards, setVisibleCards] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let count = 0;
    const tick = () => {
      count += 1;
      setVisibleCards(count);
      if (count < data.projects.length) setTimeout(tick, 100);
    };
    setTimeout(tick, 100);
  }, [inView, data.projects.length]);

  return (
    <section
      id="projects"
      className="section"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="section-header">
        <h2 className="section-title">项目经历</h2>
        <p className="section-subtitle">核心产品研发全程参与</p>
      </div>

      <div className="timeline">
        {data.projects.map((p, idx) => {
          const isOpen = expanded === idx;
          return (
            <div
              key={idx}
              className={`timeline-item ${visibleCards > idx ? 'visible' : ''}`}
              style={{ transitionDelay: `${idx * 0.08}s` }}
            >
              <div className="timeline-track">
                <div className="timeline-dot" />
                {idx < data.projects.length - 1 && <div className="timeline-line" />}
              </div>

              <div className={`project-glass-card glass-card ${isOpen ? 'open' : ''}`}>
                <button
                  className="project-card-header"
                  onClick={() => setExpanded(isOpen ? null : idx)}
                >
                  <div className="project-header-info">
                    <span className="project-period">{p.period}</span>
                    <h3 className="project-name">{p.name}</h3>
                    <p className="project-role">{p.role}</p>
                  </div>
                  <div className={`project-chevron ${isOpen ? 'rotated' : ''}`}>
                    <ChevronDown size={18} strokeWidth={1.5} />
                  </div>
                </button>

                <div className={`project-body ${isOpen ? 'open' : ''}`}>
                  <p className="project-desc">{p.description}</p>

                  {p.achievements.length > 0 && (
                    <div className="project-achievements">
                      <div className="achievements-label">
                        <TrendingUp size={13} strokeWidth={2} />
                        业务成果
                      </div>
                      <ul className="achievements-list">
                        {p.achievements.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="project-tech">
                    {p.tech.map((t) => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
