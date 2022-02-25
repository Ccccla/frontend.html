$(function () {
    // 소메뉴 배열 만들어야 함
    $.ajax({
        url:"../shop1/menu/menu.json",
        cache:false,
        dataType:"JSON",
        type:"GET",

        success:function($data,$yn){
            // console.log($data);
            $.fn.menu_data($data);
        },
        error:function(){
            console.log("통신 오류");
        }
    });

    $.fn.menu_data = function($data){
        // console.log($data);

        $("#menu_div1").append("<ol class='menu_ol2' id='menu_ol2_id1'></ol>");
        $("#menu_div2").append("<ol class='menu_ol2' id='menu_ol2_id2'></ol>");

        $($data).each(function($aa1,$aa2){
            
            if($aa1 < 6){
                $("#menu_ol2_id1").append("<li>"+$aa2["menus"]+"</li>");
            }
            else{
                $("#menu_ol2_id2").append("<li>"+$aa2["menus"]+"</li>");
            }
           
            if($data[$aa1]["cate"][0] != ""){
                $("#menu_ol2_id1 > li").eq($aa1).append("<ul></ul>");
                $($data[$aa1]["cate"]).each(function($bb1,$bb2){
                    // console.log($bb2);
                    $("#menu_ol2_id1 > li:eq("+$aa1+") > ul").append("<li>"+$bb2+"</li>");
                    // $("#menu_ol2_id1")
                });
            }
        });
        
        $("#menu_ol2_id1 > li").bind({
            
            "mouseenter":function(){
                var $li_in = $(this).index();
            
                // console.log($li_in2);
                $("#menu_ol2_id1 > li:eq("+$li_in+") > ul").stop().slideDown(500);
            },

            "mouseleave":function(){
                var $li_in = $(this).index();
                $("#menu_ol2_id1 > li:eq("+$li_in+") > ul").stop().slideUp(1000);
            }
        });
    }
});