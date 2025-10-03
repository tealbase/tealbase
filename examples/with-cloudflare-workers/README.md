# Query Tealbase from Cloudflare Worker

**[📹 Video](https://egghead.io/lessons/cloudflare-query-tealbase-from-cloudflare-worker?af=9qsk0a)**

Tealbase JS is an NPM package which provides a simple interface from JavaScript to our Tealbase project. It allows us to query and mutate data using its Object Relational Mapping (ORM) syntax, and subscribe to realtime events.

In this video, we install the Tealbase JS package and create a new client using our project's URL and Anon Key. These can be found in the Tealbase dashboard for our project, under `Settings > API`.

We store these values as secrets in our Cloudflare account, and use them to instantiate a new Tealbase client.

Additionally, we write a query to select all of our articles from our Tealbase instance, and send them back as the response from our Cloudflare Worker.

In order to send a JSON response, we first stringify the object we get back from Tealbase, and then set a `Content-Type` header to notify the browser that this will be a type of `application/json`.

## Code Snippets

**Install Tealbase JS**

```bash
npm i @tealbase/tealbase-js
```

**Create a Cloudflare secret**

```bash
npx wrangler secret put NAME
```

**Add a secret for TEALBASE_URL**

```bash
npx wrangler secret put TEALBASE_URL
```

**Run wrangler development server**

```bash
npx wrangler dev
```

**Add a secret for TEALBASE_ANON_KEY**

```bash
npx wrangler secret put TEALBASE_ANON_KEY
```

**Query data from Tealbase**

```javascript
const { data } = await tealbase.from("articles").select("*");
```

**Send JSON response**

```javascript
return new Response(JSON.stringify(data), {
  headers: {
    "Content-Type": "application/json",
  },
});
```

## Resources

- [Selecting data with Tealbase JS](https://tealbase.com/docs/reference/javascript/select)
- [Introducing Secrets and Environment Variables to Cloudflare Workers](https://blog.cloudflare.com/workers-secrets-environment/)
- [Cloudflare docs for sending JSON responses](https://developers.cloudflare.com/workers/examples/return-json/)

---

[👉 Next lesson](https://github.com/dijonmusters/tealbase-data-at-the-edge/tree/main/04-proxy-tealbase-requests-with-cloudflare-workers-and-itty-router)

---

Enjoying the course? Follow Jon Meyers on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to the [YouTube channel](https://www.youtube.com/c/jonmeyers).
