<script lang="ts">
  import Badges from '$lib/components/user/Badges.svelte';
  import { formatDate, formatNumber } from '$lib/function/format';

  export let data: Lucia.DatabaseUserAttributes & {
    followers: { followerId: string; followingId: string }[];
    following: { followerId: string; followingId: string }[];
    canFollow: boolean;
    isFollowing: boolean;
    badges: { id: string; name: string }[];
  };
</script>

<section class="flex h-full w-full max-sm:flex-col p-4">
  <div
    class="flex flex-col gap-4 my-auto sm:border-r-2 border-primary pr-4 w-full max-w-md max-sm:mx-auto"
  >
    <div class="flex items-center gap-4">
      <div class="avatar">
        <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img
            src="https://api.dicebear.com/7.x/notionists-neutral/svg?seed={data.username}"
            alt="Profile {data.displayName}"
          />
        </div>
      </div>

      <div>
        {#if data.badges.length > 0}
          <div class="flex items-center gap-1">
            <Badges badges={data.badges.sort((a, b) => b.name.localeCompare(a.name))} />
          </div>
        {/if}
        <span class="flex items-center gap-4 text-3xl text-primary font-bold">
          {data.displayName === data.username ? data.username : data.displayName}
        </span>
        {#if data.displayName !== data.username}
          <span class="text-sm opacity-30 text-base-content font-normal">@{data.username}</span>
        {/if}
      </div>
    </div>

    {#if data.about !== ''}
      <p>{data.about}</p>
    {/if}

    <div class="*:flex *:items-center *:gap-2">
      <div>
        <iconify-icon icon="mdi:star-four-points" width={18} />
        Estrelas:
        <div class="tooltip" data-tip={formatNumber(data.stars, false)}>
          <span class="text-primary w-fit">{formatNumber(data.stars)}</span>
        </div>
      </div>

      <div>
        <iconify-icon icon="game-icons:shadow-follower" width={18} />
        Seguidores:
        <div class="tooltip" data-tip={data.followers.length || 0}>
          <span class="link link-primary w-fit">{formatNumber(data.followers.length || 0)}</span>
        </div>
      </div>

      <div>
        <iconify-icon icon="mingcute:user-follow-2-fill" width={18} />
        Seguindo:
        <div class="tooltip" data-tip={data.following.length || 0}>
          <span class="link link-primary w-fit">{formatNumber(data.following.length || 0)}</span>
        </div>
      </div>

      {#if data.canFollow}
        {#if data.isFollowing === false}
          <form action="?/follow" method="POST">
            <input type="hidden" name="username" value={data.username} />
            <button class="btn btn-primary btn-sm w-full mt-8" type="submit">
              <iconify-icon icon="fe:user-plus" width={18} />
              Seguir
            </button>
          </form>
        {:else}
          <form action="?/unfollow" method="POST">
            <input type="hidden" name="username" value={data.username} />
            <button class="btn btn-primary btn-error btn-sm w-full mt-8" type="submit">
              <iconify-icon icon="fe:user-minus" width={18} />
              Parar de Seguir
            </button>
          </form>
        {/if}
      {/if}
    </div>

    <!--
    {#if data.awards.length !== 0}
      <div class="divider"></div>

      <p class="text-lg text-primary font-bold">Recompensas da comunidade:</p>

      <div class="w-full grid grid-cols-5 place-items-center gap-4">
        <CommunityAwards awards={data.awards} />
      </div>
    {/if}
    -->

    <div class="divider"></div>

    <div class="italic">
      <p>
        Conta criada em:
        <span class="text-primary">{formatDate(data.createdAt)}</span>
      </p>
      <p>
        Última atualização:
        <span class="text-primary">{formatDate(data.updatedAt)}</span>
      </p>
    </div>
  </div>

  <div></div>
</section>
