$.ajax({
    type: "GET",
    url: "getProducts",
}).done(function (res) {
    res.products.forEach(e => {
        $('#mainFlex').append('<div style="margin: 10px; border: 0px solid black"><b>'
            + e.pName + '</b></br>'
            + e.generalDescription + '</br>'
            + 'Color: ' + e.color + '</br>'
            + 'Size: ' + e.pSize + '</br>'
            + 'Price: ' + e.price + '</br>'
            + 'Brand: ' + e.brand + '</br>'
            + '<img src = "../pictures/husky1.jpg">' + '</br>'
            + '<button class="addToCartButtons" pnumber =' + e.pNo + ' psize = ' + e.pSize + '>Add to cart</button>'
            + '</div>')
    });
    $(".addToCartButtons").on("click", function(){
        let item = {};
        item.pNo = $(this).attr("pnumber");
        item.pSize = $(this).attr("psize");
        $.ajax({
            type: "POST",
            url: "addToShoppingCart",
            data: item
        }).done(function (res) {
            if (res.err) return alert(res.err);
            alert(res.alert);
        });
    });
});




