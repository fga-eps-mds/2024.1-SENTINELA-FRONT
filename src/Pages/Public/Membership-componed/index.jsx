import "./index.css";
import { useState } from "react";
import MembershipForm from "../../../Components/MembershipForm";

export default function Filiacao() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [ufNaturalness, setUfNaturalness] = useState("");
  const [ufOrganization, setUfOrganization] = useState("");
  const [ufAddress, setUfAddress] = useState("");
  const [education, setEducation] = useState("");
  const [hiringDate, setHiringDate] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [expeditionDate, setExpeditionDate] = useState(null);
  const [position, setPosition] = useState("");
  const [lotacao, setLotacao] = useState("");
  const [registration, setRegistration] = useState("");
  const [naturalness, setNaturalness] = useState("");
  const [rg, setRg] = useState("");
  const [organization, setOrganization] = useState("");
  const [cpf, setCpf] = useState("");
  const [motherName, setMotherName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [complement, setComplement] = useState("");
  const [phone, setPhone] = useState("");
  const [landline, setLandline] = useState("");
  const [workPlace, setWorkPlace] = useState("");
  const [shipperOrganization, setShipperOrganization] = useState("");
  const [religion, setReligion] = useState("");
  const [dependents, setDependents] = useState([]);

  const formData = {
    email: { value: email, setter: setEmail },
    sex: { value: sex, setter: setSex },
    maritalStatus: { value: maritalStatus, setter: setMaritalStatus },
    bloodType: { value: bloodType, setter: setBloodType },
    ufNaturalness: { value: ufNaturalness, setter: setUfNaturalness },
    ufOrganization: { value: ufOrganization, setter: setUfOrganization },
    ufAddress: { value: ufAddress, setter: setUfAddress },
    education: { value: education, setter: setEducation },
    hiringDate: { value: hiringDate, setter: setHiringDate },
    birthDate: { value: birthDate, setter: setBirthDate },
    expeditionDate: { value: expeditionDate, setter: setExpeditionDate },
    position: { value: position, setter: setPosition },
    lotacao: { value: lotacao, setter: setLotacao },
    registration: { value: registration, setter: setRegistration },
    name: { value: name, setter: setName },
    naturalness: { value: naturalness, setter: setNaturalness },
    rg: { value: rg, setter: setRg },
    organization: { value: organization, setter: setOrganization },
    cpf: { value: cpf, setter: setCpf },
    motherName: { value: motherName, setter: setMotherName },
    fatherName: { value: fatherName, setter: setFatherName },
    cep: { value: cep, setter: setCep },
    city: { value: city, setter: setCity },
    street: { value: street, setter: setStreet },
    complement: { value: complement, setter: setComplement },
    phone: { value: phone, setter: setPhone },
    landline: { value: landline, setter: setLandline },
    workPlace: { value: workPlace, setter: setWorkPlace },
    shipperOrganization: { value: shipperOrganization, setter: setShipperOrganization },
    religion: { value: religion, setter: setReligion },
    dependents: { value: dependents, setter: setDependents },
  };

  return (
    <div>
      FORMULÁRIO DE FILIAÇÃO
      <MembershipForm formData = {formData} />
    </div>
  );
}
