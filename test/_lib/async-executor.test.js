const {expect} = require('chai');
const executor = require('../../src/_lib/async-executor');

describe('async-executor', () => {
  it('maintains a specific number of concurrent asynchronous operations', async () => {
    let params = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let sum = 0;
    
    function callback(number) {
      return new Promise(resolve => {
        setTimeout(() => {
          sum += number;
          resolve();
        }, 50);
      });
    }
    
    let start = Date.now();
    await executor(params, callback, 10);
    let duration = Date.now() - start;
    expect(sum).to.equal(55);
    expect(duration).to.be.at.least(50);
    expect(duration).to.be.at.most(60);
    
    sum = 0;
    start = Date.now();
    await executor(params, callback, 1);
    duration = Date.now() - start;
    expect(sum).to.equal(55);
    expect(duration).to.be.at.least(500);
    expect(duration).to.be.at.most(520);
  });
});
