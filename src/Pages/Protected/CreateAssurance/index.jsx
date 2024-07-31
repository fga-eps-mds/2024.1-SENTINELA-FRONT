import { useState } from "react";
import "./index.css";
import FieldText from "../../../Components/FieldText";
import FieldSelect from "../../../Components/FieldSelect";
import DataSelect from "../../../Components/DataSelect";

export default function CreateAssurance() {
    const [nome, setNome] = useState("");
    const [razaoSocial, setRazaoSocial] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipoPessoa, setTipoPessoa] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [ans, setAns] = useState("");
    const [categoria, setCategoria] = useState("");
    const [statusConvenio, setStatusConvenio] = useState("");
    const [dataCadastro, setDataCadastro] = useState(null);
    const [considerarIr, setConsiderarIr] = useState("");
    const [descontoAut, setDescontoAut] = useState("");
    const [logotipo, setLogotipo] = useState("");
    const [site, setSite] = useState("");
    const [email, setEmail] = useState("");
    const [telefCelular, setTelefCelular] = useState("");
    const [dataAssinatura, setDataAssinatura] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [sitContrato, setSitContrato] = useState("");
    const [dataFinal, setDataFinal] = useState("");
    const [contratoEntreg, setContratoEntreg] = useState(""); //pesquisar sobre como implementar checkbox no campo

    const tipoPessoaList = ["Jurídica", "Física"];
    const categoriaList = ["Alimentação", "Artes", "Escolas", "Academias", "Outros"];
    const statusConvenioList = ["Ativo", "Inativo"];
    const considerarIrList = ["Sim", "Não"];
    const descontoAutList = ["Sim", "Não"];
    //const logotipoList = []; //confirmar quais seriam as opções exatas do campo
    const sitContratoList = ["Concluído", "Pendência", "Cancelado"];
    
    const handleChangeTipoPessoa = (event) => {
        setTipoPessoa(event.target.value);
    }

    const handleChangeCategoria = (event) => {
        setCategoria(event.target.value);
    }

    const handleChangeStatusConvenio = (event) => {
        setStatusConvenio(event.target.value);
    }

    const handleChangeConsiderarIr = (event) => {
        setConsiderarIr(event.target.value);
    }

    const handleChangeDescontoAut = (event) => {
        setDescontoAut(event.target.value);
    }

    const handleChangeSitContrato = (event) => {
        setSitContrato(event.target.value);
    }

    return (
        <div className="container">
            <div className="forms-container"></div>
            <h1>Cadastro de convênios</h1>

            <h3>Dados do convênio</h3>

            <FieldText 
                label="Nome fantasia"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
            />

            <FieldText 
                label="Razão social"
                value={razaoSocial}
                onChange={(e) => setRazaoSocial(e.target.value)}
            />

            <FieldText 
                label="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
            />

            <FieldSelect 
                label="Classificação de pessoa"
                value={tipoPessoa}
                onChange={handleChangeTipoPessoa}
                options={tipoPessoaList}
            />

            <FieldText 
                label="CPF/CNPJ"
                value={cpfCnpj}
                onChange={(e) => setCpfCnpj(e.target.value)}
            />

            <FieldText 
                label="ANS"
                value={ans}
                onChange={(e) => setAns(e.target.value)}
            />

            <FieldSelect 
                label="Categoria"
                value={categoria}
                onChange={handleChangeCategoria}
                options={categoriaList}
            />

            <FieldSelect 
                label="Status"
                value={statusConvenio}
                onChange={handleChangeStatusConvenio}
                options={statusConvenioList}
            />

            <DataSelect 
                label="Data de cadastro"
                value={dataCadastro}
                onChange={(newValue) => setDataCadastro(newValue)}
            />

            <FieldSelect 
                label="Considerado no IR"
                value={considerarIr}
                onChange={handleChangeConsiderarIr}
                options={considerarIrList}
            />

            <FieldSelect 
                label="Desconto automático"
                value={descontoAut}
                onChange={handleChangeDescontoAut}
                options={descontoAutList}
            />

            <FieldText 
                label="Logotipo"
                value={logotipo}
                onChange={(e) => setLogotipo(e.target.value)}
            />

            <FieldText 
                label="Site"
                value={site}
                onChange={(e) => setSite(e.target.value)}
            />

            <FieldText 
                label="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <FieldText 
                label="Telefone/Celular"
                value={telefCelular}
                onChange={(e) => setTelefCelular(e.target.value)}
            />

            <DataSelect 
                label="Data de assinatura"
                value={dataAssinatura}
                onChange={(newValue) => setDataAssinatura(newValue)}
            />

            <DataSelect 
                label="Data de início"
                value={dataInicio}
                onChange={(newValue) => setDataInicio(newValue)}
            />

            <FieldSelect 
                label="Situação"
                value={sitContrato}
                onChange={handleChangeSitContrato}
                options={sitContratoList}
            />

            <DataSelect 
                label="Data final"
                value={dataFinal}
                onChange={(newValue) => setDataFinal(newValue)}
            />
        </div> //falta criar o campo do Contrato entregue, pesquisar como fazer uma checkbox
    )
}