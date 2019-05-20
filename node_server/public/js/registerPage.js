$("#registerForm").on("submit", function(e){
    e.preventDefault();
    let data = {};
    data.fName = $("#fName").val();
    data.lName = $("#lName").val();
    data.email = $("#email").val();
    data.telephone = $("#telephone").val();
    data.street = $("#street").val();
    data.city = $("#city").val();
    data.postCode = $("#postCode").val();
    data.country = $("#country").val();
    data.password = $("#password").val();
    data.passwordRepeat = $("#passwordRepeat").val();

    $.ajax({
        type: "POST",
        url: "register",
        data: data
      }).done(function (response) {
        if (response.err) {
            console.log(response.err);
        } else {
            console.log(response.msg);
        }
    });
});