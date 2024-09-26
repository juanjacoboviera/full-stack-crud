export default async function createEmployee(employeeData) {
  const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
  const myUrl = 'http://localhost:8080/employee/employee'
    try {
      const response = await fetch(myUrl, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(employeeData),
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      
      console.log('Employee created:', result);
  
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  }
  
  // Example employee data to be sent in the POST request

  // Call the function to send a POST request

  