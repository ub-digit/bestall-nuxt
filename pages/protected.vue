<template>
  <div>this is protected content, only visible to authenticated users</div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: true,
});
</script>

<style scoped></style>
