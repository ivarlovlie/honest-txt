<script>
  //@ts-nocheck
  export let value;
  let textareaElement;
  let scrollHeight = 0;
  $: if (textareaElement) {
    scrollHeight = textareaElement.scrollHeight;
  }

  function on_input(event) {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  }
</script>

<textarea
  style="overflow-y:hidden;min-height:calc(1.5em + 2px);{scrollHeight
    ? 'height:{scrollHeight}px'
    : ''};"
  bind:value
  bind:this={textareaElement}
  class={$$restProps.class}
  on:input={on_input}
/>
