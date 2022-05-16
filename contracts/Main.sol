// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "./Ownable.sol";
contract Main is Ownable {
    
    
     struct document {
        uint64 adhaarId;
        string ipfsHash;
        address uploader;
        string uploaderName;
        string dateUploaded;
        bool verified;
    }

    //map document with the adhaarId
    mapping(uint64=>document) internal userToDoc;
    //map address with institue name
    mapping(address=>uint8) internal institute;

    modifier validInstitute(){
        require(institute[msg.sender]==1,"Please Verify Your institute !");
        _;
    }

    /* Stores the newly created document details */
    function StoreDocument(
        string memory _ipfsHash, 
        string memory _uploadDate,
        uint64 _userId,
        string memory _uploader
    ) external validInstitute
    {
        userToDoc[_userId]=document(_userId ,_ipfsHash,msg.sender, _uploader,_uploadDate,false);
    }

    function ownerVerification(address _add) public onlyOwner {
        institute[_add]=1;
    }

    function verify(string memory _newHash,uint64 _adhaar) public 
    {
        require (keccak256(abi.encodePacked((_newHash))) == keccak256(abi.encodePacked((userToDoc[_adhaar].ipfsHash))),"Scam");
        userToDoc[_adhaar].verified=true;
    }

    modifier userVerified(uint64 _adhaar){
        require(userToDoc[_adhaar].verified,"Verify First");
        _;
    }

    //get document info
    function GetDoc(uint64 _adhaar) view public userVerified(_adhaar) returns(document memory)
    {
        return userToDoc[_adhaar];
    }
}