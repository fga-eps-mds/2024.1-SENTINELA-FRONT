import {
    APIUsers
} from "./BaseService"


export async function userLogin (email, password) {
    try {
        const response = await APIUsers.post('login', {
            email,
            password
        });

        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getUsers = async () => {
  try {
    const token = localStorage.getItem('@App:token');
    if (!token) {
      throw new Error('No token found');
    }
    console.log('Token being used:', token); // Log para depuração
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
  
  export const getUserById = async (id) => {
    try {
      const response = await APIUsers.get(`/users/${id}`);
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
  
  export const updateUser = async (id, userData) => {
    try {
      const response = await APIUsers.patch(`/users/patch/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar usuário com ID ${id}:`, error);
    }
  };
  
  export const deleteUser = async (id) => {
    try {
      const response = await APIUsers.delete(`/users/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar usuário com ID ${id}:`, error);
    }
  };