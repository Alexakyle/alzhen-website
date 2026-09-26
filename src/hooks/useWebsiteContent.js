import { useEffect, useState } from 'react';

export default function useWebsiteContent(load) {
  const [state, setState] = useState({ items: [], loading: true, error: null });

  useEffect(() => {
    let active = true;
    setState({ items: [], loading: true, error: null });
    Promise.resolve().then(load).then(items => {
      if (!Array.isArray(items)) throw new Error('Expected an array of content records.');
      if (active) setState({ items, loading: false, error: null });
    }).catch(error => {
      if (active) setState({ items: [], loading: false, error });
    });
    return () => { active = false; };
  }, [load]);

  return state;
}
