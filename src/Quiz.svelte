<script>
  import Question from "./Question.svelte";

  let activeQuestion = 0;

  async function getQuiz() {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=10&category=12&type=multiple"
    );
    const quiz = await res.json();
    console.log("new quiz requested");
    return quiz;
  }

  let quiz = getQuiz();

  function handleClick() {
    quiz = getQuiz();
  }

  function nextQuestion() {
    activeQuestion = activeQuestion + 1;
  }
</script>

<div>
  <button on:click={handleClick}>Start new quiz</button>

  <h3>My score: 0</h3>
  <h4>Question #{activeQuestion + 1}</h4>

  {#await quiz}
    Loading...
  {:then data}
    {#each data.results as question, index}
      {#if index == activeQuestion}
        <Question {nextQuestion} {question} />
      {/if}
    {/each}
  {/await}
</div>
