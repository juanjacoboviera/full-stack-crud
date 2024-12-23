
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

export const getTasks = async (userId, token, taskType) =>{
    console.log(userId)
    const url = `http://localhost:8080/api/tasks/${userId}?taskType=${encodeURIComponent(taskType)}`
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + token,
                "Content-Type": "application/json",
              },
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

export async function updateTask(id, taskData, token) {
    const myUrl = `http://localhost:8080/api/task/${id}`
      try {
        const response = await fetch(myUrl, {
          method: 'PATCH', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify(taskData),
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
    
        const result = await response.json();
        
        console.log('Employee List:', result);
  
        return result
    
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
  }