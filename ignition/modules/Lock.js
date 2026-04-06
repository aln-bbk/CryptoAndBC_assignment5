const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const JAN_1_2030 = 1893456000;

module.exports = buildModule("LockModule", (m) => {
  const unlockTime = m.getParameter("unlockTime", JAN_1_2030);

  const lock = m.contract("Lock", [unlockTime], {
    value: 0n,
  });

  return { lock };
});