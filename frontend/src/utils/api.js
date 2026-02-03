const baseHost = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export const AUTH_URL = `${baseHost}/api/v1`;
export const TASK_URL = `${baseHost}/api/v2`;
export const BASE_URL = `${baseHost}/api/v2`;
