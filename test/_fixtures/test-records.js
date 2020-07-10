module.exports = {
  domainRecords: {
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
    },
    com: {
      count: 1,
      children: {
        yahoo: {
          count: 3
        }
      }
    }
  },
  ipRecords: {
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
    },
    86: {
      count: 1,
      children: {
        85: {
          count: 1,
          children: {
            84: {
              count: 1,
              children: {
                83: {
                  count: 1
                }
              }
            }
          }
        }
      }
    }
  }
};
