#Blockchain History
Blockchain is a distributed database where all the transactions are recorded ever since the
blockchain is created. The database is replicated and shared among the network participants. The main
feature of blockchain is that it allows untrusted participants to communicate and send transactions
between each other in a secure way without the need of trusted third party. It ensures that no one
individual can modify or tamper with the data.


# CoinFlipper-Dapp

Coin Flipper is a classic Ethereum game where the user bet some amount and flips the coin,
if the coin turns even the user wins amount based on the bet ratio provided (1:2,1:3,1:4,1:8)
and if the user loses the bet, the amount goes to contract, ex-If the user bets 5ethers and
chooses bet ratio as 1:4 then if the user wins he will get 20 ethers (5*4 as per bet ratio) else
he will lose 5 ethers which will be sent to game contract address. It is built on Blockchain
technology which provides high security using SHA algorithms and solidity as a
programming language for creating smart contracts which runs on Ethereum Virtual
Machine(EVM).


# How to run a Project

1. open a terminal & clone the Flight_Dapp project in one directory & follow below commands:



      a. truffle compile    //compiles solidity file
  
  
  
      b. truffle migrate   // migrating all files in Private Blockchain i.e TESTRPC
  
  
      NOTE: Before Migration run TESTRPC in another Terminal by using command testrpc
 
 
      c. npm run dev    //pick the url:localhost:8080
  
  
  
  
 2. paste URL in any Browser
