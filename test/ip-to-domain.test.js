const {expect}    = require('chai');
const fs          = require('fs');
const path        = require('path');
const ipToDomain  = require('../src/ip-to-domain');
const testRecords = require('./_fixtures/log-5-records.js');

describe('ip-to-domain', () => {
  let logFilePath = path.resolve(__dirname, './_fixtures/log-5-records.log');
  let recordRx = /(?:"[^"]+")|(?:\[[^\]]+\])|(?:[^\s]+)/g;
  let concurrentLookups = 20;
  let ipIndex = 0;
  
  it('generates text report', () => {
    let expectedReportFilePath = path.resolve(__dirname, './_fixtures/log-5-records-report.txt');
    let expectedReport = fs.readFileSync(expectedReportFilePath).toString();
    
    ipToDomain(logFilePath, recordRx, ipIndex, concurrentLookups, 'text').then(report => {
      expect(report).to.equal(expectedReport);
    }).catch(err => console.log(err));
  });
  
  it('produces records structure as JSON (default setting)', () => {
    ipToDomain(logFilePath, recordRx, ipIndex, concurrentLookups).then(json => {
      expect(json).to.equal(JSON.stringify(testRecords));
    }).catch(err => console.log(err));    
  });
  
  it('returns records as regular JavaScript object', () => {
    ipToDomain(logFilePath, recordRx, ipIndex, concurrentLookups, 'object').then(records => {
      expect(records).to.eql(testRecords);
    }).catch(err => console.log(err));      
  });
});
