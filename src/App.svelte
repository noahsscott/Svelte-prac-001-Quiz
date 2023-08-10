<script>
  import Quiz from "./Quiz.svelte"; // Same import syntax as JS
</script>

<main>
  <h1>Hello you !</h1>
  <h4>I'm an h4 too</h4>
  <Quiz />
</main>

<style>
  main {
    text-align: left;
    padding: 1em;
    max-width: 600px;
    margin: 0 auto;
    font-family: Inter-UI, Helvetica, Arial, sans-serif;
    font-weight: 200;
  }

  h1 {
    color: #ff3e00;
  }
  /* This creates a global style for all components */
  /* Global styles can be overwritten by component level styles that target the same el(s)  */
  :global(h4) {
    color: green;
  }
</style>
