pragma solidity ^0.4.11;
contract MarketPlace {
    struct Member {
        string name;
        string surname;
        string iddoc;
        int rating;
        bool fair;
        mapping (address => int) rated;
        mapping(uint => uint) itemList;
        uint itemco;
        mapping(uint => uint) adList;
        uint adco;
    }
    
    struct Item {
        address seller;
        string merch_type;
        uint quantity;
        uint price;
        string description;
        address acceptedby;
        bool sold;
        int feedback;
    }
    
    struct BuyerAd {
        address offerer;
        string merch_type;
        uint quantity;
        uint price;
        string description;
        uint acceptedOffer;
        mapping (uint => address) initems;
    }
    
    uint orderid;
    uint inquiryid;
    mapping (address => Member) members;
    mapping (uint => Item) items;
    mapping (uint => BuyerAd) all_ads;
    function NewMember(string name,string surname,string iddoc) public {
        members[msg.sender].name=name;
        members[msg.sender].surname=surname;
        members[msg.sender].iddoc=iddoc;
    }
    
    function GetMember(address m) public constant returns (string name, string surname, string id) {     
        Member mem = members[m];
        return (mem.name,mem.surname,mem.iddoc);
    }
    
    function AddItem(string merch_type,uint quantity,uint price,string description) public {
        uint id=orderid++;
        items[id].seller=msg.sender;
        items[id].merch_type=merch_type;
        items[id].quantity=quantity;
        items[id].price=price;
        items[id].description=description;
        items[id].sold=false;
        members[msg.sender].itemList[members[msg.sender].itemco++]=id;
    }
    
    function CountMyItems() public constant returns (uint count) {     
        count=members[msg.sender].itemco;
    }
    
    function GetMyItem(uint i) public constant returns (string merch_type, uint quantity, uint price,string description) {     
        uint uuid = members[msg.sender].itemList[i];
        Item item = items[uuid];
        return (item.merch_type, 
            item.quantity, 
            item.price, 
            item.description);
    }
    
    function CountMyAds() public constant returns (uint count) {     
        count=members[msg.sender].adco;
    }
    
    function GetMyAd(uint i) public constant returns (string merch_type, uint quantity, uint price,string description) {     
        uint uuid = members[msg.sender].adList[i];
        BuyerAd ad = all_ads[uuid];
        return (ad.merch_type, 
            ad.quantity, 
            ad.price, 
            ad.description);
            
    }
    
    function CountAllItems() public constant returns (uint count) {     
        count=orderid;
    }
    
    function CountAllAds() public constant returns (uint count) {     
        count=inquiryid;
    }
    
    function GetItem(uint i) public constant returns (uint id, address seller, string merch_type, uint quantity, uint price,string description,address soldto, int rating, bool sold) {     
        Item item = items[i];
        return (
            i,
            item.seller, 
            item.merch_type, 
            item.quantity, 
            item.price, 
            item.description,
            item.acceptedby,
            members[item.seller].rating,
            item.sold);
    }
    
    function GetAd(uint i) public constant returns (address offerer, string merch_type, uint quantity, uint price, string description,uint accepted , int rating) {     
        BuyerAd inq = all_ads[i];
        return (inq.offerer, inq.merch_type, 
            inq.quantity, 
            inq.price, 
            inq.description,
            inq.acceptedOffer,
            members[inq.offerer].rating);
    }
    
    function OrderFeedback(uint id, int f) public {
        if(f<-10){f=-10;}
        if(f>10){f=10;}
        if(items[id].acceptedby==msg.sender&&items[id].feedback==0)
        {
           items[id].feedback=f;
           members[items[id].acceptedby].rating+f;
        }
    }
    
    function AddBuyerAd(string merch_type,uint quantity,uint price,string description) public {
        uint id=inquiryid++;
        all_ads[id].offerer=msg.sender;
        all_ads[id].merch_type=merch_type;
        all_ads[id].quantity=quantity;
        all_ads[id].price=price;
        all_ads[id].description=description;
        members[msg.sender].adList[members[msg.sender].adco++]=id;
    } 
    
    function SendItem(uint idoffer, uint idinquiry) public {
        if(items[idoffer].seller==msg.sender)
        {
            all_ads[idinquiry].initems[idoffer]=msg.sender;
        }
    }
    
    function AcceptItem(uint idoffer, uint idinquiry) public {
        if(all_ads[idinquiry].offerer==msg.sender)
        {
            items[idoffer].acceptedby=msg.sender;
            all_ads[idinquiry].acceptedOffer=idoffer;
        }
    }
    
    function BuyItem(uint itemid) public {
        items[itemid].sold = true;
    }
    
    
    function BecomeFair() public {
        members[msg.sender].fair=true;
    }
    
    function Rate(address member, int rating) public {
        if(rating<-10){rating=-10;}
        if(rating>10){rating=10;}
        members[member].rated[msg.sender]=rating*(members[msg.sender].rating);
    }
   
}