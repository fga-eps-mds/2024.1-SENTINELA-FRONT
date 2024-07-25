import {
    APIUsers
} from "./BaseService"


export async function userLogin (email, password) {
    try {
        const response = await APIUsers.post('login', {
            email,
            password
        });

        return response
    } catch (error) {
        return null
    }
}

export const getUsers = async () => {
  try {
    const token = localStorage.getItem('@App:token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await APIUsers.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  }
};
  
export const getUserById = async (id, token) => {
  try {
    const response = await APIUsers.get(`/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar usuário com ID ${id}:`, error);
  }
};
  
  export const createUser = async (userData) => {
    try {
      const response = await APIUsers.post('/signup', {
        name:userData.name,
        email:userData.email,
        phone:userData.phone,
        status: userData.status,
        role:userData.role,

      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  export const getRoles = async () => {
    try{
      const response = await APIUsers.get('/role');
      return response.data    
    }catch (error) { 
      console.error(error)
    }
  }


  export const loginUser = async (credentials) => {
    try {
      const response = await APIUsers.post('/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };
  
  export const patchUserById = async (id, updatedUser) => {
    try {
      const storagedUserString = localStorage.getItem('@App:user');
      const user = JSON.parse(storagedUserString); 
        const response = await APIUsers.patch(`/users/patch/${id}`, {updatedUser}, {
            headers: {
                'Authorization': `Bearer ${user.token}`, 
            },
        });
        
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar usuário com ID ${id}:`, error);
        throw error;
    }
};
  
export const deleteUserById = async (id) => {
  try {
    const storagedUserString = localStorage.getItem('@App:user');
    const user = JSON.parse(storagedUserString); 

    await APIUsers.delete(`/users/delete/${id}`, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
  } catch (error) {
    console.error(`Erro ao deletar usuário com ID ${id}:`, error);
  }
};