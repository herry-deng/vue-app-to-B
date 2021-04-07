<template>
  <div class="main-header">
        <a-button
          type="primary"
          style="margin-bottom: 16px"
          @click="toggleCollapsed"
        >
          <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button>
        <div class="breadcrumb">
          <a-breadcrumb v-if="currentRoute.length > 1">
            <a-breadcrumb-item>{{currentRoute[0] ? currentRoute[0].meta.title:''}}</a-breadcrumb-item>  
            <!-- 写一个兼容 判断currentRoute是否有0这一项。如果没有0就来个空字符串 -->
            <a-breadcrumb-item
              >
              <router-link :to="{name: currentRoute[1].name}">
                {{currentRoute[1] ? currentRoute[1].meta.title:''}}
                </router-link>
              </a-breadcrumb-item
            >
          </a-breadcrumb>
        </div>
        <ul class="user-info">
          <li class="user-name">
            {{ $store.state.user.username }}
            <a-icon type="down" />
          </li>
          <li class="login-out" @click="logout">退出</li>
        </ul>
      </div>
</template>

<script>
export default {
  data() {
    return {
      currentRoute:this.$router.currentRoute.matched,
    }; // 存储路由的改变值
  },
  watch:{
    $route(){
      // console.log(this.$router);
      this.currentRoute = this.$router.currentRoute.matched;
    }
  },  // 监听路由的变化
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed')
    },
    logout(){
      this.$store.dispatch('logout');
      this.$router.push({
        name: 'Login'
      });
    },
  },
};
</script>

<style lang="less">
.user-info {
position: fixed;
right: 0;
top: 0;
} // 解决浮动带来的点击退出按钮页面会移动
</style>