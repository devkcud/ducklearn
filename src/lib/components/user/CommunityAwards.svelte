<script lang="ts">
  export let awards: string[];

  type Award = {
    name: string;
    quantity: number;
  };

  let seenAwards: Award[] = [];

  for (const award of awards) {
    if (!seenAwards.some((seenAward) => seenAward.name === award)) {
      seenAwards.push({
        name: award,
        quantity: 1,
      });

      continue;
    } else {
      let id = seenAwards.findIndex((seenAward) => seenAward.name === award);
      seenAwards[id].quantity += 1;
    }
  }
</script>

{#each seenAwards as award}
  <div class="tooltip" data-tip={award.name}>
    <img
      src="https://api.dicebear.com/7.x/icons/svg?seed={award.name.toLowerCase().replace(' ', '-')}"
      alt={award.name}
      class="w-16 h-16 rounded-full"
    />

    <span class="text-xs opacity-50">{award.quantity}</span>
  </div>
{/each}
