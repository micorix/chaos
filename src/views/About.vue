<template>
  <div class="container">
    <RouterLink to="/" class="go-back"> &larr; Go back</RouterLink>
    <h1>About this page</h1>
    <ol>
      <li>This app generates fractals using <a href="https://en.wikipedia.org/wiki/Chaos_game">chaos game</a>.</li>
      <li>Inspiration for creating this website was online lecture at
        <a href="https:/pb.edu.pl/en">Bialystok University of Technology</a>.</li>
      <li>I tried to optimize this app but still generating
        fractals in browser has some perf issues.</li>
      <li>Built by <a href="https://micorix.com">micorix</a> using TS, Vue & Canvas API.
        You can check out the source code on <a href="https://github.com/micorix/chaos">GitHub</a>.</li>
    </ol>
    <small>
      Funny thing that even more challenging than generating fractal itself,
      is sampling random point within a polygon. <br />
      I have to admit I cheated a bit and used <a href="https://github.com/mapbox/earcut">Mapbox earcut library</a>
      which was named after triangulation algorithm it uses.
    </small>
  </div>
</template>
<style lang="scss" scoped>
  .container {
    width: 60%;
    margin: 10vh auto 5vh auto;
    font-size: 1.2rem;
  }
  h1 {
    margin: 5vh 0;
    font-size: 3rem;
  }
  ol {
    line-height: 3rem;
  }
  small {
    color: rgba(255, 255, 255, 0.6);
  }
</style>
