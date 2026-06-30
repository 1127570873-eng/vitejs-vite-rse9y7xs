import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';

interface Props {
  message: string;
  visible: boolean;
}

export default function Toast({ message, visible }: Props) {
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (visible) {
      setLeaving(false);
      setMounted(true);
    } else {
      setLeaving(true);
      timer.current = setTimeout(() => setMounted(false), 340);
    }
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [visible]);

  if (!mounted) return null;

  return (
    <div className={`toast-wrap ${leaving ? 'leaving' : 'entering'}`}>
      <div className="toast-glass">
        <div className="toast-check">
          <Check size={13} strokeWidth={2.5} />
        </div>
        <span>{message}</span>
      </div>
    </div>
  );
}
