import { useEffect, useState } from 'react';

export default function useWebsiteContent(load) {
  const [state, setState] = useState({ items: [], loading: true, error: null });
  useEffect(() => {
    let active = true;
    let pending = false;
    setState({ items: [], loading: true, error: null });
    async function refresh() {
      if (pending) return;
      pending = true;
      try {
        const items = await load();
        if (!Array.isArray(items)) throw new Error('Expected an array of content records.');
        if (active) setState({ items, loading: false, error: null });
      } catch (error) {
        if (active) setState({ items: [], loading: false, error });
      } finally { pending = false; }
    }
    function onVisible() { if (!document.hidden) void refresh(); }
    void refresh();
    window.addEventListener('focus', onVisible);
    document.addEventListener('visibilitychange', onVisible);
    const timer = setInterval(onVisible, 30000);
    return () => {
      active = false;
      clearInterval(timer);
      window.removeEventListener('focus', onVisible);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [load]);
  return state;
}
