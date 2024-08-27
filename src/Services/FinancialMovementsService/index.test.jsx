import { describe, it, expect, vi, beforeEach } from "vitest";
import { APIBank } from "../BaseService";
import {
  createFinancialMovements,
  getFinancialMovements,
  getFinancialMovementsById,
  updateFinancialMovementsById,
  deleteFinancialMovementsById,
} from "./index";
import dayjs from "dayjs";

vi.mock("../BaseService", () => ({
  APIBank: {
    post: vi.fn(),
    get: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("Financial Movements Service", () => {
  const mockToken = "mockToken";
  const financialMovementsData = { contaOrigem: "Fornecedor",
    contaDestino: "Sindicalizado",
    nomeOrigem: "Nome Exemplo",
    nomeDestino: "Nome Exemplo",
    tipoDocumento: "AÇÃO JUDICIAL",
    cpFCnpj: "",
    valorBruto: "1000",
    valorLiquido: "",
    acrescimo: "",
    desconto: "",
    formadePagamento: "PIX",
    datadeVencimento: dayjs("2024-01-01"),
    datadePagamento: dayjs("2024-02-01"),
    baixada: false,
    descricao: "Descrição de exemplo", };
  const financialMovementId = "123";

  beforeEach(() => {
    localStorage.setItem("@App:token", mockToken);
  });

  it("should create a financial movement", async () => {
    APIBank.post.mockResolvedValueOnce({
      data: { id: financialMovementId, ...financialMovementsData },
    });

    const result = await createFinancialMovements(financialMovementsData);

    expect(APIBank.post).toHaveBeenCalledWith(
      "/financialMovements/create",
      financialMovementsData,
      {
        headers: { Authorization: `Bearer ${mockToken}` },
      }
    );
    expect(result).toEqual({
      id: financialMovementId,
      ...financialMovementsData,
    });
  });

  it("should get all financial movements", async () => {
    const mockFinancialMovements = [
      { id: financialMovementId, value: 100, description: "Test" },
    ];
    APIBank.get.mockResolvedValueOnce({ data: mockFinancialMovements });

    const result = await getFinancialMovements();

    expect(APIBank.get).toHaveBeenCalledWith("/financialMovements", {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
    expect(result).toEqual(mockFinancialMovements);
  });

  it("should get financial movement by id", async () => {
    const mockFinancialMovement = {
      id: financialMovementId,
      value: 100,
      description: "Test",
    };
    APIBank.get.mockResolvedValueOnce({ data: mockFinancialMovement });

    const result = await getFinancialMovementsById(financialMovementId);

    expect(APIBank.get).toHaveBeenCalledWith(
      `/financialMovements/${financialMovementId}`,
      {
        headers: { Authorization: `Bearer ${mockToken}` },
      }
    );
    expect(result).toEqual(mockFinancialMovement);
  });

  it("should update a financial movement", async () => {
    const updatedFinancialMovement = { ...financialMovementsData, valorBruto: "2000" };
    APIBank.patch.mockResolvedValueOnce({ data: updatedFinancialMovement });

    const result = await updateFinancialMovementsById(
      financialMovementId,
      updatedFinancialMovement
    );

    expect(APIBank.patch).toHaveBeenCalledWith(
      `/financialMovements/update/${financialMovementId}`,
      updatedFinancialMovement,
      {
        headers: { Authorization: `Bearer ${mockToken}` },
      }
    );
    expect(result).toEqual(updatedFinancialMovement);
  });

  it("should delete a financial movement", async () => {

    APIBank.delete.mockResolvedValueOnce({
      data: { message: "Financial movement deleted" },
    });

    const result = await deleteFinancialMovementsById(financialMovementId);

    expect(APIBank.delete).toHaveBeenCalledWith(
      `/financialMovements/delete/${financialMovementId}`,
      {
        headers: { Authorization: `Bearer ${mockToken}` },
      }
    );
    expect(result).toEqual({ message: "Financial movement deleted" });
  });
  
});
