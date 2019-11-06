<template lang="pug">
  div.wrap-module-edit-article
    div.wrap-title.mt20
      span.article-title {{article.title}}
    div.wrap-article-editor
      div(ref="editable").editable
      // MediumEditor(:content='content' :options='options' ref="editor")
      // editor(:text='text' :options='options' v-on:edit='applyTextEdit')

</template>

<style lang="scss">
@import "../../plugins/default.css";

.wrap-module-edit-article {
  // width: 90%;
  max-width: 640px;
  margin: 0 auto;
  .wrap-title {
    .article-title {
      font-size: 18px;
      font-weight: bold;
    }
  }
  .wrap-article-editor {
    .editable {
      h2 {
        font-size: 24px;
        font-weight: bold;
      }
      blockquote {
        padding-left: 12px;
        border-left: solid #2a2a2a;
      }
    }
  }
}
</style>

<script>
// import MediumEditor from 'vue2-content-editor'
// import editor from 'vue2-medium-editor'
// console.log('editor:', editor.MediumEditor.Extension.extend({
//   name: 'placeholder'
// }))
import db from '@/components/utils/firebase'

export default {
  components: {
    // MediumEditor,
    // editor
  },
  data () {
    return {
      text: '',
      options: {
      },
      editor: null,
      saveTimer: null
    }
  },
  props: {
    article: {
      type: Object,
      required: true
    },
    content: {
      type: Object,
      required: true
    }
  },
  async mounted () {
    // this.content = await db.collection('contents')
    //   .doc(this.$route.params.contentId)
    //   .get()
    //   .then((d) => { return d.data() })

    this.initializeEditor()
  },
  methods: {
    initializeEditor () {
      this.editor = new MediumEditor('.editable', {
        toolbar: {
          buttons: ['bold', 'italic', 'h2', 'anchor', 'quote']
        },
        anchor: {
          customClassOption: null,
          customClassOptionText: 'Button',
          linkValidation: false,
          placeholderText: 'Paste or type a link',
          targetCheckbox: false,
          targetCheckboxText: 'Open in new window'
        },
        anchorPreview: {
          hideDelay: 400,
          previewValueSelector: 'a'
        },
        placeholder: {
          text: 'Ghost write here...',
          hideOnClick: true
        },
        keyboardCommands: {
          commands: [
            {
              command: 'bold',
              key: 'B',
              meta: true,
              shift: false,
              alt: false
            },
            {
              command: 'italic',
              key: 'I',
              meta: true,
              shift: false,
              alt: false
            },
            {
              command: 'underline',
              key: 'U',
              meta: true,
              shift: false,
              alt: false
            }
          ]
        },
        imageDragging: false
      })

      this.editor.subscribe('editableInput', this.applyTextEdit)

      $(this.$refs.editable).mediumInsert({ editor: this.editor })

      this.editor.setContent(this.content.content, 0)
    },
    applyTextEdit () {
      clearTimeout(this.saveTimer)
      this.saveTimer = setTimeout(this.updateContent, 1000)
    },
    async updateContent () {
      this.content.content = this.editor.getContent()

      this.$emit('toggleIsSaving')
      await db.collection('contents')
        .doc(this.$route.params.contentId)
        .update({
          content: this.content.content,
          updatedAt: new Date()
        })
      this.$emit('toggleIsSaving')
    }
  }
}
</script>
