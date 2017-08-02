<template>
  <header id='header'>
    <div class="container header">
      <!-- <div class="header-left"> -->
        <div class="logo">
          <nuxt-link to="/">
            三毛
          </nuxt-link>
        </div>
        <nav>
          <nuxt-link
            v-for="(list, index) in nav"
            :key="index"
            :to="list.path"
            exact>
              <i class="icon"></i>
              <span>{{ list.name }}</span>
          </nuxt-link>
        </nav>
      <!-- </div> -->
       <!-- <div class="search-box">
        <div class="search" :class="{'open': open}" @click="open = true">
          <input type="text" v-model="keyword">
          <div class="eks" @click.stop="open = false"></div>
        </div>
      </div>  -->
      <div class="saying">
        <div v-swiper:mySwiper="swiperOption" class="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide item" v-for="list in says" :key="list">
              <p class="saying-content">{{ list.content }}</p>
              <p class="saying-author">{{ list.author }}</p>
            </div>
          </div>
        </div>
      </div>
    </div> 
  </header>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      keyword: '',
      open: false,
      nav: [
        { path: '/', name: 'HOME', icon: '' },
        { path: '/article', name: 'ARTICLE', icon: '' },
        { path: '/think', name: 'THINK', icon: '' },
        { path: '/music', name: 'MUSIC', icon: '' },
        { path: '/project', name: 'PROJECT', icon: '' },
        { path: '/about', name: 'ABOUT', icon: '' }
      ],
      says: [
        { 
          content: '她说民谣太穷，一听就是一根烟、三瓶酒，而我只有一支烟了，还要撑一夜，只剩一点爱了，还要过一生。',
          author: '@她说民谣穷  评论宋冬野《鸽子》'
        },
        { 
          content: '理想就是离乡。',
          author: '@50号公路  评论赵雷《理想》'
        },
        { 
          content: '十年前你说生如夏花般灿烂，十年后你说平凡才是唯一的答案。',
          author: '@张小诅咒  评论朴树《生如夏花》'
        },
        { 
          content: '小楼依旧当年貌，世间已无陈蝶衣。',
          author: '@你是最好的礼物  评论张国荣《当爱已成往事》'
        },
        { 
          content: '“你还记得她吗？” “早忘了，哈哈” “我还没说是谁” ',
          author: '@_z_s  评论 Pianoboy《The truth that you leave》'
        },
        { 
          content: '为何在慌乱中冲进这城市，把一切打乱。',
          author: '@李志  评论李志《杭州》'
        },
        { 
          content: '要喝过多少酒，抽过多少烟，唱过多少歌，经历过多少，才能唱出这样的歌。',
          author: '@Young_Jay  评论赵雷《画》'
        },
        { 
          content: '旋律一响起，就是经典。',
          author: '@苏打杰  评论 Beyound《光辉岁月》'
        }
      ],
      swiperOption: {
        direction: 'vertical',
        loop: true,
        autoplay: 5000,
        setWrapperSize: true,
        autoHeight: true,
        paginationClickable: true,
        autoplayDisableOnInteraction: false,
        observeParents: true,
        grabCursor: true,
        spaceBetween: 30,
        mousewheelControl: true
      }
    }
  }
}
</script>
<style scoped lang="scss">

@import '~assets/scss/variable.scss';
@import '~assets/scss/mixin.scss';

#header {
  position: fixed;
  top: 0;
  width: 100%;
  height: $header-height;
  background: rgba(255, 255, 255, .4);
  @include box-shadow(0, 1px, 2px, rgba(0,0,0,.05));

  .header {
    display: flex;
    justify-content: space-between;
    height: $header-height;
    line-height: $header-height;

    .header-left {
      display: flex;
    }

    .logo{
      width: 10rem;

      a {
        color: $blue;
        font-size: 2rem;
      }
    }
  }
  nav {
    margin-left: 2rem;

    a {
      margin-right: 2rem;
      padding: .5rem;
      color: #555;

      &:hover {
        color: $blue;
      }
    }

    a.link-active {
      color: $blue;
    }
  }

  .saying {
    font-size: $font-size-small;
    line-height: 1rem;
    overflow: hidden;

    .swiper {
      height: 100%;
      color: $dividers;

      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;

        .saying-content {
          text-indent: 2em;
        }

        .saying-author {
          margin-top: .3rem;
          text-align: right;
        }
      }

      &:hover {
        color: $secondary;
      }
    }
  }
  // .search-box {
  //   display: flex;
  //   align-items: center;
  // }
  // .search {
  //   position: relative;
  //   width: 2rem;
  //   height: 2rem;
  //   border: 3px solid $blue;
  //   @include transition (all .3s ease);
  //   @include border-radius(1rem);
  //   cursor: pointer;
  //   &::after {
  //     @include def;
  //     top: 90%;
  //     left: 90%;
  //     width: 10px;
  //     height: 3px;
  //     background-color: $blue;
  //     border-radius: 1px;
  //     @include transition(width .15s ease .55s);
  //     @include transform(rotate(45deg));
  //     @include transform-origin(top left);
  //   }
  //   input {
  //     width: 100%;
  //     height: 100%;
  //     padding: 0 30px 0 15px;
  //     font-size: 14px;
  //     line-height: 38px;
  //     opacity: 0;
  //     background-color: transparent;
  //     color: $text;
  //     @include transition(opacity .15s ease);
  //   }
  //   .eks {
  //     display: block;
  //     position: absolute;
  //     top: 50%;
  //     right: 0;
  //     z-index: 20;
  //     width: 30px;
  //     height: 30px;
  //     cursor: pointer;	
  //     @include transform(translateY(-50%));
  //     &:before, &:after {
  //       @include def;
  //       right: 5px;
  //       height: 2px;
  //       width: 2px;
  //       border-radius: 1px;
  //       @include transition(all .25s ease);
  //     }
  //     &:before {
  //       top: 0px;
  //       background-color: $blue;
  //       @include transform(rotate(-45deg));
  //       @include transform-origin(top right);
  //       @include transition-delay(.1s);
  //     }
  //     &:after {
  //       bottom: 0px;
  //       background-color: $blue;
  //       @include transform(rotate(45deg));
  //       @include transform-origin(bottom right);
  //       @include transition-delay(0s);
  //     }
  //   }
  // }
  // .search.open {
  //   width: 200px;
  //   @include transition-delay(.1s);
  //   &:after {
  //     width: 0px;
  //     @include transition-delay(0s);
  //   }
  //   input {
  //     position: absolute;
  //     opacity: 1;
  //     @include transition-delay(.15s);
  //   }
  //   .eks {
  //     &:before, &:after {
  //       width: 15px;
  //       right: 12px;
  //     }
  //     &:before {
  //       top: 9px;
  //       @include transition-delay(.25s);
  //     }
  //     &:after {
  //       bottom: 9px;
  //       @include transition-delay(.3s);
  //     }
  //   }
  // }
}
</style>
