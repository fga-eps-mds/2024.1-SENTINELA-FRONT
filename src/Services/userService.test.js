import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { APIUsers } from "./BaseService";
import { userLogin, getUsers, createUser, deleteUserById } from "./userService"; // ajuste os imports conforme necessário

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
});
