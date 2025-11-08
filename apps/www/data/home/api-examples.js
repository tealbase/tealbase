export default [
  {
    lang: 'js',
    title: 'Create user',
    description: 'Sign up a new user in an example chat room',
    code: `import { createClient } from '@tealbase/tealbase-js'
    
// Initialize 
const tealbaseUrl = 'https://chat-room.tealbase.co'
const tealbaseKey = 'public-anon-key'
const tealbase = createClient(tealbaseUrl, tealbaseKey)

// Create a new user
const { user, error } = await tealbase.auth.signUp({
  email: 'example@email.com',
  password: 'example-password',
})
    `,
  },
  {
    lang: 'js',
    title: 'Realtime subscriptions',
    description: 'Receive realtime messages in an example chat room',
    code: `import { createClient } from '@tealbase/tealbase-js'
    
// Initialize 
const tealbaseUrl = 'https://chat-room.tealbase.co'
const tealbaseKey = 'public-anon-key'
const tealbase = createClient(tealbaseUrl, tealbaseKey)

// Get notified of all new chat messages
const realtime = tealbase
  .from('messages')
  .on('INSERT', message => {
    console.log('New message!', message)
  })
  .subscribe()
    `,
  },
  {
    lang: 'js',
    title: 'Create bucket',
    description: 'Creates a new Storage bucket',
    code: `import { createClient } from '@tealbase/tealbase-js'
    
// Initialize 
const tealbaseUrl = 'https://chat-room.tealbase.co'
const tealbaseKey = 'public-anon-key'
const tealbase = createClient(tealbaseUrl, tealbaseKey)

// Create a new bucket
const { data, error } = await tealbase
  .storage
  .createBucket('avatars', {
    public: false,
    allowedMimeTypes: ['image/png'],
    fileSizeLimit: 1024
  })
    `,
  },
  {
    lang: 'js',
    title: 'Invoke Edge Function',
    description: 'Invoke a Tealbase Edge Function',
    code: `import { createClient } from '@tealbase/tealbase-js'
    
// Initialize 
const tealbaseUrl = 'https://chat-room.tealbase.co'
const tealbaseKey = 'public-anon-key'
const tealbase = createClient(tealbaseUrl, tealbaseKey)

// Invoke a function
const { data, error } = await tealbase.functions.invoke('hello', {
  body: { foo: 'bar' }
})
    `,
  },
  {
    lang: 'js',
    title: 'CRUD a record',
    description: 'Create, Read, Update and Delete all public rooms and their messages',
    code: `import { createClient } from '@tealbase/tealbase-js'
    
// Initialize 
const tealbaseUrl = 'https://chat-room.tealbase.co'
const tealbaseKey = 'public-anon-key'
const tealbase = createClient(tealbaseUrl, tealbaseKey)
  
// Create a new chat room
const newRoom = await tealbase
  .from('rooms')
  .insert({ name: 'Tealbase Fan Club', public: true })
    
// Get public rooms and their messages
const publicRooms = await tealbase
  .from('rooms')
  .select(\`
    name,
    messages ( text )
  \`)
  .eq('public', true)
  
// Update multiple users
const updatedUsers = await tealbase
  .from('users')
  .eq('account_type', 'paid')
  .update({ highlight_color: 'gold' })
    `,
  },
]
