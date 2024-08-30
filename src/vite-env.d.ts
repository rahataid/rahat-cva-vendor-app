/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly API_HOST: string;
  readonly DEFAULT_PASSCODE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
