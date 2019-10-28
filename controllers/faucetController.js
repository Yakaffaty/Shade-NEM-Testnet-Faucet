var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var nem = require('../transaction')



//Connection to DB 
mongoose.connect('mongodb+srv://faucetAdmin:faucetAdmin1@nemtrack-k57iq.mongodb.net/test?retryWrites=true&w=majority')
// Create a schema (blueprint)

var transactionSchema = new mongoose.Schema({
    address: String,
    message: String,
    xemSent: String, 
    timestamp: String
});

var listaTransac = mongoose.model('listaTransac', transactionSchema);
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
    app.get('/faucet', function(req, res){
        // Recuperar data de mongoDB y pasarla a la vista principal
        // find encontras el que necesitas pasale el que necesitas
        listaTransac.find({}, function(err, data){
            if(err)throw err;
            res.render('faucetIndex', {transactions: data});
        });
    });

    app.post('/faucet', urlencodedParser,function(req, res){
        // Conseguir la data de la vista y agregarla a mongoDB
   

        var validation;
        function getvalidation() {       
            return new Promise(function(resolve, reject) {
                listaTransac.findOne({address: req.body.address}, {}, { sort: { '_id': -1 }}, function(err, doc){
                    if(err) throw err;
                    if(Date.now()-parseInt(doc.timestamp, 10) < 60000){
                        res.jsonp({success : false})    
                        resolve("invalid")
                    } else {
                        var newlistaTransac = listaTransac(req.body).save(function(err, data){
                            if(err) throw err;nem.transac(req.body.address, req.body.xemSent, req.body.message)
                            res.jsonp({data: data, success : true});
                        })
                        resolve("valid")
                    }
                  });
            })
        }

        var initializePromise = getvalidation();
        initializePromise.then(function(result) {
            validation= result;
            console.log('-------------------------------------------------------------------')
            console.log("Validacion es la siguiente ");
            console.log(validation)
            console.log('-------------------------------------------------------------------')
        }, function(err) {
            console.log(err);
        })


        
    });


};