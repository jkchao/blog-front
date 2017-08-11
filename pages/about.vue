<template>
  <div class="about">
    <div class="info-box">
      <div class="info font-futura">
        <div class="list">
          <i class="iconfont icon-user"></i>
          <span class="list-content">Guo Wenchao, a 90s boy, Web Engineer.</span>
        </div>
        <div class="list">
          <i class="iconfont icon-like"></i>
          <span class="list-content">Code, read, and music.</span>
        </div>
        <div class="list">
          <i class="iconfont icon-music"></i>
          <span class="list-content">Folk and Soft Music.</span>
        </div>
        <div class="list">
          <i class="iconfont icon-coffee"></i>
          <span class="list-content">Hello world!</span>
        </div>
        <div class="list">
          <i class="iconfont icon-comments"></i>
          <span class="list-content icons">
            <a href="https://github.com/jkchao" target="_blank"><i class="iconfont icon-github"></i></a>
            <a href="https://juejin.im/user/5858c896128fe1006b86cb51" target="_blank"><i class="iconfont icon-juejin"></i></a>
            <a href="" target="_blank"><i class="iconfont icon-weibo"></i></a>
            <a href="" target="_blank"><i class="iconfont icon-twitter"></i></a>
            <a href="https://segmentfault.com/u/sanmao_58e1f28560e06" target="_blank"><i class="iconfont icon-sf"></i></a>
            <a href="" target="_blank"><i class="iconfont icon-stackoverflow"></i></a>
            <a href="" target="_blank"><i class="iconfont icon-zhihu"></i></a>
          </span>
        </div>
      </div>

      <div class="user-box">
        <div class="user">
          <img src="~static/images/userFace.png" alt="" width="100%">
        </div>
      </div>
    </div>
    <div class="text-box font-futura">
      <div class="text">
        <p calss="title">HI, DEAR FRIEND. </p>
        <p>
          I firmly believe in life long learning, and sooner or later we will get something that we want.
          At my age, I have so many new ideas, and I will exploring new technologies, going ahead!
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  name: 'about',

  transition: 'fade',

  head: {
    title: 'About'
  }
}

</script>

<style scoped lang="scss">

@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';

.about {
  margin: 0 auto;
  width: $container-min-width;

  >.info-box {
    display: grid;
    grid-template-columns: auto 14rem;
    grid-gap: 1rem;

    >.info {
      padding: $normal-pad $lg-pad;
      background: $module-bg;

      >.list {
        display: grid;
        grid-template-columns: 1rem auto;
        grid-gap: 1.5rem;
        margin: .5rem;
        padding: 0 1rem;
        height: 36px;
        line-height: 36px;

        i {
          color: $dividers;
        }


        span.icons {
          display: flex;

          a {
            margin-right: 1rem;
          }

          i {
            color: $black-light;
            @include transition(all .5s);

            &:hover {
              font-size: 1.3rem;
              color: $black;
            }
          }
        }
      }
    }

    >.user-box {
      background: $module-bg;

      .user {
        margin: 1rem;
        overflow: hidden;

        img {
          @include border-radius(4px);
        }
      }
    }
  }
}

.text-box {
  margin-top: 1rem;

  >.text {
    padding: 1rem 2rem;
    background: $module-bg;
    color: $black;
    line-height: 2rem;
  }
}

</style>
