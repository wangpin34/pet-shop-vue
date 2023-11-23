// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Adoption {
    event LogAccountAddr(address sender);
    event LogAdopters(address[16] adopters);
    address[16] public adopters;

    // Adopting a pet
    function adopt(uint256 petId) public returns (uint256) {
        emit LogAccountAddr(msg.sender);
        require(petId >= 0 && petId <= 15);

        adopters[petId] = msg.sender;
        emit LogAdopters(adopters);
        return petId;
    }

    // Retrieving the adopters
    function getAdopters() public view returns (address[16] memory) {
        return adopters;
    }
}
