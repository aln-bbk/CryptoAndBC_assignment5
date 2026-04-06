const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const JAN_1_2030 = 1893456000;

module.exports = buildModule("GreeterModule", (m) => {
  const name = m.getParameter("name", "Alina Babkevich");

  const greeter = m.contract("Greeter", [name]);

  return { greeter };
});