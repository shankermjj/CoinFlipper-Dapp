pragma solidity ^0.4.19;

contract HelloWorld
{
   string public str="THIS IS MY FIRST SOLIDITY";
   
   
   function getResult() public view returns (string)
   {
       return str;
   }
   
}

