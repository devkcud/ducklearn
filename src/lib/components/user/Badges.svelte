<script lang="ts">
  export let badges: { id: string; name: string }[];
</script>

{#each badges as badge}
  {#if badge.name === 'staff'}
    <span class="badge gap-1 items-center badge-outline badge-primary">
      <iconify-icon icon="mdi:shield" width={12} />
      staff
    </span>
  {:else if badge.name === 'bot'}
    <span class="badge gap-1 items-center badge-outline">
      <iconify-icon icon="mdi:robot" width={12} />
      bot
    </span>
  {:else if badge.name === 'verified'}
    <span class="badge gap-1 items-center badge-outline badge-success">
      <iconify-icon icon="mdi:verified" width={12} />
      verified
    </span>
  {:else}
    <span class="badge gap-1 items-center badge-outline">
      <iconify-icon icon="mdi:star-three-points" width={12} />
      {badge.name}
    </span>
  {/if}
{/each}
