<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Inline+Text:wght@700&family=Share+Tech+Mono&display=swap');

:root {
  --dark: #12151A;
  --primary: #cc3f0c;
  --secondary: #1B998B;
  --accent1: #DBBBF5;
  --accent2: #DDF0FF
}

body {
  background: #12151A;
  color: white;
  font-family: 'Share Tech Mono', sans-serif;
}
html, body, #app {
  height: 100%;
}
</style>
