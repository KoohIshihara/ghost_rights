<template lang="pug">
  Auth
    div.wrap-header
      div.header-content.f.fh
        div.left.f.fm
          div.wrap-logo.f.fh
            v-icon(@click="$router.go(-1)" color="#2a2a2a") arrow_back_ios
        // span.header-label Label
        div.right.f.fm

</template>

<style lang="scss">
.wrap-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  background: #f8f8f8;
  border-bottom: solid 0.6px rgba(0, 0, 0, 0.2);
  .header-content {
    position: relative;
    width: 92%;
    max-width: 420px;
    height: 100%;
    margin: 0 auto;
    .header-label {
      color: #2a2a2a;
      text-align: center;
    }
    .left {
      position: absolute;
      left: 0;
      height: 100%;
    }
    .right {
      position: absolute;
      right: 0;
      height: 100%;
    }
  }
}
</style>

<script>
import Auth from '@/components/auth'

export default {
  components: {
    Auth
  }
}
</script>
