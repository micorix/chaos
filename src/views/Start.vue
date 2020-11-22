<template>
  <div class="start">
    <h1>Chaos game</h1>
    <h2>Fractal generator</h2>
    <div class="buttons-wrapper">
      <RouterLink to="/generator" class="btn-link">Play</RouterLink>
      <RouterLink to="/about" class="btn-link">About</RouterLink>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  h1 {
    font-family: 'Big Shoulders Inline Text', cursive;
    font-size: 7rem;
    text-align: center;
    margin: 20vh 0 2rem 0;
  }
  h2 {
    text-align: center;
    margin-bottom: 4rem;
  }
  .buttons-wrapper {
    display: flex;
    justify-content: center;
  }
  .btn-link {
    padding: .5rem 2rem;
    margin: 0 2em;
    color: white;
    border: 4px solid white;
    text-align: center;
    text-decoration: none;
    font-size: 2rem;
    position: relative;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 4px solid var(--primary);
    }
    &:hover::after {
      top: -1px;
      left: -1px;
    }
  }
</style>
