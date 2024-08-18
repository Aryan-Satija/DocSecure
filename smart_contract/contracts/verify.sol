// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract documentVerify{
    address public owner;

    constructor(){
        owner = msg.sender;
    }
    
    uint256 public docCnt;
    
    event doc_entry(address from, string name, string doc_hash, string public_key);

    struct document_structure{
        address creator;
        string name;
        string doc_hash;
        string public_key;
    }

    document_structure[] docs;

    function secureDocuments(
        string[] memory doc_hash, 
        string[] memory name, 
        string[] memory public_key
    ) public {
        require(doc_hash.length == name.length && name.length == public_key.length, "Input Data Inconsistent");
        
        for (uint256 i = 0; i < doc_hash.length; i++) {
            docCnt += 1;
            docs.push(document_structure(msg.sender, name[i], doc_hash[i], public_key[i]));
            emit doc_entry(msg.sender, name[i], doc_hash[i], public_key[i]);
        }
    }

    function validateDocuments(string[] memory doc_hashes, string memory public_key) public view returns(uint256[] memory) {
        uint256[] memory isFake = new uint256[](doc_hashes.length);
        for (uint256 i = 0; i < doc_hashes.length; i++) {
            bool found = false;
            isFake[i] = 0; // original
            for (uint256 j = 0; j < docCnt; j++) {
                if (
                    keccak256(abi.encodePacked(docs[j].doc_hash)) == keccak256(abi.encodePacked(doc_hashes[i])) &&
                    keccak256(abi.encodePacked(docs[j].public_key)) == keccak256(abi.encodePacked(public_key))
                ) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                isFake[i] = 1; // fake
            }
        }
        return isFake;
    }
}