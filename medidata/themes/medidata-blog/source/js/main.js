$(document).ready(function($) {

		// Appointment datepicker
		$('.datepicker').datepicker();


		// Phone mask
		$("#phone").mask("(999) 999-99-99");


		// Fancybox - Litebox
		$(".fancybox").fancybox();


		// Parallax parameter
		$.stellar({
			horizontalScrolling: false,
			verticalOffset: 40,
			responsive:true
		});


		// Home logos carousel
		$('.owl-logos').owlCarousel({
			loop:true,
			margin:0,
			autoplay:true,
			responsiveClass:true,
			responsive:{
				0:{
				items:2,
				nav:false
				},
				600:{
				items:3,
				nav:false
				},
				960:{
				items:4,
				nav:false
				},
				1281:{
				items:4,
				nav:false
				}
			}
		});



		// Home gallery carousel
		$('.home-gallery').owlCarousel({
			loop:true,
			margin:0,
			autoplay:true,
			responsiveClass:true,
			responsive:{
				0:{
				items:2,
				nav:false
				},
				600:{
				items:3,
				nav:false
				},
				960:{
				items:4,
				nav:false
			},
				1281:{
				items:4,
				nav:false
				}
			}
		});

});


// Acordeon
$('#accordion .panel-heading').on('click', function () {
    $('#accordion .panel-heading').removeClass('actives');
    $(this).addClass('actives');
 });



// Wow animations
wow = new WOW({
 		animateClass: 'animated',
  	offset:       100
	});
wow.init();
