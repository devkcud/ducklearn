<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  export let form: ActionData;
</script>

<section>
  <h1>Registrar</h1>

  <form method="post" use:enhance>
    <input name="username" />
    <input type="password" name="password" placeholder="Sua senha" />
    <input type="password" name="passwordConfirm" placeholder="Confirme sua senha" />

    <button>Registrar</button>

    {#if form?.error}
      <p class="text-error">{form?.error}</p>
    {/if}
  </form>

  <a href="/login">Login</a>
</section>
