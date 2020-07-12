const {expect} = require('chai');
const tracker  = require('../../src/_lib/tracker');

describe('tracker', () => {
  it('records counts for domains', () => {
    let records = {};
    let domains = ['domain.net', 'next.another.net'];
    tracker.trackDomainParts(domains, 3, records);
    
    expect(records).to.eql({
      net: {
        count: 2,
        children: {
          domain: {
            count: 3
          },
          another: {
            count: 1,
            children: {
              next: {
                count: 3
              }
            }
          }
        }
      }
    });
  });
  
  it('records counts for ip address', () => {
    let records = {};
    let ip1 = '192.22.33.22';
    let ip2 = '192.22.33.22';
    let ip3 = '192.23.33.22';
    
    tracker.trackIpParts(ip1, 2, records);
    tracker.trackIpParts(ip2, 2, records);
    tracker.trackIpParts(ip3, 3, records);
    
    expect(records).to.eql({
      192: {
        count: 3,
        children: {
          22: {
            count: 2,
            children: {
              33: {
                count: 2,
                children: {
                  22: {
                    count: 4
                  }
                }
              }
            }
          },
          23: {
            count: 1,
            children: {
              33: {
                count: 1,
                children: {
                  22: {
                    count: 3
                  }
                }
              }
            }
          }
        }
      }
    });
  });
});
