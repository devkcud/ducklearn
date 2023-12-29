<script lang="ts">
  import 'iconify-icon';
  import UserProfile from '$lib/components/UserProfile.svelte';

  export let data:
    | {
        username: string;
        displayName: string;
        about: string;
        createdAt: Date;
        updatedAt: Date;
        stars: number;
        badges: {
          id: string;
          name: string;
        }[];
      }
    | {
        error: string;
      };
</script>

{#if 'error' in data}
  <div class="flex flex-col gap-4">
    <p class="text-error">{data.error}</p>
    <a class="btn btn-primary btn-sm" href="/profile">
      <iconify-icon icon="carbon:return" width={24} />
      Voltar
    </a>
  </div>
{:else}
  <UserProfile {data} />
{/if}
