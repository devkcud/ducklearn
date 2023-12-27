<script lang="ts">
  import { onMount } from 'svelte';
  // I don't know how to manage cookies inside a +layout.svelte file, I'll stick to js-cookie
  import Cookies from 'js-cookie';

  import 'iconify-icon';
  import '../app.css';

  let themeController: HTMLInputElement;
  let theme: string = 'dark';

  onMount(() => {
    if (Cookies.get('theme') !== undefined) {
      theme = Cookies.get('theme')!;
    }

    themeController.checked = theme === 'light';
  });

  function changeTheme(event: Event) {
    const target = event.target as HTMLInputElement;
    Cookies.set('theme', target.checked ? 'light' : 'dark', {
      expires: 7,
      sameSite: 'strict',
    });
  }
</script>

<header class="navbar bg-base-200">
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
      on:change={changeTheme}
    />

    <iconify-icon icon="ph:sun" width={20} class="swap-off" />
    <iconify-icon icon="ph:moon" width={20} class="swap-on" />
  </label>

  <section>
    <div class="dropdown dropdown-end">
      <button class="m-1">
        <img src="https://placekitten.com/256/256" alt="Profile" class="rounded-full w-8 h-8" />
      </button>

      <ul class="dropdown-content menu z-[1] p-2 mt-5 shadow bg-base-200 rounded-box w-52">
        <li>
          <a href="/account">
            <iconify-icon icon="mdi:account" />
            Profile
          </a>
        </li>
        <li>
          <a href="/account/logout" class="text-error">
            <iconify-icon icon="mdi:logout" />
            Logout
          </a>
        </li>
      </ul>
    </div>
  </section>
</header>

<main>
  <slot />
</main>
