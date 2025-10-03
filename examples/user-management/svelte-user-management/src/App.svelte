<script lang="ts">
  import { onMount } from 'svelte';
  import { tealbase } from './tealbaseClient';
  import type { AuthSession } from '@tealbase/tealbase-js';
  import Account from './lib/Account.svelte';
  import Auth from './lib/Auth.svelte'

  let session: AuthSession

  onMount(() => {
    tealbase.auth.getSession().then(({ data }) => {
      session = data.session
    })

    tealbase.auth.onAuthStateChange((_event, _session) => {
      session = _session
    })
  })
</script>

<div class="container" style="padding: 50px 0 100px 0">
  {#if !session}
    <Auth />
  {:else}
    <Account {session} />
  {/if}
</div>