<template>
  <div id="app">
    <input-with-slider
        :value="inputValue"
        @input="handleInput"
        :min="5"
        :max="400"
        :slider-max="500"/>
    <div>
      {{ inputValue }}
    </div>

    <div style="height: 1000px;background: aquamarine">
      <CheckboxGroupTest/>
    </div>

    <div>
      <scroll-auto-focus/>
    </div>

    <div style="height: 600px;background: #2c3e50"></div>
  </div>
</template>

<script>
import InputWithSlider from "@/components/InputWithSlider";
import CheckboxGroupTest from "@/components/CheckboxGroupTest";
import ScrollAutoFocus from "@/components/ScrollAutoFocus";
import {Decimal} from "decimal.js"

export default {
  name: 'App',
  components: {
    InputWithSlider, CheckboxGroupTest, ScrollAutoFocus
  },
  data() {
    return {
      inputValue: '33.3'
    }
  },
  methods: {
    handleInput(v) {
      console.log("get data from input:", v)
      if (v === '') {
        this.inputValue = v
        return
      }
      let dValue = new Decimal(v)

      this.inputValue = dValue.toFixed(0)
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
