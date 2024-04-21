import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { BsPersonAdd } from 'react-icons/bs';
import { BiEditAlt, BiXCircle } from 'react-icons/bi';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillSetting } from 'react-icons/ai';

const DropdownActions = ({ toggleModal, toggleModalUpdate, selectedRow, deleteFournisseur }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="d-flex justify-content-around align-items-center gap-2">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
          <AiFillSetting /> Action
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={toggleModal}>
            <BsPersonAdd /> Nouveau fournisseur
          </DropdownItem>
          <DropdownItem disabled={selectedRow ? false : true} onClick={toggleModalUpdate}>
            <BiEditAlt /> Mettre à jour
          </DropdownItem>
          <DropdownItem
            disabled={selectedRow ? false : true}
            className={selectedRow ? `text-danger` : 'text-muted'}
            onClick={(e) => deleteFournisseur(selectedRow.ID_Fournisseur)}
          >
            <BsFillTrashFill /> Supprimer
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropdownActions;