App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    originFarmerID: "0x0000000000000000000000000000000000000000",
    originFarmName: null,
    originFarmInformation: null,
    originFarmLatitude: null,
    originFarmLongitude: null,
    productNotes: null,
    productPrice: 0,
    distributorID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",

    init: async function () {
        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originFarmerID = $("#originFarmerID").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude = $("#originFarmLatitude").val();
        App.originFarmLongitude = $("#originFarmLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.beansPrice = $("#beansPrice").val();
        App.factoryID = $("#factoryID").val();
        App.distributorID = $("#distributorID").val();
        App.chocolateBrand = $("#chocolateBrand").val();
        App.consumerID = $("#consumerID").val();
        App.chocolatePrice = $("#chocolatePrice").val();

        console.log(
            App.sku,
            App.upc,
            App.ownerID, 
            App.originFarmerID, 
            App.originFarmName, 
            App.originFarmInformation, 
            App.originFarmLatitude, 
            App.originFarmLongitude, 
            App.productNotes, 
            App.beansPrice, 
            App.factoryID, 
            App.distributorID, 
            App.consumerID,
            App.chocolateBrand,
            App.chocolatePrice
        );
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        }

        App.getMetaskAccountID();

        return App.initSupplyChain();
    },

    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        web3.eth.getAccounts(function(err, res) {
            if (err) {
                console.log('Error:',err);
                return;
            }
            console.log('getMetaskID:',res);
            App.metamaskAccountID = res[0];

        })
    },

    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain='build/contracts/SupplyChain.json';
        
        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function(data) {
            // console.log('data',data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);
            
            App.fetchEvents();
        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        event.preventDefault();

        App.getMetaskAccountID();

        var processId = parseInt($(event.target).data('id'));
        // console.log('processId',processId);

        switch(processId) {
            case 1:
                return await App.harvestBeans(event);
                break;
            case 2:
                return await App.processBeans(event);
                break;
            case 3:
                return await App.packBeans(event);
                break;
            case 4:
                return await App.sellBeans(event);
                break;
            case 5:
                return await App.buyBeans(event);
                break;
            case 6:
                return await App.grindBeans(event);
                break;
            case 7:
                return await App.makeChocolate(event);
                break;
            case 8:
                return await App.shipChocolate(event);
                break;
            case 9:
                return await App.receiveChocolate(event);
                break;
            case 10:
                return await App.brandChocolate(event);
                break;
            case 11:
                return await App.sellChocolate(event);
                break;
            case 12:
                return await App.purchaseItem(event);
                break;
            case 13:
                return await App.displayProductInfo(event);
                break;
            case 14:
                return await App.addFarmer(event);
                break;
            case 15:
                return await App.addFactory(event);
                break;
            case 16:
                return await App.addDistributor(event);
                break;
            case 17:
                return await App.addConsumer(event);
                break;
            }
    },

    harvestBeans: function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.harvestBeans(
                App.upc, 
                App.metamaskAccountID, 
                App.originFarmName, 
                App.originFarmInformation, 
                App.originFarmLatitude, 
                App.originFarmLongitude, 
                App.productNotes,
                {from: App.metamaskAccountID}
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('harvestBeans',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    processBeans: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.processBeans(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('processBeans',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    
    packBeans: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.packBeans(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            // console.log('packBeans',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    sellBeans: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            const beansPriceWei = web3.toWei(App.beansPrice.toString(), "ether");
            // console.log('productPrice',beansPriceWei);
            return instance.sellBeans(App.upc, beansPriceWei, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            // console.log('sellBeans',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    buyBeans: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            const walletValue = web3.toWei('3', "ether");
            return instance.buyBeans(App.upc, {from: App.metamaskAccountID, value: walletValue});
        }).then(function(result) {
            $("#ftc-item").text(result);
            // console.log('buyBeans',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    grindBeans: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.grindBeans(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            // console.log('grindBeans',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    makeChocolate: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.makeChocolate(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            // console.log('makeChocolate',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    shipChocolate: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.shipChocolate(App.upc, App.distributorID, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            // console.log('shipChocolate',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    receiveChocolate: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.receiveChocolate(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            // console.log('receiveChocolate',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    brandChocolate: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.brandChocolate(App.upc, App.chocolateBrand, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            // console.log('brandChocolate',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    sellChocolate: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            const chocolatePriceWei = web3.toWei(App.chocolatePrice.toString(), "ether");
            return instance.sellChocolate(App.upc, chocolatePriceWei, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            // console.log('sellChocolate',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    purchaseItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.readForm();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            const walletValue = web3.toWei('3', "ether");
            return instance.purchaseItem(App.upc, {from: App.metamaskAccountID, value: walletValue});
        }).then(function(result) {
            $("#ftc-item").text(result);
            // console.log('purchaseItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    fetchItemBufferOne: function () {
    ///   event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
        App.upc = $('#upc').val();
        // console.log('upc',App.upc);
        const skuText = document.getElementById("skuOutput");
        const upcText = document.getElementById("upcOutput");
        const ownerIDText = document.getElementById("ownerIDOutput");
        const originFarmerIDText = document.getElementById("originFarmerIDOutput");
        const originFarmNameText = document.getElementById("originFarmNameOutput");
        const originFarmInformationText = document.getElementById("originFarmInformationOutput");

        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemBufferOne(App.upc);
        }).then(function(result) {
            skuText.innerText = result[0];
            upcText.innerText = result[1];
            ownerIDText.innerText = result[2];
            originFarmerIDText.innerText = result[3];
            originFarmNameText.innerText = result[4];
            originFarmInformationText.innerText = result[5];
            $("#ftc-item").text(result);
            // console.log('fetchItemBufferOne', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchItemBufferTwo: function () {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
    const originFarmLatitudeText = document.getElementById("originFarmLatitudeOutput");
    const originFarmLongitudeText = document.getElementById("originFarmLongitudeOutput");
    const productIDText = document.getElementById("productIDOutput");
    const productNotesText = document.getElementById("productNotesOutput");
    const productPriceText = document.getElementById("productPriceOutput");
                        
        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemBufferTwo.call(App.upc);
        }).then(function(result) {
            originFarmLatitudeText.innerText = result[2];
            originFarmLongitudeText.innerText = result[3];
            productIDText.innerText = result[4];
            productNotesText.innerText = result[5];
            productPriceText.innerText = web3.fromWei(result[6].toString(), 'ether');
            $("#ftc-item").text(result);
            // console.log('fetchItemBufferTwo', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchItemBufferThree: function () {
        ///    event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));
        const itemStateText = document.getElementById("itemStateOutput");
        const factoryIDText = document.getElementById("factoryIDOutput");
        const distributorIDText = document.getElementById("distributorIDOutput");
        const chocolateBrandText = document.getElementById("chocolateBrandOutput");
        const consumerIDText = document.getElementById("consumerIDOutput");

            App.contracts.SupplyChain.deployed().then(function(instance) {
              return instance.fetchItemBufferThree.call(App.upc);
            }).then(function(result) {
                var itemStateName;

                switch(parseInt(result[2])) {
                    case 0:
                        itemStateName = "Beans Harvested";
                        break;
                    case 1:
                        itemStateName = "Beans Processed";
                        break;
                    case 2:
                        itemStateName = "Beans Packed";
                        break;
                    case 3:
                        itemStateName = "Beans For Sale";
                        break;
                    case 4:
                        itemStateName = "Beans Sold";
                        break;
                    case 5:
                        itemStateName = "Beans Ground";
                        break;
                    case 6:
                        itemStateName = "Chocolate Made";
                        break;
                    case 7:
                        itemStateName = "Chocolate Shipped";
                        break;
                    case 8:
                        itemStateName = "Chocolate Received";
                        break;
                    case 9:
                        itemStateName = "Chocolate Branded";
                        break;
                    case 10:
                        itemStateName = "Chocolate For Sale";
                        break;
                    case 11:
                        itemStateName = "Chocolate Sold";
                        break;
                }

                itemStateText.innerText = itemStateName;
                factoryIDText.innerText = result[3];
                distributorIDText.innerText = result[4];
                chocolateBrandText.innerText = result[5];
                consumerIDText.innerText = result[6];
                $("#ftc-item").text(result);
                // console.log('fetchItemBufferThree', result);
            }).catch(function(err) {
              console.log(err.message);
            });
    },

    displayProductInfo: function (event) {
        event.preventDefault();
        App.readForm();

        App.fetchItemBufferOne();
        App.fetchItemBufferTwo();
        App.fetchItemBufferThree();
    },

    addFarmer: function (event) {
        event.preventDefault();
        App.readForm();

        // console.log(App.originFarmerID);

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.addFarmer(App.originFarmerID, {from: App.metamaskAccountID});
          }).then(function(result) {
              $("#ftc-item").text(result);
            //   console.log('addFarmer', result);
          }).catch(function(err) {
            console.log(err.message);
          });        
    },

    addFactory: function (event) {
        event.preventDefault();
        App.readForm();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.addFactory(App.factoryID, {from: App.metamaskAccountID});
          }).then(function(result) {
              $("#ftc-item").text(result);
            //   console.log('addFactory', result);
          }).catch(function(err) {
            console.log(err.message);
          });        
    },

    addDistributor: function (event) {
        event.preventDefault();
        App.readForm();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.addDistributor(App.distributorID, {from: App.metamaskAccountID});
          }).then(function(result) {
              $("#ftc-item").text(result);
            //   console.log('addDistributor', result);
          }).catch(function(err) {
            console.log(err.message);
          });        
    },

    addConsumer: function (event) {
        event.preventDefault();
        App.readForm();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.addConsumer(App.consumerID, {from: App.metamaskAccountID});
          }).then(function(result) {
              $("#ftc-item").text(result);
            //   console.log('addConsumer', result);
          }).catch(function(err) {
            console.log(err.message);
          });        
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                App.contracts.SupplyChain.currentProvider,
                    arguments
              );
            };
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
        var events = instance.allEvents(function(err, log){
          if (!err)
            $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
        });
        }).catch(function(err) {
          console.log(err.message);
        });
        
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
