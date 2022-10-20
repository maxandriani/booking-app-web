export const env: NodeJS.ProcessEnv = { ...process.env, ...(globalThis.__env ?? {}) };
