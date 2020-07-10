const {Resolver} = require('dns').promises;
const fs         = require('fs');
const readline   = require('readline');
const executor   = require('./_lib/async-executor');
const reporter   = require('./_lib/reporter');
const tracker    = require('./_lib/tracker');

const dns = new Resolver();

module.exports = function(logFile, recordRx, ipIndex, concurrentLookups, reportType = 'json') {
  return new Promise(resolve => {
    const ips = {};
    const rl = readline.createInterface({
      input: fs.createReadStream(logFile)
    });
    
    rl.on('line', line => {
      let ip = line.match(recordRx)[ipIndex];
      
      if(typeof ips[ip] === 'undefined') {
        return ips[ip] = 1;
      }
      
      ips[ip]++;
    });
    
    rl.on('close', () => {
      let params = Object.entries(ips);
      let domainRecords = {};
      let ipRecords = {};
      
      function lookupDomainForIp([ip, count]) {
        return new Promise(resolve => {
          dns.reverse(ip).then(domains => {
            tracker.trackDomainParts(domains, count, domainRecords);
          }).catch(() => {
            tracker.trackIpParts(ip, count, ipRecords);
          }).finally(resolve);
        });
      }
      
      executor(params, lookupDomainForIp, concurrentLookups).then(() => {
        let records = {domainRecords, ipRecords};
        
        switch(reportType) {
          case 'json':
            records = JSON.stringify(records);
            break;
          case 'text':
            records = reporter.hierarchical(records);
        }
        
        resolve(records);
      });
    });
  });
};
