<script lang="ts">
  import 'iconify-icon';
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>@{$page.params.username} | DuckLearn</title>
</svelte:head>

<div class="w-full">
  <div class="sticky top-0 flex items-center w-full bg-base-300">
    <div class="text-sm breadcrumbs w-fit mx-auto">
      <ul>
        <li>
          <a href="/" class="link link-primary gap-1">
            <iconify-icon icon="mdi:home" width={18} />
            home
          </a>
        </li>
        {#each $page.url.pathname.split('/').slice(1) as path}
          <li>
            {#if path === $page.params.username}
              <a href="/perfil/{path}" class="link link-primary gap-1">
                <iconify-icon icon="mdi:account" width={18} />
                {path}
              </a>
            {:else}
              <span>
                {path}
              </span>
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <div class="min-h-[calc(100vh-36px-128px)] w-full">
    <slot />
  </div>
</div>
