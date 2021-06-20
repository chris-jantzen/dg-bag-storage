declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      PORT?: string
      WHITE_LISTED_ORIGINS: string
      SECRET_KEY: string
    }
  }
}

export {}
