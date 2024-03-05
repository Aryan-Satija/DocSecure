// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract documentVerify{
    uint256 docCnt;
    
    event doc_entry(address from, string doc_hash, string public_key);

    struct document_structure{
        address creator;
        string doc_hash;
        string public_key;
    }

    document_structure[] docs;

    function secureDocument(string memory doc_hash, string memory public_key) public {
        docCnt += 1;

        docs.push(document_structure(msg.sender, doc_hash, public_key));

        emit doc_entry(msg.sender, doc_hash, public_key);
    }

    function validateDocument(string memory doc_hash, string memory public_key) public view returns(bool){
        for (uint i = 0; i < docCnt; i++){
            if(
                (compareStrings(docs[i].doc_hash, doc_hash)) 
                &&
                (compareStrings(docs[i].public_key, public_key))
            ){
                return true;
            }
        }
        return false;
    }

    function compareStrings(string memory a, string memory b) internal pure returns(bool){
        if(keccak256(abi.encodePacked(a)) == (keccak256(abi.encodePacked(b)))) return true;
        return false;
    }
}