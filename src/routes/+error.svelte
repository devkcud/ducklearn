<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>DuckLearn | Erro {$page.status}</title>
</svelte:head>

<div class="bleed-bg bleed-base-300 p-8">
  <p>Ah não... um</p>
  <h1 class="text-5xl font-bold text-error">ERROR {$page.status}</h1>
  <p class="text-end">do nada 😭?</p>

  <div class="divider"></div>

  <p>{$page.error?.message}</p>
</div>
