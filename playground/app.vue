<template>
  <div>basic: {{ url }}</div>
</template>

<script setup>
const { url } = useImageService();
</script>
