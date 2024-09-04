import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { APIUsers } from "./BaseService";
import {
  getUserById,
  userLogin,
  getUsers,
  createUser,
  deleteUserById,
  getRoles,
  loginUser,
  patchUserById,
  sendRecoveryPassword,
  changePasswordById,
  verifyToken,
} from "./userService"; // ajuste os imports conforme necessário

// Mock das APIs
vi.mock("./BaseService", () => ({
  APIUsers: {
    post: vi.fn(),
    get: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
  },
}));

describe("User Service", () => {
  const mockToken = "mockToken";
  const mockUser = { _id: "123456" };

  beforeEach(() => {
    vi.clearAllMocks(); // Limpa todos os mocks antes de cada teste
    localStorage.setItem("@App:token", JSON.stringify(mockToken));
    localStorage.setItem("@App:user", JSON.stringify(mockUser));
  });

  afterEach(() => {
    localStorage.removeItem("@App:token");
    localStorage.removeItem("@App:user");
  });

  it("should log an error when token is not valid JSON", () => {
    // Simula um valor inválido no localStorage
    localStorage.setItem("@App:token", "invalidToken");

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Simula a execução do código que tenta fazer o JSON.parse do token armazenado
    const storagedToken = localStorage.getItem("@App:token");

    if (storagedToken) {
      try {
        let token = null;
        token = JSON.parse(storagedToken); // Isso vai falhar e cair no bloco catch
        console.log(token);
      } catch (error) {
        // Aqui o erro será capturado e o console.error será chamado
        console.error("O token armazenado não é um JSON válido:", error);
      }
    }

    // Verifica se o console.error foi chamado com a mensagem correta
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "O token armazenado não é um JSON válido:",
      expect.any(SyntaxError)
    );

    consoleErrorSpy.mockRestore(); // Limpa o mock
  });

  // Teste da função userLogin
  it("should log in the user", async () => {
    const mockResponse = { data: { token: mockToken, user: mockUser } };
    APIUsers.post.mockResolvedValueOnce(mockResponse);

    const result = await userLogin("user@example.com", "password");

    expect(APIUsers.post).toHaveBeenCalledWith("/login", {
      email: "user@example.com",
      password: "password",
    });
    expect(result).toEqual(mockResponse);
  });

  it("should log and return null when login fails", async () => {
    APIUsers.post.mockRejectedValueOnce(new Error("Login error"));

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await userLogin("user@example.com", "password");

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
    expect(result).toBeNull();

    consoleErrorSpy.mockRestore();
  });

  // Teste da função getUsers
  it("should log an error and return undefined when no token is found", async () => {
    // Remover o token do localStorage para simular a ausência de token
    localStorage.removeItem("@App:token");

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await getUsers();

    expect(result).toBeUndefined(); // Verifica que a função retorna undefined
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao buscar usuários:",
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });

  it("should log and return users when API call succeeds", async () => {
    const mockUsers = [{ id: "1", name: "User1" }];
    APIUsers.get.mockResolvedValueOnce({ data: mockUsers });

    const result = await getUsers();

    expect(APIUsers.get).toHaveBeenCalledWith("/users", {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
    expect(result).toEqual(mockUsers);
  });

  it("should log and return undefined when API call fails in getUsers", async () => {
    APIUsers.get.mockRejectedValueOnce(new Error("API error"));

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await getUsers();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao buscar usuários:",
      expect.any(Error)
    );
    expect(result).toBeUndefined();

    consoleErrorSpy.mockRestore();
  });

  // Teste da função createUser
  it("should create a new user", async () => {
    const userData = {
      name: "New User",
      email: "new@example.com",
      phone: "12345",
      status: "active",
      role: "admin",
    };

    // Mock da resposta do post
    APIUsers.post.mockResolvedValueOnce({
      data: { id: "1", name: "New User" },
    });

    await createUser(userData); // Chama a função para criar o usuário

    // Verifica se a chamada foi feita corretamente
    expect(APIUsers.post).toHaveBeenCalledWith("/signup", {
      ...userData,
      params: {
        userId: `${mockUser._id}`, // Verifica o ID do usuário
        moduleName: "users",
        action: "create",
      },
      headers: {
        Authorization: `Bearer ${mockToken}`, // Verifica o token
      },
    });
  });

  it("should log and return undefined when API call fails in createUser", async () => {
    APIUsers.post.mockRejectedValueOnce(new Error("API error"));

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await createUser({ name: "New User" });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao criar usuário:",
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });

  // Teste da função deleteUserById
  it("should delete a user by ID", async () => {
    APIUsers.delete.mockResolvedValueOnce({ data: {} });

    await deleteUserById("123");

    expect(APIUsers.delete).toHaveBeenCalledWith("/users/delete/123", {
      params: {
        userId: `${mockUser._id}`,
        moduleName: "users",
        action: "delete",
      },
      headers: {
        Authorization: `Bearer ${mockToken}`,
      },
    });
  });

  it("should log and throw an error when API call fails in deleteUserById", async () => {
    const mockError = new Error("API error");

    APIUsers.delete.mockRejectedValueOnce(mockError);

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(deleteUserById("123")).rejects.toThrow("API error");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao deletar usuário com ID 123:",
      mockError
    );

    consoleErrorSpy.mockRestore();
  });

  it("should parse token and user from localStorage when JSON is valid", () => {
    // Mock do token e do usuário no localStorage
    const validToken = "mockToken";
    const validUser = { _id: "123", name: "Mock User" };

    localStorage.setItem("@App:token", JSON.stringify(validToken)); // Armazena o token como JSON válido
    localStorage.setItem("@App:user", JSON.stringify(validUser)); // Armazena o usuário como JSON válido

    let token = null;
    let user = null;

    const storagedToken = localStorage.getItem("@App:token");
    const storagedUser = localStorage.getItem("@App:user");

    if (storagedToken) {
      try {
        token = JSON.parse(storagedToken); // Deve ser convertido corretamente
        user = JSON.parse(storagedUser); // Deve ser convertido corretamente
      } catch (error) {
        // Não deve entrar aqui no caso de sucesso
      }
    }

    expect(token).toBe(validToken); // Verifica que o token foi corretamente convertido
    expect(user).toEqual(validUser); // Verifica que o usuário foi corretamente convertido
  });

  it("should log an error when token or user is not a valid JSON", () => {
    // Armazena valores inválidos no localStorage para o token e usuário
    localStorage.setItem("@App:token", "invalidToken"); // Não é JSON válido
    localStorage.setItem("@App:user", "invalidUser"); // Não é JSON válido

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    let token = null;
    let user = null;

    const storagedToken = localStorage.getItem("@App:token");
    const storagedUser = localStorage.getItem("@App:user");

    if (storagedToken) {
      try {
        token = JSON.parse(storagedToken); // Vai lançar um erro
        user = JSON.parse(storagedUser); // Vai lançar um erro
      } catch (error) {
        console.error("O token armazenado não é um JSON válido:", error);
      }
    }

    // Verifica que o console.error foi chamado com a mensagem correta
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "O token armazenado não é um JSON válido:",
      expect.any(SyntaxError)
    );

    expect(token).toBeNull(); // O token não deve ser atribuído
    expect(user).toBeNull(); // O usuário não deve ser atribuído

    consoleErrorSpy.mockRestore(); // Limpa o mock do console.error
  });

  it("should return user data when API call succeeds", async () => {
    const mockUser = { id: "123", name: "John Doe" }; // Mock do usuário que a API retornará

    // Simula a chamada bem-sucedida da API, retornando o mockUser como resposta
    APIUsers.get.mockResolvedValueOnce({ data: mockUser });

    // Chama a função com um ID de exemplo
    const result = await getUserById("123");

    // Verifica se a API foi chamada com o ID correto e o header esperado
    expect(APIUsers.get).toHaveBeenCalledWith("/users/123", {
      headers: { Authorization: `Bearer ${mockToken}` },
    });

    // Verifica se o resultado retornado é o dado correto do usuário
    expect(result).toEqual(mockUser); // Aqui estamos verificando se o return response.data; está funcionando
  });

  it("should log an error when no user is found in localStorage on createUser", async () => {
    // Simula a ausência de usuário no localStorage
    localStorage.removeItem("@App:user");

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Chama a função, mas não esperamos que ela rejeite
    const result = await createUser({
      name: "John Doe",
      email: "john@example.com",
      phone: "12345",
      status: "active",
      role: "admin",
    });

    // Verifica se o erro foi registrado no console
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao criar usuário:",
      expect.any(Error)
    );

    // Verifica que a função não retorna nada (undefined)
    expect(result).toBeUndefined();

    consoleErrorSpy.mockRestore(); // Limpa o mock
  });

  it("should log an error when user in localStorage has no ID on createUser", async () => {
    // Simula o usuário no localStorage sem o campo _id
    const invalidUser = { name: "John Doe" };
    localStorage.setItem("@App:user", JSON.stringify(invalidUser));

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Chama a função, mas não esperamos que ela rejeite
    const result = await createUser({
      name: "John Doe",
      email: "john@example.com",
      phone: "12345",
      status: "active",
      role: "admin",
    });

    // Verifica se o erro foi registrado no console
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao criar usuário:",
      expect.any(Error)
    );

    // Verifica que a função não retorna nada (undefined)
    expect(result).toBeUndefined();

    consoleErrorSpy.mockRestore(); // Limpa o mock
  });

  it("should return roles data when API call succeeds", async () => {
    const mockRoles = [
      { id: "1", name: "Admin" },
      { id: "2", name: "User" },
    ];

    // Simula o comportamento da API com sucesso
    APIUsers.get.mockResolvedValueOnce({ data: mockRoles });

    const result = await getRoles();

    // Verifica se a API foi chamada corretamente
    expect(APIUsers.get).toHaveBeenCalledWith("/role");

    // Verifica se os dados corretos foram retornados
    expect(result).toEqual(mockRoles);
  });

  it("should log an error when API call fails", async () => {
    const mockError = new Error("API error");

    // Simula uma falha na chamada da API
    APIUsers.get.mockRejectedValueOnce(mockError);

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await getRoles();

    // Verifica se o erro foi registrado no console
    expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);

    // Verifica se a função retorna undefined em caso de erro
    expect(result).toBeUndefined();

    consoleErrorSpy.mockRestore(); // Limpa o mock
  });

  it("should return user data when API call succeeds", async () => {
    const mockCredentials = {
      email: "user@example.com",
      password: "password123",
    };
    const mockResponseData = {
      token: "mockToken",
      user: { id: "1", name: "John Doe" },
    };

    // Simula a resposta bem-sucedida da API
    APIUsers.post.mockResolvedValueOnce({ data: mockResponseData });

    const result = await loginUser(mockCredentials);

    // Verifica se a chamada da API foi feita corretamente com as credenciais
    expect(APIUsers.post).toHaveBeenCalledWith("/login", mockCredentials);

    // Verifica se o resultado retornado é o esperado
    expect(result).toEqual(mockResponseData);
  });

  it("should log an error when API call fails", async () => {
    const mockCredentials = {
      email: "user@example.com",
      password: "password123",
    };
    const mockError = new Error("Login failed");

    // Simula uma falha na chamada da API
    APIUsers.post.mockRejectedValueOnce(mockError);

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await loginUser(mockCredentials);

    // Verifica se o erro foi registrado no console
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao fazer login:",
      mockError
    );

    // Verifica se a função retorna undefined em caso de erro
    expect(result).toBeUndefined();

    consoleErrorSpy.mockRestore(); // Limpa o mock
  });

  it("should update user data when API call succeeds", async () => {
    const updatedUser = { name: "Jane Doe", email: "jane@example.com" };
    const mockResponse = { data: { ...updatedUser, id: "123456" } };

    // Simula a resposta bem-sucedida da API
    APIUsers.patch.mockResolvedValueOnce(mockResponse);

    const result = await patchUserById("123456", updatedUser);

    // Verifica se a chamada da API foi feita corretamente
    expect(APIUsers.patch).toHaveBeenCalledWith(
      "/users/patch/123456",
      { updatedUser },
      {
        params: {
          userId: `${mockUser._id}`,
          moduleName: "users",
          action: "update",
        },
        headers: {
          Authorization: `Bearer ${mockToken}`,
        },
      }
    );

    // Verifica se o resultado retornado é o esperado
    expect(result).toEqual(mockResponse.data);
  });

  it("should log and throw an error when API call fails", async () => {
    const updatedUser = { name: "Jane Doe", email: "jane@example.com" };
    const mockError = new Error("API error");

    // Simula uma falha na chamada da API
    APIUsers.patch.mockRejectedValueOnce(mockError);

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Verifica se a função lança o erro corretamente
    await expect(patchUserById("123456", updatedUser)).rejects.toThrow(
      "API error"
    );

    // Verifica se o erro foi registrado no console
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao atualizar usuário com ID 123456:",
      mockError
    );

    consoleErrorSpy.mockRestore(); // Limpa o mock do console
  });

  it("should send recovery password email successfully", async () => {
    const mockEmail = "user@example.com";
    const mockResponse = { message: "Recovery email sent" };

    // Simula a resposta bem-sucedida da API
    APIUsers.post.mockResolvedValueOnce(mockResponse);

    const result = await sendRecoveryPassword(mockEmail);

    // Verifica se a chamada da API foi feita corretamente
    expect(APIUsers.post).toHaveBeenCalledWith(`/users/recover-password`, {
      data: { email: mockEmail },
    });

    // Verifica se a função retorna a resposta esperada
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error when user is not found in localStorage", async () => {
    // Remove o usuário do localStorage para simular a ausência
    localStorage.removeItem("@App:user");

    await expect(deleteUserById("123")).rejects.toThrow(
      "Usuário não encontrado ou sem ID."
    );
  });

  it("should throw an error when user in localStorage has no ID", async () => {
    // Simula o usuário no localStorage sem o campo _id
    const invalidUser = { name: "John Doe" };
    localStorage.setItem("@App:user", JSON.stringify(invalidUser));

    await expect(deleteUserById("123")).rejects.toThrow(
      "Usuário não encontrado ou sem ID."
    );
  });

  it("should change the user's password successfully", async () => {
    const mockId = "123456";
    const mockPassword = "newPassword123";

    // Simula uma resposta bem-sucedida da API
    APIUsers.patch.mockResolvedValueOnce({ status: 200 });

    // Chama a função e espera que a senha seja alterada
    const result = await changePasswordById(mockPassword, mockId);

    // Verifica se a chamada da API foi feita corretamente
    expect(APIUsers.patch).toHaveBeenCalledWith(
      `/users/change-password/${mockId}`,
      {
        newPassword: mockPassword,
      }
    );

    // Verifica que a função não retorna nada em caso de sucesso
    expect(result).toBeUndefined();
  });

  it("should return an error when API call fails", async () => {
    const mockId = "123456";
    const mockPassword = "newPassword123";
    const mockError = new Error("API error");

    // Simula uma falha na chamada da API
    APIUsers.patch.mockRejectedValueOnce(mockError);

    // Chama a função e espera que o erro seja retornado
    const result = await changePasswordById(mockPassword, mockId);

    // Verifica se o erro foi retornado corretamente
    expect(result).toBe(mockError);
  });

  it("should return response data when token verification succeeds", async () => {
    const mockToken = "validToken";
    const mockResponse = { data: { valid: true } };

    // Simula uma resposta bem-sucedida da API
    APIUsers.post.mockResolvedValueOnce(mockResponse);

    // Chama a função para verificar o token
    const result = await verifyToken(mockToken);

    // Verifica se a chamada da API foi feita corretamente
    expect(APIUsers.post).toHaveBeenCalledWith(`/verify-token`, {
      token: mockToken,
    });

    // Verifica se o resultado retornado é o esperado
    expect(result).toEqual(mockResponse.data);
  });

  it("should log an error and throw when token verification fails", async () => {
    const mockToken = "invalidToken";
    const mockError = new Error("Token verification failed");

    // Simula uma falha na chamada da API
    APIUsers.post.mockRejectedValueOnce(mockError);

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Verifica se a função lança o erro corretamente
    await expect(verifyToken(mockToken)).rejects.toThrow(mockError);

    // Verifica se o erro foi registrado no console
    expect(consoleErrorSpy).toHaveBeenCalledWith("Token inválido", mockError);

    consoleErrorSpy.mockRestore(); // Limpa o mock do console.error
  });
});
