import "./index.css";
import FieldText from "../FieldText";
import FieldSelect from "../FieldSelect";
import DataSelect from "../DataSelect";
import PropTypes from "prop-types";
import {
  tipoSanguineoList,
  sexoList,
  ufList,
  estadoCivilList,
  escolaridadeList,
} from "../../Utils/constants";
import { useEffect, useState } from "react";
import { listOrgans } from "../../Services/organService";

export default function MembershipForm({ formData }) {
  const [orgaosList, setOrgaosList] = useState([]);
  const [lotacaoList, setLotacaoList] = useState([]);

  const handlerChange = (event) => {
    const { name, value } = event.target;
    console.log("leopa", event.target.name);
    if (formData[name]) {
      formData[name].setter(value);
    }
  };

  console.log(formData.education.value);

  useEffect(() => {
    const getOrgaos = async () => {
      try {
        const orgaos = await listOrgans(); // Presumindo que listOrgans faz a requisição ao backend

        if (Array.isArray(orgaos)) {
          // Extraindo valores únicos de órgãos
          const uniqueOrgaos = [...new Set(orgaos.map((orgao) => orgao.orgao))];

          // Extraindo valores únicos de lotações
          const uniqueLotacoes = [
            ...new Set(
              orgaos.flatMap((orgao) =>
                orgao.lotacao.map((lotacao) => lotacao.nomeLotacao)
              )
            ),
          ];

          setLotacaoList(uniqueLotacoes);
          setOrgaosList(uniqueOrgaos);
        } else {
          console.error("Os dados recebidos não são um array.");
        }
      } catch (error) {
        console.error("Erro ao buscar órgãos:", error);
      }
    };

    getOrgaos();
  }, []);

  return (
    <div className="formData-container">
      <div className="personal-form-container">
        <h2>Dados Pessoais</h2>
        <FieldText
          label="Nome Completo *"
          name="name"
          value={formData.name.value}
          onChange={handlerChange}
        />

        <div className="double-field">
          <FieldText
            label="Religião"
            name="religion"
            value={formData.religion.value}
            onChange={handlerChange}
          />
          <FieldSelect
            label="Tipo Sanguíneo"
            name="bloodType"
            value={formData.bloodType.value}
            onChange={handlerChange}
            options={tipoSanguineoList}
          />
        </div>

        <div className="double-field">
          <FieldText
            label="Matrícula *"
            name="registration"
            value={formData.registration.value}
            onChange={handlerChange}
          />
          <DataSelect
            label="Data de Nascimento"
            name="birthDate"
            value={formData.birthDate.value}
            onChange={handlerChange}
          />
        </div>

        <div className="triple-field">
          <FieldSelect
            width="30%"
            label="Sexo *"
            value={formData.sex.value}
            onChange={handlerChange}
            options={sexoList}
          />
          <FieldText
            width="50%"
            label="Naturalidade"
            name="naturalness"
            value={formData.naturalness.value}
            onChange={handlerChange}
          />
          <FieldSelect
            width="20%"
            label="UF"
            name="ufNaturalness"
            value={formData.ufNaturalness.value}
            onChange={handlerChange}
            options={ufList}
          />
        </div>

        <div className="double-field">
          <FieldSelect
            label="Estado Civil"
            name="maritalStatus"
            value={formData.maritalStatus.value}
            onChange={handlerChange}
            options={estadoCivilList}
          />
          <FieldSelect
            label="Escolaridade"
            name="education"
            value={formData.education.value}
            onChange={handlerChange}
            options={escolaridadeList}
          />
        </div>

        <div className="triple-field">
          <FieldText
            label="RG *"
            name="rg"
            value={formData.rg.value}
            onChange={handlerChange}
          />
          <FieldText
            label="Órgão Expeditor"
            name="shipperOrganization"
            value={formData.shipperOrganization.value}
            onChange={handlerChange}
          />
          <FieldSelect
            label="UF"
            name="ufOrganization"
            value={formData.ufOrganization.value}
            onChange={handlerChange}
            options={ufList}
          />
        </div>

        <div className="double-field">
          <FieldText
            label="CPF *"
            name="cpf"
            value={formData.cpf.value}
            onChange={handlerChange}
          />
          <DataSelect
            label="Data de Expedição"
            name="expeditionDate"
            value={formData.expeditionDate.value}
            onChange={handlerChange}
          />
        </div>

        <div className="double-field">
          <FieldText
            label="Nome do Pai"
            name="fatherName"
            value={formData.fatherName.value}
            onChange={handlerChange}
          />
          <FieldText
            label="Nome da mãe"
            name="motherName"
            value={formData.motherName.value}
            onChange={handlerChange}
          />
        </div>
      </div>

      <h2>Dados de Contato</h2>
      <div className="personal-form-container">
        <FieldText
          label="E-mail *"
          name="email"
          value={formData.email.value}
          onChange={handlerChange}
        />

        <div className="double-field">
          <FieldText
            label="Celular"
            name="phone"
            value={formData.phone.value}
            onChange={handlerChange}
          />
          <FieldText
            label="Telefone"
            name="landline"
            value={formData.landline.value}
            onChange={handlerChange}
          />
        </div>
      </div>

      <h2>Endereço</h2>

      <div className="personal-form-container">
        <FieldText
          label="CEP"
          name="cep"
          value={formData.cep.value}
          onChange={handlerChange}
        />

        <div className="double-field">
          <FieldText
            label="Logradouro"
            name="street"
            value={formData.street.value}
            onChange={handlerChange}
          />
          <FieldText
            label="Complemento"
            name="complement"
            value={formData.complement.value}
            onChange={handlerChange}
          />
        </div>
      </div>

      <h2>Dados de Contratação</h2>

      <div className="personal-form-container">
        <div className="double-field">
          <FieldText
            label="Cargo"
            name="position"
            value={formData.position.value}
            onChange={handlerChange}
          />
          <DataSelect
            label="Data de Contratação"
            name="hiringDate"
            value={formData.hiringDate.value}
            onChange={handlerChange}
          />
        </div>

        <div className="double-field">
          <FieldSelect
            label="Orgão"
            name="organization"
            value={formData.organization.value}
            onChange={handlerChange}
            options={orgaosList}
          />
          <FieldSelect
            disable={formData.organization.value ? false : true}
            label="Lotação"
            name="lotacao"
            value={formData.lotacao.value}
            onChange={handlerChange}
            options={lotacaoList}
          />
        </div>

        <div className="double-field">
          <FieldText
            label="Posto de trabalho"
            name="workPlace"
            value={formData.workPlace.value}
            onChange={handlerChange}
          />
        </div>
      </div>

      <h2>Dependentes</h2>
    </div>
  );
}

MembershipForm.propTypes = {
  formData: PropTypes.any,
};
