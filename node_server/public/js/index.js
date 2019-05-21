var x= document.createElement('img');

$.ajax({
    type: "GET",
    url: "getProducts",
  }).done(function (response) { 
        
        array = response

        console.log(response)
        
        response.forEach(e => {
            $('#mainFlex').append('<div style="margin: 10px">'
                           +e.pName + '</br>'
                           +'General description:' + e.generalDescription +  '</br>'
                           +'Color:' + e.color +  '</br>'
                           +'Size:' + e.pSize +  '</br>'
                           +'Price:' + e.price + '</br>'
                           +'Brand:' + e.brand + '</br>'
                           +'Gender:' + e.gender + '</br>'
                           + '<img src = "../pictures/husky1.jpg">' + '</br>'
                           +'<button id="e.pName">Add to cart</button>'
                           +'</div>')
                        
        });
    
});




