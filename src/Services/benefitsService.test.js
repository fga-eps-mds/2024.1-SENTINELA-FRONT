// benefitsService.test.js
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  beforeAll,
} from "vitest";
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

beforeAll(() => {
  vi.spyOn(window, "alert").mockImplementation(() => {});
});

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

  it("should log an error when stored user is not a valid JSON", async () => {
    // Colocando um valor inválido no localStorage para simular o erro de parse
    localStorage.setItem("@App:user", "invalidUser");

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await createBenefitsForm(benefitsData);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao armazenar usuário: ",
      expect.any(SyntaxError) // Verifica se foi lançada uma exceção de sintaxe do JSON
    );

    expect(result).toBe(true); // Como ocorreu erro, a função deve retornar true

    consoleErrorSpy.mockRestore(); // Limpa o mock
  });

  it("should return true when no token is found", async () => {
    localStorage.removeItem("@App:token"); // Remover o token

    const result = await createBenefitsForm(benefitsData);

    expect(result).toBe(true); // Verificar se o retorno é true em caso de erro
  });

  it("should throw an error when no user is found", async () => {
    localStorage.removeItem("@App:user"); // Remover o usuário

    const result = await createBenefitsForm(benefitsData);

    expect(result).toBe(true);
  });

  it("should log an error when updateBenefitsFormById fails", async () => {
    APIBenefits.patch.mockRejectedValueOnce(new Error("API error"));

    const result = await updateBenefitsFormById(benefitId, benefitsData);

    expect(result).toBeUndefined();
  });

  it("should log error response data when API call fails and error.response exists", async () => {
    const mockErrorResponse = {
      response: {
        data: "Detalhes do erro da API",
      },
    };

    APIBenefits.post.mockRejectedValueOnce(mockErrorResponse);

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await createBenefitsForm(benefitsData);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao cadastrar benefício:",
      "Detalhes do erro da API" // Espera que os dados da resposta de erro sejam logados
    );

    expect(result).toBe(true); // A função retorna true ao encontrar um erro

    consoleErrorSpy.mockRestore(); // Limpa o mock
  });

  it("should log error message when API call fails and error.response does not exist", async () => {
    const mockErrorMessage = new Error("Erro de rede");

    APIBenefits.post.mockRejectedValueOnce(mockErrorMessage);

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await createBenefitsForm(benefitsData);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao cadastrar benefício:",
      "Erro de rede" // Espera que a mensagem de erro seja logada
    );

    expect(result).toBe(true); // A função retorna true ao encontrar um erro

    consoleErrorSpy.mockRestore(); // Limpa o mock
  });

  it("should log an error when stored token is not a valid JSON", async () => {
    // Colocando um valor inválido no localStorage para simular o erro de parse
    localStorage.setItem("@App:token", "invalidToken");

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await createBenefitsForm(benefitsData);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "O token armazenado não é um JSON válido:",
      expect.any(SyntaxError) // Verifica se foi lançada uma exceção de sintaxe do JSON
    );

    expect(result).toBe(true); // Como ocorreu erro, a função deve retornar true

    consoleErrorSpy.mockRestore(); // Limpa o mock
  });

  it("should log an error when fetching benefits fails", async () => {
    // Simulando uma rejeição na chamada da API (exemplo de falha de rede ou erro no servidor)
    APIBenefits.get.mockRejectedValueOnce(new Error("Erro de rede"));

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await getBenefitsForm(); // Função que faz a busca dos benefícios

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao buscar benefício:",
      expect.any(Error) // Verifica que um erro foi passado para o console.error
    );

    expect(result).toBeUndefined(); // Função retorna undefined em caso de erro

    consoleErrorSpy.mockRestore(); // Limpa o mock
  });

  it("should log an error when fetching benefit by ID fails", async () => {
    const benefitId = "123";
    const mockError = new Error("Erro de rede");

    // Simula a rejeição na chamada da API ao buscar o benefício por ID
    APIBenefits.get.mockRejectedValueOnce(mockError);

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await getBenefitsFormById(benefitId);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Erro ao buscar benefício com ID ${benefitId}:`,
      mockError // Verifica que o erro foi passado corretamente para o console.error
    );

    expect(result).toBeUndefined(); // Função retorna undefined em caso de erro

    consoleErrorSpy.mockRestore(); // Limpa o mock
  });

  afterEach(() => {
    localStorage.removeItem("@App:token");
    localStorage.removeItem("@App:user");
  });
});
