import React, { useState } from "react";
import "./index.css";
import "../../../index.css";
//import SideBar from "../../../Components/SideBar";
//import SideButton from "../../../Components/SideButton";
import 'dayjs/locale/pt-br';
//import FieldText from "../../../Components/Fieldtext";
//import FieldSelect from "../../../Components/Fieldselect";
//import { createSupplier } from "../../../";
import PrimaryButton from "../../../Components/PrimaryButton";
import SideButton from "../../../Components/SideButton";

const Supplier = () => {
    console.log('Supplier called');
    const [nome, setNome] = useState('');
    const [tipoPessoa, setTipoPessoa] = useState('');
    const [cpf, setCpf] = useState('');
    const [statusFornecedor, setStatusFornecedor] = useState('');
    const [naturezaTransacao, setNaturezaTransacao] = useState('');
    const [email, setEmail] = useState('');
    const [nomeContato, setNomeContato] = useState('');
    const [celular, setCelular] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf_endereco, setUf_endereco] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [nomeBanco, setNomeBanco] = useState('');
    const [agencia, setAgencia] = useState('');
    const [numeroBanco, setNumeroBanco] = useState('');
    const [dv, setDv] = useState('');
    const [chavePix, setChavePix] = useState('');

    const tipoPessoaList = ['Jurídica', 'Física'];
    const statusFornecedorList = ['Ativo', 'Inativo'];
    const naturezaTransacaoList = ['Receita', 'Despesa'];
    const uf_enderecoList = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];


    const handleChangeTipoPessoa = (event) => {
        setTipoPessoa(event.target.value);
    }

    const handleChangeStatusFornecedor = (event) => {
        setStatusFornecedor(event.target.value);
    }

    const handleChangeNaturezaTransacao = (event) => {
        setNaturezaTransacao(event.target.value);
    }

    const handleChangeUf_endereco = (event) => {
        setUf_endereco(event.target.value);
    }

    const buttons = [
        < SideButton key="home" text="Página inicial" />,
        < SideButton key="cadastros" text="Cadastros" />,
        < SideButton key="financeiro" text="Financeiro" />
    ];

    const handleSubmit = async () => {
        console.log('handleSubmit called');
        const formData = {
            nome,
            tipoPessoa,
            cpf,
            statusFornecedor,
            naturezaTransacao,
            email,
            nomeContato,
            celular,
            telefone,
            cep,
            cidade,
            uf_endereco,
            logradouro,
            complemento,
            nomeBanco,
            agencia,
            numeroBanco,
            dv,
            chavePix
        };
        createdSupplier(formData);
    }

    return (
        <section className="container">

        <div className="bar-container">
            <SideBar buttons={buttons} />
        </div>

        <div className="forms-container">

            <h1>Cadastro de fornecedor</h1>

            <h3>Dados pessoais</h3>

            <div className="section-form">
                Fie
            </div>

        </div>

        </section>
    )

}




export default Supplier;