import type { ExecutionContext } from '@cloudflare/workers-types'

const APP_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyvb78MK5nDMLNHwi3Z7qV15ofzXzqIzk8qmAmC-EFqJlyYLdFQX906vkCpO17W2duk/exec'

interface Env {}
export default {
  async fetch(request: Request, _env: Env, _ctx: ExecutionContext) {
    const url = new URL(request.url)
    const allowedOrigins = [
      'https://forecast.hadikman.workers.dev',
      'https://forecast.hadikman.workers.dev/',
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:4173/',
      'http://127.0.0.1:4173/',
    ]
    const origin = request.headers.get('Origin')
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
    }

    if (origin && allowedOrigins.includes(origin)) {
      headers['Access-Control-Allow-Origin'] = origin
    }

    // Handle CORS preflight OPTIONS request
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers })
    }

    if (url.pathname.startsWith('/api')) {
      const querySheetName = url.searchParams.get('sheetName')
      const targetUrl = APP_SCRIPT_URL + '?sheetName=' + querySheetName
      const response = await fetch(targetUrl)
      const data = await response.json()

      return new Response(JSON.stringify(data), {
        status: response.status,
        headers,
      })
    }

    return new Response(null, { status: 404 })
  },
}
