<template>
  <router-view />
</template>

<script>
import store from '@/store';
export default {
  data(){
    return{
     screenWidth: document.body.clientWidth 
    }
  },
  mounted () {
      const that = this
      window.onresize = () => {
          return (() => {
              window.screenWidth = document.body.clientWidth
              that.screenWidth = window.screenWidth
          })()
      }
  },
  watch:{
    screenWidth(val){
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if(!this.timer){
            // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
            this.screenWidth = val
            store.commit('setScreenWidth',val);
            this.timer = true
            let that = this
            setTimeout(function(){
          if(that.screenWidth<1000)
                store.commit('autoMenu',true);
          else
             store.commit('autoMenu',false);
           that.timer = false
            },400)
        }
    }
  }


}


</script>

