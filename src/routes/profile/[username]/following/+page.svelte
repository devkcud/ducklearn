<script lang="ts">
  export let data: {
    username: string;
    displayName: string;
    following: {
      id: string;
      username: string;
      displayName: string;
      about: string;
      createdAt: Date;
      updatedAt: Date;
      stars: number;
      profileVisibility: string;
    }[];
  };

  let searchTerm = '';

  const ommitedFollowing = data.following.filter((user) => user.profileVisibility === 'private');
  const usePlural = ommitedFollowing.length > 1 ? 's' : '';

  $: filteredFollowing = data.following.filter(
    (user) =>
      (user.username.includes(searchTerm) || user.displayName.includes(searchTerm)) &&
      user.profileVisibility === 'public',
  );
</script>

<div class="flex flex-col gap-4 p-4">
  <div class=" w-full max-w-md mx-auto">
    <label class="form-control">
      <div class="label">
        <span class="label-text">Quem você quer achar?</span>
      </div>
      <input
        bind:value={searchTerm}
        type="text"
        placeholder="Pesquisar por nome ou apelido..."
        class="input input-bordered"
      />
      <div class="label">
        <span class="label-text-alt">{filteredFollowing.length} resultados</span>
        <span class="label-text-alt">
          {ommitedFollowing.length} usuário{usePlural} privado{usePlural} (omitido)
        </span>
      </div>
    </label>
  </div>

  <div class="divider">Usuários</div>

  <div class="flex flex-wrap justify-center gap-16 p-8">
    {#each filteredFollowing as following}
      <div class="flex items-center gap-4">
        <div class="avatar">
          <div class="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src="https://api.dicebear.com/7.x/notionists-neutral/svg?seed={following.username}"
              alt="Profile {following.displayName}"
              loading="lazy"
            />
          </div>
        </div>

        <div class="flex flex-col">
          <div class="flex flex-col">
            <a
              href="/profile/{following.username}"
              class="flex items-center gap-4 text-xl text-primary font-bold"
            >
              {following.displayName}
            </a>
            <span class="text-sm opacity-30 text-base-content font-normal">
              @{following.username}
            </span>
          </div>

          <a href="/profile/{following.username}" class="btn btn-ghost btn-xs w-fit" type="submit">
            <iconify-icon icon="mdi:user" width={18} />
            Ver perfil
          </a>
        </div>
      </div>
    {/each}
  </div>
</div>
