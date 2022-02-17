<template>
  <div>
    <CheckboxGroup>
      <Checkbox disabled label="1"/>
    </CheckboxGroup>
  </div>
</template>

<script>
import {Checkbox, CheckboxGroup} from 'element-ui'

export default {
  components: {Checkbox, CheckboxGroup},
  name: "CheckboxGroupTest",
  data() {
    return {
      selected: []
    }
  }
}
</script>

<style scoped>

</style>