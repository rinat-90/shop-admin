export const dashboardService = {
  getDashboard,
}
async function getDashboard() {
  try {
    const { access_token } = JSON.parse(localStorage.getItem('user'))
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },

    };
    const response = await fetch(`${process.env.VUE_APP_API_URL}/dashboard`, requestOptions)
    return  await response.json()

  } catch (e) {
    console.log(e)
  }

}

