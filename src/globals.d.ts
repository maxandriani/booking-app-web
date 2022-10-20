declare namespace NodeJS {
  interface ProcessEnv {
    /** Define o host do backend da aplicação. */
    REACT_APP_API_HOST: string;
  }
}

declare var __env: NodeJS.ProcessEnv;