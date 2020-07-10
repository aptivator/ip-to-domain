module.exports = function(params, callback, concurrencyLimit) {
  return new Promise(resolve => {
    let counter = 0;
    let index = 0;
    
    (function executor() {
      let _params = params[index++];
      callback(_params).then(() => {
        counter--;
        
        if(index < params.length) {
          return executor();
        }
        
        if(!counter) {
          resolve();
        }
      });
      
      if(++counter < concurrencyLimit && index < params.length) {
        executor();
      }
    })();
  });
};
