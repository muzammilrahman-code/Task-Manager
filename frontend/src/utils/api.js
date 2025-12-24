// src/utils/api.js
// Build two URLs: one for auth endpoints (/api/v1) and one for task endpoints (/api/v2).
// Prefer the VITE_API_URL env var if provided (it may include a version suffix),
// otherwise fall back to a sensible default host.
const rawBase = import.meta.env.VITE_API_URL;
const normalized = rawBase ? rawBase.replace(/\/+$/g, "") : null;

// Strip any existing /api/v1 or /api/v2 suffix from a host candidate
const stripApiSuffix = (s) => s.replace(/\/api\/v[12]$/g, "");

const defaultHost = import.meta.env.MODE === "development" ? "http://localhost:5000" : "https://task-manager-five-rho-37.vercel.app";
const host = normalized ? stripApiSuffix(normalized) : defaultHost;

export const AUTH_URL = host.endsWith("/api/v1") ? host : `${host}/api/v1`;
export const BASE_URL = host.endsWith("/api/v2") ? host : `${host}/api/v2`;
