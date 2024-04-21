import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { BsPersonAdd } from "react-icons/bs";
import { BiEditAlt, BiXCircle } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";

const DropdownActions = ({ actions, callbacks, selectedRow, icons }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="d-flex justify-content-around align-items-center gap-2">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
          <AiFillSetting /> Action
        </DropdownToggle>
        <DropdownMenu>
          {actions.map((action, index) => (
            <DropdownItem
              key={index}
              disabled={action.disabled && !selectedRow}
              className={action.dangerous && selectedRow ? "text-danger" : ""}
              onClick={callbacks[index]}
            >
              {icons[index]} {action.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropdownActions;
