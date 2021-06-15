<template>
  <div class="card">
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
