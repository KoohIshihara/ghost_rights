<template lang="pug">
  div.wrap-module-edit-article
    div.wrap-editor
      MediumEditor(:content='content' :options='options')

</template>

<style lang="scss">
@import "../../plugins/default.css";

.wrap-module-edit-article {
  width: 90%;
  max-width: 640px;
  margin: 0 auto;
  .wrap-editor {
  }
}
</style>

<script>
import MediumEditor from 'vue2-content-editor'

export default {
  components: {
    MediumEditor
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
