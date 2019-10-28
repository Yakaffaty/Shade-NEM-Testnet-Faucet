$(document).ready(function(){
  $('button').on('click', function(){
    var address = $('form').find('input[name="address"]');
    var message= $('form').find('input[name="message"]');
    var xemSent =  $('form').find('input[name="quantity"]');
    var transaction = {address: address.val(), message: message.val(), xemSent: xemSent.val(), timestamp:  Date.now()};
    

  
    if(address.val().length !== 40){
      swal({
        title: "Transaction Error",
        text: "Please enter a valid address",
        type: "error",
        confirmButtonText: 'Try Again'
      });
      

    } else if(xemSent.val() > 10){
        swal({
          title: "Wait!",
          text: "You cant send more than 10 Xems per transaction",
          type: "warning",
          confirmButtonText: 'Ok!',
          confirmButtonColor: '#8CD4F5',
        });


    } else {
        setTimeout('', 5000)

        $.ajax({
          type: 'POST',
          url: '/faucet',
          data: transaction,
          success: function(data){
            // data is the object that you send form the server by 
            // res.jsonp();
            // here data = {success : true}
            // validate it
            if(data['success']){
              swal({
                title: "Transaction Sent!",
                text: ""+ xemSent.val() +" Xems where sent to the address " + address.val() +" with the following message ' " +message.val() +" '",
                type: "success",
                confirmButtonText: '¡Thanks!',
                confirmButtonColor: '#8CD4F5',
              });
              
            } else {
              swal({
                title: "Wait a minute!",
                text: "Slow down! You can only request Xems each minute",
                type: "error",
                confirmButtonText: 'OK!',
                confirmButtonColor: '#8CD4F5',
              });

            }
        },
        error : function () {
            // some error handling part
          
        }
      });

      }
     

    
    

    return false;
  
});

});