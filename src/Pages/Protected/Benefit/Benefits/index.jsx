import { useAuth } from "../../../../Context/auth";
import { useNavigate } from "react-router-dom";
import SecondaryButton from "../../../../Components/SecondaryButton";
import sindpol_logo from "../../../../assets/sindpol-logo.png";
import sentinela_logo from "../../../../assets/sentinela-logo.png";
import "./index.css";
import { checkAction, usePermissions } from "../../../../Utils/permission";

const Benefits = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const permissions = usePermissions();
  const canCreate = checkAction(permissions, "benefits", "create");

  const handleBenefitsList = () => {
    navigate("/beneficios/lista");
  };

  const handleBenefitsCreate = () => {
    navigate("/beneficios/criar");
  };

  return (
    user && (
      <section className="container">
        <div className="area-hub">
          <div className="card-benefits">
            <img className="logo" src={sindpol_logo} alt="Sindpol Logo" />
            <img
              className="sentinela"
              src={sentinela_logo}
              alt="Sentinela Logo"
            />
            <div className="hub-btn">
              {canCreate && (
                <SecondaryButton
                  text="CADASTRO DE BENEFÍCIOS"
                  onClick={handleBenefitsCreate}
                />
              )}
              <SecondaryButton
                text="LISTA DE BENEFÍCIOS"
                onClick={handleBenefitsList}
              />
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default Benefits;
