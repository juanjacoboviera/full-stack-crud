export const login = async (loginData) =>{
    const url = "http://localhost:8080/api/login"
    try {
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify(loginData),
          })
          return response
    } catch (error) {
        console.log('There was an error.', error)
    }
}