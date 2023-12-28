<script lang="ts">
  import 'iconify-icon';
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  export let form: ActionData;
</script>

<section class="w-full max-w-5xl flex gap-12 h-full px-4">
  <div class="w-full my-auto">
    <div class="flex flex-col gap-2">
      <h1 class="text-primary text-5xl font-bold">Entrar</h1>
      <p>Bem-vindo de volta! Entre para retomar de onde parou.</p>
    </div>

    <form method="POST" class="flex flex-col gap-4 my-8" use:enhance>
      <label class="form-control">
        <span class="label-text">Oiiii, quem é?</span>

        <input type="text" name="username" placeholder="Username" class="input input-bordered" />
      </label>

      <label class="form-control">
        <span class="label-text">Digite sua senha:</span>

        <input type="password" name="password" placeholder="Senha" class="input input-bordered" />
      </label>

      {#if form?.error}
        <p class="text-error text-center">{form?.error}</p>
      {/if}

      <button type="submit" class="btn btn-primary">Entrar</button>
    </form>

    <p class="text-center">
      Não faz parte dessa comunidade? <a class="link link-primary" href="/auth/register"
        >Registre-se</a
      >
    </p>
  </div>

  <img
    src="https://placekitten.com/256/512"
    alt="Side banner"
    class="w-[256px] object-cover max-sm:hidden"
    style:--sidebar="banner"
  />
</section>

<style>
  img {
    view-transition-name: var(--sidebar);
  }
</style>
