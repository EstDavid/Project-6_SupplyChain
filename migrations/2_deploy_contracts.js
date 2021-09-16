// migrating the appropriate contracts
var FarmerRole = artifacts.require("./FarmerRole.sol");
var FactoryRole = artifacts.require("./FactoryRole.sol");
var DistributorRole = artifacts.require("./DistributorRole.sol");
var ConsumerRole = artifacts.require("./ConsumerRole.sol");
var SupplyChain = artifacts.require("./SupplyChain.sol");

module.exports = function(deployer) {
  deployer.deploy(FarmerRole);
  deployer.deploy(FactoryRole);
  deployer.deploy(DistributorRole);
  deployer.deploy(ConsumerRole);
  deployer.deploy(SupplyChain);
};