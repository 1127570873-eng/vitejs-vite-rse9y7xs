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
const DATA_VERSION_KEY = `${DATA_KEY}_version`;
const DATA_VERSION = 3;
const THEME_KEY = 'business_card_theme';

function loadData(): CardData {
  const savedVersion = localStorage.getItem(DATA_VERSION_KEY);
  if (savedVersion !== String(DATA_VERSION)) {
    localStorage.removeItem(DATA_KEY);
    localStorage.setItem(DATA_VERSION_KEY, String(DATA_VERSION));
    return defaultData;
  }

  try {
    const raw = localStorage.getItem(DATA_KEY);
    if (!raw) return defaultData;

    const parsed = JSON.parse(raw) as Partial<CardData> & Record<string, unknown>;
    const normalizedProfile = {
      ...defaultData.profile,
      ...(parsed.profile ? parsed.profile : {}),
      ...(parsed.name ? { name: parsed.name as string } : {}),
      ...(parsed.title ? { title: parsed.title as string } : {}),
      ...(parsed.tagline ? { tagline: parsed.tagline as string } : {}),
      ...(parsed.experience ? { experience: parsed.experience as string } : {}),
      ...(parsed.location ? { location: parsed.location as string } : {}),
      ...(parsed.salary ? { salary: parsed.salary as string } : {}),
      ...(parsed.wechat ? { wechat: parsed.wechat as string } : {}),
      ...(parsed.phone ? { phone: parsed.phone as string } : {}),
      ...(parsed.email ? { email: parsed.email as string } : {}),
      ...(parsed.github ? { github: parsed.github as string } : {}),
      ...(parsed.intro ? { intro: parsed.intro as string } : {}),
      ...(parsed.coreTech ? { coreTech: parsed.coreTech as string[] } : {}),
      ...(parsed.skillCategories ? { skillCategories: parsed.skillCategories as CardData['profile']['skillCategories'] } : {}),
      ...(parsed.projects ? { projects: parsed.projects as CardData['profile']['projects'] } : {}),
      ...(parsed.honors ? { honors: parsed.honors as CardData['profile']['honors'] } : {}),
    };

    return {
      ...defaultData,
      ...parsed,
      avatar: {
        ...defaultData.avatar,
        ...(parsed.avatar ? parsed.avatar : {}),
      },
      profile: normalizedProfile,
    } as CardData;
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

      <NavBar name={data.profile.name} theme={theme} onToggleTheme={toggleTheme} />

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
          <span>{data.profile.name} · {data.profile.title} · {data.profile.location}</span>
        </footer>
      </main>

      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}
