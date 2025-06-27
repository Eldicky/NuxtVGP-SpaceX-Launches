<template>
  <h1>hi</h1>
  <p>{{ favorites }}</p>
</template>
<script setup lang="ts">
const favorites = useFavorites()

console.log(favorites)
</script>