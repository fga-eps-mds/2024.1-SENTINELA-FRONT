import { generateFinancialReport } from "../pdfService";
import { APIBank } from "../BaseService";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock the API
vi.mock("../BaseService", () => ({
  APIBank: {
    post: vi.fn(),
  },
}));

describe("generateFinancialReport", () => {
  const mockBlob = new Blob(["mocked content"], { type: "application/pdf" });
  const mockURL = "blob:http://localhost/mock";
  const mockToken = "mockedToken";

  let createElementSpy, appendChildSpy, clickSpy, removeSpy;

  beforeEach(() => {
    // Mock URL.createObjectURL to return a mock URL
    window.URL.createObjectURL = vi.fn(() => mockURL);

    // Mock the API response
    APIBank.post.mockImplementation(() =>
      Promise.resolve({
        data: mockBlob,
      })
    );

    // Mock localStorage.getItem to return a valid token
    vi.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      if (key === "@App:token") {
        return JSON.stringify(mockToken);
      }
      return null;
    });

    // Mock document.createElement to return an object with necessary methods
    createElementSpy = vi
      .spyOn(document, "createElement")
      .mockImplementation(() => {
        const anchorElement = {
          href: "",
          setAttribute: vi.fn(),
          click: vi.fn(), // Mock click method
          remove: vi.fn(), // Mock remove method
        };
        clickSpy = vi.spyOn(anchorElement, "click");
        removeSpy = vi.spyOn(anchorElement, "remove");
        return anchorElement;
      });

    appendChildSpy = vi
      .spyOn(document.body, "appendChild")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    // Clean up mocks after each test
    vi.restoreAllMocks();
  });

  it("should generate and download the financial report correctly", async () => {
    // Call the function
    await generateFinancialReport({
      contaOrigem: "123",
      contaDestino: "456",
      nomeOrigem: "Origem",
      nomeDestino: "Destino",
      tipoDocumento: "Tipo",
      sitPagamento: "Situação",
      formArquivo: "pdf",
      dataInicio: "2024-01-01",
      dataFinal: "2024-01-31",
    });

    // Check if localStorage.getItem was called to retrieve the token
    expect(localStorage.getItem).toHaveBeenCalledWith("@App:token");

    // Check if API.post was called with the correct arguments
    expect(APIBank.post).toHaveBeenCalledWith(
      "/financialMovements/report",
      {
        contaOrigem: "123",
        contaDestino: "456",
        nomeOrigem: "Origem",
        nomeDestino: "Destino",
        tipoDocumento: "Tipo",
        sitPagamento: "Situação",
        formArquivo: "pdf",
        dataInicio: "2024-01-01",
        dataFinal: "2024-01-31",
      },
      {
        headers: {
          Authorization: `Bearer ${mockToken}`,
        },
        responseType: "blob",
      }
    );

    // Check if createObjectURL was called with a Blob
    expect(window.URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));

    // Verify if the link was created, appended, clicked, and removed
    expect(createElementSpy).toHaveBeenCalledWith("a");
    expect(appendChildSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled(); // Ensure click is called
    expect(removeSpy).toHaveBeenCalled(); // Ensure remove is called
  });

  it("should handle errors correctly", async () => {
    // Mock API response to throw an error
    APIBank.post.mockImplementationOnce(() =>
      Promise.reject(new Error("API Error"))
    );

    // Call the function and check the error handling
    const result = await generateFinancialReport({
      contaOrigem: "123",
      contaDestino: "456",
      nomeOrigem: "Origem",
      nomeDestino: "Destino",
      tipoDocumento: "Tipo",
      sitPagamento: "Situação",
      formArquivo: "pdf",
      dataInicio: "2024-01-01",
      dataFinal: "2024-01-31",
    });

    // Check if the error message is logged
    expect(result).toBe(true);
  });
});
