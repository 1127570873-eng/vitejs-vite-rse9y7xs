import { Award, BookOpen, Lightbulb } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import type { CardData } from '../types';

interface Props {
  data: CardData;
}

const iconMap = {
  patent: <Lightbulb size={22} strokeWidth={1.5} />,
  publication: <BookOpen size={22} strokeWidth={1.5} />,
  award: <Award size={22} strokeWidth={1.5} />,
};

const colorMap = {
  patent: { color: 'rgba(0,113,227,0.9)', glow: 'rgba(0,113,227,0.12)', bg: 'rgba(0,113,227,0.1)' },
  publication: { color: 'rgba(48,185,165,0.9)', glow: 'rgba(48,185,165,0.12)', bg: 'rgba(48,185,165,0.1)' },
  award: { color: 'rgba(220,160,40,0.95)', glow: 'rgba(220,160,40,0.14)', bg: 'rgba(220,160,40,0.1)' },
};

export default function HonorsSection({ data }: Props) {
  const { ref, inView } = useInView();
  const profile = data.profile;

  return (
    <section
      id="honors"
      className="section"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="section-header">
        <h2 className="section-title">荣誉资质</h2>
        <p className="section-subtitle">技术创新与行业贡献</p>
      </div>

      <div className="honors-grid">
        {profile.honors.map((h, idx) => {
          const palette = colorMap[h.type];
          return (
            <div
              key={idx}
              className={`honor-glass-card glass-card ${inView ? 'visible' : ''}`}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <div
                className="honor-icon-wrap"
                style={{ background: palette.bg, color: palette.color }}
              >
                {iconMap[h.type]}
              </div>
              <div className="honor-content">
                <div className="honor-year" style={{ color: palette.color }}>
                  {h.year}
                </div>
                <h3 className="honor-title">{h.title}</h3>
                <p className="honor-desc">{h.description}</p>
              </div>
              <div
                className="honor-glow"
                style={{ background: palette.glow }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
