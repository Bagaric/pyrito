// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';

/*
 * When you compile and deploy your MarketPlace contract,
 * truffle stores the abi and deployed address in a json
 * file in the build directory. We will use this information
 * to setup a MarketPlace abstraction. We will use this abstraction
 * later to create an instance of the MarketPlace contract.
 */
import marketplace_artifacts from '../../build/contracts/MarketPlace.json';


var MarketPlace = contract(marketplace_artifacts);
var clickedItem = undefined;

window.saveItem = function() {

  let merch_type = $("#merchandiseType").val();
  let quantity = $("#merchandiseQuantity").val();
  let price = $("#merchandisePrice").val();
  let description = $("#merchandiseDescription").val();

  try {
    $("#msg").html("You item has been added.")
    $("#merchandiseType").val("");
    $("#merchandiseQuantity").val("");
    $("#merchandisePrice").val("");
    $("#merchandiseDescription").val("");

    /* MarketPlace.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
     */
    MarketPlace.deployed().then(function(contractInstance) {
      contractInstance.AddItem(merch_type, quantity, price, description, {gas: 3000000, from: web3.eth.accounts[0]}).then(function() {
        console.log("Added.");
        window.fetchItems();
      });
    });
  } catch (err) {
    console.log(err);
  }
}

window.fetchItems = function () {
  MarketPlace.deployed().then(function(contractInstance) {
    contractInstance.CountMyItems({gas: 100000, from: web3.eth.accounts[0]}).then(function(data) {

      let totalItems = parseInt(data.toString());
      $("#totalItems").html(data.toString());
      let fetchItemsNum = totalItems;

      console.log("Number of items: " + fetchItemsNum);

      // if (totalItems > 5) {
      //   fetchItemsNum = 5;
      //   $("#totalItems").append(" (showing only first 5)")
      // }

      $("#itemList").html("");

      for (var i = 0; i < fetchItemsNum; i++) {
        contractInstance.GetMyItem.call(i).then(function(data) {
          let merch_type = data[0];
          let quantity = data[1];
          let price = data[2];
          let sold_to = data[3];
          let description = data[4];
          let sold = data[5];

          console.log("Iterating item: " + i);

          /*<tr>
            <th scope="row">1</th>
            <td>Title</td>
            <td>Text</td>
          </tr>*/
          if (!sold){
            $("#itemList").append('<tr><th scope="row">' + merch_type + '</th><td>' + quantity + '</td><td>' + price + '</td></tr>');
          }
        });
      }

    });
  });
}

window.saveAd = function() {

  let merch_type = $("#merchandiseType").val();
  let quantity = $("#merchandiseQuantity").val();
  let price = $("#merchandisePrice").val();
  let description = $("#merchandiseDescription").val();

  try {
    $("#msg").html("You item has been added.")
    $("#merchandiseType").val("");
    $("#merchandiseQuantity").val("");
    $("#merchandisePrice").val("");
    $("#merchandiseDescription").val("");

    /* MarketPlace.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
     */
    MarketPlace.deployed().then(function(contractInstance) {
      contractInstance.AddBuyerAd(merch_type, quantity, price, description, {gas: 3000000, from: web3.eth.accounts[0]}).then(function() {
        console.log("Added.");
        window.fetchAds();
      });
    });
  } catch (err) {
    console.log(err);
  }
}

window.fetchAds = function () {
  MarketPlace.deployed().then(function(contractInstance) {
    contractInstance.CountMyAds({gas: 100000, from: web3.eth.accounts[0]}).then(function(data) {

      let totalAds = parseInt(data.toString());
      $("#totalAds").html(data.toString());
      let fetchAdsNum = totalAds;

      console.log("Number of ads: " + fetchAdsNum);

      // if (totalAds > 5) {
      //   fetchAdsNum = 5;
      //   $("#totalAds").append(" (showing only first 5)")
      // }

      $("#adsList").html("");

      for (var i = 0; i < fetchAdsNum; i++) {
        contractInstance.GetMyAd.call(i).then(function(data) {
          let merch_type = data[0];
          let quantity = data[1];
          let price = data[2];
          let description = data[3];

          console.log("Iterating ad: " + i);

          /*<tr>
            <th scope="row">1</th>
            <td>Title</td>
            <td>Text</td>
          </tr>*/
          $("#adsList").append('<tr><th scope="row">' + merch_type + '</th><td>' + quantity + '</td><td>' + price + '</td><td>' + description + '</td></tr>');
        });
      }

    });
  });
}

window.fetchAllItems = function () {
  MarketPlace.deployed().then(function(contractInstance) {
    contractInstance.CountAllItems({gas: 100000, from: web3.eth.accounts[0]}).then(function(data) {

      let allItems = parseInt(data.toString());
      $("#allItems").html(data.toString());
      let fetchAllItemsNum = allItems;

      console.log("Number of all items: " + fetchAllItemsNum);

      // if (allAds > 5) {
      //   fetchAllItemsNum = 5;
      //   $("#allAds").append(" (showing only first 5)")
      // }

      $("#allItemsList").html("");

      for (var i = 0; i < fetchAllItemsNum; i++) {
        contractInstance.GetItem.call(i).then(function(data) {
          console.log(data);

          let id = data[0];
          let seller = data[1];
          let merch_type = data[2];
          let quantity = data[3];
          let price = data[4];
          let description = data[5];
          let sold_to = data[6];
          let rating = data[7];
          let sold = data[8];

          console.log("Iterating item: " + i);

          /*<tr>
            <th scope="row">1</th>
            <td>Title</td>
            <td>Text</td>
          </tr>*/
          console.log(sold);
          if (!sold) {
            $("#allItemsList").append('<tr><td scope="row">' + seller + '</td><td><i class="icon ion-android-star text-warning"></i> 5</td><td>' + merch_type + '</td><td>' + quantity + ' oz</td><td>' + price + '</td><td>' + description + '</td><td><button class="btn btn-success" onclick="buyItem(' + id + ')">Buy</button></td</tr>');
          }
        });
      }

    });
  });
}

window.fetchAllAds = function () {
  MarketPlace.deployed().then(function(contractInstance) {
    contractInstance.CountAllAds({gas: 100000, from: web3.eth.accounts[0]}).then(function(data) {

      let allAds = parseInt(data.toString());
      $("#allAds").html(data.toString());
      let fetchAllAdsNum = allAds;

      console.log("Number of all ads: " + fetchAllAdsNum);

      // if (allAds > 5) {
      //   fetchAllAdsNum = 5;
      //   $("#allAds").append(" (showing only first 5)")
      // }

      $("#allAdsList").html("");

      for (var i = 0; i < fetchAllAdsNum; i++) {
        contractInstance.GetAd.call(i).then(function(data) {

          let seller = data[0];
          let merch_type = data[1];
          let quantity = data[2];
          let price = data[3];
          let description = data[4];
          let rating = data[5];

          console.log("Iterating ad: " + i);

          /*<tr>
            <th scope="row">1</th>
            <td>Title</td>
            <td>Text</td>
          </tr>*/
          $("#allAdsList").append('<tr><th scope="row">' + seller + '</th><td>' + merch_type + '</td><td>' + quantity + '</td><td>' + price + '</td><td>' + description + '</td></tr>');
        });
      }

    });
  });
}

window.buyItem = function (id ){
  clickedItem = id;
  console.log(clickedItem);
  MarketPlace.deployed().then(function(contractInstance) {
    console.log(clickedItem);
    contractInstance.BuyItem(clickedItem, {gas: 100000, from: web3.eth.accounts[0]}).then(function(data) {
      console.log("BuyItem: " + data);
      window.fetchAllItems();
      clickedItem = undefined;
    });
  });
}

$( document ).ready(function() {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to https://blockchain.josephit.com:443. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("https://blockchain.josephit.com:443"));
  }

  MarketPlace.setProvider(web3.currentProvider);

  window.fetchItems();
  window.fetchAds();
  window.fetchAllItems();
  window.fetchAllAds();
  
});