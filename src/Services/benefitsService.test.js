// benefitsService.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { APIBenefits, APIUsers } from "./BaseService";
import {
  userLogin,
  createBenefitsForm,
  getBenefitsForm,
  getBenefitsFormById,
  updateBenefitsFormById,
  deleteBenefitsFormById,
} from "./benefitsService";

// Mock das APIs
vi.mock("./BaseService", () => ({
  APIBenefits: {
    post: vi.fn(),
    get: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
  APIUsers: {
    post: vi.fn(),
  },
}));

describe("Benefits Service", () => {
  const mockToken = "mockToken";
  const mockUser = { _id: "123456" };
  const benefitsData = {
    title: "Benefício A",
    description: "Descrição do benefício",
  };
  const benefitId = "789";

  beforeEach(() => {
    localStorage.setItem("@App:token", JSON.stringify(mockToken));
    localStorage.setItem("@App:user", JSON.stringify(mockUser));
  });

  it("should log in the user", async () => {
    const mockResponse = {
      status: 200,
      data: { token: mockToken, user: mockUser },
    };
    APIUsers.post.mockResolvedValueOnce(mockResponse);

    const result = await userLogin("user@example.com", "password");

    expect(APIUsers.post).toHaveBeenCalledWith("login", {
      email: "user@example.com",
      password: "password",
    });
    expect(result).toEqual(mockResponse);
  });

  it("should return null when login fails", async () => {
    APIUsers.post.mockRejectedValueOnce(new Error("Login error"));

    const result = await userLogin("user@example.com", "password");

    expect(result).toBeNull();
  });

  it("should create a benefits form", async () => {
    APIBenefits.post.mockResolvedValueOnce({ status: 201 });

    const result = await createBenefitsForm(benefitsData);

    expect(APIBenefits.post).toHaveBeenCalledWith(
      "/benefits/create/",
      benefitsData,
      {
        headers: {
          Authorization: `Bearer ${mockToken}`,
        },
      }
    );
    expect(result).toBe(false);
  });

  it("should return true and log error when API call fails in createBenefitsForm", async () => {
    APIBenefits.post.mockRejectedValueOnce(new Error("API error"));

    const result = await createBenefitsForm(benefitsData);

    expect(result).toBe(true);
  });

  it("should get all benefits forms", async () => {
    const mockBenefits = [{ id: benefitId, title: "Benefício A" }];
    APIBenefits.get.mockResolvedValueOnce({ data: mockBenefits });

    const result = await getBenefitsForm();

    expect(APIBenefits.get).toHaveBeenCalledWith("/benefits", {
      headers: {
        Authorization: `Bearer ${mockToken}`,
      },
    });
    expect(result).toEqual(mockBenefits);
  });

  it("should get a benefits form by id", async () => {
    const mockBenefit = { id: benefitId, title: "Benefício A" };
    APIBenefits.get.mockResolvedValueOnce({ data: mockBenefit });

    const result = await getBenefitsFormById(benefitId);

    expect(APIBenefits.get).toHaveBeenCalledWith(`/benefits/${benefitId}`);
    expect(result).toEqual(mockBenefit);
  });

  it("should update a benefits form by id", async () => {
    const updatedData = {
      title: "Benefício Atualizado",
      description: "Nova descrição",
    };
    APIBenefits.patch.mockResolvedValueOnce({ data: updatedData });

    const result = await updateBenefitsFormById(benefitId, updatedData);

    expect(APIBenefits.patch).toHaveBeenCalledWith(
      `/benefits/update/${benefitId}`,
      {
        headers: {
          Authorization: `Bearer ${mockToken}`,
        },
        benefitsData: updatedData,
      }
    );
    expect(result).toEqual(updatedData);
  });

  it("should delete a benefits form by id", async () => {
    APIBenefits.delete.mockResolvedValueOnce({ status: 200 });

    const result = await deleteBenefitsFormById(benefitId);

    expect(APIBenefits.delete).toHaveBeenCalledWith(
      `/benefits/delete/${benefitId}`
    );
    expect(result).toBeUndefined();
  });

  afterEach(() => {
    localStorage.removeItem("@App:token");
    localStorage.removeItem("@App:user");
  });
});
