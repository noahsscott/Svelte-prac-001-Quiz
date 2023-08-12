<script>
  // Animation includes 'draw' which lets you draw an svg!!!
  import { fade, blur, fly, slide, scale } from "svelte/transition";
  import { onMount, beforeUpdate, afterUpdate, onDestroy } from "svelte";
  import Question from "./Question.svelte";
  import App from "./App.svelte";

  let activeQuestion = 0;
  let score = 0;
  let quiz = getQuiz();

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
      "https://opentdb.com/api.php?amount=10&category=12&type=multiple"
    );
    const quiz = await res.json();
    console.log("new quiz requested");
    return quiz;
  }

  function nextQuestion() {
    activeQuestion = activeQuestion + 1;
  }

  function resetQuiz() {
    score = 0;
    activeQuestion = 0;
    quiz = getQuiz();
  }

  function addToScore() {
    score = score + 1;
  }

  // rEACTIVE STATEMENT
  // '$:' Marks any statement as reactive in Svelte
  $: if (score > 7) {
    alert("You won");
    resetQuiz();
  }

  // rEACTIVE DECLArATION
  $: questionNumber = activeQuestion + 1;
</script>

<div>
  <button on:click={resetQuiz}>Start new quiz</button>

  <h3>My score: {score}</h3>
  <h4>Question #{questionNumber}</h4>

  {#await quiz}
    Loading...
  {:then data}
    {#each data.results as question, index}
      {#if index == activeQuestion}
        <div in:fly={{ x: 100 }} out:fly={{ x: -200 }} class="fade-wrapper">
          <!-- ??? How does passing these functions or props work at all !!! ??? -->
          <Question {addToScore} {nextQuestion} {question} />
        </div>
      {/if}
    {/each}
  {/await}
</div>

<style>
  .fade-wrapper {
    position: absolute;
  }
</style>
