function myFunction() {

    console.log($(this).attr("csize"));

}

$.ajax({
    type: "GET",
    url: "getProducts",
}).done(function (response) {

    response.forEach(e => {
        $('#mainFlex').append('<div style="margin: 10px">'
            + e.pName + '</br>'
            + 'General description:' + e.generalDescription + '</br>'
            + 'Color:' + e.color + '</br>'
            + 'Size:' + e.pSize + '</br>'
            + 'Price:' + e.price + '</br>'
            + 'Brand:' + e.brand + '</br>'
            + 'Gender:' + e.gender + '</br>'
            + '<img src = "../pictures/husky1.jpg">' + '</br>'
            + '<button pnumber =' + e.pNo + ' psize = ' + e.pSize + ' size=fsjkfdsnkds onclick="myFunction()">Add to cart</button>'
            + '</div>')


    });

});




