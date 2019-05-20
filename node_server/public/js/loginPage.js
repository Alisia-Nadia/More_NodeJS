$("#loginForm").on("submit", function(e){
    e.preventDefault();
    let data = {};
    data.email = $("#email").val();
    data.password = $("#password").val();

    $.ajax({
        type: "POST",
        url: "login",
        data: data
      }).done(function (response) {
        if (response.err) {
            console.log(response.err);
        } else {
            window.location.assign("shoppingCartPage");
        }
    });
});