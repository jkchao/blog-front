<template>
<div>
    <p class="title more tools" :class="{'title-mobile': mobileLayout}">
      <span class="title-name name">Books</span>
      <span class="line"></span>
    </p>

    <div class="book">
      <a href="https://item.m.jd.com/product/12755624.html" target="_blank">
        <img src="https://static.jkchao.cn/2019-11-22/WechatIMG719.png?imageMogr2/auto-orient/thumbnail/630x/blur/1x0/quality/75|imageslim" alt="">
        <p>深入理解 TypeScript</p>
      </a>
    </div>
</div>

</template>

<script>
export default {
  name: 'book',
  props: ['mobileLayout']
}
</script>

<style lang="scss">

.mobile {
  .appreciate {
    flex-wrap: wrap;

    > .appreciate-item:first-child {
      margin-bottom: 1rem;
    }
  }
}

.book {
    padding: 2rem 2rem 1rem 2rem;
    text-align: center;

    img {
      width: 260px;
    }

    p {
      margin-top: 1.2rem;
      text-decoration: underline;
    }
}
</style>