import { useState } from 'react';
import { Provider } from '@/constants/messages';

interface UseAuthReturn {
  mem0ApiKey: string;
  openaiApiKey: string;
  provider: Provider;
  user: string;
  setAuth: (mem0: string, openai: string, provider: Provider) => void;
  setUser: (user: string) => void;
  clearAuth: () => void;
  clearUser: () => void;
}

const getSavedAuth = () => {
  const mem0 = localStorage.getItem('mem0ApiKey');
  const openai = localStorage.getItem('openaiApiKey');
  const savedProvider = localStorage.getItem('provider') as Provider;

  if (mem0 && openai && savedProvider) {
    return { mem0, openai, provider: savedProvider };
  }
  return null;
};

export const useAuth = (): UseAuthReturn => {
  const [savedAuth] = useState(getSavedAuth);
  const [mem0ApiKey, setMem0ApiKey] = useState<string>(savedAuth?.mem0 ?? '');
  const [openaiApiKey, setOpenaiApiKey] = useState<string>(savedAuth?.openai ?? '');
  const [provider, setProvider] = useState<Provider>(savedAuth?.provider ?? 'openai');
  const [user, setUser] = useState<string>(() => localStorage.getItem('user') || '');

  const setAuth = (mem0: string, openai: string, provider: Provider) => {
    setMem0ApiKey(mem0);
    setOpenaiApiKey(openai);
    setProvider(provider);
    localStorage.setItem('mem0ApiKey', mem0);
    localStorage.setItem('openaiApiKey', openai);
    localStorage.setItem('provider', provider);
  };

  const clearAuth = () => {
    localStorage.removeItem('mem0ApiKey');
    localStorage.removeItem('openaiApiKey');
    localStorage.removeItem('provider');
    setMem0ApiKey('');
    setOpenaiApiKey('');
    setProvider('openai');
  };

  const updateUser = (user: string) => {
    setUser(user);
    localStorage.setItem('user', user);
  };

  const clearUser = () => {
    localStorage.removeItem('user');
    setUser('');
  };

  return {
    mem0ApiKey,
    openaiApiKey,
    provider,
    user,
    setAuth,
    setUser: updateUser,
    clearAuth,
    clearUser,
  };
}; 