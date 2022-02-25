$(function(){
    
    $.ajax({
        url:"../shop1/newproduct/new_product.json",
        Cache:false,
        type:"GET",
        dataType:"JSON",

        success:function($aa1,$aa2){
            // console.log($aa1);
            $.fn.n_pd_data($aa1);
        },
        error:function(){
            console.log("통신 에러");
        }
    });
    
    $.fn.n_pd_data = function($real_n_pd_data){
        // console.log($real_n_pd_data["new_product"]);

        $($real_n_pd_data["new_product"]).each(function($aa1,$aa2){
            // console.log($real_n_pd_data["new_product"][$aa1]["product_money"]);
            // console.log($aa1);

            $("#n_pd_ul").append("\
                <li>\
                    <ol class='n_pd_ol'>\
                        <li>\
                            <span>"+$real_n_pd_data['new_product'][$aa1]["product_dc"]+"</span>\
                            <span>\
                                <dl>\
                                    <dd></dd>\
                                    <dd></dd>\
                                </dl>\
                            </span>\
                        </li>\
                        <li>"+$real_n_pd_data["new_product"][$aa1]["product_nm"]+"</li>\
                        <li>"+$real_n_pd_data["new_product"][$aa1]["product_info"]+"</li>\
                        <li>"+$real_n_pd_data["new_product"][$aa1]["product_money"]+"</li>\
                        <li>"+$real_n_pd_data['new_product'][$aa1]["product_sales"]+"</li>\
                    </ol>\
                </li>\
            ");

            $("#n_pd_ul > li:eq("+$aa1+") > ol > li").eq(0).css("background-image","url("+$real_n_pd_data['new_product'][$aa1]['product_img']+")");

            if($real_n_pd_data['new_product'][$aa1]["product_dc"] == ""){
                $("#n_pd_ul > li:eq("+$aa1+") > ol > li:eq(0) > span").eq(0).css("display","none");
                $("#n_pd_ul > li:eq("+$aa1+") > ol > li").eq(3).text("");
                $("#n_pd_ul > li:eq("+$aa1+") > ol > li").eq(4).text($real_n_pd_data["new_product"][$aa1]["product_money"]);
            }
            else{
                $("#n_pd_ul > li:eq("+$aa1+") > ol > li:eq(3)").css("text-decoration","line-through");
            }

            $("#n_pd_ul > li").eq($aa1).bind({
                "mouseenter":function (){
                    $("#n_pd_ul > li:eq("+$aa1+") > ol > li:eq(0) > span:eq(1) > dl").css("display","block");    
                },
                "mouseleave":function (){
                    $("#n_pd_ul > li:eq("+$aa1+") > ol > li:eq(0) > span:eq(1) > dl").css("display","");    
                }
            });
        });
    }
});