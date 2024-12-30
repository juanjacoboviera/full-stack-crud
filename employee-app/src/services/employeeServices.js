export async function registerUser(employeeData, token) {
  const myUrl = 'http://localhost:8080/api/registerUser'
    try {
      const response = await fetch(myUrl, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(employeeData),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      
      console.log('Employee created:', result);
  
    } catch (error) {
      console.error('Error creating employee:', error);
    }
}

export default async function createEmployee(employeeData, token) {
  const myUrl = 'http://localhost:8080/api/createEmployee'
    try {
      const response = await fetch(myUrl, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(employeeData),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      
      console.log('Employee created:', result);
  
    } catch (error) {
      console.error('Error creating employee:', error);
    }
}

export async function getEmployees(token, limit, offset) {

  const myUrl = `http://localhost:8080/api/employees?&limit=${encodeURIComponent(limit)}&offset=${encodeURIComponent(offset)}`
    try {
      const response = await fetch(myUrl, {
        method: 'GET', 
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      
      // console.log('Employee List:', result);

      return result
  
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
}

export async function getEmployee(id, token) {
  const myUrl = `http://localhost:8080/api/employee/${id}`
    try {
      const response = await fetch(myUrl, {
        method: 'GET', 
        headers: {
          'Accept': 'application/json', 
          'Authorization': 'Bearer ' + token
        },
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

export async function updateEmployee(id, employeeData, token) {
  const myUrl = `http://localhost:8080/api/employee/${id}`
    try {
      const response = await fetch(myUrl, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(employeeData),
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


export async function deleteEmployee(id, token) {
  const myUrl = `http://localhost:8080/api/employee/${id}`
    try {
      const response = await fetch(myUrl, {
        method: 'DELETE', 
        headers: {
          'Accept': 'application/json', 
          'Authorization': 'Bearer ' + token
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      let result
      if (response.status !== 204) { // Check if there's a body
        result = await response.json();
      }
      
      // console.log('Employee List:', result);

      return result
  
    } catch (error) {
      console.error('Error deleting employees:', error);
    }
}
  

  