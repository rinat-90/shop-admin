export const orderService = {
  getOrders,
}


async function getOrders(page = 1, term = '') {
  try {
    const { access_token } = JSON.parse(localStorage.getItem('user'))
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },

    };
    const response = await fetch(`${process.env.VUE_APP_API_URL}/orders?page=${page}&q=${term}`, requestOptions)
    return  await response.json()


  } catch (e) {
    console.log(e)
  }

}

