/**
 * Resolves a public/ path against the app baseURL so the site keeps working
 * if it is ever served from a sub-path again.
 */
export function useAssetUrl() {
  const { app: { baseURL } } = useRuntimeConfig()
  const base = baseURL.replace(/\/$/, '')
  return (path: string) => `${base}${path}`
}
