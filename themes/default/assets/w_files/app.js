var s,
TAApp = {

  settings: {
    stickyNavTop: $('nav').offset().top
  },

  init: function() {
    s = this.settings;
    this.bindUIActions();
    this.addInvitee();
    this.map();
    this.video();
    this.radios();
  },
  
  stickyNav: function() {
	  var scrollTop = $(window).scrollTop();
	  var navHeight = $('nav').outerHeight();
		if (scrollTop > s.stickyNavTop) { 
	    $('nav').addClass('sticky');
	    $('.its-time').css({marginTop: navHeight + $('header').outerHeight()});
		} else {
	    $('nav').removeClass('sticky');
	    $('.its-time').css({marginTop: 0});
		}
  },
  
  stickyNavMob: function() {
	  var scrollTop = $(window).scrollTop();
	  var navHeight = $('nav').outerHeight();
		if (scrollTop > s.stickyNavTop) { 
	    $('nav').addClass('sticky');
	    $('.its-time').css({marginTop: navHeight});
		} else {
	    $('nav').removeClass('sticky');
	    $('.its-time').css({marginTop: 0});
		}
  },
  
  bindUIActions: function() {
		if (!Modernizr.touch && $(window).width() > 768) {
			this.videoTop();
    	this.para();
    	TAApp.stickyNav();    
			$(window).scroll(function() {  
				TAApp.stickyNav();  
			});
			this.ReSize();
    } else if(!Modernizr.touch) {
	    TAApp.stickyNavMob();    
			$(window).scroll(function() {  
				TAApp.stickyNavMob();  
			});
			this.ReSizeMob();
    }
    
		$('nav a').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var g, target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	      	if (!Modernizr.touch) {
	      		g = target.offset().top - $('nav').outerHeight() + 1;
	      	} else {
		      	g = target.offset().top;
	      	}
	        $('html,body').animate({
	          scrollTop: g
	        }, 1000, "swing");
	        return false;
	      }
	    }
	  });
	  
	  $('form').submit(function() {
			$('form .error').remove();  
			var hasError = false;  
			$('.required').each(function() {  
		    if($.trim($(this).val()) == '') {  
	        var labelText = $(this).attr('data-req');  
	        $('form').append('<span class="error">Please enter your '+labelText+'.</span>'); 
	        hasError = true;  
		    } else if($(this).attr('data-req') == 'email') {  
	        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;  
	        if(!emailReg.test($.trim($(this).val()))) {
            $('form').append('<span class="error">Sorry! You\'ve entered an invalid email.</span>');
            hasError = true;
	        }
		    }  
			});
	
			if(!hasError) {  
		    var formInput = $(this).serialize();  
		    $.post($(this).attr('action'),formInput, function(data){  
		    	$('form').slideUp("fast", function() {
		        $(this).before('<p class="sent"><strong>Thanks!</strong> Your RSVP has been sent.</p>');
		      });  
		    });  
		  }        
	  	return false;
		});

  },
  
  addInvitee: function() {
	  $(".form-add-btn").on("click", function() {
	
		  $insertPoint = $(".form-invitee li:last-child");
		  
		  $clone = $(".form-invitee li:last-child").clone();
		  $clone.find('.required').removeClass('required').attr('data-req', '');
		  $clone.attr('class',$clone.attr('class').replace(/\d+$/, function(str) { return parseInt(str) + 1; }) );
		  
		  $clone.find('[name]').each(function() {
		    var $th = $(this);
		    var newID = $th.attr('name').replace(/\d+$/, function(str) { return parseInt(str) + 1; });
		    $th.attr('name', newID);
		    console.log($th);
		    if($('[placeholder]')) {
			    $th.val('');
		    }
			});
			
			$clone.find('label').each(function() { 

		    var $th = $(this);
			  var newIDz = $th.attr('for').replace(/\d+$/, function(str) { return parseInt(str) + 1; });
		    $th.attr('for', newIDz);
			    
			});
			
			$('form').find('.count').each(function() { 
	
		    var $th = $(this);
		    var newV = $th.attr('value').replace(/\d+$/, function(str) { return parseInt(str) + 1; });
		    $th.attr('value', newV);
			    
			});
		  
		  $clone.insertAfter($insertPoint).css('display', 'none').slideDown();
		  
		  TAApp.radios();
	
		});
  },
  
  radios: function() {
	  $('input[type=radio]').click(function() {
			$(this).parent().find($('input[type=radio]')).prev().removeClass('selected');
		  $(this).prev().addClass('selected');
		});
		
		$('input[type=radio]').each(function(){
			$('input[type=radio]:checked').prev().addClass('selected');
		});
  },
  
  ReSize: function() {
	  $(window).resize(function(){
		  s.stickyNavTop = $('nav').offset().top;
		  TAApp.stickyNav();
		  $('nav').css({marginTop: $('header').outerHeight()});
		  if ($(window).width() > 768) {
		  	TAApp.videoTop();
		  	$('.champagne').removeClass('c-cham');
		  	TAApp.parallaxScroll();
		  } else {
			  $('.champagne').addClass('c-cham');
		  }
	  });
  },
  
  ReSizeMob: function() {
	  $(window).resize(function(){
		  s.stickyNavTop = $('nav').offset().top;
		  TAApp.stickyNavMob();  
	  });
  },
  
  map: function() {
  	if ($(window).width() > 768) {
		  var latlng = new google.maps.LatLng(57.1591001,65.5344672);
	
			var styles=[{"featureType":"water","elementType":"geometry","stylers":[{"color":"#333739"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#2ecc71"}]},{"featureType":"poi","stylers":[{"color":"#2ecc71"},{"lightness":-7}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-28}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"visibility":"on"},{"lightness":-15}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-18}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-34}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#333739"},{"weight":0.8}]},{"featureType":"poi.park","stylers":[{"color":"#2ecc71"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#333739"},{"weight":0.3},{"lightness":10}]}];
			var myOptions = {
				zoom: 14,
				center: latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				disableDefaultUI: true,
				styles: styles,
				scrollwheel: false,
				mapTypeControl: false,
		    zoomControl: true,
		    zoomControlOptions: {
		      style: google.maps.ZoomControlStyle.SMALL,
          position: google.maps.ControlPosition.RIGHT_TOP
		    }
			};
		
			map = new google.maps.Map(document.getElementById('map'), myOptions);
		} else {
			$('#map').hide();
		}
  },
  
  video: function() {
	  if (!Modernizr.touch && Modernizr.video && $(window).width() > 768) {
	  	$('.champagne').html("<video width='640' height='360' autoplay loop><source src='/media/champagne-pour.mp4' type='video/mp4' /><source src='/media/champagne-pour.ogg' type='video/ogg' /></video>");
			$('.champagne img').css('display','none');
	  }
  },
  
  para: function() {
  	$('body').addClass('ani');
  	$('nav').css({marginTop: $('header').outerHeight()});
		$('.its-time').waypoint(function() {
		  $('.champagne').toggleClass('fixie');
		  $('header').toggleClass('hidden');
		}, { offset: 0 });
		
		this.parallaxScroll();

  },
  
  videoTop: function() {
  	var q = ($('.directions').offset().top + $('.directions').height()) - ($('.champagne').height() / 2);
	  $('.champagne').css({ top: q});
  },
  
  parallaxScroll: function(ct) {
	  var element = $('.directions');
	  var element2 = $('.champagne');
		var ct = $('.champagne').offset().top;
		$(window).on('scroll', function () {
		    percentageSeen(ct);
		});
	
		function percentageSeen () {
	    var viewportHeight = $(window).height(),
	        scrollTop = $(window).scrollTop(),
	        elementOffsetTop = element.offset().top,
	        elementHeight2 = element2.height() / 2,
	        elementOffsetTop2 = element2.offset().top,
	        elementHeight = element.height();
	    
	    var pq = 0;
	    var x = 0;
	    if (elementOffsetTop > (scrollTop + viewportHeight)) {
	    	pq = 0;
	    } else if ((elementOffsetTop + elementHeight) < scrollTop) {
	    	pq = 1;
	    } else {
        var distance = (scrollTop + viewportHeight) - elementOffsetTop;
        var percentage = distance / ((viewportHeight + elementHeight) / 100);
        percentage = Math.round(percentage) / 100;
        pq = percentage;
	    }
	    
	    if (elementOffsetTop2 > (scrollTop + viewportHeight)) {
	      x = 0;
	    } else if ((elementOffsetTop2 + elementHeight2) < scrollTop) {
	      x = 1;
	    } else {
        var distance2 = (scrollTop + viewportHeight) - elementOffsetTop2;
        var percentage2 = distance2 / ((viewportHeight + elementHeight2) / 100);
        percentage2 = Math.round(percentage2);
        x = percentage2 / 100;
	    }
	    
	    $('.champagne').css('top',parseInt(ct, 10) + ((x*pq)*($('.champagne').height()/2)) + 'px');
		}
		$(window).trigger('scroll');
  }

};

$(function() {

	TAApp.init();
	  
});