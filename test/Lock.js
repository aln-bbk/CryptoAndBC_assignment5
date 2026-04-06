const { expect } = require("chai");

describe("Lock", function () {
  async function deployOneYearLockFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    const lock = await ethers.deployContract("Lock", [unlockTime], {
      value: lockedAmount,
    });

    return { lock, unlockTime, lockedAmount };
  }

  it("Should set the right unlockTime", async function () {
    const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

    expect(await lock.unlockTime()).to.equal(unlockTime);
  });

  it("Should revert if the unlockTime is not in the future", async function () {
    const latestTime = await time.latest();
    await expect(
      ethers.deployContract("Lock", [latestTime], { value: 1 })
    ).to.be.revertedWith("Unlock time should be in the future");
  });

  it("Should receive and store the funds to lock", async function () {
    const { lock, lockedAmount } = await loadFixture(deployOneYearLockFixture);

    expect(await ethers.provider.getBalance(lock.target)).to.equal(
      lockedAmount
    );
  });

  it("Should fail if the unlockTime has not passed", async function () {
    const { lock } = await loadFixture(deployOneYearLockFixture);

    await expect(lock.withdraw()).to.be.revertedWith("You can't withdraw yet");
  });

  it("Should not allow non-owner to withdraw", async function () {
    const { lock } = await loadFixture(deployOneYearLockFixture);

    const [owner, otherAccount] = await ethers.getSigners();

    await expect(
      lock.connect(otherAccount).withdraw()
    ).to.be.revertedWith("You aren't the owner");
  });

  it("Should allow owner to withdraw after unlockTime", async function () {
    const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

    await time.increaseTo(unlockTime);

    await expect(lock.withdraw()).to.changeEtherBalances(
      [lock, lock.runner],
      [-lockedAmount, lockedAmount]
    );
  });
});