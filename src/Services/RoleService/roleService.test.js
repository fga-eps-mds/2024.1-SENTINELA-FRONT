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

  afterEach(() => {
    localStorage.removeItem("@App:token");
  });
});
