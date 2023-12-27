<script lang="ts">
  import Cookies from 'js-cookie';
  import 'iconify-icon';

  $: answered = Cookies.get('use-cookies') !== undefined;

  function setUseCookie(to: boolean): void {
    Cookies.set('use-cookies', `${to}`, { expires: 7, sameSite: 'strict' });
    answered = true;
  }
</script>

<section
  role="alert"
  class="alert rounded-none border-0 max-w-xl bleed-bg bleed-base-300 mx-auto shadow-lg bg-base-300 hidden"
  class:hidden={answered}
>
  <iconify-icon icon="mdi:cookie" width={32} class="text-warning" />

  <div>
    <h3 class="font-bold">Cookie Usage</h3>

    <div class="text-xs">
      We use cookies to ensure the best experience on our site, like toggling your theme from dark
      to light mode.
    </div>
  </div>

  <div>
    <button class="btn btn-sm" on:click={() => setUseCookie(false)}>Deny</button>
    <button class="btn btn-success btn-sm" on:click={() => setUseCookie(true)}>Accept</button>
  </div>
</section>
