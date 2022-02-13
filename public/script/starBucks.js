(function($, window, document, undefined){
    
    class StarBucks {
        init(){
            this.header();
            this.section1();
            this.section2notice();
            this.section2Slide();
            this.section4();
            this.section5();
            this.section6();
            this.section7();
            this.section8();
            this.goTop();
            this.quickMenu();
        }
        header(){
            const bergerBtn = $('.berger-btn');
            const mobileNav = $('#mobileNav');
            const mobileContainer = $('.mobile-container');
            const mobileClose = $('.mobile-close');
            const mobileContainerLia = $('.mobile-container li a');
            const mobileContainerLiaNoneSub = $('.mobile-container li a.none-sub');
            const findBtn = $('.find-btn');
            const findBox = $('.find-box');
            const mainBtn = $('.main-btn');
            const sub = $('.sub');
            const nav = $('#nav');

            //모바일 버튼 이벤트
            bergerBtn.on({
                click: function(){
                    mobileNav.addClass('addMobile');
                    mobileContainer.stop().animate({left:0}, 400);
                }
            });

            //모바일 닫기
            mobileClose.on({
                click: function(){                
                    mobileContainer.stop().animate({left:110+'%'}, 400, function(){
                        mobileNav.removeClass('addMobile');
                    });                
                }
            });

            //모바일 메뉴버튼 이벤트 > 서브메뉴 펼치기
            mobileContainerLia.on({
                click: function(){
                    $(this).toggleClass('addMobile');
                    $(this).next('div').slideToggle(300);
                    mobileContainerLiaNoneSub.removeClass('addMobile');
                }
            });
        
            findBtn.on({
                click: function(){
                    findBox.toggleClass('addInput');
                }
            });

            mainBtn.on({
                mouseenter: function(){
                    mainBtn.removeClass('addCurrent');
                    $(this).addClass('addCurrent');
                    sub.stop().slideUp(0);
                    $(this).next().stop().slideDown(400,'easeOutExpo');
                },
                focusin: function(){
                    mainBtn.removeClass('addCurrent');
                    $(this).addClass('addCurrent');
                    sub.stop().slideUp(0);
                    $(this).next().stop().slideDown(600,'easeOutExpo');
                }
            });

            nav.on({
                mouseleave: function(){
                    mainBtn.removeClass('addCurrent');
                    sub.stop().slideUp(400,'easeOutExpo');
                }
            });
        }
        section1(){
            const img = $('.img');
            //애니메이션 페이드인 효과
            function ani(){
                img.eq(0).stop().animate({opacity:1},600, function(){
                    img.eq(1).stop().animate({opacity:1},600, function(){
                        img.eq(2).stop().animate({opacity:1},600, function(){
                            img.eq(3).stop().animate({opacity:1},600, function(){
                                img.eq(4).stop().animate({opacity:1},600);
                            });
                        });
                    });
                });
            }

            setTimeout(ani, 600);
        }
        section2notice(){
            let cnt = 0;
            const notice = $('.notice');

            //1.메인슬라이드 함수
            function mainSlide(){
                notice                   .css({zIndex:1}).stop().animate({top:24},0);
                notice.eq(cnt==0?4:cnt-1).css({zIndex:2}).stop().animate({top: 0},0);
                notice.eq(cnt)           .css({zIndex:3}).stop().animate({top:24},0).animate({top:0},1000);
            }
            //2. 다음카운트 함수

            function nextCount(){
                cnt++;
                if(cnt>4){cnt=0}
                mainSlide();
            }

            //3. 자동타이머(셋인터발)
            function autoTimer(){
                setInterval(nextCount, 3000);
            }

            setTimeout(autoTimer, 100);
        }
        section2Slide(){
            let cnt = 0;
            let setId = null;
            let winW = $(window).innerWidth()*0.9;
            const  slide = $('.slide');
            const slideWrap = $('.slide-wrap');
            const pageBtn = $('.page-btn');
            const playBtn = $('.play-btn');
            const nextBtn = $('.next-btn');
            const prevBtn = $('.prev-btn');
            const promotionBtn = $('.promotion-btn');
            // const slide = ('#slide');

            //반응형
            function resizeFn(){
                if( $(window).innerWidth()<=819 ){
                    winW = $(window).innerWidth()*0.9;
                }
                else{
                    winW = 819;
                }
                
                slide.css({ width: winW }); //슬라이드 너비
                //mainSlide(); //실시간으로 메인슬라이드 연동반응
                slideWrap.stop().animate({left:-winW*cnt}, 0);
            }
            resizeFn();

            $(window).resize(()=>{
                resizeFn();
            });

            //1. 메인슬라이드 함수
            function mainSlide(){
                console.log( cnt );
                slideWrap.stop().animate({left:-winW*cnt}, 600, function(){
                    if(cnt>2){cnt=0}
                    if(cnt<0){cnt=2}
                    slideWrap.stop().animate({left:-winW*cnt}, 0);
                    //슬라이드 번호별 스타일 적용 addClass
                    slide.removeClass('addCurrent');
                    slide.eq(cnt+1).addClass('addCurrent');
                });
                pageEvent();
            }

            //2-1. 다음카운트 함수
            function nextCount(){
                cnt++;
                mainSlide();
            }
            //2-2. 이전카운트 함수
            function prevCount(){
                cnt--;
                mainSlide();
            }

            //3. 자동타이머
            function autoTimer(){
                setId = setInterval(nextCount, 3000);
            }

            function pageEvent(){
                pageBtn      .children().attr('src','./images/main_prom_off.png')
                pageBtn.eq(cnt==3?0:cnt).children().attr('src','./images/main_prom_on.png')
            }

            // 배열 반복처리
            pageBtn.each(function(idx){
                $(this).on({
                    click: function(e){
                        e.preventDefault();
                        cnt = idx;
                        mainSlide();
                    }
                });
            });

            function stopFn(){
                playBtn.children().attr('src', './images/main_prom_play.png');
                playBtn.removeClass('on');

                //슬라이드정지
                clearInterval(setId);
            }
            function playFn(){
                playBtn.children().attr('src', './images/main_prom_stop.png');
                playBtn.addClass('on');
            
                //슬라이드플레이
                autoTimer(); 
            }

                playBtn.on({
                   click: function(e){
                       e.preventDefault();
                      if( $(this).hasClass('on') === true ){
                        stopFn();
                       }
                       else{
                        playFn();    
                       }
                       
                   }
               });

            //7-1. 다음화살버튼 클릭 이벤트
            nextBtn.on({
                click: function(e){
                    e.preventDefault();
                    stopFn();
                    nextCount();   
                }
            });
            //7-2. 이전화살버튼 클릭 이벤트            
            prevBtn.on({
                click: function(e){
                    e.preventDefault();
                    stopFn();
                    prevCount();
                }
            });

            promotionBtn.on({
                click: function(e){
                    e.preventDefault();

                    if( $(this).hasClass('close') ){
                        $('#slide').stop().slideDown(600);
                        $(this).removeClass('close');
                        playFn();
                    }
                    else{
                        $('#slide').stop().slideUp(600);
                        $(this).addClass('close');
                        //정지
                        stopFn();
                        cnt=0;
                        mainSlide();
                    }                    
                }
            });
            
            //슬라이드 랩 박스 위에 마우스가 올라가면 슬라이드 정지
            slideWrap.on({
                mouseenter: function(){
                    stopFn();
                },
                mouseleave: function(){
                    playFn();
                }
            });
        }
        section4(){
            const section4 = $('#section4');

            $(window).scroll(()=>{
                if( $(window).scrollTop() == 0 ){
                    section4.removeClass('addAni');
                }
                if( $(window).scrollTop() > 500 ){
                    section4.addClass('addAni');
                }
                
            });
        }
        section5(){
            const section5 = $('#section5');
            const section3 = $('#section3');
            let sec3Top = section3.offset().top-300;

            $(window).scroll(()=>{
                if( $(window).scrollTop() == 0 ){
                    section5.removeClass('addfadein');
                }
                if( $(window).scrollTop() >= sec3Top ){
                    section5.addClass('addfadein');
                }
            });
        }
        section6(){
            const section6 = $('#section6');
            const section4 = $('#section4');
            let sec4Top = section4.offset().top;
            $(window).scroll(()=>{
                if( $(window).scrollTop() == 0 ){
                    section6.removeClass('addAni');
                }
                if( $(window).scrollTop() >= sec4Top ){
                    section6.addClass('addAni');
                }
            });
        }
        section7(){
            const section7 =$('#section7');
            const section6 = $('#section6');
            let sec6Top = section6.offset().top-600;

            $(window).scroll(()=>{
                if( $(window).scrollTop() == 0 ){
                    section7.removeClass('addFade');
                }
                if( $(window).scrollTop() >= sec6Top ){
                    section7.addClass('addFade');
                }
            });
        }
        section8(){
            const section8 = $('#section8');
            const section8Left = $('#section8 .left');
            const section6 = $('#section6');
            let sec6Top = section6.offset().top+200;
            let leftW=null;
            let leftH=null;

                $(window).scroll(()=>{

                    if( $(window).scrollTop() == 0 ){
                        section8.removeClass('addAni')
                    }
                    
                    if( $(window).scrollTop() >= sec6Top ){
                        section8.addClass('addAni')
                    }

                });
                
                function leftResize(){

                  let winW = $(window).innerWidth();          
                  if( winW <= 960 ){
                    leftW = winW * 0.38125;                 
                    leftH = leftW * 0.85246;
                  }
                  else{
                    leftW = 366;
                    leftH = 312;
                  }
                  section8Left.css({ width:leftW, height:leftH });

                }
                leftResize();

                $(window).resize(()=>{
                  leftResize();
                });
        }
        goTop(){
            const goTop = $('.go-top');
            const goTopBtn = $('.go-top-btn');
            const htmlBody = $('html, body');
            goTop.stop().fadeOut(1000);

            $(window).scroll(()=>{
                if( $(window).scrollTop() >= 100 ){
                    goTop.stop().fadeIn(1000);
                }
                else{
                    goTop.stop().fadeOut(1000);
                }

            });
            goTopBtn.on({
                click:function(){
                    htmlBody.animate({scrollTop:0}, 600);
                }
            });
        }
        quickMenu(){
            const quickMenu = $('.quick-menu')
            let quickTop1 = ($(window).height() - 96)/2;
            let quickTop2 = 150;

            function quickMenuFn(){
                quickMenu.stop().animate({top: $(window).scrollTop() + quickTop2 }, 600, "easeOutExpo");
            }
            quickMenuFn();    
            
            $(window).scroll(()=>{
                quickMenuFn();
            });
        }

    }

    const newStarBucks = new StarBucks();
          newStarBucks.init();

})(jQuery, window, document);