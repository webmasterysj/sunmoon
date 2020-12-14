/**
 * @author YSJ
 */
$(function(){
	  /*
     * Slideshow
     */
    // slideshow 클래스를 가진 요소마다 작업을 수행
    $('.slideshow').each(function () {

        var $slides = $(this).find('img'), // 모든 슬라이드
            slideCount = $slides.length,   // 슬라이드 점수
            currentIndex = 0;              // 현재 슬라이드를 나타내는 인덱스

        // 첫 번째 슬라이드에 페이드 인으로 표시
        $slides.eq(currentIndex).fadeIn();

        // 7500 밀리 초마다 showNextSlide 함수를 실행
        setInterval(showNextSlide, 1000);

        // 다음 슬라이드를 표시하는 함수
        function showNextSlide () {

            // 다음 표시 할 슬라이드의 인덱스
            // (만약 마지막 슬라이드이라면 처음으로 돌아 가기)
            var nextIndex = (currentIndex + 1) % slideCount;

            // 현재 슬라이드 페이드 아웃
            $slides.eq(currentIndex).fadeOut();

            // 다음 슬라이드를 페이드 인
            $slides.eq(nextIndex).fadeIn();

            // 현재 슬라이드 인덱스를 업데이트
            currentIndex = nextIndex;
        }
    });
    
      /*
     * Sticky header
     */
    $('.page-header').each(function () {

        var $window = $(window), // 창을 jQuery 오브젝트 화
            $header = $(this),   // 헤더를 jQuery 객체 화
            // 헤더의 기본 위치를 검색
            headerOffsetTop = $header.offset().top;
           
        // 윈도우의 스크롤 이벤트를 모니터링
        // (창이 스크롤 할 때마다 작업을 수행하기)
        $window.on('scroll', function () {
            // 윈도우의 스크롤양을 확인하고
            // 헤더의 기본 위치를 지나서 있으면 클래스를 부여
            // 그렇지 않으면 삭제
            if ($window.scrollTop() > headerOffsetTop) {
                $header.addClass('sticky');
            } else {
                $header.removeClass('sticky');
            }
        });

        // 윈도우의 스크롤 이벤트를 발생시키는
        // (헤더의 초기 위치를 조정하기 위해)
        $window.trigger('scroll');

    });
    
    /*
     * Tabs
     */
    $('#work').each(function () {

        // jQuery 오브젝트 화
        var $tabList    = $(this).find('.tabs-nav'),   // 탭의 목록
            $tabAnchors = $tabList.find('a'),          // 탭 (링크)
            $tabPanels  = $(this).find('.tabs-panel'); // 패널

        // 탭이 클릭되었을 때의 처리
        // 인자로 이벤트 객체를 받는다.
        $tabList.on('click', 'a', function (event) {

            // 링크 클릭에 대한 기본 동작을 취소
            event.preventDefault();

            // 클릭 된 탭을 jQuery 오브젝트 화
            var $this = $(this);

            // 만약 이미 선택된 탭이라면 아무것도하지 않고 처리를 중지
            if ($this.hasClass('active')) {
                return;
            }

            // 모든 탭의 선택 상태를 해제하고,
            // 클릭 된 탭을 선택 상태로
            $tabAnchors.removeClass('active');
            $this.addClass('active');

            // 모든 패널을 일단 비표시로하고
            // 클릭 된 탭에 대응하는 패널을 표시
            $tabPanels.hide();
            $($this.attr('href')).show();

        });

        // 첫 번째 탭을 선택 상태로
       $tabAnchors.eq(0).trigger('click');

    });
    
    /*
     * Back-toTop button (Smooth scroll)
     */
  
        $('.back-to-top').on('click', function () {
            //event.preventDefault();
            $('html').animate({ scrollTop: 0 }, 500);
        });
    
});
