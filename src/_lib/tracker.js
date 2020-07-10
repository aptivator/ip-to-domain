const _ = require('lodash');

function addOrUpdateRecord(part, last, count, ancestors, records) {
  ancestors.push(part);
  let recordPath = ancestors.join('.children.');
  
  if(!_.has(records, recordPath)) {
    if(last) {
      var record = {count};
    } else {
      record = {count: 1, children: {}};
    }
    
    return _.set(records, recordPath, record);
  }
  
  _.get(records, recordPath).count += last ? count : 1;
}

module.exports = {
  trackDomainParts(domains, count, records) {
    domains.forEach(domain => {
      let ancestors = [];
      domain = domain.split('.').reverse();
      
      domain.forEach((part, index) => {
        let last = index === domain.length - 1;
        addOrUpdateRecord(part, last, count, ancestors, records);
      });
    });    
  },
  
  trackIpParts(ip, count, records) {
    let ancestors = [];
    ip = ip.split('.');
    
    ip.forEach((part, index) => {
      let last = index === ip.length - 1;
      addOrUpdateRecord(part, last, count, ancestors, records);
    });    
  }
};
