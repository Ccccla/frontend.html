$(function(){
    
    $.ajax({
        url:"../shop1/banner/banner.json",
        Cache:false,
        type:"GET",
        dataType:"JSON",
        
        success:function ($a1,$a2) {
            // console.log($a1);
            $.fn.banner_data($a1);
        },
        error:function () {
            console.log("통신에러");
        }
    });

    $.fn.banner_data = function ($real_data){
        // console.log($real_data);
        var $timer;

        $("#banner_pic > div").append("<ul></ul>");
        $($real_data["banners"]).each(function ($aa1,$aa2) {
            // console.log($real_data["banners"][$aa1][0]);
            $("#banner_pic > div > ul").append("<li></li>");
            $("#banner_pic").append("<label><div><img src="+$real_data["banners"][$aa1][0]+"></div><ul></ul></label>");

            $.map($real_data["banners"][$aa1],function ($bb1,$bb2) {
                // console.log($bb2);

                $("#banner_pic > label:eq("+$aa1+") > ul").append("<li></li>");
                if($bb2 != 0){
                    if($bb2 == 1){
                        $("#banner_pic > label:eq("+$aa1+") > ul > li").eq(0).append($real_data["banners"][$aa1][$bb2]);
                    }
                    else if($bb2 == 2){
                        $("#banner_pic > label:eq("+$aa1+") > ul > li").eq(1).append($real_data["banners"][$aa1][$bb2]);
                    }
                    else if($bb2 == 3){
                        $("#banner_pic > label:eq("+$aa1+") > ul > li").eq(2).append($real_data["banners"][$aa1][$bb2]);
                    }
                    else if($bb2 == 4){
                        $("#banner_pic > div > ul > li").eq($aa1).append($real_data["banners"][$aa1][$bb2]);
                    }
                }
                $("#banner_pic > label:eq("+$aa1+") > ul > li").eq(3).text("VIEW DETAIL"); 
            });

            $("#banner_pic > label:eq("+$aa1+") > ul > li").eq(3).bind({
                "mouseenter":function () {
                    $(this).css({
                        "background-color":"black",
                        "color":"white",
                        "transition":"all 2s ease"
                    });
                },
                "mouseleave":function () {
                    $(this).css({
                        "background-color":"",
                        "color":"",
                        "transition":"all 2s ease"
                    });
                }
            });
        });
        

        var $banner_count = 0;
        var $banner_ea = $("#banner_pic > label").length;

        
        $("#banner_click > ul > li").click(function () {
            var $in_time = $(this).index();

            $.fn.banner_roop($in_time,$banner_ea);
            clearTimeout($timer);
            
            $("#banner_pic").mouseleave(function(){
                $.fn.banner_time();
                $(this).unbind();
            });
        });
        
        $.fn.banner_time = function () {
            
            if($banner_count > $banner_ea-1){
                $banner_count = 0;
            }
            $.fn.banner_roop($banner_count,$banner_ea);
            $banner_count++;

            $timer = setTimeout($.fn.banner_time,8000);
        }
        setTimeout($.fn.banner_time(),8000);
    }
    
    $.fn.banner_roop = function($banner_count,$banner_ea){

        var $banner_li_ea = $("#banner_pic > label:eq(0) > ul > li").length;

        $("#banner_click > ul > li").css({
            "background-color":"",
            "color":""
        });

        $("#banner_click > ul > li").eq($banner_count).css({
            "background-color":"black",
            "color":"white"
        });

        $("#banner_pic > label").eq(($banner_count-1)).fadeOut(2000);
        $("#banner_pic > label").eq($banner_count).fadeIn(2000);
        
        $("#banner_pic > label:eq("+$banner_count+") > ul > li").css({
            "margin-left":"",
            "opacity":""
        });

        var $r = 0;
        do{
            $("#banner_pic > label:eq("+$banner_count+") > ul > li").eq($r).delay(800*($r+1)).animate({
                "margin-left":0,
                "opacity":1
            },1500);
            
            $r++;
        }while($r < $banner_li_ea-1);
    }
});