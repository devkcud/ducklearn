<script lang="ts">
  import 'iconify-icon';
  import Profile from '$lib/components/user/Profile.svelte';

  export let data:
    | (Lucia.DatabaseUserAttributes & {
        followers: { followerId: string; followingId: string }[];
        following: { followerId: string; followingId: string }[];
        canFollow: boolean;
        isFollowing: boolean;
        badges: { id: string; name: string }[];
      })
    | { error: string };
</script>

{#if 'error' in data}
  <div class="flex flex-col gap-4">
    <p class="text-error">{data.error}</p>

    <a class="btn btn-primary btn-sm w-fit mx-auto" href="/profile">
      <iconify-icon icon="carbon:return" width={24} />
      Voltar
    </a>
  </div>
{:else}
  <Profile {data} />
{/if}
