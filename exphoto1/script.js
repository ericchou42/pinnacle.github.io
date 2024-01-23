$(document).ready(function () {
    'use strict';
  
//***********isotope js
	var $projects = $('.projects');

    $projects.isotope({
        itemSelector: '.item',
        layoutMode: 'fitRows'
    });

    $('ul.filters > li').on('click', function(e){

        e.preventDefault();

        var filter = $(this).attr('data-filter');

        $('ul.filters > li').removeClass('active');
        $(this).addClass('active');

        $projects.isotope({filter: filter});

    });


// ***********bootstarp Modal
   $('#myModal').on('shown.bs.modal', function () {
            $('#myInput').trigger('focus')
          })

  

    $(".nav .nav-link").on("click", function(){
     $(".nav").find(".active").removeClass("active");
     $(this).addClass("active");
  });

});

// ***********Modal photo
    const activeImage = document.querySelectorAll(".active1");
    const productImages = document.querySelectorAll(".image-list img, .card-img-top");
    console.log(productImages);

    function changeImage(e) {
    for (i = 0; i < activeImage.length; i++) {
        activeImage[i].src = e.target.src;
    }
    }
    productImages.forEach(image => image.addEventListener("click", changeImage));