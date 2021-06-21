
export const authService = {
  login,
  logout,
}

async function login({ username, password }) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    };
    const response = await fetch(`${process.env.VUE_APP_API_URL}/login`, requestOptions)
    const data = await response.json()

    if (data.access_token) {
      localStorage.setItem('user', JSON.stringify(data));
    }
    return  data

  } catch (e) {
    return e.message
  }

}

function logout() {
  localStorage.removeItem('user');
}

