<script lang="ts">
  export let badges: string[];
</script>

{#each badges as badge}
  {#if badge === 'staff'}
    <span class="badge gap-1 items-center badge-outline badge-primary">
      <iconify-icon icon="mdi:shield" width={12} />
      staff
    </span>
  {:else if badge === 'bot'}
    <span class="badge gap-1 items-center badge-outline">
      <iconify-icon icon="mdi:robot" width={12} />
      bot
    </span>
  {:else if badge === 'verified'}
    <span class="badge gap-1 items-center badge-outline badge-success">
      <iconify-icon icon="mdi:verified" width={12} />
      verified
    </span>
  {:else}
    <span class="badge gap-1 items-center badge-outline">
      <iconify-icon icon="mdi:star-three-points" width={12} />
      {badge}
    </span>
  {/if}
{/each}
