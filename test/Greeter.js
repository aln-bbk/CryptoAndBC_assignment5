const { expect } = require("chai");

describe("Greeter", function () {
  it("Should return the greeting", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Alice");
    await greeter.waitForDeployment();

    expect(await greeter.greet()).to.equal("Hello, Alice!");
  });
});