let nem = require('nem-sdk').default;


module.exports.transac = function(address, qty, mssg, res){
    
    var endpoint = nem.model.objects.create('endpoint')(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);
    var common =nem.model.objects.create('common')('Guitarra1!','b41a6b994020d038552e951f6cbb77f1276f53f1d0eb167c6d42fef57ab59f83');

    var transferTransaction = nem.model.objects.create('transferTransaction')(address, qty, mssg);

    var preparedTransaction = nem.model.transactions.prepare('transferTransaction')(common, transferTransaction, nem.model.network.data.testnet.id);


    nem.model.transactions.send(common, preparedTransaction, endpoint).then(function(res){
        console.log(res);
    }, function(err) {
        console.log(err);
    })
};

