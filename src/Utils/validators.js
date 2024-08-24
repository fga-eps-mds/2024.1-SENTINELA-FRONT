export const isValidEmail = (email) => {
  if (!email) {
    return { isValid: true };
  }

  const allowedDomains = [
    "com",
    "net",
    "org",
    "com.br",
    "org.br",
    "edu",
    "gov",
  ];

  const domainPattern = allowedDomains
    .map((domain) => {
      const escapedDomain = domain.replace(/\./g, "\\.");
      return `(?:[a-zA-Z0-9.-]+\\.)?${escapedDomain}`;
    })
    .join("|");

  const emailRegex = new RegExp(
    `^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9.-]+\\.)?(${domainPattern})$`,
    "i"
  );

  const isValid = emailRegex.test(email);

  return isValid
    ? { isValid: true }
    : { isValid: false, message: "O e-mail fornecido não é válido." };
};

export const isValidCelular = (celular) => {
  const cleanedNumber = celular.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (!cleanedNumber) {
    return { isValid: true };
  }

  if (cleanedNumber.length < 10 || cleanedNumber.length > 11) {
    return { isValid: false, message: "O telefone fornecido não é válido." };
  }

  return { isValid: true };
};

export const isValidSite = (site) => {
  if (!site) {
    return { isValid: true };
  }

  const urlPattern =
    /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;

  // Verifica se a URL corresponde ao padrão
  const isValid = urlPattern.test(site);

  return isValid
    ? { isValid: true }
    : { isValid: false, message: "O site fornecido não é válido." };
};
