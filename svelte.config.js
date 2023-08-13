import preprocess from "svelte-preprocess";

const config = {
  preprocess: preprocess({
    // ...svelte-preprocess options
  }),
  // ...other svelte options
};

export default config;

// DEFUALT SETTINGS BELOW

// import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

// const config = {
//   preprocess: [vitePreprocess({})],
// };

// export default config;
