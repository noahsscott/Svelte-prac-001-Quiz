<script>
  // ??? Why are these props labelled export, they are first defined in another file (Quiz) ???
  export let question;
  export let nextQuestion;
  export let addToScore;

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
    if (!isAnswered) {
      isAnswered = true;
      isCorrect = correct;
      if (correct) {
        addToScore();
      }
    }
  }
</script>

<h3>{@html question.question}</h3>

{#each allAnswers as answer}
  <!-- ??? How does @html work ??? -->
  <button disabled={isAnswered} on:click={() => checkQuestion(answer.correct)}
    >{@html answer.answer}</button
  >
{/each}

{#if isAnswered}
  <br />
  <button on:click={nextQuestion}>Next Question</button>
{/if}

{#if isAnswered}
  <h4 class={isCorrect ? "correct" : ""}>
    Alternatively, Shorthand 'class directive' syntax, if the class name and
    value a
    <!-- <h4 class={isCorrect ? "correct-answer" : "incorrect-answer"}> -->
    {#if isCorrect}
      Hell yeah dude
    {:else}
      That's gotta be a no from me dog
    {/if}
  </h4>
{/if}
