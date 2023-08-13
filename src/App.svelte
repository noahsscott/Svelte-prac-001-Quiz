<script>
  import Quiz from "./Quiz.svelte"; // Same import syntax as JS
</script>

<h1>Level up: Music brain</h1>
<main>
  <Quiz />
</main>

<style>
  :global(body) {
    background: #524763;
  }

  main {
    background: white;
    border-radius: 8px;
    padding: 40px;
  }

  h1 {
    color: white;
    text-align: center;
  }
</style>
