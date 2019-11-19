<template lang="pug">
  div.wrap-module-edit-article
    div.wrap-title.mt20.pb20.mb20
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
    border-bottom: solid 0.6px rgba(0, 0, 0, 0.2);
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
import db, { strage } from '@/components/utils/firebase'

export default {
  components: {
    // MediumEditor,
    // editor
  },
  data () {
    return {
      // text: '',
      // options: {
      // },
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
    },
    htmlContent: {
      type: Object,
      required: true
    }
  },
  async mounted () {
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

      this.editor.setContent(this.htmlContent.content, 0)
      // this.editor.setContent(this.content.content, 0)
    },
    applyTextEdit () {
      clearTimeout(this.saveTimer)
      this.saveTimer = setTimeout(this.updateContent, 1000)
    },
    async updateContent () {
      this.$emit('toggleIsSaving')

      await this.adjustImgSize()

      this.htmlContent.content = this.editor.getContent()

      await db.collection('contents')
        .doc(this.$route.params.contentId)
        .update({
          // content: this.content.content,
          updatedAt: new Date()
        })

      await db.collection('contents')
        .doc(this.$route.params.contentId)
        .collection('content')
        .doc('html')
        .update({
          content: this.htmlContent.content
        })

      this.$emit('toggleIsSaving')
    },
    async adjustImgSize () {
      return new Promise(async (resolve, reject) => {
        // 画像リサイズ後の最大値の幅
        const THUMBNAIL_WIDTH = 600
        const THUMBNAIL_HEIGHT = 400

        var imgs = this.$refs.editable.getElementsByTagName('img')

        var w, h, ratio, rw, rh

        var loadImage = (src) => {
          return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve(img)
            img.onerror = (e) => reject(e)
            img.src = src
          })
        }

        for (var i = 0; i < imgs.length; i++) {
          var image = await loadImage(imgs[i].src)
          w = image.width
          h = image.height
          if (w >= THUMBNAIL_WIDTH || h >= THUMBNAIL_HEIGHT) {
            if (w > h) {
              // 横長の画像は横のサイズを指定値にあわせる
              ratio = h / w
              rw = THUMBNAIL_WIDTH
              rh = THUMBNAIL_WIDTH * ratio
            } else {
              // 縦長の画像は縦のサイズを指定値にあわせる
              ratio = w / h
              rw = THUMBNAIL_HEIGHT * ratio
              rh = THUMBNAIL_HEIGHT
            }

            var imgB64_src = imgs[i].src
            var img_type = imgB64_src.substring(5, imgB64_src.indexOf(';'))

            // New Canvas
            var canvas = document.createElement('canvas')
            canvas.width = rw
            canvas.height = rh
            // Draw (Resize)
            var ctx = canvas.getContext('2d')

            imgs[i].setAttribute('crossorigin', 'anonymous')
            ctx.drawImage(imgs[i], 0, 0, rw, rh)

            // Destination Image
            var imgB64_dst = canvas.toDataURL(img_type)

            // imgs[i].src = imgB64_dst

            var createRandomId = () => {
              var c = 'abcdefghijklmnopqrstuvwxyz0123456789'
              var cl = c.length
              var r = ''
              for (var i = 0; i < 8; i++) {
                r += c[Math.floor(Math.random() * cl)]
              }
              return r
            }

            var imgId = location.pathname.split('/')[3] + '-' + createRandomId()

            // ストレージオブジェクト作成
            var storageRef = strage.ref()
            // ファイルのパスを設定
            var imgRef = storageRef.child(`articles/contents/${imgId}.jpg`)
            // ファイルを適用してファイルアップロード開始
            //  imgRef.put(this.imageFile).then(snapshot => {
            var imgUrl = await imgRef.putString(imgB64_dst.split(',')[1], 'base64').then(async (snapshot) => {
              var url = await snapshot.ref.getDownloadURL().then(async (downloadURL) => {
                return downloadURL
              })
              return url
            })

            imgs[i].src = imgUrl
          }
        } // for

        resolve(true)
      })
    }
  }
}
</script>
