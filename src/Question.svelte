<script>
  import { score } from "./store.js";
  // ??? Why are these props labelled export, they are first defined in another file (Quiz) ???
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
    if (!isAnswered) {
      isAnswered = true;
      isCorrect = correct;
      if (correct) {
        score.update((val) => {
          return val + 1;
        });
      }
    }
  }
</script>

<h3>{@html question.question}</h3>

{#each allAnswers as answer}
  <!-- ??? How does @html work ??? -->
  <button
    class="answer"
    disabled={isAnswered}
    on:click={() => checkQuestion(answer.correct)}>{@html answer.answer}</button
  >
{/each}

{#if isAnswered}
  <br />
  <button on:click={nextQuestion}>Next Question</button>
{/if}

{#if isAnswered}
  <!-- Apply the class "correct" if "isCorrect" is true, else default style applies -->
  <h5 class:isCorrect class:isWrong={!isCorrect}>
    <!-- Alternatively, Shorthand 'class directive' syntax, if the class name and
    value are the same as above  -->
    <!-- Or more verbose if you want the class name and variable value are different as below -->
    <!-- <h4 class={isCorrect ? "correct-answer" : "incorrect-answer"}> -->
    {#if isCorrect}
      Hell yeah dude
    {:else}
      That's gotta be a no from me dog
    {/if}
  </h5>
{/if}

<style>
  h5 {
    color: black;
  }

  h5.isWrong {
    color: red;
  }

  h5.isCorrect {
    color: green;
  }

  .answer {
    display: block;
  }
</style>
