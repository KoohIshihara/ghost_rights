<template lang="pug">
  div.wrap-item-writer-info.f.fm.py20
    div.wrap-icon.f.fh.mr12
      img(src="https://liard.io/img/fakeman.png")
    div.wrap-profile
      span.name Fake Writer
      span.profile No Profile

</template>

<style lang="scss">
.wrap-item-writer-info {
  .wrap-icon {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    img {
      object-fit: cover;
    }
  }
  .wrap-profile {
    span {
      display: block;
    }
    .name {
      font-size: 16px;
    }
    .profile {
      font-size: 14px;
      color: #999;
    }
  }
}
</style>

<script>

export default {
  created () {

  }
}
</script>
