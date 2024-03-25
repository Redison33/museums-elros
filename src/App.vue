<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { createRouter } from 'vue-router';

export default {
  name: 'app',
};
</script>

<style>
body {
  margin: 0;
  font-family: sans-serif;
}
</style>
