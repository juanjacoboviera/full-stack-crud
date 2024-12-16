
export const createTask = async (formData, token) =>{
    const url = "http://localhost:8080/api/createTask"
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": 'Bearer ' + token,
                "Content-Type": "application/json",
              },
            body: JSON.stringify(formData)
        });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    } catch (error) {
        console.error(error.message);  
    }
}

export const getTasks = async (userId, token) =>{
    console.log(userId)
    const url = `http://localhost:8080/api/tasks/${userId}`
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + token,
                "Content-Type": "application/json",
              }
        });
    if (!response.ok) {
        const errorDetails = await response.text(); // Get error message from response body
        throw new Error(`Response status: ${response.status}, Message: ${errorDetails}`);
    }
    const json = await response.json();
    return json;
    } catch (error) {
        console.error("there was an error:" , error.message);  
    }
}