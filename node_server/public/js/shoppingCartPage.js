$(document).ready(function () {
    $("#removeShoppingCardButton").on("click", function () {
        if (confirm("confirm to empty your shoppign cart"))
            $.ajax({
                type: "POST",
                url: "emptyShoppingCart"
            }).done(function (res) {
                if (res.err) return alert(res.err);
                alert(res.alert);
                window.location.assign("shoppingCartPage");
            });
    });

    $.ajax({ //what's in my shopping cart?
        type: "GET",
        url: "getShoppingCart",
    }).done(function (res) {
        console.log("shopping cart below");
        console.log(res.shoppingCart);
        $.ajax({ //what are the full data for the things in my shopping cart?
            type: "POST",
            url: "getProductsForShoppingCart",
            data: {
                "shoppingCart": res.shoppingCart
            }
        }).done(function (res) { //add the shopping cart items to the HTML
            if (res.err) return alert(res.err);
            console.log(res);
            res.products.forEach(e => {
                $('#mainFlex').append('<div style="margin: 10px; border: 0px solid black"><b>' +
                    e.pName + '</b></br>' +
                    e.generalDescription + '</br>' +
                    'Color: ' + e.color + '</br>' +
                    'Size: ' + e.pSize + '</br>' +
                    'Price: ' + e.price + '</br>' +
                    'Brand: ' + e.brand + '</br>' +
                    '<img src = "../pictures/husky1.jpg">' + '</br>' +
                    '<button class="removeFromCartButtons" pnumber =' + e.pNo + ' psize = ' + e.pSize + '>Remove from cart</button>' +
                    '</div>')
            });
            $(".removeFromCartButtons").on("click", function () { //give buttons the power to delete the shopping cart items
                let item = {};
                item.pNo = $(this).attr("pnumber");
                item.pSize = $(this).attr("psize");
                $.ajax({
                    type: "POST",
                    url: "removeFromShoppingCart",
                    data: item
                }).done(function (res) {
                    if (res.err) return alert(res.err);
                    alert(res.alert);
                    window.location.assign("shoppingCartPage");
                });
            });
        });
    });
});