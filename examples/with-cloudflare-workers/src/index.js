import { createClient } from "@tealbase/tealbase-js";

export default {
  async fetch(request, { TEALBASE_URL, TEALBASE_ANON_KEY }) {
    const tealbase = createClient(TEALBASE_URL, TEALBASE_ANON_KEY);

    const { data } = await tealbase.from("articles").select("*");
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
