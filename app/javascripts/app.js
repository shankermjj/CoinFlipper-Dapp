// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";
// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import coinflipper_artifacts from '../../build/contracts/CoinFlipper.json'
import '../../node_modules/materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize.js' 
// MetaCoin is our usable abstraction, which we'll use through the code below.
var CoinFlipper = contract(coinflipper_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var sim;
var result;
if(sessionStorage.getItem("flag")=="undefined")
{
sessionStorage.setItem("flag","0");
 }               /* On click of button spin coin ainamtion */
 

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    CoinFlipper.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      
      CoinFlipper.deployed().then(function(instance) {
            sim = instance;
            $("#contractaddress").text(sim.address);

        }).catch(function(e) {
            console.log(e);
        });
      accounts = accs;
      account = accounts[0];
      
      self.refreshBalance();
      console.log(account);
      $("#add").text(web3.eth.accounts[0]);
      $("#add2").text(web3.eth.accounts[0]);
    });
   },


   setStatus: function(message) {
    var status = document.getElementById("bet");
    status.innerHTML = message;
  },

  
  coinToss: function() {  
             var coin = document.getElementById('coin');
             var button = document.getElementById('button');
             var result = document.getElementById('bet');
  
                    /* Random number 0 or 1  */
                    result.innerHTML = "FLIPPING";
                    coin.classList.add("animate-coin");

                    setTimeout(function() {
                        coin.classList.remove("animate-coin");
                        //....and whatever else you need to do
                    }, 2100);

                },



                refreshBalance: function() {
    var self = this;

    var meta;
    CoinFlipper.deployed().then(function(instance) {
      meta = instance;
      return meta.getBalance.call({from: account});
    }).then(function(value) {
    alert("Updated Balance"+value);
      var balance_element = document.getElementById("Balance");
      balance_element.innerHTML = value;
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
  },

 registerUser:   function() {
                var self=this; 
                var address = account;
                var name=document.getElementById('name').value;
                alert(address);
   var password = document.getElementById('password').value;
    var self = this;
        var h;
    var meta;
    CoinFlipper.deployed().then(function(instance) {
      meta = instance;
      return meta.register(account,name,password)}).
      then (function(value){
          if(value=="true")
          {
            
          }
          else
          {
            Materialize.toast("Not registered!Try agin if not Register",2000);
          }
      
      }).
      catch(function(e) {
      console.log(e);
        Materialize.toast("Errro",2000);
    }); },
    
    
    
    deployBalance: function() {
    var self = this;

    var meta;
    CoinFlipper.deployed().then(function(instance) {
      meta = instance;  
      var amnt=9999999999;
      return meta.balanceDeploy({from: account,value:amnt,gas:3000000}).then(function () {
        var game=document.getElementById("game");
        var deploy=document.getElementById("deploy");
        game.style.display='block';
        deploy.style.display='none';
        
        App.refreshBalance();
      });
    }).catch(function(e) {
      console.log(e);
      self.setStatus("unable to deploy money");
    });
  },



 checkLogin:   function() {
                var self=this; 
                var address = document.getElementById('address');
   var password = document.getElementById('password').value;
    var self = this;
        var h;
    var meta;
    CoinFlipper.deployed().then(function(instance) {
      meta = instance;
      return meta.checkLogin.call(address,password)}).
      then (function(value){
          if(value=="true")
          {
             window.location="index.html";
          }
          else
          {
            Materialize.toast("Invalid UserCredentials!Try agin if not Register",2000);
          }
      
      }).
      catch(function(e) {
      console.log(e);
      self.setStatus("Unable to fetch details!please try again");
    }); },



   flip:   function() {
                var self=this; 
                var coin = document.getElementById('coin');
   var button = document.getElementById('button');
    var result = document.getElementById('bet');
  

                    button.style.display = 'none';
                    self.coinToss();
                    setTimeout(function() {
                        button.style.display = 'block';
                        //....and whatever else you need to do
                    }, 4000);
                  // body...
                },          

   BetAndFlip: function(amount) 
    {
        var self = this;
        var h;
    var meta;
    CoinFlipper.deployed().then(function(instance) {
      meta = instance;
      return meta.betAndFlip(amount,{from:account,value:amount,gas:3000000});
         
    }).then(function() {
      Materialize.toast("Transaction completed Flipping intiates",2000);
      self.flip();
      
      return meta.getLastResult.call().then(function(value) {
        
        var result=document.getElementById('bet');
        result.innerHTML=value;
        setTimeout(function() {
                        //....and whatever else you need to do
                        
                        App.refreshBalance();
                    }, 3000);
        
      })
    }).catch(function(e) {
      console.log(e);
       var result=document.getElementById('bet');
        result.innerHTML=value;
      self.setStatus("Error sending coin; see log.");
    }); 
    }
   
}
window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }

  App.start();
 $("#login").click(function(){
   Materialize.toast("Login clicked",500);
   App.checkLogin();  
  });
  
  
  $("#register").click(function(){
   Materialize.toast("Register",500);
   App.registerUser();  
  });

 $("#button").click(function(){
  var val = $("#amount").val();
  App.BetAndFlip(val);

   Materialize.toast("Betting initiated",2000);  
  });
  
  
  $("#Deploy").click(function(){
   Materialize.toast("Execute transaction in metamask to play game",500);
   sessionStorage.setItem("flag","1");
   App.deployBalance();  
  });
  
});
