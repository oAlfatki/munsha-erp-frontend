const ENV = import.meta.env;
export const CONFIG = { apiBaseUrl: (ENV.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '') };
