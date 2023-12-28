<script lang="ts">
  import Badges from '$lib/components/user/Badges.svelte';
  import CommunityAwards from '$lib/components/user/CommunityAwards.svelte';

  export let data: {
    username: string;
    displayName: string;
    about: string;
    createdAt: Date;
    updatedAt: Date;
    badges: string[];
    awards: string[];
    stars: number;
    followers: number;
    following: number;
  };

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  }

  function formatNumber(numero: number) {
    if (numero < 1000) {
      return numero.toString();
    } else if (numero < 1000000) {
      return (numero / 1000).toFixed(1) + ' mil';
    } else if (numero < 1000000000) {
      return (numero / 1000000).toFixed(1) + ' milhões';
    } else {
      return (numero / 1000000000).toFixed(1) + ' bilhões';
    }
  }
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
        <div class="flex items-center gap-1">
          <Badges badges={data.badges} />
        </div>
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
        <div class="tooltip" data-tip={data.stars}>
          <span class="text-primary w-fit">{formatNumber(data.stars)}</span>
        </div>
      </div>

      <div>
        <iconify-icon icon="game-icons:shadow-follower" width={18} />
        Seguidores:
        <div class="tooltip" data-tip={data.followers}>
          <span class="link link-primary w-fit">{formatNumber(data.followers)}</span>
        </div>
      </div>

      <div>
        <iconify-icon icon="mingcute:user-follow-2-fill" width={18} />
        Seguindo:
        <div class="tooltip" data-tip={data.following}>
          <span class="link link-primary w-fit">{formatNumber(data.following)}</span>
        </div>
      </div>
    </div>

    {#if data.awards.length !== 0}
      <div class="divider"></div>

      <p class="text-lg text-primary font-bold">Recompensas da comunidade:</p>

      <div class="w-full grid grid-cols-5 place-items-center gap-4">
        <CommunityAwards awards={data.awards} />
      </div>
    {/if}

    <div class="divider"></div>

    <div class="italic">
      <p>
        Conta criada em:
        <br />
        <span class="text-primary">{formatDate(data.createdAt)}</span>
      </p>
      <p>
        Última atualização:
        <br />
        <span class="text-primary">{formatDate(data.updatedAt)}</span>
      </p>
    </div>
  </div>

  <div></div>
</section>
