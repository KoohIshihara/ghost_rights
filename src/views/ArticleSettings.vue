<template lang="pug">
  div.wrap-article-settings
    h2.mb20 Article Settings
    div.wrap-upload-ogp.mb12
      div.overlay.f.fh
        span Upload Image
      img(src="https://liard.io/img/default.png")
    input(placeholder="Title").input-title.mb12
    input(placeholder="Sub Title").input-sub-title.mb20
    h3.mb8 Writer:
    div.wrap-who.f.fm.flex-wrap.mb30
      div.wrap-img.f.fh.mr20
        img(src="https://liard.io/img/fakeman.png")
      input(placeholder="Writer's Name")
    div.wrap-button.f.fc
      span.button Publish

</template>

<style lang="scss">
.wrap-article-settings {
  width: 90%;
  max-width: 680px;
  margin: 0 auto;
  padding: 32px 0px;
  .input-title {
    width: 100%;
    font-size: 18px;
    border-bottom: solid #2a2a2a 1px;
  }
  .input-sub-title {
    width: 100%;
    font-size: 18px;
    border-bottom: solid #2a2a2a 1px;
  }
  .wrap-upload-ogp {
    position: relative;
    .overlay {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      span {
        color: #fff;
        font-weight: bold;
      }
    }
  }
  .wrap-who {
    .wrap-img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
}
</style>

<script>

export default {
  components: {

  }
}
</script>
