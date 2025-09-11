'use client'

export function useAuth() {
  return {
    user: null,
    login: async () => {},
    register: async () => {},
    logout: () => {},
    isLoading: false
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}