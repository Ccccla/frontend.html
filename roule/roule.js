$(function(){
    // alert("test");
    let $point = ["500 포인트 당첨!","5000 포인트 당첨!","꽝! 다음 기회에...","3000 포인트 당첨!","2000 포인트 당첨!","1000 포인트 당첨!"];

    var $r = 0;
    var $count = 0;
    $("#roulette_ul > li").eq(1).click(function let_it_go(){
        

        $(this).unbind("click");

        setTimeout(function (){
            $("#roulette_ul > li").eq(1).click(function (){
                let_it_go();
                $(this).unbind("click");
            });
        },4000);


        if($count <= 2){
            var $random = Math.ceil(Math.random()*360);
            $r = $r + 1800;
    
            var $point_message = $.fn.message($r,$random);
            
            console.log($point[$point_message]);
            
            setTimeout(function (){
                $("#roulette_div > label").fadeIn(3000);
                $("#roulette_div > label").html($point[$point_message]);
            },3500);
        }
        else{
            alert("세번의 기회를 모두 사용하셨습니다.");
        }

        $count++;
        $("#roulette_div > label").css("display","none");
    });    

    $.fn.message = function ($r,$random){
        
        var $circle = $r + $random;
        
        // console.log($deg);

        var $node = 0;

        if($random >= 0 && $random <= 59){
            $node = 0;
        }
        else if($random >= 60 && $random <= 119){
            $node = 1;
        }
        else if($random >= 180 && $random <= 239){
            $node = 3;
        }
        else if($random >= 240 && $random <= 299){
            $node = 4;
        }
        else if($random >= 300 && $random <= 359){
            $node = 5;
        }
        else{
            $node = 2;
        }

        $("#roulette_div > span").css({
            "transform":"rotate("+$circle+"deg)",
            "transition":"all 4s ease"
        },1000);

        return $node;
    }

    $("#roulette_div > label").click(function () {
        $(this).css("display","none");
    });
});