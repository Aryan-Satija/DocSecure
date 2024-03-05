const hre = require('hardhat');

(async()=>{
    const docVerify = await hre.ethers.deployContract('documentVerify');
    await docVerify.waitForDeployment();
    console.log(`Contract deployed to ${docVerify.target}`);
})()
.then(()=>{
    console.log('CONTRACT DEPLOYED SUCCESSFULLY....');
    process.exit(0);
})
.catch((err)=>{
    console.log('SOMETHING WENT WRONG ....');
    console.log(err);
    process.exit(1);
})