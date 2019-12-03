import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export const ActionList = ({id}:{id: string}) => {
  const [dropdownOpen, setToggle] = useState(false);
  return (
    <ButtonDropdown size="sm" isOpen={dropdownOpen} toggle={() => setToggle(!dropdownOpen)}>
      <DropdownToggle caret>
        Manage
        </DropdownToggle>
      <DropdownMenu>
        <DropdownItem tag={Link} to={`/view/${id}`}>View</DropdownItem>
        {/* <DropdownItem divider /> */}
        {/* <DropdownItem>Delete</DropdownItem> */}
      </DropdownMenu>
    </ButtonDropdown>
  );
}