const functions = require("firebase-functions");
const date = require("date-and-time");
var PaytmChecksum = require("./lib/PaytmChecksum");

exports.helloWorld = functions.https.onRequest((request, response) => {
    var paytmParams = {};
    const timestamp = Date.now();
    /* Generate Checksum via Array */
    /* initialize an array */
    paytmParams["MID"] = "iXIkgV26453973532360";
    paytmParams["ORDERID"] = timestamp+"";
// current timestamp in milliseconds
    
    /**
    * Generate checksum by parameters we have
    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    */
    var paytmChecksum = PaytmChecksum.generateSignature(paytmParams, "1r&@sHYVQsp%2jXp");
    paytmChecksum.then(function(result){
        console.log("generateSignature Returns: " + result);
        var verifyChecksum =  PaytmChecksum.verifySignature(paytmParams, "1r&@sHYVQsp%2jXp",result);
        console.log("verifySignature Returns: " + verifyChecksum);
        response.send(result+"~"+timestamp); 
    }).catch(function(error){
        console.log(error);
    });
});
