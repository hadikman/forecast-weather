import type {
  ScheduledController,
  ExecutionContext,
} from '@cloudflare/workers-types'

interface Env {}
export default {
  // async fetch(request: Request, env: Env, ctx: ExecutionContext) {
  async fetch(_request: Request, _env: Env, _ctx: ExecutionContext) {
    return new Response('Hello World!')
  },
  async scheduled(
    _controller: ScheduledController,
    _env: Env,
    ctx: ExecutionContext,
  ) {
    ctx.waitUntil(run())
  },
}

// Run "npx wrangler dev --test-scheduled" to see wrangelr server
// To see the run() is working, use http://127.0.0.1:8787/__scheduled
// To schdule the run(), triggers:{crons:["* * * * *"]} into wrangler.jsonc
async function run() {
  let searchParams = new URLSearchParams()
  data.forEach(item => {
    const [key, arrayValues] = item
    searchParams.set(key as string, arrayValues as string)
  })

  // Post data to Code.gs doPost(e)
  // body: a=1&b='2'&c=3,4
  await fetch(spreadsheetUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: searchParams.toString(),
  })

  // Read from Code.gs doGet(e)
  const result = await (await fetch(spreadsheetUrl)).json()
  const { headers, rows } = result

  const rowsArr = rows.map((item: []) =>
    item.map((value: string) => value.split(',')),
  )

  console.log(headers)
  console.log(rowsArr)
}

// URL of web app from deploy button
const spreadsheetUrl =
  'https://script.google.com/macros/s/AKfycbyl3ydSW3A7idNbq_mYqg7XS-yOhZjMmBCK_V3rLNfW5aFnIsm3YjcV0fWrhwb44wVm/exec'

// Example of post data to doPost()
const data = [
  ['uv', [71, 71]],
  ['temp', [31.1, 30.7, 29.9]],
  ['time', ['2025-08-12T14:00', '2025-08-12T15:00']],
]
