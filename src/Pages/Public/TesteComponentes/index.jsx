import PrimaryButton from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import FieldText from "../../../Components/FieldText";
import FieldSelect from "../../../Components/FieldSelect";

export default function testeComp(){
    const teste = ["a","b","c"]
    return(
        <div className="test-container">
            <div className="botoes">
                <PrimaryButton text="PrimaryButton"/>
                <SecondaryButton text="SecondaryButton"/>
            </div>
            
            <FieldText/>
            <FieldSelect options={teste}/>
        </div>
    )   
}