# Cacaco & Chocolate supply chain project
This repository contains an Ethereum DApp the demonstrates a Supply Chain flow from the moment a cacao farmer harvests the beans, to the moment a consumer purchases the chocolate made with those beans.

## Roles
There are 4 different roles in this DApp, apart from the owner of the contract:
- Farmer => A Farmer is able to harvest beans and provide the batch with the data of the Farm (Name, Information, Latitude and Longitude, as well as Notes about the bacth itself). After harvesting them, the Farmer is able to process them, pack them and then set a price and put them for sale.
- Factory => A Factory is able to buy beans which are for sale, grind them, make chocolate and them ship the chocolate to a Distributor of their choice. 
- Distributor => A Distributor is able to receive chocolate, give it a brand of their choice and put it up for sale.
- Consumer => A Consumer is able to purchase chocolate from a Distributor

## Activity Diagram

![activity diagram](images/Supplychain-Activity.png)

## Sequence Diagram

![sequence diagram](images/Supplychain-Sequence.png)

## State Diagram

![state diagram](images/Supplychain-State.png)

## Classes

![classes](images/Supplychain-Data Modelling.png)


## Frontend functionality
The frontend allows to try all functionailities of the Supply Chain. 

It is divided into 8 sections.

### Product Overview
The product overview allows to set the SKU and UPC of the batch we want to either process or view. The 'Fetch Data' button allows to view all the details of a certain batch on the 'Product Details' section
![product overview](images/frontend1.png)

### Role management
This section allows to interact with the roles of the smart contract and add new addresses to the different roles of the Supply Chain. From this section it is possible to add a new farmer, a new distributor or a new consumer.
![role management](images/frontend2.png)

### Product Details
Here it is possible to visualize all the different attributes of a specific batch. We select the batch we want to see in the 'Product Overview' section and click on the 'Fetch Data' button. This button call as javascript function which collects all data from the fetchItemBufferOne, fetchItemBufferTwo and fetchItemBufferThree functions of the smart contract.
![product details](images/frontend3.png)

### Farm Details
Here the farmer is able to add the information about the farm. This information will remain unchanged for that specific batch of beans/chocolate
![farm details](images/frontend4.png)

### Cacao Beans Details
This section allows the farmer to input the information about a specific batch of beans (Product Notes), as well as the price for that batch.
It also contains the 'Buy beans' button which allows a factory to buy a batch of beans. After this, the factory is able to use the 'Grind beans' and 'Make chocolate' functions.
![cacao beans details](images/frontend5.png)

### Send Chocolate to Distributor
This field is used by a factory to send a batch of chocolate to a distributor
![send chocolate to distributor](images/frontend6.png)

### Receive, Brand and Sell Chocolate
In this section a distributor is able to use the 'Receive chocolate' function, define a chocolate brand for a btach of chocolate and put it up for sale.
The 'Purchase chocolate' button is used by the consumer to buy chocolate
![receive brand and sell chocolate](images/frontend7.png)

### Transaction History
Here is possible to see all the events generated during a session interactin with the supply chain
![transaction history](images/frontend8.png)



# Supply chain & data auditing

This repository containts an Ethereum DApp that demonstrates a Supply Chain flow between a Seller and Buyer. The user story is similar to any commonly used supply chain process. A Seller can add items to the inventory system stored in the blockchain. A Buyer can purchase such items from the inventory system. Additionally a Seller can mark an item as Shipped, and similarly a Buyer can mark an item as Received.

The DApp User Interface when running should look like...

![truffle test](images/ftc_product_overview.png)

![truffle test](images/ftc_farm_details.png)

![truffle test](images/ftc_product_details.png)

![truffle test](images/ftc_transaction_history.png)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Please make sure you've already installed ganache-cli, Truffle and enabled MetaMask extension in your browser.

```
Give examples (to be clarified)
```

### Installing

A step by step series of examples that tell you have to get a development env running

Clone this repository:

```
git clone https://github.com/udacity/nd1309/tree/master/course-5/project-6
```

Change directory to ```project-6``` folder and install all requisite npm packages (as listed in ```package.json```):

```
cd project-6
npm install
```

Launch Ganache:

```
ganache-cli -m "spirit supply whale amount human item harsh scare congress discover talent hamster"
```

Your terminal should look something like this:

![truffle test](images/ganache-cli.png)

In a separate terminal window, Compile smart contracts:

```
truffle compile
```

Your terminal should look something like this:

![truffle test](images/truffle_compile.png)

This will create the smart contract artifacts in folder ```build\contracts```.

Migrate smart contracts to the locally running blockchain, ganache-cli:

```
truffle migrate
```

Your terminal should look something like this:

![truffle test](images/truffle_migrate.png)

Test smart contracts:

```
truffle test
```

All 10 tests should pass.

![truffle test](images/truffle_test.png)

In a separate terminal window, launch the DApp:

```
npm run dev
```

## Built With

* [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
* [IPFS](https://ipfs.io/) - IPFS is the Distributed Web | A peer-to-peer hypermedia protocol
to make the web faster, safer, and more open.
* [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.


## Authors

See also the list of [contributors](https://github.com/your/project/contributors.md) who participated in this project.

## Acknowledgments

* Solidity
* Ganache-cli
* Truffle
* IPFS
