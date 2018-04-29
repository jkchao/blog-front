<template>
  <section  class="welcome">
    <div class="haiyan">
      <h3>你好，我叫<nuxt-link to="/about">三毛</nuxt-link></h3>
      <h4 class="mune">
        <nuxt-link to="/code">码农</nuxt-link>
        <span >/</span>
        <nuxt-link to="/think">读书</nuxt-link>
        <span >/</span>
        <nuxt-link to="/fuck">民谣</nuxt-link>
      </h4>
    </div>
  </section>
</template>
<script>

export default {

  scrollToTop: true,

  transition: 'fade'
}
</script>


<style lang="scss" scoped>
.welcome {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  
  background: url('https://static.jkchao.cn/main_bg.jpg') no-repeat 20% 20%;
  background-size: cover;

  .haiyan {
    position: absolute;
    left: 80px;
    top: 80px;
    color: $body-bg;

    .mune {
      span {
        padding: .35rem;
      }
    }
  }
}


</style>
