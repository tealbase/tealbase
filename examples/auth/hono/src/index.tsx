import { Hono } from 'hono';
import { getTealbase, tealbaseMiddleware } from './middleware/auth.middleware';

const app = new Hono();
app.use('*', tealbaseMiddleware());

const routes = app.get('/api/user', async (c) => {
  const tealbase = getTealbase(c);
  const { data, error } = await tealbase.auth.getUser();

  if (error) console.log('error', error);

  if (!data?.user) {
    return c.json({
      message: 'You are not logged in.',
    });
  }

  return c.json({
    message: 'You are logged in!',
    userId: data.user,
  });
});

app.get('/signout', async (c) => {
  const tealbase = getTealbase(c);
  await tealbase.auth.signOut();
  console.log('Signed out server-side!');
  return c.redirect('/');
});

app.get('/countries', async (c) => {
  const tealbase = getTealbase(c);
  const { data, error } = await tealbase.from('countries').select('*');
  if (error) console.log(error);
  return c.json(data);
});

export type AppType = typeof routes;

app.get('/', (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link
          rel="stylesheet"
          href="https://cdn.simplecss.org/simple.min.css"
        />
        {import.meta.env.PROD ? (
          <script type="module" src="/static/client.js" />
        ) : (
          <script type="module" src="/src/client.tsx" />
        )}
      </head>
      <body>
        <div id="root" />
      </body>
    </html>
  );
});

export default app;
