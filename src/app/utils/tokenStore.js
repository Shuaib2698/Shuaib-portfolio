// app/utils/tokenStore.js
// Shared token storage to avoid multiple instances
const resetTokens = new Map();

export const tokenStore = {
  set: (token, data) => resetTokens.set(token, data),
  get: (token) => resetTokens.get(token),
  delete: (token) => resetTokens.delete(token),
  has: (token) => resetTokens.has(token)
};