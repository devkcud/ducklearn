<script lang="ts">
  export let awards: string[];

  let awardCounts = new Map<string, number>();

  for (const award of awards) {
    awardCounts.set(award, (awardCounts.get(award) || 0) + 1);
  }
</script>

{#each Array.from(awardCounts, ([name, quantity]) => ({ name, quantity })) as award}
  <div class="tooltip" data-tip={award.name}>
    <img
      src="https://api.dicebear.com/7.x/icons/svg?seed={award.name.toLowerCase().replace(' ', '-')}"
      alt={award.name}
      class="w-16 h-16 rounded-full"
    />

    <span class="text-xs opacity-50">{award.quantity}</span>
  </div>
{/each}
