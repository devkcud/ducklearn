<script lang="ts">
  import { onNavigate } from '$app/navigation';

  onNavigate((navigation) => {
    // @ts-expect-error View Transition API is not implemented in Firefox or Safari but it is in Chrome
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      // @ts-expect-error Same thing upthere
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>
