$.ajax({
    type: "GET",
    url: "getProducts",
}).done(function (res) {
    res.products.forEach(e => {
        $('#mainFlex').append('<div style="margin: 10px; border: 0px solid black"><b>'
            + e.pName + '</b></br>'
            + e.Material + '</br>'
            + 'Color: ' + e.color + '</br>'
            + 'Size: ' + e.pSize + '</br>'
            + 'Price: ' + e.price + '</br>'
            + 'Brand: ' + e.brand + '</br>'
            + '<img width ="100px" heigh ="100px" src = "../pictures/'+e.pNo +'.jpg" >' + '</br>'
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




