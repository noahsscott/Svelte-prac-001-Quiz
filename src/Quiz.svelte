<script>
  // Animation includes 'draw' which lets you draw an svg!!!
  import { fade, blur, fly, slide, scale } from "svelte/transition";
  import { onMount, beforeUpdate, afterUpdate, onDestroy } from "svelte";
  import Question from "./Question.svelte";
  import Modal from "./Modal.svelte";
  import { score } from "./store.js";

  let activeQuestion = 0;
  let quiz = getQuiz();
  let isModalOpen = false;

  // LIFECYCYLE METHODS ////////////////////////////////////////

  // Fires after a component has mounted
  // Is rendered on the client side
  onMount(() => {
    console.log("I mounted");
  });

  beforeUpdate(() => {
    console.log("before update");
  });

  afterUpdate(() => {
    console.log("after update");
  });

  //////////////////////////////////////////////////////////////

  async function getQuiz() {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=12&category=11&type=multiple"
    );
    const quiz = await res.json();
    console.log("new quiz requested");
    return quiz;
  }

  function nextQuestion() {
    activeQuestion = activeQuestion + 1;
  }

  function resetQuiz() {
    isModalOpen = false;
    score.set(0);
    activeQuestion = 0;
    quiz = getQuiz();
  }

  // rEACTIVE STATEMENT
  // '$:' Marks any statement as reactive in Svelte
  $: if ($score > 7) {
    isModalOpen = true;
  }

  // rEACTIVE DECLArATION
  $: questionNumber = activeQuestion + 1;
</script>

<div>
  <button on:click={resetQuiz}>Start new quiz</button>

  <h3>My score: {$score}</h3>
  <h4>Question #{questionNumber}</h4>

  <div class="container">
    {#await quiz}
      Loading...
    {:then data}
      {#each data.results as question, index}
        {#if index == activeQuestion}
          <div in:fly={{ x: 100 }} out:fly={{ x: -200 }} class="fade-wrapper">
            <!-- ??? How does passing these functions or props work at all !!! ??? -->
            <Question {nextQuestion} {question} />
          </div>
        {/if}
      {/each}
    {/await}
  </div>
</div>

{#if isModalOpen}
  <!-- The close event is defined in Modal as 'closeModal' and connected here to the component instance -->
  <Modal on:closeModal={resetQuiz}>
    <h2>Congratulations big boi</h2>
    <p>You won a nude egg</p>
    <button on:click={resetQuiz}>Try a new quiz</button>
  </Modal>
{/if}

<style>
  .fade-wrapper {
    position: absolute;
  }

  .container {
    min-height: 320px;
  }
</style>
