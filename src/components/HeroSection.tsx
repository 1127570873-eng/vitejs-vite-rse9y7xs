import { MapPin, DollarSign, Clock, Sparkles } from 'lucide-react';
import type { CardData } from '../types';

interface Props {
  data: CardData;
}

export default function HeroSection({ data }: Props) {
  const profile = data.profile;
  const avatar = data.avatar;

  return (
    <section id="about" className="hero">
      <div className="hero-glow-1" />
      <div className="hero-glow-2" />
      <div className="hero-glow-3" />

      <div className="hero-content">
        <div className="hero-avatar-wrap">
          <div className="hero-avatar">
            {avatar.image ? (
              <img src={avatar.image} alt={avatar.alt || profile.name} />
            ) : (
              <span>{avatar.initials || profile.name.slice(0, 1)}</span>
            )}
          </div>
          <div className="hero-avatar-ring" />
        </div>

        <div className="hero-text">
          <p className="hero-eyebrow">
            <Sparkles size={13} strokeWidth={1.5} />
            {profile.title}
          </p>
          <h1 className="hero-name">{profile.name}</h1>
          <p className="hero-tagline">{profile.tagline}</p>

          <div className="hero-core-tech">
            {profile.coreTech.map((t) => (
              <span key={t} className="core-tech-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-stats">
        <div className="hero-stat">
          <Clock size={15} strokeWidth={1.5} />
          <span className="stat-value">{profile.experience}</span>
          <span className="stat-label">工作经验</span>
        </div>
        <div className="hero-stat-divider" />
        <div className="hero-stat">
          <MapPin size={15} strokeWidth={1.5} />
          <span className="stat-value">{profile.location}</span>
          <span className="stat-label">期望城市</span>
        </div>
        <div className="hero-stat-divider" />
        <div className="hero-stat">
          <DollarSign size={15} strokeWidth={1.5} />
          <span className="stat-value">{profile.salary}</span>
          <span className="stat-label">期望薪资</span>
        </div>
      </div>

      <div className="hero-intro">
        <p>{profile.intro}</p>
      </div>
    </section>
  );
}
