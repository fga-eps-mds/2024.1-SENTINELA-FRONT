import './index.css'
import FieldText from "../FieldText";
import FieldSelect from "../FieldSelect"

export default function MembershipForm ({formData}) {
    const handlerChange = (event) => {
        const {name, value} = event.target;
        console.log(event.target);
        if (formData[name]) {
            formData[name].setter(value)
        }
    }
    
    const tipoSanguineoList = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    return(
        <div>
            <h2>Dados Pessoais</h2>
                <FieldText label = "Nome Completo *" name="name" value={ formData.name.value } onChange={handlerChange}/>
                <FieldText label = "Religião" value={ formData.religion.value } onChange={handlerChange}/>
                <FieldSelect label = "Tipo Sanguíneo" value={ formData.bloodType } onChange={handlerChange} options={tipoSanguineoList}/>
                

            <h2>Dados de Contato</h2>

            <h2>Endereço</h2>

            <h2>Dados de Contratação</h2>

        </div>
    )
}