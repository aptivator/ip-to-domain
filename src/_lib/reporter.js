function buildHierarchicalReport(records, report, indentSize, partsAsNumber = false, level = 1) {
  let spaces = ' '.repeat(level * indentSize);
  let keys = Object.keys(records);

  if(partsAsNumber) {
    var comparator = (n1, n2) => n1 - n2;
    keys = keys.map(key => +key);
  } else {
    comparator = (s1, s2) => s1.toLowerCase().localeCompare(s2.toLowerCase());
  }
  
  keys.sort(comparator);

  keys.forEach(key => {
    let {count, children} = records[key];
    
    report.push(spaces + key + ': ' + count);
    
    if(children) {
      buildHierarchicalReport(children, report, indentSize, partsAsNumber, level + 1);
    }
  });
  
  return report;
}

module.exports = {
  hierarchical(records, indentSize = 2) {
    let {domainRecords, ipRecords} = records;
    let report = ['Domain Records'];
    report = buildHierarchicalReport(domainRecords, report, indentSize);
    report.push('IP Records');
    report = buildHierarchicalReport(ipRecords, report, indentSize, true);
    return report.join('\n');
  }
};
