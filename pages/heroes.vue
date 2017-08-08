<template>
  <div class="heroes">
    <div class="head">
      <div class="box">
        <p>每个人都是英雄。</p>
        <!-- <a href="javascript:;">我要上榜</a> -->
      </div>
    </div>
    <div class="heroes-list">
      <div class="list" v-for="(list, index) in lists" :key="index"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'heroes',

  transition: 'fade',

  head: {
    title: 'Heroes'
  },
  
  data () {
    return {
      lists: [
        { name: '', content: '', github: '', blog: '' },
        { name: '', content: '', github: '', blog: '' },
        { name: '', content: '', github: '', blog: '' },
        { name: '', content: '', github: '', blog: '' },
        { name: '', content: '', github: '', blog: '' },
        { name: '', content: '', github: '', blog: '' },
        { name: '', content: '', github: '', blog: '' },
        { name: '', content: '', github: '', blog: '' },
        { name: '', content: '', github: '', blog: '' },
        { name: '', content: '', github: '', blog: '' },
        { name: '', content: '', github: '', blog: '' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/variable.scss';
@import '../assets/scss/mixin.scss';
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20rem;
  font-size: 1.3rem;
  color: $black;
  background: $module-bg;

  >.box {
    text-align: center;

    >a {
      font-size: 1rem;
      color: $black;
    }
  }
}

.heroes-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;

  margin-top: 1rem;

  >.list {
    background: $module-bg;
    height: 18rem;
  }
}
</style>
