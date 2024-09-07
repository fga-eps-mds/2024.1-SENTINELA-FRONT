export const mascaraCPF = (cpf) => {
  let formattedCPF = cpf.replace(/\D/g, "");
  if (formattedCPF.length > 11) formattedCPF = formattedCPF.slice(0, 11);

  return formattedCPF
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

export const mascaraRg = (rg) => {
  let formattedRG = rg.replace(/\D/g, "");
  return formattedRG;
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
