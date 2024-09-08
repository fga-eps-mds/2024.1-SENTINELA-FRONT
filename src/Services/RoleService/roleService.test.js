// roleService.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { APIUsers } from "../BaseService";
import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
} from "./roleService";

// Mock da APIUsers
vi.mock("../BaseService", () => ({
  APIUsers: {
    post: vi.fn(),
    get: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("Role Service", () => {
  const mockToken = "mockToken";
  const roleData = { name: "Admin" };
  const roleId = "123";
  const mockUser = { _id: "123456" };

  beforeEach(() => {
    localStorage.setItem("@App:token", mockToken);
    localStorage.setItem("@App:user", JSON.stringify(mockUser));
  });

  it("should create a role", async () => {
    APIUsers.post.mockResolvedValueOnce({ data: { id: roleId, ...roleData } });

    const result = await createRole(roleData);

    expect(APIUsers.post).toHaveBeenCalledWith("/role/create", roleData, {
      params: {
        userId: "123456", // Use o mockUserId aqui
        moduleName: "users",
        action: "create",
      },
      headers: { Authorization: `Bearer ${mockToken}` },
    });
    expect(result).toEqual({ id: roleId, ...roleData });
  });

  it("should get all roles", async () => {
    const mockRoles = [{ id: roleId, name: "Admin" }];
    APIUsers.get.mockResolvedValueOnce({ data: mockRoles });

    const result = await getAllRoles();

    expect(APIUsers.get).toHaveBeenCalledWith("/role", {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
    expect(result).toEqual(mockRoles);
  });

  it("should get role by id", async () => {
    const mockRole = { id: roleId, name: "Admin" };
    APIUsers.get.mockResolvedValueOnce({ data: mockRole });

    const result = await getRoleById(roleId);

    expect(APIUsers.get).toHaveBeenCalledWith(`/role/${roleId}`, {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
    expect(result).toEqual(mockRole);
  });

  it("should update a role", async () => {
    const updatedRole = { ...roleData, name: "Super Admin" };
    APIUsers.patch.mockResolvedValueOnce({ data: updatedRole });

    const result = await updateRole(roleId, updatedRole);

    expect(APIUsers.patch).toHaveBeenCalledWith(
      `/role/patch/${roleId}`,
      updatedRole,
      {
        params: {
          userId: "123456", // Use o mockUserId aqui
          moduleName: "users",
          action: "update",
        },
        headers: { Authorization: `Bearer ${mockToken}` },
      }
    );
    expect(result).toEqual(updatedRole);
  });

  it("should delete a role", async () => {
    const mockResponse = { success: true };
    APIUsers.delete.mockResolvedValueOnce({ data: mockResponse });

    const result = await deleteRole(roleId);

    expect(APIUsers.delete).toHaveBeenCalledWith(`/role/delete/${roleId}`, {
      params: {
        userId: "123456", // Use o mockUserId aqui
        moduleName: "users",
        action: "delete",
      },
      headers: { Authorization: `Bearer ${mockToken}` },
    });
    expect(result).toEqual(mockResponse);
  });

  it("should log an error when stored user is not a valid JSON", async () => {
    // Simulando um valor inválido no localStorage
    localStorage.setItem("@App:user", "invalidUser");

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(createRole({ name: "Admin" })).rejects.toThrow();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao armazenar usuário: ",
      expect.any(SyntaxError) // Verifica se o erro é um SyntaxError de JSON
    );

    consoleErrorSpy.mockRestore(); // Limpa o mock
  });

  it("should throw an error when user is not found or user has no ID", async () => {
    // Simulando ausência de usuário no localStorage
    localStorage.removeItem("@App:user");

    await expect(createRole({ name: "Admin" })).rejects.toThrow(
      "Usuário não encontrado ou sem ID."
    );
  });

  it("should throw an error when no token is found on createRole", async () => {
    // Removendo o token do localStorage
    localStorage.removeItem("@App:token");

    await expect(createRole({ name: "Admin" })).rejects.toThrow(
      "No token found"
    );
  });

  it("should log and throw an error when API call fails on createRole", async () => {
    const mockError = new Error("API error");

    // Simulando falha na chamada da API
    APIUsers.post.mockRejectedValueOnce(mockError);

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(createRole({ name: "Admin" })).rejects.toThrow("API error");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao criar role:",
      mockError
    );

    consoleErrorSpy.mockRestore(); // Limpa o mock
  });

  it("should throw an error when no token is found on getAllRoles", async () => {
    // Remover o token do localStorage para simular a ausência de token
    localStorage.removeItem("@App:token");

    await expect(getAllRoles()).rejects.toThrow("No token found");
  });

  it("should log and throw an error when API call fails on getAllRoles", async () => {
    const mockError = new Error("API error");

    // Simulando uma falha na chamada da API
    APIUsers.get.mockRejectedValueOnce(mockError);

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(getAllRoles()).rejects.toThrow("API error");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao buscar roles:",
      mockError
    );

    consoleErrorSpy.mockRestore(); // Limpa o mock
  });

  it("should throw an error when no token is found on getRoleById", async () => {
    // Remover o token do localStorage para simular a ausência de token
    localStorage.removeItem("@App:token");

    await expect(getRoleById("123")).rejects.toThrow("No token found");
  });

  it("should log and throw an error when API call fails on getRoleById", async () => {
    const mockError = new Error("API error");

    // Simulando uma falha na chamada da API
    APIUsers.get.mockRejectedValueOnce(mockError);

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(getRoleById("123")).rejects.toThrow("API error");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao buscar role:",
      mockError
    );

    consoleErrorSpy.mockRestore(); // Limpa o mock
  });

  it("should log an error when stored user is not a valid JSON on updateRole", async () => {
    // Simula um valor inválido no localStorage para o usuário
    localStorage.setItem("@App:user", "invalidUser");

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(updateRole("123", { name: "Admin" })).rejects.toThrow();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao armazenar usuário: ",
      expect.any(SyntaxError) // Verifica se o erro é um SyntaxError de JSON
    );

    consoleErrorSpy.mockRestore(); // Limpa o mock
  });

  it("should throw an error when user is not found or user has no ID on updateRole", async () => {
    // Simula a ausência do usuário no localStorage
    localStorage.removeItem("@App:user");

    await expect(updateRole("123", { name: "Admin" })).rejects.toThrow(
      "Usuário não encontrado ou sem ID."
    );
  });

  it("should throw an error when no token is found on updateRole", async () => {
    // Remover o token do localStorage para simular a ausência de token
    localStorage.removeItem("@App:token");

    await expect(updateRole("123", { name: "Admin" })).rejects.toThrow(
      "No token found"
    );
  });

  it("should log and throw an error when API call fails on updateRole", async () => {
    const mockError = new Error("API error");

    // Simula a falha na chamada da API
    APIUsers.patch.mockRejectedValueOnce(mockError);

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(updateRole("123", { name: "Admin" })).rejects.toThrow(
      "API error"
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao atualizar role:",
      mockError
    );

    consoleErrorSpy.mockRestore(); // Limpa o mock
  });

  it("should log an error when stored user is not a valid JSON on deleteRole", async () => {
    // Simula um valor inválido no localStorage para o usuário
    localStorage.setItem("@App:user", "invalidUser");

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(deleteRole("123")).rejects.toThrow();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao armazenar usuário: ",
      expect.any(SyntaxError) // Verifica que o erro é de sintaxe do JSON
    );

    consoleErrorSpy.mockRestore(); // Limpa o mock
  });

  it("should throw an error when user is not found or user has no ID on deleteRole", async () => {
    // Simula a ausência do usuário no localStorage
    localStorage.removeItem("@App:user");

    await expect(deleteRole("123")).rejects.toThrow(
      "Usuário não encontrado ou sem ID."
    );
  });

  it("should throw an error when no token is found on deleteRole", async () => {
    // Remover o token do localStorage para simular a ausência de token
    localStorage.removeItem("@App:token");

    await expect(deleteRole("123")).rejects.toThrow("No token found");
  });

  it("should log and throw an error when API call fails on deleteRole", async () => {
    const mockError = new Error("API error");

    // Simula a falha na chamada da API
    APIUsers.delete.mockRejectedValueOnce(mockError);

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(deleteRole("123")).rejects.toThrow("API error");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao deletar role:",
      mockError
    );

    consoleErrorSpy.mockRestore(); // Limpa o mock
  });

  afterEach(() => {
    localStorage.removeItem("@App:token");
  });
});
