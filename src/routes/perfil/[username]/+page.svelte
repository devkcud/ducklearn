<script lang="ts">
  import 'iconify-icon';
  import Profile from '$lib/components/user/Profile.svelte';

  export let data:
    | (Lucia.DatabaseUserAttributes & {
        followers: { followerId: string; followingId: string }[];
        following: { followerId: string; followingId: string }[];
        isSelf: boolean;
        isFollowing: boolean;
        badges: { id: string; name: string }[];
      })
    | { error: string };
</script>

{#if 'error' in data}
  <div class="flex flex-col gap-4 p-8">
    <p class="text-error w-fit mx-auto">{data.error}</p>

    <a class="btn btn-primary btn-sm w-fit mx-auto" href="/perfil">
      <iconify-icon icon="carbon:return" width={24} />
      Voltar
    </a>
  </div>
{:else}
  <section class="flex h-full w-full max-sm:flex-col p-4">
    <Profile {data} />
  </section>
{/if}
