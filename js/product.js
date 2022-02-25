let product_arr;

function pd_ajax() {
    
    function pd_arr() {
        if(window.XMLHttpRequest){
            return new XMLHttpRequest();
        }
    }
    function pd_arr2() {
        if(product_arr.readyState == XMLHttpRequest.DONE && product_arr.status == 200){
            // console.log(this.response);
            product_data(this.response);
        }
    }
    product_arr = pd_arr();
    product_arr.onreadystatechange = pd_arr2;
    product_arr.open("GET","../shop1/product/product.json",true);
    product_arr.send();
}

pd_ajax();

var pd_oll = document.getElementById("pd_ol");

function product_data(data){
    
    const pd_data = JSON.parse(data);
    // console.log(pd_data);
    
    pd_oll = document.getElementById("pd_ol");

    var r1;
    for(r1 in pd_data["flat_product"]){
        
        var pd_li = document.createElement("li");
        var pd_div = document.createElement("div");
        var pd_ul = document.createElement("ul");

        pd_oll.appendChild(pd_li);
        pd_li.appendChild(pd_div);
        pd_li.appendChild(pd_ul);
        pd_ul.className = "pd_cs_ul";

        pd_div.setAttribute("style","background:url('"+pd_data["flat_product"][r1]["product_img"]+"') no-repeat center center; background-size:cover;");
        pd_li.setAttribute("onmouseenter","mouse_en("+r1+")");
        pd_li.setAttribute("onmouseleave","mouse_le("+r1+")");
        
        Object.keys(pd_data["flat_product"][r1]).forEach(function(aa1,aa2){
            
            var pd_li2 = document.createElement("li");
            pd_ul.appendChild(pd_li2);

            // console.log(pd_data["flat_product"][r1]["product_money"]);
            var textt = pd_data["flat_product"][r1][aa1];
            // console.log(textt);

            if(aa1 != "product_img"){
                if(pd_data["flat_product"][r1]["product_dc"] != ""){
                    if(aa1 == "product_money"){
                        pd_li2.innerHTML = "<s>"+textt+"</s>";
                    }
                    else{
                        pd_li2.innerHTML = textt;
                    }
                }
                else{
                    if(textt == ""){
                        pd_li2.innerHTML = "&nbsp;";
                    }
                    else{
                        pd_li2.innerHTML = textt;
                    }
                }
            }
        });
    }
}

var pd_uuu = document.getElementsByClassName("pd_cs_ul");

function mouse_en(aaa) {
    // console.log(pd_uuu[aaa].children);

    var rr1 = 0
    var li_ea = pd_uuu[0].children.length;    
    do{
        pd_uuu[aaa].children[rr1].display = "block";
        rr1++;
    }while(rr1 < li_ea)
}

function mouse_le(bbb) {
    pd_oll.children[bbb].style.backgroundColor = "";

    var rr1 = 0
    var li_ea = pd_uuu[0].children.length;    
    do{
        pd_uuu[bbb].children[rr1].display = "";
        rr1++;
    }while(rr1 < li_ea)
}

// 해시태그

$(function (){
    $.ajax({
        url:"../shop1/product/hash.json",
        Cache:false,
        type:"GET",
        dataType:"JSON",

        success:function($a1,$a2){
            // console.log($a1);
            $.fn.pd_jq_data($a1);
        },
        error:function(){
            console.log("통신에러");
        }
    });

    $.fn.pd_jq_data = function($pd_real_data){
        // console.log($pd_real_data);

        $.map($pd_real_data,function($aa1,$aa2){
            // console.log($aa2);
            $("#pd_label > ul").append("<li></li>");
            $("#pd_label > ul > li").eq($aa2).html("#"+$pd_real_data[$aa2]["hash_title"]);
        });
    };
});