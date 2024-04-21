// Importations de React et des hooks
import React, { useState } from "react";

// Importations des composants de reactstrap
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// Importations des icônes
import { AiFillSetting } from "react-icons/ai";

// Composant DropdownActions
const DropdownActions = ({ actions, callbacks, selectedRow, icons }) => {
  // État local pour gérer l'ouverture/fermeture du menu déroulant
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fonction pour basculer l'état du menu déroulant
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="d-flex justify-content-around align-items-center gap-2">
      {/* Menu déroulant */}
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
          <AiFillSetting /> Action
        </DropdownToggle>
        <DropdownMenu>
          {/* Mapper les actions et les callbacks sur les éléments du menu */}
          {actions.map((action, index) => (
            <DropdownItem
              key={index}
              disabled={action.disabled && !selectedRow} // Désactiver l'élément si l'action est désactivée et qu'aucune ligne n'est sélectionnée
              className={action.dangerous && selectedRow ? "text-danger" : ""} // Ajouter une classe de style pour les actions dangereuses si une ligne est sélectionnée
              onClick={callbacks[index]} // Appeler la fonction de callback correspondante à l'action
            >
              {icons[index]} {action.label}{" "}
              {/* Afficher l'icône et le label de l'action */}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropdownActions;
