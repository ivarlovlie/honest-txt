<script lang="ts">
  import { onMount } from "svelte";
  import { createPopper } from "@popperjs/core";
  import type { Instance, Placement, Options } from "@popperjs/core";

  export let bindTo: HTMLElement;
  export let show: boolean = false;
  export let placement: Placement;
  export let showArrow: boolean = true;
  export let offset: number = 0;

  let tooltip: HTMLElement;
  let arrow: HTMLElement;
  let instance: Instance;

  $: if (tooltip && show) {
    tooltip.setAttribute("data-show", "");
    instance.update();
  } else if (tooltip) {
    tooltip.removeAttribute("data-show");
  }

  onMount(() => {
    const config = { placement } as Options;
    const modifiers = [];
    if (showArrow) {
      modifiers.push({
        name: "arrow",
        options: {
          element: arrow,
        },
      });
    }
    if (offset) {
      modifiers.push({
        name: "offset",
        options: {
          offset: [0, offset],
        },
      });
    }
    if (modifiers.length) config.modifiers = modifiers;
    instance = createPopper(bindTo, tooltip, config);
  });
</script>

<aside class="tooltip" bind:this={tooltip}>
  <slot />
  <div data-popper-arrow class="arrow" bind:this={arrow} />
</aside>

<style>
  @import url("/tooltip.css");
</style>
