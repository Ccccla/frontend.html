$(function(){
    var $width = $(window).width();
    var $height = $("#roulette_div > img").height();

    let $data = ["500포인트","5,000 포인트","꽝! 다음 기회에!!","3,000 포인트","2,000포인트","1,000 포인트"];
    let $r = 0; // 오브젝트 최초 위치값
    var $count = 3;

    $("#roulette_sec").css("height",$height+"px");

    $("#gamebtn").click(function re_start(){
        
        $(this).unbind("click");

        if($count <= 0){
            alert("3회 참여만 가능합니다.");
        }
        else{
            
            $("#msg").css("display","none");

            var $random = Math.ceil(Math.random()*360);
            $r = $r + 1800;
            var $msg = $.fn.rotate($r,$random);
            
            console.log($data[$msg]);

            setTimeout(function(){
                $("#msg").slideDown(800);
                $("#msg").html($data[$msg]);
            },4000); 
        }

        $("#msg").click(function(){
            $(this).css("display","none");
        });
        $count--;
        
        setTimeout(function () {
            $("#gamebtn").click(function (){
                re_start();
                $(this).unbind("click");
            });
        },4000);
    }); 
    
    $.fn.rotate = function($r,$random){

        var $node = 0;  // 결과 숫자

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

        var $rotate = $r + $random;
        
        $("#gameboard").css(
            "transform","rotate("+$rotate+"deg)",
            );
        return $node;
    }
});