<template>
  <table class="table">
    <thead>
    <tr>
      <th v-for="head in headers" :key="head">{{ head }}</th>
    </tr>
    </thead>
    <tbody  v-if="data.length">
    <slot :data="data" :statusStyles="statusStyles"></slot>
    </tbody>
    <tbody v-else>
    Nothing has been found!
    </tbody>
  </table>

</template>

<script>
export default {
  name: "Table",
  props: {
    headers: Array,
    data: {
      type: Array,
      required: true
    },
  },
  methods: {
    statusStyles(status){
      switch (status){
        case 'delivered':
          return { color: 'green' }
        case 'processing':
          return { color: 'red' }
        default:
          return { color: 'grey'}

      }
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  th {
    text-align: left;
  }

  td {
    height: 40px;
    vertical-align: bottom;
  }

  tbody{
    tr:hover{
      background-color: #eee;
    }
  }
}
</style>
