import { localStorageService } from '.'

const TOKEN_KEY = 'auth'

export interface ITokens {
  accessToken: string
  refreshToken: string
}

export const tokensStorage = {
  setToken(tokens: ITokens): void {
    localStorageService.set(TOKEN_KEY, tokens)
  },

  getToken(): ITokens | null {
    return localStorageService.get<ITokens>(TOKEN_KEY)
  },

  removeToken(): void {
    localStorageService.remove(TOKEN_KEY)
  }
}
