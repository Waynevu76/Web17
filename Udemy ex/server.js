
$('.lds-facebook').hide();
$("#submit").submit(function(event) {
    $('.lds-facebook').show();
    udemy = "https://www.udemy.com"
    search = $("#pwd").val();
    price = $("#price").val();
    event.preventDefault();
    $.ajax({
        url: `https://api.techkids.vn/udemy/courses?search=${search}&price=${price}&page=1`,
        type: "GET",
        success: function(data) {
            console.log(data)
            $('.display-result').empty();
            for(var i=0; i<data.results.length; i++) {
                $('.display-result')
                .append(
                `<div class="col-sm-12 col-md-6 col-xl-4 mb-2">
                    <div class="card">
                        <img class="card-img-top" src="${data.results[i].image_480x270}" alt="Card image cap">
                        <div class="card-body">
                            <div style="height:100px" class="font-weight-bold">
                                <a target="_blank" href="${udemy + data.results[i].url}" class="card-title">${data.results[i].title}</a>
                            </div>
                            <p style="height:20px" class="card-text font-weight-bold">${data.results[i].price}</p>
                            <a style="height:40px" target="_blank" href="${udemy + data.results[i].url}" class="btn btn-primary">Go this course</a>
                        </div>
                    </div>
                </div>`)
                // $('.display-result').append('<a href="'+ udemy + data.results[i].url +'">' + data.results[i].title + '</p>')
                // $('.display-result').append('<img src="' + data.results[i].image_480x270 + '"class="img-fluid" alt="Responsive image">')
            }
            $('.lds-facebook').hide();
        },
        error: function(err) {
            console.log("Error!!!", err);
        },
    })
});

var j = 2;
$(window).scroll(function() {
    if(($(document).height() - ($(window).height() + $(window).scrollTop()) < 400)) {
        appendData(j);
        j += 1;
    }
    
});

function appendData(j) {
    $('.lds-facebook').show();
    udemy = "https://www.udemy.com"
    search = $("#pwd").val();
    price = $("#price").val();
    $.ajax({
        url: `https://api.techkids.vn/udemy/courses?search=${search}&price=${price}&page=${j}`,
        type: "GET",
        success: function(data) {
            console.log(data)
            for(var i=0; i<data.results.length; i++) {
                $('.display-result')
                .append(
                `<div class="col-sm-12 col-md-6 col-xl-4 mb-2">
                    <div class="card">
                        <img class="card-img-top" src="${data.results[i].image_480x270}" alt="Card image cap">
                        <div class="card-body">
                            <div style="height:100px" class="font-weight-bold">
                                <a href="${udemy + data.results[i].url}" class="card-title">${data.results[i].title}</a>
                            </div>
                            <p style="height:20px" class="card-text font-weight-bold">${data.results[i].price}</p>
                            <a style="height:40px" href="${udemy + data.results[i].url}" class="btn btn-primary">Go this course</a>
                        </div>
                    </div>
                </div>`)
                // $('.display-result').append('<a href="'+ udemy + data.results[i].url +'">' + data.results[i].title + '</p>')
                // $('.display-result').append('<img src="' + data.results[i].image_480x270 + '"class="img-fluid" alt="Responsive image">')
            }
            $('.lds-facebook').hide();
        },
        error: function(err) {
            console.log("Error!!!", err);
        }
    })
}
$(document).ready(function(){
    $('body').append('<div id="toTop" class="btn btn-secondary"><span class="glyphicon glyphicon-chevron-up"></span> Back to Top</div>');
      $(window).scroll(function () {
          if ($(this).scrollTop() != 0) {
              $('#toTop').fadeIn();
          } else {
              $('#toTop').fadeOut();
          }
      }); 
  $('#toTop').click(function(){
      $("html, body").animate({ scrollTop: 0 }, 600);
      return false;
  });
});