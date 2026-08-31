import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface UserSession {
  access_token: string;
  user: { id: string; email: string };
}

export interface Profile {
  id: string;
  user_id: string;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  role?: string;
}

interface AuthCtx {
  session: UserSession | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
  setSession: (s: UserSession | null) => void;
  setProfile: (p: Profile | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx>({
  session: null,
  profile: null,
  loading: true,
  isAdmin: false,
  setSession: () => {},
  setProfile: () => {},
  logout: () => {},
});

const SESSION_KEY = "barber_session";
const PROFILE_KEY = "barber_profile";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<UserSession | null>(null);
  const [profile, setProfileState] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const s = localStorage.getItem(SESSION_KEY);
      const p = localStorage.getItem(PROFILE_KEY);
      if (s) setSessionState(JSON.parse(s));
      if (p) setProfileState(JSON.parse(p));
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, []);

  const setSession = (s: UserSession | null) => {
    setSessionState(s);
    if (s) localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    else localStorage.removeItem(SESSION_KEY);
  };

  const setProfile = (p: Profile | null) => {
    setProfileState(p);
    if (p) localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
    else localStorage.removeItem(PROFILE_KEY);
  };

  const logout = () => {
    setSession(null);
    setProfile(null);
  };

  const isAdmin = profile?.role === "admin";

  return (
    <AuthContext.Provider
      value={{ session, profile, loading, isAdmin, setSession, setProfile, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
