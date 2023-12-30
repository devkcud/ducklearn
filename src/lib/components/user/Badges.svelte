<script lang="ts">
  export let badges: { id: string; name: string }[];
</script>

{#each badges as badge}
  <span
    class="badge badge-outline gap-1 items-center badge-sm"
    class:badge-primary={badge.name === 'staff'}
    class:badge-secondary={badge.name === 'robô'}
    class:badge-success={badge.name === 'verificado'}
  >
    {#if badge.name === 'staff'}
      <iconify-icon icon="mdi:shield" width={12} />
    {:else if badge.name === 'robô'}
      <iconify-icon icon="mdi:robot" width={12} />
    {:else if badge.name === 'verificado'}
      <iconify-icon icon="mdi:verified" width={12} />
    {:else}
      <iconify-icon icon="mdi:star-three-points" width={12} />
    {/if}
    {badge.name}
  </span>
{/each}
