<script>
export default {
  name: 'Contenteditable',
  data() {
    return {
      text: '',
    };
  },
  render(createElement) {
    const _this = this;
    return createElement('div', {
      attrs: {contentEditable: true, style: 'border: 1px solid red'},
      on: {
        blur(event) {
          console.log('>>>', _this.text, event.target.innerText, event.target.textContent);
          _this.$nextTick(() => {
            _this.text = event.target.textContent;
          });
        },
      },
    }, _this.text);
  },
};
</script>

<style scoped>

</style>
