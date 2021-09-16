## Don't know how to allow the user to specify an Ether amount on Metamask

On the front end, I can't find how you can allow the user to specify the ether ammount when the Metamask transaction window pops up.
If I use the starter code provided, a fixed amount of 3 eth is specified, but it is not possible to change it

```
        App.contracts.SupplyChain.deployed().then(function(instance) {
            const walletValue = web3.toWei('3', "ether");
            return instance.buyBeans(App.upc, {from: App.metamaskAccountID, value: walletValue});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('buyBeans',result);
        }).catch(function(err) {
            console.log(err.message);
        });
```

If I change the line that calls the buyBeans function and take out the value argument, then a 0 eth shows up in the Metamask window, but I am not abel to change it

```
            return instance.buyBeans(App.upc, {from: App.metamaskAccountID});

```

## The contract on the front end does not transfer any ether to the farmer

Another issue I'm having with the front end is that the payable functions are being executed, but no eth value is being transferred from the buyer to the seller ( I am useing the value: walletValue to make sure the transaction works)

This is odd because in the tests I have been checking that the seller was being transferred an amount equal to the price of the product and this was not an issue.

