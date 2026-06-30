import { Phone, Mail, MessageCircle, Copy, ExternalLink } from 'lucide-react';
import type { CardData } from '../types';

interface Props {
  data: CardData;
  onCopy: (text: string, label: string) => void;
}

export default function ContactSection({ data, onCopy }: Props) {
  const contacts = [
    {
      icon: <MessageCircle size={22} strokeWidth={1.5} />,
      label: '微信',
      value: data.wechat,
      action: () => onCopy(data.wechat, '微信号'),
      isLink: false,
    },
    {
      icon: <Phone size={22} strokeWidth={1.5} />,
      label: '手机',
      value: data.phone,
      action: () => onCopy(data.phone, '手机号'),
      href: `tel:${data.phone}`,
      isLink: true,
    },
    {
      icon: <Mail size={22} strokeWidth={1.5} />,
      label: '邮箱',
      value: data.email,
      action: () => onCopy(data.email, '邮箱'),
      href: `mailto:${data.email}`,
      isLink: true,
    },
  ];

  return (
    <section id="contact" className="section">
      <div className="section-header">
        <h2 className="section-title">联系方式</h2>
        <p className="section-subtitle">随时欢迎沟通交流</p>
      </div>
      <div className="contact-grid">
        {contacts.map((c) => (
          <div key={c.label} className="contact-glass-card">
            <div className="contact-icon-wrap">{c.icon}</div>
            <div className="contact-meta">
              <span className="contact-label-text">{c.label}</span>
              <span className="contact-value-text">{c.value || '—'}</span>
            </div>
            <div className="contact-actions">
              {c.isLink && c.value && (
                <a href={c.href} className="contact-action-btn link">
                  <ExternalLink size={14} strokeWidth={1.8} />
                </a>
              )}
              {c.value && (
                <button
                  className="contact-action-btn copy"
                  onClick={c.action}
                  title={`复制${c.label}`}
                >
                  <Copy size={14} strokeWidth={1.8} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
