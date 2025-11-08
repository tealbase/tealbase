interface Code {
  javascript: string
}

export interface ExampleProps {
  id: string
  name: string
  description: string
  code: Code
}

export const createUserExample: ExampleProps = {
  id: 'createUserExample',
  name: 'Create user',
  description: 'Sign up a new user in an example chat room',
  code: {
    javascript: `
  import { createClient } from '@tealbase/tealbase-js'

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
}

export const subscribeExample: ExampleProps = {
  id: 'subscribeExample',
  name: 'Realtime subscriptions',
  description: 'Receive realtime messages in an example chat room',
  code: {
    javascript: `
  import { createClient } from '@tealbase/tealbase-js'

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
}

export const readExample: ExampleProps = {
  id: 'readExample',
  name: 'Read a record',
  description: 'Get all public rooms and their messages',
  code: {
    javascript: `
  import { createClient } from '@tealbase/tealbase-js'

  // Initialize
  const tealbaseUrl = 'https://chat-room.tealbase.co'
  const tealbaseKey = 'public-anon-key'
  const tealbase = createClient(tealbaseUrl, tealbaseKey)

  // Get public rooms and their messages
  const publicRooms = await tealbase
    .from('rooms')
    .select(\`
      name,
      messages ( text )
    \`)
    .eq('public', true)
  `,
  },
}

export const createExample: ExampleProps = {
  id: 'createExample',
  name: 'Create a record',
  description: 'Create a new chat room',
  code: {
    javascript: `
  import { createClient } from '@tealbase/tealbase-js'

  // Initialize
  const tealbaseUrl = 'https://chat-room.tealbase.co'
  const tealbaseKey = 'public-anon-key'
  const tealbase = createClient(tealbaseUrl, tealbaseKey)

  // Create a new chat room
  const newRoom = await tealbase
    .from('rooms')
    .insert({ name: 'Tealbase Fan Club', public: true })
    `,
  },
}

export const updateExample: ExampleProps = {
  id: 'updateExample',
  name: 'Update a record',
  description: 'Update a user',
  code: {
    javascript: `
  import { createClient } from '@tealbase/tealbase-js'

  // Initialize
  const tealbaseUrl = 'https://chat-room.tealbase.co'
  const tealbaseKey = 'public-anon-key'
  const tealbase = createClient(tealbaseUrl, tealbaseKey)

  // Update multiple users
  const updatedUsers = await tealbase
    .from('users')
    .eq('account_type', 'paid')
    .update({ highlight_color: 'gold' })
  `,
  },
}

// const heroExample = `
//   const messages = tealbase
//     .from('messages')
//     .select(\`
//       id, text,
//       user ( id, name )
//     \`)

//   const newMessages = tealbase
//     .from('messages')
//     .on('INSERT', message => console.log('New message!', message) )
//     .subscribe()
//   `
// const subscribeExample = `
//   import { createClient } from '@tealbase/tealbase-js'

//   // Initialize
//   const tealbaseUrl = 'https://chat-room.tealbase.co'
//   const tealbaseKey = 'public-anon-key'
//   const tealbase = createClient(tealbaseUrl, tealbaseKey)

//   // Get notified of all new chat messages
//   const realtime = tealbase
//     .from('messages')
//     .on('INSERT', message => {
//       console.log('New message!', message)
//     })
//     .subscribe()
//   `
// const readExample = `
//   import { createClient } from '@tealbase/tealbase-js'

//   // Initialize
//   const tealbaseUrl = 'https://chat-room.tealbase.co'
//   const tealbaseKey = 'public-anon-key'
//   const tealbase = createClient(tealbaseUrl, tealbaseKey)

//   // Get public rooms and their messages
//   const publicRooms = await tealbase
//     .from('rooms')
//     .select(\`
//       name,
//       messages ( text )
//     \`)
//     .eq('public', true)
//   `
// const createExample = `
//   import { createClient } from '@tealbase/tealbase-js'

//   // Initialize
//   const tealbaseUrl = 'https://chat-room.tealbase.co'
//   const tealbaseKey = 'public-anon-key'
//   const tealbase = createClient(tealbaseUrl, tealbaseKey)

//   // Create a new chat room
//   const newRoom = await tealbase
//     .from('rooms')
//     .insert({ name: 'Tealbase Fan Club', public: true })
//   `
// const updateExample = `
//   import { createClient } from '@tealbase/tealbase-js'

//   // Initialize
//   const tealbaseUrl = 'https://chat-room.tealbase.co'
//   const tealbaseKey = 'public-anon-key'
//   const tealbase = createClient(tealbaseUrl, tealbaseKey)

//   // Update multiple users
//   const updatedUsers = await tealbase
//     .from('users')
//     .eq('account_type', 'paid')
//     .update({ highlight_color: 'gold' })
//   `
// const nodeTSExample = `
//   import { NextApiRequest, NextApiResponse } from 'next';
//   import { createClient } from '@tealbase/tealbase-js';

//   const tealbase = createClient(
//     process.env.NEXT_PUBLIC_TEALBASE_URL,
//     process.env.TEALBASE_SECRET_KEY
//   );

//   type User = {
//     id: string;
//     username: string;
//     status: 'ONLINE' | 'OFFLINE';
//   };

//   export default async (req: NextApiRequest, res: NextApiResponse) => {
//     const allOnlineUsers = await tealbase
//       .from<User>('users')
//       .select('*')
//       .eq('status', 'ONLINE');
//     res.status(200).json(allOnlineUsers);
//   };
//   `

// const umdExample = `
//   <script src="https://unpkg.com/@tealbase/tealbase-js/umd/tealbase.js"></script>

//   <script>
//     // Initialize
//     const tealbaseUrl = 'https://chat-room.tealbase.co'
//     const tealbaseKey = 'public-anon-key'
//     const tealbase = Tealbase.createClient(tealbaseUrl, tealbaseKey)

//     // Get public rooms and their messages
//     tealbase
//       .from('rooms')
//       .select(\`
//         name,
//         messages ( text )
//       \`)
//       .eq('public', true)
//       .then(response => {
//         // Do something with the response
//       })
//   </script>
//   `
