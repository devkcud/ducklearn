<script lang="ts">
  import { onMount } from 'svelte';
  // I don't know how to manage cookies inside a +layout.svelte file, I'll stick to js-cookie
  import Cookies from 'js-cookie';

  import 'iconify-icon';

  import CookieUsage from '$lib/components/CookieUsage.svelte';
  import '../app.css';
  import ViewTransition from '$lib/components/ViewTransition.svelte';
  import type { LayoutData } from './$types';

  let themeController: HTMLInputElement;
  let theme: string = Cookies.get('theme') || 'dark';

  onMount(() => {
    themeController.checked = theme === 'light';
  });

  function setCookieTheme(event: Event) {
    if (Cookies.get('use-cookies') !== 'true') {
      return;
    }

    const target = event.target as HTMLInputElement;
    Cookies.set('theme', target.checked ? 'light' : 'dark', {
      expires: 7,
      sameSite: 'strict',
    });
  }

  export let data: LayoutData & {
    logged: boolean;
    user: {
      username: string;
    };
  };
</script>

<CookieUsage />

<header class="navbar max-w-5xl bleed-bg bleed-base-200 mx-auto h-[64px]">
  <section class="flex-1">
    <a href="/" class="btn btn-ghost normal-case text-xl font-bold">
      <iconify-icon icon="mdi:duck" />
      DuckLearn
    </a>
  </section>

  <label class="swap swap-rotate mr-2">
    <input
      type="checkbox"
      class="theme-controller"
      value="light"
      bind:this={themeController}
      on:change={setCookieTheme}
    />

    <iconify-icon icon="ph:sun" width={20} class="swap-off" />
    <iconify-icon icon="ph:moon" width={20} class="swap-on" />
  </label>

  {#if data.logged}
    <section>
      <div class="dropdown dropdown-end">
        <button class="m-1">
          <img src="https://placekitten.com/256/256" alt="Profile" class="rounded-full w-8 h-8" />
        </button>

        <ul class="dropdown-content menu z-[1] p-2 mt-5 shadow bg-base-200 rounded-box w-52">
          <li>
            <a href="/profile">
              <iconify-icon icon="mdi:account" />
              Profile
            </a>
          </li>
          <li>
            <a href="/logout" class="text-error">
              <iconify-icon icon="mdi:logout" />
              Logout
            </a>
          </li>
        </ul>
      </div>
    </section>
  {:else}
    <section>
      <a href="/login" class="btn btn-ghost">
        <iconify-icon icon="mdi:login" />
        Entrar
      </a>
      <a href="/register" class="btn btn-ghost">
        <iconify-icon icon="mdi:account-plus" />
        Registrar
      </a>
    </section>
  {/if}
</header>

<main class="min-h-[calc(100vh-128px)] grid place-items-center">
  <ViewTransition />
  <slot />
</main>

<footer
  class="flex bleed-bg bleed-base-200 max-w-5xl justify-between items-center flex-wrap mx-auto px-2 h-[64px] bg-base-200 text-base-content"
>
  <p>&copy; 2023 - ducklearn.org</p>
  <div>
    <p class="flex items-center justify-center gap-1 text-sm">
      Made with <iconify-icon icon="mdi:heart" width={12} class="inline text-error" /> by
      <a class="link" href="https://github.com/devkcud">devkcud</a>
    </p>
  </div>
</footer>
