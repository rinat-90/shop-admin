<template>
  <div class="flex flex-col shadow-lg p-5">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Card"
}
</script>

<style lang="scss" scoped>
.card{
  display: flex;
  flex-direction: column;
  padding: 15px;
  border: 2px solid #ccc;
}
</style>
