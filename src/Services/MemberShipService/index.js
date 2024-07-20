import {
    APIUsers
} from "../BaseService"


export async function createMemberShip (formData) {
    try {
        const response = await APIUsers.post('membership/create', {
         
          formData
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        console.log('Form successfully submitted:', data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
}