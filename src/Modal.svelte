<script>
  import { fly, fade } from "svelte/transition";
  // Import this if you want o create events within a child component that can be sent to its parent
  // In this case from Modal to Quiz
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let w;
</script>

<div class="modal-bg" transition:fade bind:clientWidth={w}>
  <div class="modal" transition:fly={{ y: 100 }}>
    <button
      on:click={() => {
        dispatch("closeModal");
      }}>Close</button
    >
    <!-- <slot>optional fallback</slot> -->
    <!-- {w} -->
    <slot />
    <!-- <slot name="modal" /> -->
  </div>
</div>

<style lang="scss">
  .modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .modal {
    background: white;
    padding: 20px;
    border-radius: 5px;
  }
</style>
