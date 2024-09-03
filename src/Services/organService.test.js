// organService.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { APIUsers } from "./BaseService";
import {
  createOrgan,
  listOrgans,
  updateOrgan,
  getOrganById,
  deleteOrganById,
} from "./organService";

// Mock da APIUsers
vi.mock("./BaseService", () => ({
  APIUsers: {
    post: vi.fn(),
    get: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("Organ Service", () => {
  const mockToken = "mockToken";
  const organData = { orgao: "Financeiro", lotacao: "Setor 1" };
  const organId = "789";
  const mockUser = { _id: "123456" };

  beforeEach(() => {
    localStorage.setItem("@App:token", mockToken);
    localStorage.setItem("@App:user", JSON.stringify(mockUser));
  });

  it("should create an organ", async () => {
    APIUsers.post.mockResolvedValueOnce({ status: 201 });

    const result = await createOrgan(organData.orgao, organData.lotacao);

    expect(APIUsers.post).toHaveBeenCalledWith("organ/create", organData, {
      params: {
        userId: "123456",
        moduleName: "users",
        action: "create",
      },
    });
    expect(result).toBe(201);
  });

  it("should list all organs", async () => {
    const mockOrgans = [
      { id: organId, orgao: "Financeiro", lotacao: "Setor 1" },
    ];
    APIUsers.get.mockResolvedValueOnce({ data: mockOrgans });

    const result = await listOrgans();

    expect(APIUsers.get).toHaveBeenCalledWith("organ/list");
    expect(result).toEqual(mockOrgans);
  });

  it("should update an organ", async () => {
    const updatedData = { orgao: "Financeiro", lotacao: "Setor 2" };
    APIUsers.patch.mockResolvedValueOnce({ status: 200 });

    const result = await updateOrgan(organId, updatedData);

    expect(APIUsers.patch).toHaveBeenCalledWith(
      `organ/update/${organId}`,
      { updatedData },
      {
        params: {
          userId: "123456",
          moduleName: "users",
          action: "update",
        },
      }
    );
    expect(result).toBe(200);
  });

  it("should get an organ by id", async () => {
    const mockOrgan = { id: organId, orgao: "Financeiro", lotacao: "Setor 1" };
    APIUsers.get.mockResolvedValueOnce({ data: mockOrgan });

    const result = await getOrganById(organId);

    expect(APIUsers.get).toHaveBeenCalledWith(`organ/get/${organId}`);
    expect(result).toEqual(mockOrgan);
  });

  it("should delete an organ by id", async () => {
    APIUsers.delete.mockResolvedValueOnce({ status: 200 });

    const result = await deleteOrganById(organId);

    expect(APIUsers.delete).toHaveBeenCalledWith(`organ/delete/${organId}`, {
      params: {
        userId: "123456",
        moduleName: "users",
        action: "delete",
      },
    });
    expect(result).toBe(200);
  });

  afterEach(() => {
    localStorage.removeItem("@App:token");
    localStorage.removeItem("@App:user");
  });
});
