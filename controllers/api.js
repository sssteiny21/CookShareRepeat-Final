var request = require('request-promise');
var baseURI = 'http://food2fork.com/api/search ';

module.exports = {
  recipe : (req, res) =>{
    // we need to make a request to the food2fork api
    request({
      method : 'GET',
      url : `${baseURI}`,
      qs : {
        q : req.query.recipe,
        key : "91de0499b31251335c4f7c7b25189a24"
      }
    }).then((resp)=>{
        console.log('RESPONSE FROM FOOD2FORK : ', resp);
        res.send(resp);
      });

  },
}





//API Key: 91de0499b31251335c4f7c7b25189a24
