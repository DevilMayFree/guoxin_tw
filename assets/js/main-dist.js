'use strict';

/**************************************************************/
/*                   檢查是否為移動裝置                         */
/**************************************************************/
function mobile() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    var device = isAndroid || isiOS;
    return device;
};

///////////////////////////////////////
//            限制字數               //
///////////////////////////////////////
//len = 字數  ,  target = 目標物件
function wordlatest(len, target) {

    $(target).each(function () {
        if ($(this).text().length > len) {
            var text = $(this).text().substring(0, len - 1) + "...";
            $(this).text(text);
        }
    });
}

/**************************************************************/
/*                   計算視窗 scrollBar                       */
/**************************************************************/
function scrollBarW() {
    /*算出scrollBar寬度*/
    var a = window.innerWidth,
        b = document.documentElement.clientWidth;

    return a - b;
};

/**************************************************************/
/*                        計算視窗寬度                         */
/**************************************************************/
function deviceWidth() {
    var width = $(window).width();

    return width;
}

/**************************************************************/
/*                       鎖scrollBar                          */
/**************************************************************/
function lockScroll() {
    var checkDevice = mobile();
    var body = document.body,
        heroTop = document.querySelector('.navbar'),
        html = document.documentElement,
        tableTitle,
        checkBar = scrollBarW(),
        scrollBar = checkBar + 'px';

    console.log(scrollBar);

    var distance = -(html.scrollTop + body.scrollTop);

    if (checkDevice === false) {

        if (checkBar != 0) {
            //pc
            body.style.paddingRight = scrollBar;
            heroTop.style.paddingRight = scrollBar;
            body.style.overflowY = 'hidden';

            // tableTitle.style.width = calc(100 % -'90' + ' checkBar ' + 'px')
            tableTitle = 90 + checkBar;
            if ($('.tableTitle').hasClass('tableTitle--fix')) {
                $('.tableTitle--fix').css({
                    width: 'calc(100% - ' + tableTitle + 'px )'
                });
            }
        } else {
            //pc(safari)
            body.style.paddingRight = '';
            heroTop.style.paddingRight = '';
            body.style.overflowY = 'hidden';
        }
    } else {
        //行動裝置
        $('body').css({
            'top': distance
        });
        body.style.position = 'fixed';
        body.style.width = '100%';
        body.style.height = '100%';
        body.style.overflowY = 'hidden';
    }

    return distance;
};

/**************************************************************/
/*                       解scrollBar                          */
/**************************************************************/
function unlockScroll() {
    var heroTop = document.querySelector('.navbar');
    document.body.style.position = '';
    document.body.style.overflowY = '';
    document.body.style.width = '';
    document.body.style.height = '';
    document.body.style.paddingRight = '';
    document.body.style.top = '';
    heroTop.style.paddingRight = '';

    $('.tableTitle--fix').css({
        width: ''
    });
};

/**************************************************************/
/*                     開啟關閉燈箱                            */
/**************************************************************/
var distance;

function lightBox_open() {
    $('.lb-open').on('click', function () {
        var $this = $(this),
            window_height,
            lbName,
            content_height,
            padding_top,
            width = deviceWidth(),
            checkBar = scrollBarW();

        lbName = '.' + $this.attr('data-open') + '';

        distance = lockScroll();

        $(lbName).fadeIn();

        window_height = $(window).height();

        padding_top = parseInt($('.lb-main').css('padding-top'));

        content_height = $('' + lbName + ' .lb-container').height() + padding_top;

        $('.lb').scrollTop(0);

        if (content_height < window_height) {
            $('.lb').css({
                'overflow-y': 'auto'
            });
        }

        if (width < 960) {
            $('.lbCloseBtn--fixed').fadeIn();
            $('.lbCloseBtn--fixed').css({
                'right': checkBar
            });
        }
    });
}

function lightBox_close(time) {
    $('.js-close').on('click', function () {
        $('.lb').animate().stop();
        $('.lb').fadeOut();
        $('.lb').css({
            'overflow-y': ''
        });
        $('.lbCloseBtn--fixed').fadeOut();
        var distance = $('body').css('top').replace(/px/g, '');
        var checkDevice = mobile();
        distance = -distance;
        console.log('13578');
        setTimeout(function () {
            unlockScroll();
            console.log(distance);
            if (checkDevice == true) {
                window.scrollTo(0, distance);
            }
        }, time);
    });
}

function fixVh() {
    var vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', vh + 'px');
}

// function lightBox_active(lbName, distance) {

//     if ($('.discount-lb').length) {
//         var discount_len = $('.discount-lb .lb').length
//         console.log(discount_len)
//         for (var i = 1; i <= discount_len; i++) {
//             switch (lbName) {
//                 case '.lb--discount0' + i + '':
//                     console.log(lbName)
//                     button.lb_top(lbName, '.lb-goTop');
//                     button.discount();
//                     lightBox_close(lbName, distance, 500);
//                     break;
//             }
//         }
//     }
//     switch (lbName) {
//         case '.lb--payment':
//             button.lb_top(lbName, '.lb-goTop');
//             lightBox_close(lbName, distance, 500);
//             break;
//         case '.lb--shipping':
//             button.lb_top(lbName, '.lb-goTop');
//             lightBox_close(lbName, distance, 500);
//             break;
//     }
// }


/**************************************************************/
/*                          swiper                            */
/**************************************************************/
function swiperCommon(title, loop, btn_next, btn_prev, slidesPerView, slidesPerGroup) {
    title = new Swiper('.' + title + '', {
        loop: loop || false,
        slidesPerView: slidesPerView || 1,
        slidesPerGroup: slidesPerGroup || 1,
        navigation: {
            nextEl: '.' + title + ' .' + btn_next + '',
            prevEl: '.' + title + ' .' + btn_prev + ''
        }
    });
};

// const breakpointChecker = function() {

//     // if larger viewport and multi-row layout needed
//     if (breakpoint.matches === true) {

//         // clean up old instances and inline styles when available
//         if (mySwiper !== undefined) mySwiper.destroy(true, true);

//         // or/and do nothing
//         return;

//         // else if a small viewport and single column layout needed
//     } else if (breakpoint.matches === false) {

//         // fire small viewport version of swiper
//         return enableSwiper();

//     }

// };


var swiper = {
    home: function home() {
        var hero_banner = new Swiper('.hero-banner', {
            on: {
                init: function init() {
                    if ($('.swiper-slide-active').hasClass('hero-item--white')) {
                        $('.navbar').addClass('navbar--transparent');
                    } else {
                        $('.navbar').removeClass('navbar--transparent');
                    }
                },
                slideChangeTransitionStart: function slideChangeTransitionStart() {
                    if ($('.swiper-slide-active').hasClass('hero-item--white')) {
                        $('.hero').addClass('hero--transparent');
                    } else {
                        $('.hero').removeClass('hero--transparent');
                    }
                }
            },
            autoplay: {
                delay: 5000,
            },
            loop: true,
            speed: 2000,
            pagination: {
                el: '.hero-banner .swiper-pagination',
                clickable: true
            }
        });
        var newsBlock_container = new Swiper('.newsBlock-container', {
            slidesPerView: 2,
            // slidesPerGroup: 2,
            loop: true,
            // centeredSlides: true,
            // autoplay: true,
            spaceBetween: 32,
            pagination: {
                el: '.newsBlock-container .swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button.right',
                prevEl: '.swiper-button.left'
            },
            breakpoints: {
                560: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 20
                }
            }
        });

        var capCard = new Swiper('.capCard', {
            slidesPerView: 6,
            resistanceRatio: 0,
            pagination: {
                el: '.capBlock-container .swiper-pagination',
                clickable: true
            },
            breakpoints: {
                960: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                    resistanceRatio: 0.7
                },
                767: {
                    slidesPerView: 2,
                    spaceBetween: 4,
                    resistanceRatio: 0.7
                }
            }
        });
    },
    news_detail: function news_detail() {
        var likeNews_container = new Swiper('.likeNews-container', {
            slidesPerView: 2,
            spaceBetween: 44,
            resistanceRatio: 0,
            pagination: {
                el: '.likeNews-container .swiper-pagination',
                clickable: true
            },
            breakpoints: {
                767: {
                    slidesPerView: 1,
                    spaceBetween: 40,
                    resistanceRatio: 0.7
                }
            }
        });
    },
    product_detail: function product_detail() {
        var id_swiper = new Swiper('.id-swiper', {
            slidesPerView: 1,
            pagination: {
                el: '.id-swiper .swiper-pagination',
                clickable: true
            },
            breakpoints: {
                767: {
                    slidesPerView: 1,
                    spaceBetween: 40,
                    resistanceRatio: 0.7
                }
            }
        });
    },
    capability_quality: function capability_quality() {
        var year_cover = new Swiper('.year-cover', {
            slidesPerView: 6,
            spaceBetween: 44,
            resistanceRatio: 0,
            pagination: {
                el: '.year-cover .swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                    resistanceRatio: 0.7
                },
                600: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                    resistanceRatio: 0.7
                }
            }
        });
    }
};

/**************************************************************/
/*                          slick                             */
/**************************************************************/

/**************************************************************/
/*                           hover                            */
/**************************************************************/
var hover = {};

/**************************************************************/
/*                           button                           */
/**************************************************************/
function fixDeviceTop() {
    var device = mobile();

    $(window).scroll(function () {
        var bodyHeight = $(window).height() + 200;
        var footer_top;
        var toTop;
        if ($('.footer').length) {
            footer_top = $('.footer').offset().top + $('.footer').height();
        }
        if ($('.footer-toTop--fix').length) {
            toTop = $('.footer-toTop--fix').offset().top;
        }
        if (toTop < footer_top && toTop > bodyHeight) {
            $('.footer-toTop--fix').css({
                'visibility': 'visible',
                'opacity': '1'
            });
        } else {
            $('.footer-toTop--fix').css({
                'visibility': '',
                'opacity': ''
            });
        }
    });
};

function fixShare() {
    $('.open-share').on('click', function (e) {
        e.stopPropagation();
        $('.share-block').toggleClass('share-block--show');
    });
    $('body').on('click', function (e) {
        e.stopPropagation();
        $('.share-block').removeClass('share-block--show');
    });
};

var button = {};

function appMenu_open() {
    $('.js-appMenu--open').on('click', function (e) {
        e.stopPropagation();
        $('.hero-menu-left').stop().toggleClass('hero-menu-left--open');
        $('.hero-menu').stop().toggleClass('hero-menu--fix');
    });
};

function lightBoxOpen() {
    $('.js-openlb').on('click', function (e) {
        // e.preventDefault();
        if ($(this).attr('href')) {
            e.preventDefault();
        }
        var $this = $(this);
        var target = '.' + $this.attr('data-open') + '';
        var body = $('body').attr('class');

        $(target).fadeIn();

        lightBoxActive(body, $this);
    });
}

function lightBoxActive(body, $this) {
    switch (body) {
        case 'pro_description':
            var href = $($this).attr('href');
            $('.lb-page').find('.select__btn').attr('href', href);
            break;

        case 'pro_instock':
            var href = $($this).attr('href');
            console.log(href);
            $('.lb-page').find('.select__btn').attr('href', href);
            break;

        case 'pro_inquiry':

            $('.list-remove').off().on('click', function () {
                var index = $($this).closest('.store-item').index();
                console.log(index);
                $('.store-item').eq(index).remove();
            });
            lightBoxClose();
            break;

        case 'about_group':
            var href = $($this).attr('href');
            $('.lb-page').find('.select__btn').attr('href', href);
            break;

        case 'contant':
            var href = $($this).attr('href');
            $('.lb-page').find('.select__btn').attr('href', href);
            break;
    }
}

// function sendLightboxOpen(target) {
//     $('.js-send').on('click', function() {
//         $(target).fadeIn()
//     })
// }

function lightBoxClose() {
    $('.lb-close').on('click', function (e) {
        e.stopPropagation();
        $(this).closest('.lb').fadeOut();
    });
}

function tags_select() {
    $('.section-tags__item').on('click', function () {
        $('.section-tags__item').removeClass('section-tags__item--active');
        $(this).addClass('section-tags__item--active');
    });
}

function openTitle() {
    $('.js-openTitle').on('click', function (e) {
        e.preventDefault();
        var txt = $(this).attr('data-title'),
            href = $(this).attr('href');

        $('.lb-more').find('.confirm__title').text(txt);
        $('.lb-more').find('.icon-download').parent('.list-opation-href').attr('href', href);
    });
}

/**************************************************************/
/*                      tags button                           */
/**************************************************************/
function tagsSelect(target) {
    $('.linkHref .linkHref-item').off().on('click', function () {

        var index = $(this).index();
        $(target).fadeOut(0);
        $(target).eq(index).fadeIn();
        $('.linkHref-item').removeClass('linkHref-item--active');
        $(this).addClass('linkHref-item--active');
        link_fix();
    });
}

function tagsSelectDropdowm() {
    if (deviceWidth() < 767) {
        $('.linkHref-dropDown .linkHref-item').off().on('click', function () {
            $('.linkHref').slideToggle();
        });
        $('.linkHref .linkHref-item').off().on('click', function () {
            var text = $(this).find('.linkHref-item__p').text();
            var index = $(this).index();

            $('.linkHref-dropDown .linkHref-item__p').text(text);
            $('.linkHref').slideUp();

            $('.linkHref-item').removeClass('linkHref-item--active');
            $(this).addClass('linkHref-item--active');

            $('.contact_detail-inner').fadeOut(0);
            $('.contact_detail-inner').eq(index).fadeIn();
        });
    } else {
        tagsSelect('.contact_detail-inner');
        $('.linkHref').css({
            'display': ''
        });
    }
}

/**************************************************************/
/*                         blazy                              */
/**************************************************************/
// var blazy = {
//     common: function common(offset) {
//         var bLazy = new Blazy({
//             offset: offset,
//             success: function success(ele) {
//                 // Waypoint.refreshAll();
//             }
//         });
//     },
//     all_page: function all_page() {
//         blazy.common(500);
//         console.log('blazy');
//     }
// };
var blazy;
function img_blazy(offset) {
    blazy = new Blazy({
        offset: offset,
        success: function success(ele) {
            // Waypoint.refreshAll();
        }
    });
}

/**************************************************************/
/*                          dropDown                          */
/**************************************************************/
function dropDown() {
    var $scroll;

    //展開收闔選單
    $('.dropdown-title').on('click', function (e) {
        e.stopPropagation();
        var $this = $(this);
        $scroll = $(this);

        $this.parent().siblings('.dropdown').find('.dropdown-title').removeClass('dropdown-title--active');
        $this.toggleClass('dropdown-title--active');
        if ($this.not('dropdown-title--active')) {
            $('.dropdown-menu').getNiceScroll().remove();
            // $this.removeClass('dropdown-title--active')
        }
        if ($this.hasClass('dropdown-title--active')) {
            setTimeout(function () {
                dropDownNiceScroll($this);
            }, 500);
        }

        $this.parent().siblings('.dropdown').find('.dropdown-inner').slideUp();
        $this.siblings('.dropdown-inner').slideToggle();
    });

    $('html, body').on('click', function (e) {
        $('.dropdown-inner').slideUp();
        $('.dropdown-title').removeClass('dropdown-title--active');
    });

    $('.dropdown-item__p').on('click', function () {
        var $this = $(this),
            _changeTitle,
            _changeColor,
            _thisP;

        //選擇清單內容 改變title，顏色
        _thisP = $this.text();
        _changeTitle = $this.closest('.dropdown').find('.dropdown-title').text(_thisP);

        //選擇清單內容 收闔清單
        $this.closest('.dropdown-inner').slideUp();
        $this.closest('.dropdown-inner').siblings('.dropdown-title').removeClass('dropdown-title--active');
    });
};

function slide_link() {
    var total = 0,
        totalHeight = 0,
        block_w = $('.slidelink-group').outerWidth();
    $('.slidelink-item').each(function () {
        var w = $(this).outerWidth(false),
            h = $(this).outerHeight();
            
        total += w;
        totalHeight += h;
    });

    // padding: 150px
    block_w = block_w - 150
    console.log(total);
    console.log(block_w);
    if (total > block_w) {
        $('.slidelink-more').css({
            'display': 'flex'
        });
    } else {
        $('.slidelink-more').css({
            'display': 'none'
        });
    }
    // padding: 24px
    totalHeight = totalHeight + 24
    // totalHeight = totalHeight / 3 * 2

    if ($('.slidelink-group').length) {
        document.querySelector('.slidelink-group').style.setProperty('--totalHeight', totalHeight + 'px');
    }
    $('.moreIcon').off().on('click', function (e) {
        e.stopPropagation();
        $('.slidelink-group').toggleClass('slidelink-group--fix');
        
    });

    $('body, .slidelink-item__href').off().on('click', function (e) {
        e.stopPropagation();
        $('.slidelink-group').removeClass('slidelink-group--fix');
        $('.slidelink-group').css({
            'max-height': ''
        });
    });

    // hover效果
    $(".slidelink .slidelink-item a").on('mouseover', function () {
        $(this).css("color", "#fff").closest(".slidelink-item").siblings().find("a").css("color", "#f6c180");
    });
    $(".slidelink .slidelink-item a").on('mouseout', function () {
        $(this).closest(".slidelink-item").siblings().find("a").css("color", "#ffffff");
    });
};

function qa_select() {
    $('.qa-item').on('click', function () {
        $(this).children('.qa-item-inner').slideToggle();
        $(this).toggleClass('qa-item--open');
        $(this).siblings('.qa-item').children('.qa-item-inner').slideUp();
        $(this).siblings('.qa-item').removeClass('qa-item--open');
    });
}

/**************************************************************/
/*                           a連結                            */
/**************************************************************/

// function anchorFunc(item, target) {
//     var el = Array.apply(null, document.querySelectorAll(item)),
//         target = Array.apply(null, document.querySelectorAll(target)),
//         len = el.length;

function toTarget(target_val) {
    $("a[href^=\\#]:not([href=\\#])").click(function () {
        // 取得待顯示內容的位置
        var target = $($(this).attr("href")).offset().top;
        // 將座標減70px
        target -= target_val;
        // 平滑捲動到指定位置
        $("html, body").animate({ scrollTop: target }, { duration: 900, easing: 'easeInOutCirc' });
        return false;
    });
}

//     for (var i = 0; i < len; i++) {

//         el[i].addEventListener('click', function(i) {
//             // target_el = target[i]
//             console.log(target[i])
//                 // console.log(target[i])
//         });
//     }
//     // console.log(length)
//     // el.forEach(function(obj) {
//     //     obj.addEventListener('click', function(e) {
//     //         console.log(this)
//     //     })
//     // })
// };
//錨點 Func
function anchor_point() {
    var target = $(".article__href");
    target.on('click', function () {
        var ele = $(this);
        var i = ele.index();
        var objective = document.querySelectorAll('.qa_detail-li');
        // var objective = $('.machine > div');

        setTimeout(function () {
            var targetElement = $(objective[i]);
            console.log(targetElement);
            var targetOffset = $(objective[i]).offset().top;
            console.log(targetOffset);
            $("html,body").animate({
                scrollTop: targetOffset - 66
            }, 700);
        }, 0);
    });
};

function go_Main() {
    var target = $('.goBlock');
    target.on('click', function () {
        var main_val = $('main').offset().top;
        var navbar__height = $('.navbar').height() - 25;
        $("html,body").animate({
            scrollTop: main_val - navbar__height
        }, { duration: 700, easing: 'easeInOutCirc' });
    });
};

function toTop() {
    $('.footer-toTop').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, { duration: 700, easing: 'easeInOutCirc' });
    });
}

function link_fix() {

    var width = $('.link').width();

    $('.link-block').each(function () {
        var total = 0;

        console.log($(this).find('.link-item').length);
        // totalHeight = $('.link').eq(0).prop('scrollHeight')
        $(this).find('.link-item').each(function () {
            var w = $(this).outerWidth(true);
            // total = 0,
            // totalHeight = 0;
            total += w;
        });

        // totalHeight = totalHeight / 3 * 2

        console.log('deviceWidth', width);
        console.log('total', total);
        // console.log('totalHeight', totalHeight)
        if (total > width) {
            $(this).addClass('link-block--fix');
        } else {
            $(this).removeClass('link-block--fix');
        }

        // if ($('.link').length) {
        //     console.log($('.link'));
        //     document.querySelectorAll('.link').forEach(function (el) {
        //         let totalHeight = $(el).prop('scrollHeight');
        //         el.style.setProperty('--totalHeight', totalHeight + 'px');
        //     });
        // }
    });

    $('.link-more').off().on('click', function () {
        $(this).siblings('.link').toggleClass('link--fix');
    });
}

/**************************************************************/
/*                           menu                            */
/**************************************************************/
var menu = {};

// cssVars({})


/**************************************************************/
/*                         form表單                           */
/**************************************************************/
function formFocus() {
    var labelfocus = $('.form-label');
    $.each(labelfocus,function () {
        $('.form-select__title').off().on('click', function (e) {
            // e.preventDefault()
            // e.stopPropagation()
            $('.form-select-inner').slideUp();
            $('.form-block').removeClass('form-block--focus');
            $(this).closest('.form-block').addClass('form-block--focus');
            $(this).parent().siblings('.form-select-inner').stop(0).slideToggle();
            formDropDownChange();
            setTimeout(function () {
                formDropDownNiceScroll();
            }, 400);
            return false;
        });

        $(this).on('focusin', function () {
            // $('.form-block').removeClass('form-block--focus');
            // target.parentNode.classList.add('form-block--focus');
            $('.form-block').removeClass('form-block--focus');
            $(this).parent('.form-block').addClass('form-block--focus');
        });
        $(this).on('focusout', function () {
            $(this).parent('.form-block').removeClass('form-block--focus');
            $('.form-select-inner').each(function () {
                $(this).getNiceScroll().remove();
            });
            // $('.form-select-inner').getNiceScroll().remove()
            $('.form-select-inner').slideUp();
            
        });
    });
    $('body').on('click', function () {
        $('.form-select-inner').slideUp();
    });
    
}
// function formFocus() {
//     var labelfocus = document.querySelectorAll('.form-label');
//     labelfocus.forEach(function (target) {
//         $('.form-select__title').off().on('click', function (e) {
//             // e.preventDefault()
//             // e.stopPropagation()
//             $('.form-select-inner').slideUp();
//             $('.form-block').removeClass('form-block--focus');
//             $(this).closest('.form-block').addClass('form-block--focus');
//             $(this).parent().siblings('.form-select-inner').stop(0).slideToggle();
//             formDropDownChange();
//             setTimeout(function () {
//                 formDropDownNiceScroll();
//             }, 400);
//             return false;
//         });
//         target.addEventListener('focusin', function () {
//             $('.form-block').removeClass('form-block--focus');
//             target.parentNode.classList.add('form-block--focus');
//         });
//         target.addEventListener('focusout', function () {
//             target.parentNode.classList.remove('form-block--focus');
//             $('.form-select-inner').each(function () {
//                 $(this).getNiceScroll().remove();
//             });
//             // $('.form-select-inner').getNiceScroll().remove()
//             $('.form-select-inner').slideUp();
//         });
//     });
//     $('body').on('click', function () {
//         $('.form-select-inner').slideUp();
//     });
// }
function goForm() {
    $('.store__ok span').on('click', function () {
        var formTop = $('.form-group').offset().top;
        $('html, body').animate({ scrollTop: formTop }, { duration: 700, easing: 'easeInOutCirc' });
    });
}

function formDropDownChange() {
    $('.form-select-item').on('click', function () {
        var $this = $(this),
            text = $this.html();
        console.log(text);

        $this.parent().siblings('.form-select').children('.form-select__title').html(text);
        $('.form-select-item').off();
    });
}

/**************************************************************/
/*                      lightBox init                         */
/**************************************************************/
var lightBox_init = {};

/************************************************************/
/*                     更換大小圖                            */
/************************************************************/
function xsBGLoad() {
    var winWidth = $(window).width();
    var scrollW = scrollBarW();
    //767.9-17  減掉scrollbar 17px
    if (winWidth < 960 - scrollW) {
        $('.hero-item').each(function () {
            var smallsrc = $(this).data('small');
            // console.log(smallsrc)
            $(this).css('background-image', 'url("' + smallsrc + '")');
        });
    } else {
        $('.hero-item').each(function () {
            var largesrc = $(this).data('large');
            // console.log(largesrc)
            $(this).css('background-image', 'url("' + largesrc + '")');
        });
    }
};

/**************************************************************/
/*                          search                            */
/**************************************************************/
function search_input() {
    var input_focus = document.querySelector('.navbar-search__input'),
        search_focus = document.querySelector('.navbar-search');

    input_focus.addEventListener('focusin', function () {
        search_focus.classList.add('navbar-search--focus');
    });

    input_focus.addEventListener('focusout', function () {
        search_focus.classList.remove('navbar-search--focus');
    });
};

function search_select() {
    // var main, target;

    $('.navbar-search__title').on('mouseover', function (e) {
        e.stopPropagation();

        // main = $(this).text(), target = $('.search-select-item').text();

        $('.search-select').stop().slideToggle();
    });
    $('.search-select').on('click', function (e) {
        e.stopPropagation();

        // $(this).children('.search-select-item').text(main);
        // $('.navbar-search__title').text(target);

        $('.search-select').stop().slideUp();
    });

    $('.search-select-item').on('mouseleave', function () {
        $('.search-select').stop().slideUp();
    });
};

function search_select_page() {
    var main, target;

    $('.search-bar-select').on('click', function (e) {
        e.stopPropagation();

        main = $(this).text(), target = $('.search-bar-dropDown__item').text();

        $('.search-bar-dropDown').stop().slideToggle();
    });
    $('.search-bar-dropDown__item').on('click', function (e) {
        e.stopPropagation();

        $(this).text(main);
        $('.search-bar-select').text(target);

        $('.search-bar-dropDown').stop().slideUp();
    });

    $('body').on('click', function () {
        $('.search-bar-dropDown').stop().slideUp();
    });
};

function search_tags() {
    $('.search-a .search-tags__href').on('click', function () {
        var index;
        $('.search-a .search-tags__href').removeClass('search-tags__href--active');
        $(this).addClass('search-tags__href--active');
        index = $(this).parent('.search-tags-item').index();

        $('.search-a .search-block').eq(index).fadeIn();
        $('.search-a .search-block').eq(index).siblings('.search-block').fadeOut(0);
        link_fix();

        if (index == 0) {
            $('.nicescroll-rails').css({
                'visibility': ''
            });
        } else {
            $('.nicescroll-rails').css({
                'visibility': 'hidden'
            });
        }
    });
}

function search_clear() {
    $('.search-bar__close').on('click', function () {
        $('.search-bar__input').val('');
    });
}

/**************************************************************/
/*                       niceScroll                           */
/**************************************************************/
function dropDownNiceScroll(el) {
    $(el).siblings('.dropdown-inner').find('.dropdown-menu').niceScroll({
        cursorcolor: '#eb870f', //改變scrollBar顏色以十六進制 
        cursoropacitymin: 1, //改變不透明度時scrollBar處於非活動狀態（scrollabar“隱藏”狀態）時，範圍從1到0 
        cursorborderradius: '', //改變圓角
        cursorborder: '0px', //改變border
        cursorwidth: "4px", //改變scrollBar寬度
        cursordragontouch: true
    });
};

function formDropDownNiceScroll() {
    $('.form-select-inner').niceScroll({
        cursorcolor: '#eb870f', //改變scrollBar顏色以十六進制 
        cursoropacitymin: 1, //改變不透明度時scrollBar處於非活動狀態（scrollabar“隱藏”狀態）時，範圍從1到0 
        cursorborderradius: '', //改變圓角
        cursorborder: '0px', //改變border
        cursorwidth: "4px", //改變scrollBar寬度
        cursordragontouch: true
    });
}

/**************************************************************/
/*                          table                            */
/**************************************************************/
var table_description;
var table_application;
var column_length = $('#DataTables_Table_0 .bTable-content .bTable-content-row:first-of-type td').length;
var table = {
    pro_description: function pro_description() {
        table_description = $('.pro-guide table.display').DataTable({
            // responsive: true,
            // searching: false,   //啟用/關閉 搜尋
            // paging: false,      //啟用/關閉 頁數切換
            scrollY: 400,
            ordering: false, //啟用/關閉 一頁顯示幾筆數量
            info: false, //啟用/關閉 資料量顯示
            // autoWidth: true,
            // bLengthChange: false,
            pageLength: 20, //預設一頁顯示幾筆
            scrollX: true,
            scrollCollapse: true, //當顯示有限數量的行時，允許表格減小高度。
            fixedColumns: {
                leftColumns: 2,
                rightColumns: 2
            },
            columnDefs: [{
                targets: -1,
                width: '100%'
            }],
            "drawCallback": function drawCallback(settings) {
                $('.dataTables_scrollBody').getNiceScroll().resize();
                $('.bTable .js-openlb').off();
                lightBoxOpen();
                if (mobile() == false) {
                    setTimeout(function () {
                        $('.DTFC_RightBodyWrapper, .DTFC_LeftBodyWrapper').css({
                            'height': height
                        });
                        $('.DTFC_RightBodyLiner, .DTFC_LeftBodyLiner').css({
                            'height': height,
                            'max-height': height
                        });
                        $('.dataTables_scrollBody').css({
                            'max-height': height
                        });
                    }, 0);
                }

                // 選項篩選
                $('.opation-label__input').off().on('click', function () {
                    if ($(this).is(':checked') == true) {
                        var index = $(this).closest('.opation-item').index() + 2;
                        table_description.columns(index).visible(false);
                    } else {
                        var index = $(this).closest('.opation-item').index() + 2;
                        table_description.columns(index).visible(true);
                    }
                });

                if (mobile() == false) {
                    setTimeout(function () {
                        $('.dataTables_scrollBody').css({
                            'max-height': dataTabBody_height + 17
                        });
                        $('.DTFC_ScrollWrapper').css({
                            'max-height': DTFC_ScrollWrapper_height + 17,
                            'height:': DTFC_ScrollWrapper_height + 17
                        });
                    }, 200);
                }

                var $scroll;

                //展開收闔選單
                $('.dropdown-title').off().on('click', function (e) {
                    e.stopPropagation();
                    var $this = $(this);
                    $scroll = $(this);

                    $this.parent().siblings('.dropdown').find('.dropdown-title').removeClass('dropdown-title--active');
                    $this.addClass('dropdown-title--active');
                    if ($this.not('dropdown-title--active')) {
                        $('.dropdown-menu').getNiceScroll().remove();
                        // $this.removeClass('dropdown-title--active')
                    }
                    if ($this.hasClass('dropdown-title--active')) {
                        setTimeout(function () {
                            dropDownNiceScroll($this);
                        }, 500);
                    }

                    $this.parent().siblings('.dropdown').find('.dropdown-inner').slideUp();
                    $this.siblings('.dropdown-inner').slideDown();
                });
                $('.dropdown-item__p').off().on('click', function () {
                    var $this = $(this),
                        _changeTitle,
                        _changeColor,
                        _thisP,
                        _showVal,


                    //選擇清單內容 改變title，顏色
                    _thisP = $this.text();
                    _changeTitle = $this.closest('.dropdown').find('.dropdown-title').text(_thisP);
                    _showVal = $this.attr('data-show');

                    //選擇清單內容 收闔清單
                    $this.closest('.dropdown-inner').slideUp();
                    $this.closest('.dropdown-inner').siblings('.dropdown-title').removeClass('dropdown-title--active');
                    table_description.page.len(20).draw();
                    table_description.page.len(_showVal).draw();
                });
            }

            // initComplete() {
            //     var select
            //     var newSelect
            //     var txt
            //     $('label').on('click', function() {
            //         if($(this).find('input').is(':checked') == true){
            //             txt = $(this).find('.select__name').html()
            //             // var val = $.fn.dataTable.util.escapeRegex(
            //             //     $(this).find('.select__name').html()

            //             // )
            //             // table_description
            //             //     .search( txt, false, false )
            //             //     .draw();
            //             txt = "'"+txt+"'" + "|"
            //             select += txt

            //             newSelect = select.replace(/undefined/g, '')
            //             newSelect = newSelect.substring(0, newSelect.length-1);
            //             console.log(newSelect)
            //             // console.log(typeof(newSelect))
            //             table_description.search(newSelect, true, false ).draw();
            //         }

            //     })
            // },

            // initComplete: function () {
            //     this.api().columns().every( function () {
            //         var column = this;
            //         console.log($(this).eq(7))
            //         var select = $('<div></div>')
            //             .appendTo( $(column.header()).find('.bTable-filter__inner').empty() )
            //             .on( 'change', function () {
            //                 var val = $.fn.dataTable.util.escapeRegex(
            //                     console.log('123'),
            //                     $(this).val()
            //                 );
            //             //     var newVal = val.replace(/<br>/g, '').replace(/\\/g, '');
            //             //     column
            //             //         .search( val ? newVal : '' , false, false )
            //             //         .draw();
            //             //   console.log(newVal)
            //             } );
            //         column.data().unique().sort().each( function ( d, j ) {
            //             select.append('<label><input id="'+d+'" type="checkbox" value="'+d+'">'+d+'</lebel>')
            //         } );
            //     } );
            // }
        });

        // new $.fn.dataTable.FixedColumns( table_description, {
        //     leftColumns: 2,
        //     rightColumns: 2,
        //     heightMatch: 'auto',
        // } );


        // $('.opation-item').each(function() {
        //     var index = $(this).index() + 2
        // })


        // 表格高度
        var height;
        if (mobile() == false) {
            height = $('.DTFC_LeftBodyWrapper').height() + 34;
        } else {
            height = $('.DTFC_LeftBodyWrapper').height();
        }

        var dataTabBody_height = $('.dataTables_scrollBody').height();
        var DTFC_ScrollWrapper_height = $('.DTFC_ScrollWrapper').height();
        console.log(DTFC_ScrollWrapper_height);

        if (mobile() == false) {
            setTimeout(function () {
                $('.DTFC_RightBodyWrapper, .DTFC_LeftBodyWrapper').css({
                    'height': height
                });
                $('.DTFC_RightBodyLiner, .DTFC_LeftBodyLiner').css({
                    'height': height,
                    'max-height': height
                });
                $('.dataTables_scrollBody').css({
                    'max-height': height
                });
            }, 0);
            setTimeout(function () {
                $('.dataTables_scrollBody').css({
                    'max-height': dataTabBody_height + 17
                });
                $('.DTFC_ScrollWrapper').css({
                    'height': DTFC_ScrollWrapper_height + 17,
                    'max-height': DTFC_ScrollWrapper_height + 17

                });
            }, 200);
        }

        // 篩選燈箱
        var show_default = $('.dropdown-title').text();
        var opation_langth = $('.opation-item').length + 2;
        $('.js-reset').on('click', function () {
            for (var i = 2; i < opation_langth; i++) {
                table_description.columns(i).visible(true);
            }

            table_description.page.len(20).draw();
            $('.dropdown-title').text(show_default);
        });

        $('.dataTables_scrollBody').niceScroll({
            cursorcolor: '#eb870f', //改變scrollBar顏色以十六進制 
            cursoropacitymin: 1, //改變不透明度時scrollBar處於非活動狀態（scrollabar“隱藏”狀態）時，範圍從1到0 
            cursorborderradius: '', //改變圓角
            cursorborder: '0px', //改變border
            cursorwidth: "5px", //改變scrollBar寬度
            cursordragontouch: true,
            railpadding: { top: 0, right: 0, left: 0, bottom: -2.5 },
            emulatetouch: true,
            touchbehavior: true,
            preventmultitouchscrolling: false
        });

        $('.bTable-filter-overflowContent').niceScroll('.bTable-filter-overflow', {
            cursorcolor: '#eb870f', //改變scrollBar顏色以十六進制 
            cursoropacitymin: 1, //改變不透明度時scrollBar處於非活動狀態（scrollabar“隱藏”狀態）時，範圍從1到0 
            cursorborderradius: '', //改變圓角
            cursorborder: '0px', //改變border
            cursorwidth: "5px", //改變scrollBar寬度
            cursordragontouch: true,
            railpadding: { top: 0, right: 0, left: 0, bottom: -2.5 },
            emulatetouch: true,
            touchbehavior: true,
            preventmultitouchscrolling: false,
            bouncescroll: false //是否回彈
        });
    },
    pro_datatable_fix: function pro_datatable_fix() {
        var last2 = column_length - 2;
        if (deviceWidth() < 768) {
            $('.bTable-filter__title').attr('colspan', '1');
            $('.bTable-filter__reset').attr('colspan', '1');
            table_description.columns(1).visible(false);
            table_description.columns(last2).visible(false);
        }
    },


    // scroll
    application_detail: function application_detail() {
        table_application = $('table.display').DataTable({
            searching: false, //啟用/關閉 搜尋
            paging: false, //啟用/關閉 頁數切換
            ordering: false, //啟用/關閉 一頁顯示幾筆數量
            info: false, //啟用/關閉 資料量顯示
            // autoWidth: true,
            scrollX: true,
            scrollY: false,
            scrollCollapse: true, //當顯示有限數量的行時，允許表格減小高度。
            fixedColumns: {
                leftColumns: 2,
                rightColumns: 2
            },
            "drawCallback": function drawCallback(settings) {
                $('.dataTables_scrollBody').getNiceScroll().resize();
            }
        });

        $('.dataTables_scrollBody').niceScroll({
            cursorcolor: '#eb870f', //改變scrollBar顏色以十六進制 
            cursoropacitymin: 1, //改變不透明度時scrollBar處於非活動狀態（scrollabar“隱藏”狀態）時，範圍從1到0 
            cursorborderradius: '', //改變圓角
            cursorborder: '0px', //改變border
            cursorwidth: "5px", //改變scrollBar寬度
            cursordragontouch: true,
            railpadding: { top: 0, right: 0, left: 0, bottom: -2.5 }
        });

        $('.bTable').each(function () {
            var table_width = $(this).find('.bTable-content').width();

            if (table_width > 1275) {
                return;
            }

            $(this).find('.bTable-wrap').css({
                'max-width': table_width
            });
        });
    },


    // 篩選器、篩選重製
    application_datatable_fix: function application_datatable_fix() {
        var last2 = column_length - 2;
        // var last1 = column_length - 1
        if (deviceWidth() < 768) {
            $('.bTable-filter__title').attr('colspan', '1');
            $('.bTable-filter__reset').attr('colspan', '1');
            table_application.columns(1).visible(false);
            // table_application.columns(last1).visible(false);
            table_application.columns(last2).visible(false);
        }
    }
};

/**************************************************************/
/*                         購物流程                           */
/**************************************************************/
var cart = {
    cartNumber: function cartNumber() {
        var len = $('.cartLi .cartLi-item').length;
    }
};

/**************************************************************/
/*                      各自頁面各自表態                       */
/**************************************************************/
function navBar_fix() {

    var target = $('.navbar');

    $(window).scroll(function () {
        var top_val = $(this).scrollTop();
        var device = mobile();
        if (top_val > 100) {
            target.addClass('navbar--fix');
        } else {
            target.removeClass('navbar--fix');
        }
        if (device == false) {}
    });
};

var features = {};

function resize() {
    $(window).resize(function () {

        navBar_fix();

        fixDeviceTop();

        xsBGLoad();

        link_fix();

        slide_link();

        fixVh();

        if ($('.linkHref-dropDown').length) {
            tagsSelectDropdowm();
        }
        // table.pro_datatable_fix()
    });
}

function body_innerMenu() {
    $('body').on('click', function (e) {
        e.stopPropagation();
        $('.hero-menu-left').stop().removeClass('hero-menu-left--open');
        $('.hero-menu').stop().removeClass('hero-menu--fix');
    });
}

//product description 切換

function description_tags() {
    $('.section-tags__item').on('click', function () {
        var index = $(this).index();
        $('.description-block').eq(index).fadeIn().siblings('.description-block').fadeOut(0);
        if (index == 1) {
            $('.nicescroll-rails').css({
                'visibility': 'hidden'
            });
        } else {
            $('.nicescroll-rails').css({
                'visibility': ''
            });
        }
    });
}

// 投資人 table tab 切換

function tab_tags() {
    $('.table-tags__item').on('click', function () {
        var index = $(this).index();
        $('.table-block').eq(index).fadeIn().siblings('.table-block').fadeOut(0);
        $('.table-tags__item').removeClass('table-tags__item--active');
        $(this).addClass('table-tags__item--active');
        if (index == 1) {
            $('.nicescroll-rails').css({
                'visibility': 'hidden'
            });
        } else {
            $('.nicescroll-rails').css({
                'visibility': ''
            });
        }
        link_fix();
    });
}

// 核心能力證書展開

function QC_slide() {
    $('.qc-cover .icon-arrowDown').on('click', function () {
        $(this).siblings('.qc-list').slideToggle();
        $(this).toggleClass("deg");
        img_blazy(100);
    });
}

//wade 新增 table fixed thead function 20191122
function wTableFixedThead() {

    function tableSetting() {

        let pageLanguage = $('html').attr('lang'),
            iconDownloadWord, iconCartQWord, iconOrderQWord;

        if (pageLanguage === 'en') {
            iconDownloadWord = 'Datasheet';
            iconCartQWord = 'Add Inquiry';
            iconOrderQWord = 'Sample Order';
        }
        if (pageLanguage === 'zh-Hant-TW') {
            iconDownloadWord = '規格書';
            iconCartQWord = '新增詢問單';
            iconOrderQWord = '樣品訂購';
        }
        if (pageLanguage === 'zh-Hans') {
            iconDownloadWord = '规格书';
            iconCartQWord = '新增询问单';
            iconOrderQWord = '样品订购';
        }

        $('.wTable-block').each(function() {

            let $this = $(this),
                $prototype = $this.find('.wTable-table.prototype'),
                $prototypeBody = $prototype.find('.wTable-tbody'),
                $prototypeBodyScrollCss = '.wTable-tbody.scroll-content',
                $prototypeBodyTr = $prototypeBody.find('.wTable-tbody-tr'),
                $prototypeHead = $prototype.find('.wTable-thead'),
                $tdHover = $prototype.find('.td_hover'),

                $fixedThead_left = $this.find('.fixedThead_left'),
                $fixedThead_left_tbody = $fixedThead_left.find('.wTable-tbody'),
                fixedThead_left_tbody_Tr = '.wTable-tbody-tr',
                $fixedThead_left_tbody_Tr = $fixedThead_left_tbody.find(fixedThead_left_tbody_Tr),
                $fixedThead_left_tbody_Tr_Num = 0,

                $td_DownloadHover = $fixedThead_left.find('.icon-download'),
                // $td_CartHover = $fixedThead_left.find('.icon-addFile'),
                $td_OrderHover = $fixedThead_left.find('.icon-cart'),

                imageHoverCss = 'hover-image',
                imageHoverShowCss = 'hover-image-show',
                iconHoverCss = 'hover-icon-show',
                scrollPromptCss = 'Wtable-scrollPrompt';


            //同步 tbody + thead + $fixedThead_left scroll
            function table_scrollSync() {
                //先行將thead還有tbody同步定位
                let scrollX, scrollY,
                    $scrollObj = $prototype.find($prototypeBodyScrollCss);

                function syncXY(scrollX, scrollY) {
                    $prototypeHead.scrollLeft(scrollX)
                    $fixedThead_left_tbody.scrollTop(scrollY)
                }


                if (typeof $scrollObj !== 'undefined' && $scrollObj.length >= 1) {

                    scrollX = $prototype.find($prototypeBodyScrollCss).scrollLeft();
                    scrollY = $prototype.find($prototypeBodyScrollCss).scrollTop();
                    syncXY(scrollX, scrollY);

                    console.log('prototypeScrollBodyX ' + scrollX)
                    console.log('prototypeScrollBodyY ' + scrollY)
                }

                $prototypeBody.scroll(function(e) {
                    scrollX = $(this).scrollLeft()
                    scrollY = $(this).scrollTop()
                    syncXY(scrollX, scrollY);

                });


            }

            //同步 wTable.prototype  $fixedThead_left tr height
            function tr_HeightSync() {

                $prototypeBodyTr.each(function() {

                    let $this = $(this),
                        bodyTrH = $this.height(),
                        $syncObj = $fixedThead_left_tbody_Tr.eq($fixedThead_left_tbody_Tr_Num),
                        syncObjH = $syncObj.height();

                    if (bodyTrH != syncObjH) {
                        if (bodyTrH > syncObjH) { $syncObj.css('height', bodyTrH) } else { $this.css('height', syncObjH) }
                    }
                    // console.log('$fixedThead_left_tbody_Tr_Num :' + $fixedThead_left_tbody_Tr_Num)
                    // console.log(bodyTrH)
                    // console.log($syncObj)
                    $fixedThead_left_tbody_Tr_Num++;
                })
            };

            //產生下方捲軸提示
            function table_scrollPromp() {
                let $scrollPromp = $('.' + scrollPromptCss);

                if ($scrollPromp.length <= 0 || typeof $scrollPromp === 'undefined') {
                    $prototype.append('<div class="' + scrollPromptCss + '">&lt; scroll &gt;</div>');
                    $scrollPromp = $('.' + scrollPromptCss);
                }

                //滑過提示，把提示隱藏起來
                $scrollPromp.on('mouseenter', function() {
                    $(this).css('opacity', '0');
                    $(this).css('z-index', '-1');
                    setTimeout(function() {
                        $(this).remove();
                    }, 500)

                })
            };

            //icon hover setting
            function td_iconHover() {

                //icon-download
                $td_DownloadHover.on('mouseenter', function() {

                    let $thisTop = $(this).offset().top,
                        $thisW = $(this).outerWidth(true) / 2,
                        $thisLeft = $(this).offset().left + $thisW;

                    if (pageLanguage === 'zh-Hant-TW') {

                    }
                    iconObjMouseEnter($thisTop, $thisLeft, iconDownloadWord);

                })
                $td_DownloadHover.on('mouseleave', function() {
                    iconObjMouseLeave();
                })

                //icon-Cart
                // $('.pc_addfile').hover(function() {
                //     let thisTop = $(this).offset().top - $(this).outerHeight(true)*0.7,
                //         thisLeft = $(this).offset().left + $(this).outerWidth(true)*0.7,
                //         show_obj = $(this).parents('.wTable-block').find('.hover-guide-show');
                //     /*要append的資料寫在這 */
                //     setTimeout(function() {
                //         show_obj.css('opacity', '1');
                //     }, 200)
                //     show_obj.css({
                //         'top': thisTop,
                //         'left': thisLeft
                //     });
                // },function(e){
                //     let show_obj = $(this).parents('.wTable-block').find('.hover-guide-show');
                //     if(show_obj.is(e.relatedTarget)) return
                //     show_obj.css({
                //         'opacity': '0',
                //         'top': '-100%',
                //         'left': '-100%'
                //     });
                
                // })
                // $('.hover-guide-show').on('mouseleave', function(e) {
                //     $(this).css({
                //         'opacity': '0',
                //         'top': '-100%',
                //         'left': '-100%'
                //     });
                // })

                //icon-Order
                $td_OrderHover.on('mouseenter', function() {

                    let $thisTop = $(this).offset().top,
                        $thisW = $(this).outerWidth(true) / 2,
                        $thisLeft = $(this).offset().left + $thisW;

                    iconObjMouseEnter($thisTop, $thisLeft, iconOrderQWord);

                })
                $td_OrderHover.on('mouseleave', function() {
                    iconObjMouseLeave();
                })
            }

            //icon Object HoverIn
            function iconObjMouseEnter(offsetTop, offsetLeft, content) {
                let $hoverIconShow = $this.find('.' + iconHoverCss);

                if ($hoverIconShow.length <= 0) {
                    $this.append('<div class="' + iconHoverCss + '"></div')
                    $hoverIconShow = $this.find('.' + iconHoverCss);
                }
                setTimeout(function() {
                    $hoverIconShow.css('opacity', '1');
                }, 200)

                let hoverIconH = $hoverIconShow.outerHeight(true) + 10,
                    hoverIconW = $hoverIconShow.outerWidth(true) / 2;

                $hoverIconShow.html(content);
                $hoverIconShow.css('top', offsetTop - hoverIconH);
                $hoverIconShow.css('left', offsetLeft - hoverIconW);
            };

            //icon Object HoverOut
            function iconObjMouseLeave() {
                let $hoverIconShow = $this.find('.' + iconHoverCss);
                $hoverIconShow.css('opacity', '0');
                $hoverIconShow.css('top', '-100%');
                $hoverIconShow.css('left', '-100%');
            }

            //Hover出現定位電路圖
            function td_imageHover() {

                $tdHover.on('mouseenter', function() {
                    let tdHoverH = $(this).outerHeight(true) / 2,
                        $hoverImageShow = $this.find('.' + imageHoverShowCss),
                        $hoverImage = $(this).find('.' + imageHoverCss).html(),
                        hoverImageShowH, positionTop;

                    if ($hoverImageShow.length > 0) {
                        $hoverImageShow.html($hoverImage);
                        $hoverImageShow.css('opacity', '1');
                    } else {
                        $this.append('<div class="' + imageHoverShowCss + '"></div')
                        $hoverImageShow = $this.find('.' + imageHoverShowCss);
                        $hoverImageShow.html($hoverImage);

                        console.log($hoverImageShow)

                        setTimeout(function() {
                            $hoverImageShow.css('opacity', '1');

                        }, 200)
                    }

                    $hoverImageShow.css('top', $(this).offset().top + tdHoverH);
                    $hoverImageShow.css('left', $(this).offset().left - 200);

                });

                $tdHover.on('mouseleave', function() {
                    $this.find('.' + imageHoverShowCss).css('opacity', '0');
                    $this.find('.' + imageHoverShowCss).css('top', '-100%');
                    $this.find('.' + imageHoverShowCss).css('left', '-100%');
                });
            }

            $this.find('.scrollContainer').scrollbar();
            $this.find('.checkContent').scrollbar();

            td_iconHover()
            td_imageHover();
            tr_HeightSync();
            table_scrollSync();
            table_scrollPromp();
        });
    }

    function tableSyncResize() {
        var t = false;

        function doResize() {
            console.log('resize');
            tableSetting();
        }
        $(window).resize(function() {
            clearTimeout(t);
            t = setTimeout(doResize, 500);
            console.log('t : ' + t);
        });


        // $(window).resize(function() {
        //     console.log('@@@@@@@@ Resize');
        // })
    }
    tableSetting();
    tableSyncResize();

}

let Peter = {
    lan: function(){
        $('.now_lan').on('click',function(){
            let $this = $(this),
                $open_obj = $this.next('.lan_select'),
                $now_lan = $this.find('p'),
                $select_obj = $open_obj.find('a');
            $open_obj.slideToggle(300);
            $this.toggleClass('open');
            $select_obj.on('click',function(){
                let $this_select = $(this),
                    this_text = $this_select.html();
                $now_lan.html(this_text);
                $this_select.addClass('active').closest('li').siblings().find('a').removeClass('active');
            });
            $('body').on('mouseup', function (e) {
                let wrap = $this;
                if (!wrap.is(e.target) && wrap.has(e.target).length === 0) {
                  // $open_obj.slideUp();
                    $this.removeClass('open');
                    $open_obj.slideUp(300);
                }
            })
        })
    },
    letter_btn: function(){
        $('footer .agree span').on('click',function(){
            let send_btn = $(this).closest('.lettersub_block').find('.sub_btn');
            $(this).closest('.agree').toggleClass('click');
            send_btn.toggleClass('click');
            // send_btn$('.sub_btn').addClass('js-openlb');
            // lightBoxOpen()
            // lightBoxClose()
        })
        
    },
    cookies: function(){
        $('.cookies .agree').on('click',function(){
            $(this).closest('.cookies').fadeOut(300)
        })
    },
    all:function(){
        Peter.lan();
        Peter.letter_btn();
        Peter.cookies();
    }
}

/**************************************************************/
/*                          呼叫                              */
/**************************************************************/

var readyFunction = {
    checkFunction: function checkFunction() {
        //共用函數呼叫
        readyFunction.common();

        //擷取body id
        var functionName = $('body').attr('id');

        if (functionName !== undefined) {
            //呼叫函數( 如果 id = home 輸出的結果為 readyFunction.home(); )
            eval("readyFunction." + functionName + "();");
        }
    },
    common: function common() {
        console.log('include common');

        lightBox_open();

        lightBox_close(500);

        toTop();

        navBar_fix();

        img_blazy(100);

        resize();

        fixDeviceTop();

        search_select();

        fixVh();

        if ($('.link').length) {
            link_fix();
        }

        // if ($('.navbar').length) {
        //     search_input();
        // }
        Peter.all();
    },
    home: function home() {

        swiper.home();

        body_innerMenu();

        go_Main();

        xsBGLoad();

        appMenu_open();
    },
    news: function news() {},
    news_detail: function news_detail() {
        swiper.news_detail();

        fixShare();
    },
    app: function app() {
        toTarget(100);
    },
    app_list: function app_list() {},
    app_detail: function app_detail() {
        toTarget(90);

        fixShare();

        // table.application_detail();

        // table.application_datatable_fix();

        wTableFixedThead();

        lightBoxOpen();

        lightBoxClose();
    },
    csr: function csr() {
        toTarget(100);
    },
    csr_list: function csr_list() {
        slide_link();
        toTarget(100);
    },
    csr_detail: function csr_detail() {
        fixShare();
    },
    csr_stakeholder: function csr_stakeholder() {},
    pro: function pro() {
        toTarget(100);
    },
    pro_list: function pro_list() {
        toTarget(100);
    },
    pro_detail: function pro_detail() {
        swiper.product_detail();

        lightBoxOpen();

        lightBoxClose();
    },
    pro_description: function pro_description() {
        tags_select();

        description_tags();

        fixShare();

        table.pro_description();

        table.pro_datatable_fix();

        lightBoxOpen();

        lightBoxClose();

        openTitle();

        dropDownNiceScroll();

        dropDown();
    },
    pro_instock: function pro_instock() {
        dropDown();

        dropDownNiceScroll();

        lightBoxOpen();

        lightBoxClose();
    },
    pro_inquiry: function pro_inquiry() {
        formFocus();

        goForm();

        lightBoxOpen();

        lightBoxClose();
    },
    about: function about() {
        toTarget(100);
    },
    about_group: function about_group() {
        toTarget(100);

        lightBoxOpen();

        lightBoxClose();
    },
    about_hero: function about_hero() {},
    about_milestone: function about_milestone() {
        dropDown();

        dropDownNiceScroll();
    },
    about_corevalue: function about_corevalue() {},
    about_vision: function about_vision() {},
    about_manufactu: function about_manufactu() {},
    contact: function contact() {
        formFocus();

        goForm();

        tagsSelect('.contact_detail-inner');

        lightBoxOpen();

        lightBoxClose();

        dropDown();

        dropDownNiceScroll();

        tagsSelectDropdowm();
    },
    privacy: function privacy() {},
    search: function search() {
        table.application_detail();

        table.application_datatable_fix();

        search_tags();

        search_clear();

        lightBoxOpen();

        lightBoxClose();

        search_select_page();
    },
    inv: function inv() {
        toTarget(100);
    },
    inv01_01: function inv01_01() {
        slide_link();
    },
    inv01_02: function inv01_02() {
        dropDown();

        dropDownNiceScroll();

        slide_link();

        tab_tags();
    },
    inv01_03: function inv01_03() {
        dropDown();

        dropDownNiceScroll();

        slide_link();
    },
    inv01_04: function inv01_04() {
        dropDown();

        dropDownNiceScroll();

        slide_link();
    },
    inv02_01: function inv02_01() {
        slide_link();
    },
    inv02_02: function inv02_02() {
        slide_link();
    },
    inv02_03: function inv02_03() {
        slide_link();
        dropDown();
        dropDownNiceScroll();
        tab_tags();
        qa_select();
        toTarget(100);
    },
    inv02_04: function inv02_04() {
        slide_link();
    },
    inv02_05: function inv02_05() {
        slide_link();
    },
    inv02_06: function inv02_06() {
        slide_link();
    },
    inv03_01: function inv03_01() {
        dropDown();

        dropDownNiceScroll();

        slide_link();
    },
    inv03_02: function inv03_02() {
        slide_link();
    },
    inv03_03: function inv03_03() {
        dropDown();

        dropDownNiceScroll();

        slide_link();
    },
    inv03_04: function inv03_04() {
        slide_link();
    },
    inv03_05: function inv03_05() {
        slide_link();
    },
    inv03_06: function inv03_06() {
        dropDown();

        dropDownNiceScroll();

        slide_link();
    },
    inv03_07: function inv03_07() {
        slide_link();
    },
    inv04_01: function inv04_01() {
        qa_select();
    },
    inv04_02: function inv04_02() {},
    capability: function capability() {
        toTarget(100);
    },
    capability_detection: function capability_detection() {
        wordlatest(35, ".list_txt ._title");
        wordlatest(55, ".list_txt ._p");
    },
    capability_RD: function capability_RD() {
        slide_link();
        wordlatest(35, ".list_txt ._title");
        wordlatest(55, ".list_txt ._p");
        toTarget(100);
    },
    capability_quality: function capability_quality() {
        slide_link();
        swiper.capability_quality();
        QC_slide();
        toTarget(100);
    },
    capability_production: function capability_production() {
        wordlatest(35, ".list_txt ._title");
        wordlatest(55, ".list_txt ._p");
    },
    hr: function hr() {
        toTarget(100);
    },
    hr_life: function hr_life() {},
    hr_recruit: function hr_recruit() {},
    hr_contact: function hr_contact() {},
    hr_work: function hr_work() {
        toTarget(100);
    }
};

$(document).ready(function () {
    readyFunction.checkFunction();
});
//# sourceMappingURL=main-dist.js.map