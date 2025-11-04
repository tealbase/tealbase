import React from 'react'
import CodeWindow from '~/components/CodeWindow'

const code = `const supabase = createClient(
  Deno.env.get('TEALBASE_URL'),
  Deno.env.get('TEALBASE_ANON_KEY')
)`

const ZeroConfigPanel = () => (
  <CodeWindow className="[&_.synthax-highlighter]:md:!min-h-[300px]" code={code} showLineNumbers />
)

export default ZeroConfigPanel
