<template>
  <div class="flex mx-4 my-10 gap-5 overflow-x-auto py-10 sm:justify-center md:justify-start" style="height: 400px">
    <div v-for="(sale, i) in sales" :key="i" class="relative h-full flex-col">
      <div class="h-60 w-20 xs:w-5 sm:w-7 flex flex-col justify-end rounded bg-blue-200">
        <div :style="`height: ${calcPercents(sale.total)}%`" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-end bg-blue-600 relative">
          <span class="absolute -top-10 w-full text-blue-600">{{ $filters.nFormatter(sale.total) }}</span>
          <span class="absolute -bottom-10 w-full text-black transform rotate-45">{{ getBarTitle(+i) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chart",
  props: {
    type: String,
    sales: Array
  },
  setup(props){
    const buildTitle = (arr, index) => {
      return index === 1
          ? arr[0]
          : index === 2
              ? arr[1]
              : arr[2] + ' ' + index
    }

    const getBarTitle = index => {
      const days = ['today', 'yesterday', 'day']
      const month = ['this month', 'last month', 'month']
      const arr = props.type === 'week' ? days : month
      return buildTitle(arr, index)
    }

    const calcPercents = (total) => {
      const max = Math.max(...Object.values(props.sales).map((sale) => sale.total))
      const percent = (total * 100 / max )
      return  percent > 100 ? 100 : percent
    }

    return {
      getBarTitle,
      calcPercents
    }
  }
}
</script>

<style lang="scss" scoped>
.chart{
  display:table;
  table-layout: fixed;
  font-size: 13px;
  width:60%;
  max-width:900px;
  height:200px;
  margin-bottom: 100px;
  margin-top: 30px;

  background-image:linear-gradient(bottom, rgba(0, 0, 0, 0.1) 2%, transparent 2%);
  background-size: 100% 50px;
  background-position: left top;

  li{
    position:relative;
    display:table-cell;
    vertical-align:bottom;
    height:200px;
  }

  span{
    margin: 0 1rem;
    display: block;
    background: rgba(#ccc, .75);
    position: relative;
    width: 3.5rem;

    &:before{
      position: absolute;
      left:0;
      right:0;
      top:115%;
      display: block;
      text-align:right;
      content:attr(title);

    }

    &:after{
      position: absolute;
      left:0;
      right:0;
      bottom:115%;
      display: block;
      text-align:center;
      content:attr(data-total);

    }

  }

}

</style>
