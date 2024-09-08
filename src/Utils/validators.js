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
  console.log[allowedDomains];

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

export const mascaraTelefone = (telefone) => {
  let formattedTelefone = telefone.replace(/\D/g, "");
  if (formattedTelefone.length > 11) {
    formattedTelefone = formattedTelefone.slice(0, 11);
  }
  return formattedTelefone
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{4,5})(\d{4})$/, "$1-$2");
};

export const mascaraCEP = (cep) => {
  let formattedCEP = cep.replace(/\D/g, "");
  if (formattedCEP.length > 8) {
    formattedCEP = formattedCEP.slice(0, 8);
  }
  return formattedCEP.replace(/(\d{5})(\d)/, "$1-$2");
};

export const handleCpfCnpjInput = (value) => {
  const numericValue = value.replace(/\D/g, "");
  if (numericValue.length <= 11) {
    return numericValue
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14); // CPF formatado
  } else {
    return numericValue
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d{1,3})$/, "$1-$2")
      .slice(0, 18);
  }
};

export const isValidTelefone = (telefone) => {
  const cleanedNumber = telefone.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (!cleanedNumber) {
    return { isValid: true };
  }

  if (cleanedNumber.length != 10) {
    return { isValid: false, message: "O telefone fornecido não é válido." };
  }

  return { isValid: true };
};

export const mascaraCelular = (celular) => {
  let formattedCelular = celular.replace(/\D/g, "");
  if (formattedCelular.length > 11) {
    formattedCelular = formattedCelular.slice(0, 11);
  }
  return formattedCelular
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{5})(\d{4})$/, "$1-$2");
};
