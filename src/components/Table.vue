<template>
  <div class="mt-4 mx-4">
    <div class="w-full overflow-hidden rounded-lg shadow-xs">
      <div class="w-full overflow-x-auto">
        <table class="w-full">
          <thead>
          <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
            <th v-for="head in headers" :key="head" class="px-4 py-3">{{ head }}</th>
          </tr>
          </thead>
          <tbody v-if="loading" class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              <div class="px-3">Loading...</div>
          </tbody>

          <tbody v-else-if="!loading && total !== 0" class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            <slot :data="data" :statusStyles="statusStyles" />
          </tbody>
          <tbody v-else class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            <div class="px-3">Nothing found</div>
          </tbody>
        </table>
      </div>
      <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
        <span class="flex items-center col-span-3"> Showing 21-30 of 100 </span>
        <span class="col-span-2"></span>
        <!-- Pagination -->
        <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                <nav aria-label="Table navigation">
                  <ul class="inline-flex items-center">
                    <li>
                      <button class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple" aria-label="Previous">
                        <svg aria-hidden="true" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">1</button>
                    </li>
                    <li>
                      <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">2</button>
                    </li>
                    <li>
                      <button class="px-3 py-1 text-white dark:text-gray-800 transition-colors duration-150 bg-blue-600 dark:bg-gray-100 border border-r-0 border-blue-600 dark:border-gray-100 rounded-md focus:outline-none focus:shadow-outline-purple">3</button>
                    </li>
                    <li>
                      <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">4</button>
                    </li>
                    <li>
                      <span class="px-3 py-1">...</span>
                    </li>
                    <li>
                      <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">8</button>
                    </li>
                    <li>
                      <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">9</button>
                    </li>
                    <li>
                      <button class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple" aria-label="Next">
                        <svg class="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                          <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path>
                        </svg>
                      </button>
                    </li>
                  </ul>
                </nav>
              </span>
      </div>
    </div>
  </div>

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
    total: Number,
    loading: Boolean,
  },
  methods: {
    statusStyles(status){
      switch (status){
        case 'delivered':
          return 'green'
        case 'processing':
          return 'red'
        default:
          return'gray'

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
