import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

interface Props {
  name: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const navLinks = [
  { href: '#about', label: '关于' },
  { href: '#skills', label: '技能' },
  { href: '#projects', label: '项目' },
  { href: '#honors', label: '荣誉' },
  { href: '#contact', label: '联系' },
];

export default function NavBar({ name, theme, onToggleTheme }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <span className="nav-brand">{name}</span>
        <ul className="nav-links">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`nav-link ${active === href.slice(1) ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label="切换主题"
        >
          {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
        </button>
      </div>
    </nav>
  );
}
