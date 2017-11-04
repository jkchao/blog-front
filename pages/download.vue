<template>
  <div class="download">
    <div class="title">
      Download <a href="https://admin.jkchao.cn" target="_blank">blog</a> client.
    </div>
    <div class="download-img">
      <img src="https://static.jkchao.cn/electron.png" alt="blog" width="600">
    </div>
    <div class="item">
      <div class="list mac">
        <div class="logo"></div>
        <a href="https://github.com/jkchao/vue-electron/releases/download/0.0.3-bate/electron-mac-x64.zip" target="_blank" class="download-button">Download</a>
      </div>
      <div class="list linux">
        <div class="logo"></div>
        <a href="https://github.com/jkchao/vue-electron/releases/download/0.0.3-bate/electron-linux-x64.zip" target="_blank" class="download-button">Download</a>
      </div>
      <div class="list windows">
        <div class="logo"></div>
        <a href="https://github.com/jkchao/vue-electron/releases/download/0.0.3-bate/electron-win32-x64.zip" target="_blank" class="download-button">Download</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  scrollToTop: true,

  head: {
    title: 'Download'
  },

  transition: 'fade',

}
</script>

<style scoped lang="scss">
@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';

.download {
  width: 600px;
  margin: 1rem auto;

  >.title {
    font-size: 2rem;
    text-align: center;

    >a {
      text-decoration: underline;
    }
  }

  >.download-img {
    margin-top: 1rem;
    text-align: center;
  }

  >.item {
    display: flex;
    justify-content: space-between;

    >.list {
      width: 200px;
      text-align: center;

      >.logo {
        width: 100px;
        height: 100px;
        background-size: contain !important;
        margin: 0 auto;
      }

      // >.download-button {
      //   display: block;
      //   margin-top: 20px;
      //   text-align: center;
      // }

    .download-button {
      display: block;
      position: relative;
      margin: 20px auto 0 auto;
      padding: .5rem 1rem;
      width: 120px;
      color: $black;
      background: rgba(0,0,0,.12);
      text-align: center;
      @include border-radius($xs-pad);
      @include transition(all .5s ease);
      @include transform(perspective(1px) translateZ(0));

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        @include border-radius($xs-pad);
        @include transform(scaleY(0));
        @include transform-origin(50% 0px 0px);
        transition-property: transform;
        transition-duration: 0.5s;
        transition-timing-function: ease-out;
        background: $black;
      }

      &:hover {
        color: white;
        // background: $black;
      }

      &:hover::after {
        transform: scaleY(1);
        transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
      }
    }

      &.mac>.logo {

        background: url(~static/images/apple-logo.svg) no-repeat center;
      }

      &.linux>.logo {
        background: url(~static/images/linux-logo.png) no-repeat center;
      }

      &.windows>.logo {
        background: url(~static/images/windows-logo.png) no-repeat center;
      }
    }
  }
}
</style>
