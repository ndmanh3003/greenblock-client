class LocalStorageService {
  set(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get<T>(key: string): T | null {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }

  remove(key: string): void {
    localStorage.removeItem(key)
  }
}

export const localStorageService = new LocalStorageService()
