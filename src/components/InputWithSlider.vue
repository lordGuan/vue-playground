<template>
  <div>
    <input :value="currentValue" @input="handleInput"/>
    <el-slider :value="sliderValue" @input="handleSlider"/>
  </div>
</template>

<script>
export default {
  name: "InputWithSlider",
  props: {
    value: String,
    min: Number,
    max: Number,
    sliderMax: Number,
  },
  data() {
    return {
      currentValue: this.value || '',
      sliderValue: 0
    }
  },
  methods: {
    handleInput(event) {
      let value = event.target.value
      this.setCurrentValue(value)
      this.$emit('input', value)
    },
    setCurrentValue(v) {
      this.currentValue = v
    },
    handleSlider(v) {
      // this.sliderValue = v
      console.log(v)
      this.$emit('input', v)
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.setCurrentValue(newValue)
        }
      }
    },
    currentValue(newValue) {
      if (newValue !== this.value) {
        this.currentValue = this.value
      }
    }
  }
}
</script>

<style>

</style>