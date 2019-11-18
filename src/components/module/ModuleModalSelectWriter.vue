<template lang="pug">
  div.wrap-module-modal-select-writer
    div.wrap-modal-header
      div.header-content.f.fm.flex-between
        v-icon(@click="$emit('toggleShowSelectWriterModal')") arrow_back_ios
        div
        // span.ok OK
    div.wrap-modal-content
      div.wrap-search-box
        div.search-box-content.f.flex-between.px4.py2.my8
          v-icon(size="18px") search
          input(placeholder="Type name" v-model="searchWord").pl2.pr4
      div.wrap-result
        div(v-for="item in resultUsers" @click="onCard(item.uid)").wrap-result-card.py6
          div.card-content.f.fm.flex-between
            div.f.fm
              div.wrap-icon.mr8
                img(:src="item.iconURL")
              span.name {{item.name}}

</template>

<style lang="scss">
.wrap-module-modal-select-writer {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 101;
  background: #fff;
  left: 0;
  top: 0;
  .wrap-modal-header {
    position: relative;
    width: 100%;
    height: 48px;
    background: #f8f8f8;
    border-bottom: solid 0.6px rgba(0, 0, 0, 0.2);
    .header-content {
      margin: 0 auto;
      width: 92%;
      max-width: 620px;
      height: 100%;
      .ok {
        color: #03a9f4;
        cursor: pointer;
      }
    }
  }
  .wrap-modal-content {
    .wrap-search-box {
      border-bottom: solid 0.6px rgba(0, 0, 0, 0.2);
      .search-box-content {
        margin: 0 auto;
        width: 92%;
        max-width: 620px;
        border: solid 0.6px rgba(0, 0, 0, 0.2);
        border-radius: 3px;
        input {
          width: 100%;
          outline: none;
          font-size: 16px;
        }
      }
    }
    .wrap-result {
      .wrap-result-card {
        border-bottom: solid 0.6px rgba(0, 0, 0, 0.2);
        .card-content {
          margin: 0 auto;
          width: 92%;
          max-width: 620px;
          .wrap-icon {
            width: 42px;
            height: 42px;
            overflow: hidden;
            border: solid 0.6px rgba(0, 0, 0, 0.2);
            border-radius: 50%;
            img {
              object-fit: cover;
            }
          }
        }
      }
    }
  }
}
</style>

<script>
import db from '@/components/utils/firebase'

export default {
  components: {
  },
  props: {
  },
  data () {
    return {
      searchWord: '',
      isSearching: false,
      resultUsers: []
    }
  },
  watch: {
    searchWord: async function (name) {
      if (!this.isSearching) {
        this.isSearching = true
        this.resultUsers = await db.collection('users')
          .limit(100)
          .orderBy('name')
          .startAt(name)
          .endAt(name + '\uf8ff')
          .get()
          .then((q) => {
            return q.docs.map((d) => {
              var user = d.data()
              user.uid = d.id
              return user
            })
          })
        this.isSearching = false
      }
    }
  },
  async created () {
    this.resultUsers = await db.collection('users')
      .limit(100)
      .get()
      .then((q) => {
        return q.docs.map((d) => {
          var user = d.data()
          user.uid = d.id
          return user
        })
      })
  },
  methods: {
    onCard (uid) {
      this.$emit('changeWriter', uid)
      this.$emit('toggleShowSelectWriterModal')
    }
  }
}
</script>
