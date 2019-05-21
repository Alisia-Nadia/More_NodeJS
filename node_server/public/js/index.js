function myFunction(id) {
   
    var element = document.getElementById(id);
    console.log($(element).attr("psize"));

}

$.ajax({
    type: "GET",
    url: "getProducts",
}).done(function (response) {

    response.products.forEach(e => {
        $('#mainFlex').append('<div style="margin: 10px">'
            + e.pName + '</br>'
            + 'General description:' + e.generalDescription + '</br>'
            + 'Color:' + e.color + '</br>'
            + 'Size:' + e.pSize + '</br>'
            + 'Price:' + e.price + '</br>'
            + 'Brand:' + e.brand + '</br>'
            + 'Gender:' + e.gender + '</br>'
            + '<img src = "../pictures/husky1.jpg">' + '</br>'
            + '<button id = ' +e.pNo[0]+e.pSize + ' pnumber =' + e.pNo[0] + ' psize = ' + e.pSize + ' onclick="myFunction(id)">Add to cart</button>'
            + '</div>')


    });

});




