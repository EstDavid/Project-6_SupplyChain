pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'FactoryRole' to manage this role - add, remove, check
contract FactoryRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event FactoryAdded(address indexed account);
  event FactoryRemoved(address indexed account);

  // Define a struct 'factories' by inheriting from 'Roles' library, struct Role
  Roles.Role private factories;

  // In the constructor make the address that deploys this contract the 1st factory
  constructor() public {
    _addFactory(msg.sender);    
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyFactory() {
    require(isFactory(msg.sender));   
    _;
  }

  // Define a function 'isFactory' to check this role
  function isFactory(address account) public view returns (bool) {
    return factories.has(account);    
  }

  // Define a function 'addFactory' that adds this role
  function addFactory(address account) public onlyFactory {
    _addFactory(account);        
  }

  // Define a function 'renounceFactory' to renounce this role
  function renounceFactory() public {
    _removeFactory(msg.sender);    
  }

  // Define an internal function '_addFactory' to add this role, called by 'addFactory'
  function _addFactory(address account) internal {
    factories.add(account);
    emit FactoryAdded(account);
  }

  // Define an internal function '_removeFactory' to remove this role, called by 'removeFactory'
  function _removeFactory(address account) internal {
    factories.remove(account);
    emit FactoryRemoved(account); 
  }
}