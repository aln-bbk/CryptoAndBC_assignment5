// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Greeter {
    string private greeting;

    constructor(string memory _name) {
        greeting = string(abi.encodePacked("Hello, ", _name, "!"));
    }

    function greet() public view returns (string memory) {
        return greeting;
    }
}