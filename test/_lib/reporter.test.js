const fs          = require('fs');
const path        = require('path');
const {expect}    = require('chai');
const reporter    = require('../../src/_lib/reporter');
const testRecords = require('../_fixtures/test-records');

describe('reporter', () => {
  it('produces a hierarchical text report with alphabetically sorted items', () => {
    let testReportFilename = path.resolve(__dirname, '../_fixtures/test-report.txt');
    let testReport = reporter.hierarchical(testRecords);
    let testReportExpected = fs.readFileSync(testReportFilename).toString();
    
    expect(testReport).to.equal(testReportExpected);
  });
});
