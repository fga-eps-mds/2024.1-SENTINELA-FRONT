import { describe, it, expect } from "vitest";
import {
  isValidCelular,
  isValidEmail,
  isValidSite,
  isValidTelefone,
  mascaraCelular,
} from "./validators";

describe("Validators", () => {
  // Testes para email
  describe("validates email correctly", () => {
    it("when given an empty email", () => {
      // esse teste deve passar porque o campo não é obrigatório
      const validation = isValidEmail("");

      expect(validation.isValid).toBeTruthy();
      expect(validation.message).not.toBeDefined();
    });

    it("when given an invalid email", () => {
      const validation = isValidEmail("invalid-email");

      expect(validation.isValid).toBeFalsy();
      expect(validation.message).toBe("O e-mail fornecido não é válido.");
    });

    it("when given a valid email", () => {
      const validation = isValidEmail("teste@gmail.com");

      expect(validation.isValid).toBeTruthy();
      expect(validation.message).not.toBeDefined();
    });
  });

  // Testes para celular
  describe("validates phone correctly", () => {
    it("when given an empty field", () => {
      // esse teste deve passar porque o campo não é obrigatório
      const validation = isValidCelular("");

      expect(validation.isValid).toBeTruthy();
      expect(validation.message).not.toBeDefined();
    });

    it("when given an invalid phone", () => {
      const validation = isValidCelular("123");

      expect(validation.isValid).toBeFalsy();
      expect(validation.message).toBe("O telefone fornecido não é válido.");
    });

    it("when given a valid phone", () => {
      const validation = isValidCelular("61912341234");

      expect(validation.isValid).toBeTruthy();
      expect(validation.message).not.toBeDefined();
    });
  });

  // Testes para site
  describe("validates site correctly", () => {
    it("when given an empty field", () => {
      // esse teste deve passar porque o campo não é obrigatório
      const validation = isValidSite("");

      expect(validation.isValid).toBeTruthy();
      expect(validation.message).not.toBeDefined();
    });

    it("when given an invalid site", () => {
      const validation = isValidSite("invalid-site");

      expect(validation.isValid).toBeFalsy();
      expect(validation.message).toBe("O site fornecido não é válido.");
    });

    it("when given a valid site", () => {
      const validation = isValidSite("https://valid.com");

      expect(validation.isValid).toBeTruthy();
      expect(validation.message).not.toBeDefined();
    });
  });

  // teste para telefone
  describe("validates landline phone correctly", () => {
    it("when given an empty field", () => {
      // Campo não obrigatório
      const validation = isValidTelefone("");

      expect(validation.isValid).toBeTruthy();
      expect(validation.message).not.toBeDefined();
    });

    it("when given an invalid landline phone", () => {
      const validation = isValidTelefone("12345");

      expect(validation.isValid).toBeFalsy();
      expect(validation.message).toBe("O telefone fornecido não é válido.");
    });

    it("when given a valid landline phone", () => {
      const validation = isValidTelefone("3112345678");

      expect(validation.isValid).toBeTruthy();
      expect(validation.message).not.toBeDefined();
    });
  });

  // teste para celular
  describe("formats cellphone number correctly", () => {
    it("formats valid cellphone number with 11 digits", () => {
      const formattedNumber = mascaraCelular("61912345678");
      expect(formattedNumber).toBe("(61) 91234-5678");
    });

    it("trims the number if it exceeds 11 digits", () => {
      const formattedNumber = mascaraCelular("619123456789");
      expect(formattedNumber).toBe("(61) 91234-5678");
    });
  });
});
