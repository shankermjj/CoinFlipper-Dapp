pragma solidity ^0.4.19;
contract CoinFlipper {
    address creator;
    int lastgainloss;
    string indicator="=";
    address coin;
    string public lastresult;
    int tid=1;
    uint lastblocknumberused;
    bytes32 lastblockhashused;
    
    function CoinFlipper() public payable
    {
        creator = msg.sender;
        lastresult ="no wagers yet";
        lastgainloss = 0;
        coin=this;
    
    }
    function getBalance() public view returns (uint)
    {
        return coin.balance;
    }
    function balanceDeploy() public payable 
    {
        
    }
    
    function sha(uint128 wager) constant public returns(uint256)
    {
        return uint256(keccak256(block.difficulty,block.coinbase,now,lastblockhashused,wager));
        
    }
    
    function betAndFlip() public payable
    {
        if(msg.value > 34028236692093846337463374607431768211455)
        {
            lastresult = "wager too large";
            lastgainloss = 0;
            msg.sender.transfer(msg.value);
            
            return;
        }
        else if((msg.value * 2)> coin.balance)
        {
            lastresult="wager too large than contract's ability to pay";
            lastgainloss = 0;
            msg.sender.transfer(msg.value);
            return;
        }
        else if(msg.value==0)
        {
            lastresult = "wager was zero";
            lastgainloss = 0;
            return;
        }
        uint128 wager = uint128(msg.value);
        
        lastblocknumberused = block.number -1;
        lastblockhashused = block.blockhash(lastblocknumberused);
        uint128 lastblockhashused_uint = uint128(lastblockhashused) + wager;
        uint  hashymchasterton = sha(lastblockhashused_uint);
        
        if(hashymchasterton%2 == 0)
        {
            lastgainloss = int(wager) ;
            lastresult ="loss";
            indicator="+";
            recordTransactions();
            
            return;
        }
        else
        {
            lastgainloss = wager;
            lastresult = "win";
            recordTransactions();
            indicator="-";
            msg.sender.transfer(wager * 2);
            
        }
        
    }
    
    
 struct Transactions {
        address _address;
        string result;
        int amount;
        uint contractBal;
    }
    
     struct  Users {
        string name ;
        string password;
    }
    
    mapping (address => Users) users;
    address[] public Useraccnts;
    
    function getCountOfUsers() public view returns (uint){
        
        return Useraccnts.length;
    }
    function checkLogin(address _address,string _password) public view returns (string){
        
        if(checkUser(_address))
        {
            Users storage myuser=users[_address];
            if(keccak256(myuser.password)==keccak256(_password))
            {
               return "true";
            }
            else
            {
                return "wrong password";
            }
                
        }
        else{
            return "false";
        }
    }
    
    
    function  getUser(address _address)  public view returns(string) {
        
        return (users[_address].name);
    }

    function register(address _address,string _name,string _password) public returns (string)
    {
         if(!checkUser(_address))
        {    
            Useraccnts.push(_address)-1;
              Users  storage myuser=users[_address];
              myuser.name=_name;
              myuser.password=_password;
            
            return "Registered";
        }
        else
        {
            return "NotRegistered";
        }

    }
    
    function checkUser(address input) view public returns(bool)
    {
        for(uint i=0;i<Useraccnts.length;i++)
        {
            if(input==Useraccnts[i])
            {
                return true;
            }
        }
        return false;
        
    }
    
    mapping (int => Transactions) transactions;
    int[]  public Transactionsaccnts;
    
    function recordTransactions() private {
     Transactions storage transactor = transactions[tid];
      transactor._address=msg.sender;    
      transactor.amount=lastgainloss;
      transactor.result=lastresult;
      transactor.contractBal=coin.balance;
        Transactionsaccnts.push(tid)-1;
        tid=tid+1;
    }
    

    function transactionDet(int fId)  public view returns(address,int,string,uint)
    {
        Transactions storage transactor = transactions[fId];
        return (transactor._address,transactor.amount,transactor.result,transactor.contractBal);
    }
    function getTotalTransactions() view public returns(int[]) {
        return Transactionsaccnts;
    }
    

    
    function gamesPlayed() view public returns (uint) {
        return Transactionsaccnts.length;
    }
    
    
    
    function getLastBlockNumberUsed() public view returns (uint)
    {
        return lastblocknumberused;
    }
    function getLastBlockHashedUsed() public constant returns (bytes32)
    {
        return lastblockhashused;
    }
    function getLastResult() public view returns (string)
    {
        return lastresult;
    }
    function getLastBetValue()  public view returns (int)
    {
        return lastgainloss;
    }
    function kill() public
    {
        if(msg.sender == creator){
            selfdestruct(creator);
        }
    }
}
