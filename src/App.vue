<template>
  <router-view />
</template>
<script setup>
import { onUnmounted } from "vue";
onUnmounted(() => {
  // window.onbeforeunload = ()=> {
  //       var storage = window.localStorage;
  //       storage.clear()
  //     }
});
</script>
<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: "PingFangSC-Light", "PingFang SC", "STHeitiSC-Light", "Helvetica-Light",
    "Arial", "sans-serif";
}
</style>
