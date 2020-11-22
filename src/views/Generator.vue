<template>
  <div class="generator">
    <div class="settings-box">
      <form @submit="handleSubmit">
        <div class="field">
          <label for="n-input">No of sides of polygon</label>
          <input id="n-input" type="number" v-model="fractalOptions.n"/>
        </div>
        <div class="field">
          <label for="vertex-restrictions-input">Vertex restrictions</label>
          <select id="vertex-restrictions-input" v-model="fractalOptions.vertexValidation">
            <option value="">None</option>
            <option value="CANNOT_BE_PREVIOUS">Cannot be second in row</option>
          </select>
        </div>
        <div class="field">
          <button type="submit" class="submit-btn">Generate</button>
        </div>
      </form>
    </div>
    <canvas></canvas>
  </div>
</template>

<script lang="js">
import { Component, Vue } from 'vue-property-decorator';
import { generateFractal } from '@/utils/generator'; // @ is an alias to /src

@Component({
  data: () => ({
    isLoading: false,
    fractalOptions: {
      size: 400,
      n: 3,
      vertexValidation: 'CANNOT_BE_PREVIOUS',
    },
  }),
  mounted() {
    this.canvas = document.querySelector('canvas');
    this.canvas.width = window.innerWidth * (2 / 3);
    this.canvas.height = window.innerHeight * (2 / 3);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.generateFractal();
    },
    clearCanvas() {
      this.ctx.clearRect(
        -this.canvas.width / 2, -this.canvas.height / 2,
        this.canvas.width, this.canvas.height,
      );
    },
    generateFractal() {
      this.isLoading = true;
      this.clearCanvas();
      generateFractal({
        ctx: this.ctx,
        ...this.fractalOptions,
      }).then(() => {
        this.isLoading = false;
      });
    },
  },
})
export default class Home extends Vue {
}
</script>

<style lang="scss">
.generator {
  display: flex;
  align-items: center;
  justify-content: center;
}

.settings-box {
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  padding: 2rem;
  max-width: 20vw;
}

form {
  .field {
    margin: 2rem 0;

    label {
      display: block;
      margin-bottom: .5rem;
      font-size: 1.1rem;
    }

    input, select {
      font-family: 'Share Tech Mono', sans-serif;
      font-size: 1.2rem;
      background: lighten(#161a21, 5%);
      border-radius: 2px;
      color: white;
      padding: .4rem;
      border: none;
      width: 100%;
      display: block;
      box-sizing: border-box;
    }
  }
}

.submit-btn {
  width: 100%;
  font-size: 1.5rem;
  background: none;
  color: white;
  border: 3px solid var(--primary);
  border-radius: 2px;
  padding: .3rem 0;
  font-family: 'Share Tech Mono', sans-serif;
}
</style>
