import { useState, useEffect, useCallback } from 'react';
import type { CardData } from './types';
import { defaultData } from './defaultData';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import ContactSection from './components/ContactSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import HonorsSection from './components/HonorsSection';
import Toast from './components/Toast';

const DATA_KEY = 'business_card_v2';
const THEME_KEY = 'business_card_theme';

function loadData(): CardData {
  try {
    const raw = localStorage.getItem(DATA_KEY);
    if (raw) return { ...defaultData, ...JSON.parse(raw) };
  } catch { /* empty */ }
  return defaultData;
}

function loadTheme(): 'light' | 'dark' {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function App() {
  const [data] = useState<CardData>(loadData);
  const [theme, setTheme] = useState<'light' | 'dark'>(loadTheme);
  const [toast, setToast] = useState({ visible: false, message: '' });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
  }, [data]);

  const toggleTheme = () =>
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  const showToast = useCallback(async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setToast({ visible: true, message: `${label}已复制` });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2200);
  }, []);

  return (
    <div className="app">
      <div className="bg-layer" />
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />
      <div className="bg-glow bg-glow-3" />

      <NavBar name={data.name} theme={theme} onToggleTheme={toggleTheme} />

      <main className="main">
        <HeroSection data={data} />
        <div className="content-grid">
          <div className="col-left">
            <ContactSection data={data} onCopy={showToast} />
            <SkillsSection data={data} />
            <HonorsSection data={data} />
          </div>
          <div className="col-right">
            <ProjectsSection data={data} />
          </div>
        </div>
        <footer className="page-footer">
          <span>{data.name} · {data.title} · {data.location}</span>
        </footer>
      </main>

      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}
