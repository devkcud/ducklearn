<script lang="ts">
  import 'iconify-icon';
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  export let form: ActionData;

  let passwordValue: string = '';

  $: getPasswordStrength = () => {
    return (
      Number(/[^a-zA-Z0-9]/.test(passwordValue)) +
      Number(passwordValue.length > 8) +
      Number(passwordValue.length > 24) +
      Number(/[a-zA-Z]/.test(passwordValue)) +
      Number(/[0-9]/.test(passwordValue))
    );
  };

  $: getPasswordStrengthColor = () => {
    switch (getPasswordStrength()) {
      default:
      case 0:
        return '';
      case 1:
        return 'error';
      case 2:
        return 'warning';
      case 3:
        return 'warning';
      case 4:
        return 'warning';
      case 5:
        return 'success';
    }
  };

  $: getPasswordLabel = () => {
    switch (getPasswordStrength()) {
      default:
      case 0:
        return '';
      case 1:
        return 'Muito Fraca';
      case 2:
        return 'Fraca';
      case 3:
        return 'Moderada';
      case 4:
        return 'Forte';
      case 5:
        return 'Muito Forte';
    }
  };
</script>

<section class="w-full max-w-5xl flex gap-12 h-full px-4">
  <img
    src="https://placekitten.com/256/512"
    alt="Side banner"
    class="w-[256px] object-cover max-sm:hidden"
    style:--sidebar="banner"
  />

  <div class="w-full my-auto">
    <div class="flex flex-col gap-2">
      <h1 class="text-primary text-5xl font-bold">Registrar</h1>
      <p>Registre-se e comece já sua jornada!</p>
    </div>

    <form method="POST" class="flex flex-col gap-4 my-8" use:enhance>
      <label class="form-control">
        <span class="label-text">Qual é seu nome?</span>

        <input type="text" name="username" placeholder="Username" class="input input-bordered" />
      </label>

      <label class="form-control">
        <span class="label-text">Digite uma senha forte:</span>

        <input
          type="password"
          name="password"
          placeholder="Senha"
          class="input input-bordered"
          on:input={({ currentTarget: ct }) => (passwordValue = ct.value)}
        />
      </label>

      <div>
        <p
          class="flex items-center justify-center gap-2"
          class:text-success={getPasswordStrength() === 5}
        >
          <span>{getPasswordLabel()}</span>

          {#if getPasswordStrength() === 5}
            <iconify-icon icon="mdi:check" width={18} />
          {/if}
        </p>

        <div class="h-2 bg-base-300 rounded-full overflow-hidden">
          <div
            style="transform: scaleX({getPasswordStrength() / 5})"
            class="h-full transition duration-500 origin-top-left"
            class:bg-error={getPasswordStrengthColor() === 'error'}
            class:bg-warning={getPasswordStrengthColor() === 'warning'}
            class:bg-success={getPasswordStrengthColor() === 'success'}
          ></div>
        </div>
      </div>

      <label class="form-control">
        <span class="label-text">Confirme sua senha:</span>

        <input
          type="password"
          name="passwordConfirm"
          placeholder="Senha"
          class="input input-bordered"
        />
      </label>

      {#if form?.error}
        <p class="text-error text-center">{form?.error}</p>
      {/if}

      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>

    <p class="text-center">
      Já faz parte da nossa comunidade? <a class="link link-primary" href="/auth/login"
        >Faça Login</a
      >
    </p>
  </div>
</section>

<style>
  img {
    view-transition-name: var(--sidebar);
  }
</style>
