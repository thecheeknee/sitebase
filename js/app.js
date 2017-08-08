/**
 * Script for mobile web VIP.
 * @auther dkarthikeyan
 */
/*global $,mskuSpec, jQuery, SAJAX, MH */
/*jslint browser:true */
$(document).ready(function () {
	"use strict";
});

function checkPage(){
    var url = location.hash.slice(3);
    var finalurl = url;
    if(url.indexOf('/')!==-1){
        finalurl = url.slice(0,url.indexOf('/'));
    }
    $('#screenchange').removeClass('expanded').addClass('compressed');
    $('.boxed').removeClass('hidden');
    console.log(location.hash);
    switch(finalurl){
        case 'categories':
            categories();
            break;
        case '':
            homePage();
            break;
        case 'character':
            character();
            break;
        case 'contact':
            contact();
            break;
        default:
            homePage();
    }
    mapNav();
}

function PageChange(xpos, ypos, url){
    $('#screenchange').css({'top':xpos+'px','left':ypos+'px',}).removeClass('compressed');
    window.setTimeout(function(){
        $('#screenchange').addClass('expanded');
        window.setTimeout(function(){
            $('#screenchange').addClass('noborder');
            window.location = url;
        },100);
    },200);
}

function mapNav(){
    $('a.changePage').click(function(e){
        e.preventDefault();
        if(!$(this).hasClass('active')){
            var url = $(this).attr('href');
						debugger;
            PageChange(e.pageX, e.pageY, url);
        }
    });
}

/*page rendering functions*/

function homePage(){
    window.setTimeout(function() {
        $('#cheekneeblock').addClass('roll');
        $('#main-nav').removeClass('bottom40 hided');
        $('#mini-me img').removeClass('mrg-top-1');
        $('#title').removeClass('bottom40 hided');
				$('#mini-me').removeClass('hidden');
    }, 500);

}

function categories(){
    window.setTimeout(function(){
				$('#sitetitle').removeClass('hidden');
        $('#category-list ul').removeClass('compressed');
        $('#category-list li a').click(function(){
            $('#category-list li a.active').removeClass('active');
            $(this).addClass('active');
            var thisref = $(this).attr('data-category');
            changeCategory(thisref);
        });
				$('#code .special').append('<img src="img/HTML5.png" class="rolling" style="top: 5%;"> <img src="img/angular.png" class="rolling" style="top: -25%; left: 37%;"> <img src="img/mongoDb.png" class="rolling" style="left: 70%;"> <img src="img/nodeJs.png" class="rolling" style="top: 60%; left: 3%;"> <img src="img/reactJs.png" class="rolling" style="top: 60%; left: 73%;"> <img src="img/css3.png" class="rolling" style="top: 80%; left: 37%;">');
        if( $(window).width()>600 ){
            window.setTimeout(function(){
                $('#category-list li a:first').click();
            },300);
        }
        $('#close-cat span').click(function(){
            $('#category-list li a.active').removeClass('active');
            $('#category_content_wrapper').addClass('hidden-xs hidden-sm');
            $('#pagetitle').removeClass('hided-sm');
        });
        main_menu();
    },200);
}

function character(){
    window.setTimeout(function(){
        $('#character').removeClass('hidden');
				$('#sitetitle').removeClass('hidden');
        window.setTimeout(function(){
            $('#keywordmap .profile-pic img').removeClass('shift');
            $('#keywordmap .cloud-pic img').removeClass('shift');
						$('.hold').each(function(){
							var perc = parseInt($(this).attr('data-size'));
							var deg = Math.round(360 * perc/100);
							var shiftdeg = (360-deg);
							$(this).css({ WebkitTransform: 'rotate(' + deg + 'deg)'});
							$(this).css({ '-moz-transform': 'rotate(' + deg + 'deg)'});
							$(this).find('.pie').css({ WebkitTransform: 'rotate(' + shiftdeg + 'deg)'});
							$(this).find('.pie').css({ '-moz-transform': 'rotate(' + shiftdeg + 'deg)'});
							var inblk = $(this).find('.pie');
							//$(this).css({'-webkit-transform':'rotate('+deg+'deg)';'-moz-transform':'rotate('+deg+'deg)';'-o-transform':'rotate('+deg+'deg)';'transform':'rotate('+deg+'deg)';});
							//$(this).find('.pie').css({'-webkit-transform':'rotate('+shiftdeg+'deg)';'-moz-transform':'rotate('+shiftdeg+'deg)';'-o-transform':'rotate('+shiftdeg+'deg)';'transform':'rotate('+shiftdeg+'deg)';});
						})
        },300);

        main_menu();
    },200);
}

function contact(){
    window.setTimeout(function(){
        $('#contact').removeClass('hidden');
				$('#sitetitle').removeClass('hidden');
        main_menu();
    },200);
}

/*page specific functions*/

function changeCategory(name){
    window.setTimeout(function(){
        $('#category_content_outer').addClass('shift');
        $('#category_content_inner').addClass('shift');
        $('#category_content .active').removeClass('active ok');
        $('#category_content #default').addClass('active');
        $('#category_content .persona-content.active').removeClass('active');
        window.setTimeout(function(){
            $('#category_content #default').removeClass('active');
            $('#category_content #'+name).addClass('active');
            $('#category_content .persona-name').text(name);
            $('#category_content .persona-content[data-id='+ name +']').addClass('active');
            window.setTimeout(function(){
                $('#category_content_wrapper').removeClass('hidden-xs hidden-sm');
                $('#category_content #'+name).addClass('ok');
                $('#category_content_outer').removeClass('shift');
                $('#category_content_inner').removeClass('shift');
                $('#pagetitle').addClass('hided-sm');

            },200);
        },500);
    },100);

}

function main_menu(){
    $('#main-nav').removeClass('bottom40 hided');
		$('#mini-me').removeClass('hidden hidden-lg hidden-md');
		window.setTimeout(function(){
			$('#mini-me img').removeClass('peep');
		},200);
    $('#menu_nav').click(function(){
        if( $(this).find('span').hasClass('glyphicon-menu-hamburger') ){
            $(this).find('span').addClass('glyphicon-remove').removeClass('glyphicon-menu-hamburger');
            $('#mainnav').removeClass('hidden-xs hidden-sm');
						$('#modal').removeClass('hidden');
            window.setTimeout(function(){
								$('#mainnav').removeClass('sift');
                $('#mini-me img').removeClass('mrg-top-1');
            },100);
        }else{
            $(this).find('span').removeClass('glyphicon-remove').addClass('glyphicon-menu-hamburger');
            $('#mainnav').addClass('hidden-xs hidden-sm sift');
						$('#modal').addClass('hidden');
            $('#mini-me img').addClass('mrg-top-1');
        }
    });
}


/*angular functions*/
angular
	.module('app',[
		'ui.router'
		])
	.config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider, $stateProvider){
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('home',{
				url:'/',
				templateUrl:'templates/home.html',
        controller:'pageLoad'
			})
			.state('categories',{
				url:'/categories',
				templateUrl:'templates/categories.html',
        controller:'pageLoad'
			})
			.state('character',{
				url:'/character',
				templateUrl:'templates/character.html',
        controller:'pageLoad'
			})
			.state('contact',{
				url:'/contact',
				templateUrl:'templates/contact.html',
        controller:'pageLoad'
			})
      .state('post',{
        url:'/post',
        templateUrl:'templates/post.html',
        controller:'pageLoad'
      })
	}])
