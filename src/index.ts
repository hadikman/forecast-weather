import type { ExecutionContext } from '@cloudflare/workers-types'

const APP_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwU8Y-4UXQjhZZi6LHOwnt7nPdwGrHz5h4VGTEioUc7eQUQUY9oucUXF98p8wM6J6Fb/exec'

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
      const searchParams = url.searchParams.toString()

      const response = await fetch(`${APP_SCRIPT_URL}?${searchParams}`)
      const data = await response.json()

      return new Response(JSON.stringify(data), {
        status: response.status,
        headers,
      })
    }

    return new Response(null, { status: 404 })
  },
}
