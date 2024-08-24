import { describe, it, expect } from "vitest";
import { isValidCelular, isValidEmail, isValidSite } from "./validators";

describe("Validators", () => {
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
    it("when given an valid email", () => {
      const validation = isValidEmail("teste@gmail.com");

      expect(validation.isValid).toBeTruthy();
      expect(validation.message).not.toBeDefined();
    });
  });
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
    it("when given an valid phone", () => {
      const validation = isValidCelular("61912341234");

      expect(validation.isValid).toBeTruthy();
      expect(validation.message).not.toBeDefined();
    });
  });
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
    it("when given an valid site", () => {
      const validation = isValidSite("https://valid.com");

      expect(validation.isValid).toBeTruthy();
      expect(validation.message).not.toBeDefined();
    });
  });
});
