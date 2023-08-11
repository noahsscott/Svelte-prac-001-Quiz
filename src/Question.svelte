<script>
  export let question;
  export let nextQuestion;

  let isCorrect;
  let isAnswered = false;

  let answers = question.incorrect_answers.map((answer) => {
    return {
      answer,
      correct: false,
    };
  });

  let allAnswers = [
    ...answers,
    {
      answer: question.correct_answer,
      correct: true,
    },
  ];

  function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
  }

  shuffle(allAnswers);

  function checkQuestion(correct) {
    isCorrect = correct;
    isAnswered = true;
  }
</script>

<h3>{@html question.question}</h3>

{#each allAnswers as answer}
  <!-- ??? How does @html work ??? -->
  <button on:click={() => checkQuestion(answer.correct)}
    >{@html answer.answer}</button
  >
{/each}
{#if isAnswered}
  <br />
  <button on:click={nextQuestion}>Next Question</button>
{/if}

{#if isAnswered}
  <h4>
    {#if isCorrect}
      You nailed it big boi
    {:else}
      Try again
    {/if}
  </h4>
{/if}
