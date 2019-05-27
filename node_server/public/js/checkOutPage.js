

$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "getShoppingCart",
    }).done(function (res) {
        $.ajax({ //what are the full data for the things in my shopping cart?
            type: "POST",
            url: "getProductsForShoppingCart",
            data: res
        }).done(function (res) {
            console.log(res)
            let price = 0;
            res.products.forEach(elem => {
                price = price + elem.price;
            });
            $('#amount h3').append(' ' + price)
        });
    });

    $("#placeOrder").on("click", function () {

        console.log("shopping cart below");
        let order = {};
        order.paymentOption = $('#paymenForm input[name=payment]:checked').val();
        $.ajax({ //what are the full data for the things in my shopping cart?
            type: "POST",
            url: "createOrder",
            data: order
        }).done(function (res) {
            if(res.err){
                alert(res.err);
            }else{
                alert("Order placed!");
                window.location.assign("shoppingCartPage");
            }
         
        });
    });
});