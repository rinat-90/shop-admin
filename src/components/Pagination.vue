<template>
  <div class="paginate">
    <button
        class="btn prev"
        v-if="page > 1"
        @click="prevHandler">&#60;</button>
    Page {{ page }} of {{ totalPage }}
    <button
        v-if="page !== totalPage"
        class="btn next"
        @click="nextHandler">
      &#62;
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    page: Number,
    totalPage: Number,
    nextHandler: Function,
    prevHandler: Function,
  }
}
</script>

<style lang="scss" scoped>

.paginate{
  display: flex;
}

.btn {
  padding: 5px 7px;
  text-align: center;
  outline: none;
  border: none;
  background: none;

  &:first-child{
    margin-right: 5px;
  }
  &:last-child{
    margin-left: 5px;
  }
}

</style>
