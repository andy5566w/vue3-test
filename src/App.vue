<script lang="ts" setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="section">
    <div class="container">
      <navbar />
      <router-view />
    </div>
  </div>
</template>

<style>
@import 'https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css';
</style>
