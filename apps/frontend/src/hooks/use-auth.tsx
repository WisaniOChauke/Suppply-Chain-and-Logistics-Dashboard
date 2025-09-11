'use client'

interface User {
  id: string
  email: string
  name: string
  role: string
}

export function useAuth() {
  return {
    user: null as User | null,
    login: async (email: string, password: string) => {},
    register: async (userData: { email: string; password: string; name: string }) => {},
    logout: () => {},
    isLoading: false
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}