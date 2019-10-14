<template lang="pug">
  div.wrap-module-header
    div.wrap-header-content.f.fh
      span {{this.title}}

</template>

<style lang="scss">
@import "../../plugins/default.css";

.wrap-module-header {
  width: 100%;
  height: 48px;
  border-bottom: 0.6px solid rgba(0, 0, 0, 0.2);
  .wrap-header-content {
    width: 90%;
    max-width: 640px;
    height: 100%;
    margin: 0 auto;
  }
}
</style>

<script>
import MediumEditor from 'vue2-content-editor'

export default {
  components: {
    MediumEditor
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      content: '',
      options: {
      }
    }
  }
}
</script>
