<script setup lang="ts">
import PhoneTester from './components/PhoneTester.vue'
import Background from './assets/myphone-background.jpg'
</script>

<template>
  <div class="fixed inset-0 -z-10 blur-md">
    <img :src="Background" alt="Background" class="w-full h-full object-cover absolute inset-0" />
    <div class="absolute inset-0 bg-black/70"></div>
  </div>

  <PhoneTester />
</template>
