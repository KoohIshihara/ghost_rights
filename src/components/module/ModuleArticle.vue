<template lang="pug">
  div(v-if="article").wrap-module-article.py12
    div.wrap-main-img.f.fh.mb12
      img(:src="article.mainImg")
    div.wrap-title.mb12
      h2.mb4 {{article.title}}
      span.article-subtitle {{article.subtitle}}
    div.wrap-writer.mb12.pb20
      // span.mr8.mb4 Written like:
      AtomWriter(:uid="article.createdAs")
    div(v-if="writer").wrap-content
      div(v-if="!contents[0]").wrap-no-content.pt20.pb10
        span.recommend.mb18 {{`この記事にはまだコンテンツがありません。${writer.name}っぽい記事をゴーストライトしてみませんか？`}}
        div.f.fc
          div.wrap-writer-comment.mb20
            div.f.fc.mb4
              div.wrap-icon.f.fh.mr8
                img(:src="writer.iconURL")
            div.wrap-bubble
              div.f.fc
                div.triangle
              span.bubble.px16.py8 {{article.commentForGhost}}
      div(v-if="contents[0]").wrap-with-content.py10
        div(v-for="content in contents").wrap-article-content.mb12
          ItemArticleContent(:content="content")
      div.wrap-recommend-write.pb30
        span.mb16 Ghost Rightでは閲覧者がGhost Writerになれます。
        div.f.fc
          span(@click="$router.push(`/edit-article/${article.id}`)").write-button.px12.py6 この記事をゴーストライトする

</template>

<style lang="scss">
.wrap-module-article {
  width: 92%;
  max-width: 620px;
  margin: 0 auto;
  .wrap-main-img {
    width: 100%;
    max-height: 380px;
    overflow: hidden;
    img {
      object-fit: cover;
    }
  }
  .wrap-title {
    .article-subtitle {
      color: #999;
    }
  }
  .wrap-writer {
    border-bottom: solid 0.6px rgba(0, 0, 0, 0.4);
    span {
      display: block;
    }
  }
  .wrap-content {
    .wrap-no-content {
      .recommend {
        display: block;
      }
      .wrap-writer-comment {
        .wrap-icon {
          width: 26px;
          height: 26px;
          border: solid 0.6px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          border-radius: 50%;
          img {
            object-fit: cover;
          }
        }
        .wrap-bubble {
          .triangle {
            margin-left: -8px;
            width: 12px;
            border-right: 14px solid transparent;
            border-bottom: 12px solid #f0f0f0;
            border-left: 14px solid transparent;
          }
          .bubble {
            display: inline-block;
            background: #f0f0f0;
            border-radius: 3px;
            position: relative;
            left: -4px;
          }
        }
      }
    }
    .wrap-recommend-write {
      span {
        display: block;
        text-align: center;
      }
      .write-button {
        display: inline-block;
        border-radius: 3px;
        background: #2a2a2a;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>

<script>
import db from '@/components/utils/firebase'
import ItemArticleContent from '@/components/item/ItemArticleContent'
import AtomWriter from '@/components/atom/AtomWriter'

export default {
  components: {
    ItemArticleContent,
    AtomWriter
  },
  props: {
  },
  data () {
    return {
      article: null,
      contents: [],
      writer: null
    }
  },
  watch: {
    contents: function () {
      this.$nextTick(() => {
        var positionY = sessionStorage.getItem('positionY')
        scrollTo(0, positionY)
        setTimeout(function () {
          scrollTo(0, positionY)
        }, 500)
      })
    }
  },
  async created () {
    this.article = await db.collection('articles')
      .doc(this.$route.params.id)
      .get()
      .then((d) => {
        var article = d.data()
        article.id = d.id
        return article
      })

    this.writer = await db.collection('users')
      .doc(this.article.createdAs)
      .get()
      .then((d) => {
        var writer = d.data()
        writer.uid = d.id
        return writer
      })

    this.contents = await db.collection('contents')
      .where('isPublished', '==', true)
      .where('articleId', '==', this.article.id)
      .orderBy('updatedAt', 'desc')
      .get()
      .then((q) => {
        return q.docs.map((d) => {
          var content = d.data()
          content.id = d.id
          return content
        })
      })
  },
  methods: {

  }
}
</script>
