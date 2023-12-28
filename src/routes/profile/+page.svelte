<script lang="ts">
  export let data: {
    username: string;
    displayName: string;
    createdAt: Date;
    updatedAt: Date;
  };

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(date);
  }
</script>

<section class="flex flex-col gap-4">
  <div>
    <span class="text-5xl text-primary font-bold">
      {data.displayName === data.username ? data.username : data.displayName}
    </span>

    {#if data.displayName !== data.username}
      <p class="opacity-30">{data.username}</p>
    {/if}
  </div>

  <div>
    <p>Criado em: <span class="text-primary">{formatDate(data.createdAt)}</span></p>
    <p>Atualizado em: <span class="text-primary">{formatDate(data.updatedAt)}</span></p>
  </div>
</section>
