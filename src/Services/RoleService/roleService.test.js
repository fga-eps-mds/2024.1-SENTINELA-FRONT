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

  beforeEach(() => {
    localStorage.setItem("@App:token", mockToken);
  });

  it("should create a role", async () => {
    APIUsers.post.mockResolvedValueOnce({ data: { id: roleId, ...roleData } });

    const result = await createRole(roleData);

    expect(APIUsers.post).toHaveBeenCalledWith("/role/create", roleData, {
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
      headers: { Authorization: `Bearer ${mockToken}` },
    });
    expect(result).toEqual(mockResponse);
  });

  afterEach(() => {
    localStorage.removeItem("@App:token");
  });
});
