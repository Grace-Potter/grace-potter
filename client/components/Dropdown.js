import React, {useState} from 'react'
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'

const myDropdown = ({handleChange, title, items}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggle = () => setDropdownOpen(prevState => !prevState)

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>{title}</DropdownToggle>
      <DropdownMenu>
        {items.map(item => (
          <DropdownItem
            key={item.id}
            value={item.id}
            name={item.category}
            onClick={handleChange}
          >
            {item.category}
          </DropdownItem>
        ))}
        <DropdownItem divider />
        <DropdownItem value={-1} name="All Products" onClick={handleChange}>
          All Products
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default myDropdown
