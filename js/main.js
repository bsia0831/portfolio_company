/*
var btnCall = document.querySelector(".btnCall"); 

var menuMo = document.querySelector(".menuMo"); 

var closeBtn = document.querySelector(".closeBtn"); 


btnCall.onclick = function(e){
    e.preventDefault(); 

    menuMo.classList.add("on"); 
}

closeBtn.onclick = function(e){
    e.preventDefault(); 

    menuMo.classList.remove("on"); 
}
*/

let pos0 = $("#header").offset().top; //0 
let pos1 = $("#news").offset().top; 
let pos2 = $("#brand").offset().top; 
let pos3 = $("#crew").offset().top; 


//화면에서 스크롤할 때 
$(window).on("scroll", function(){
    //현재 스크롤한 값을 변수에 담는다
    let scroll = $(this).scrollTop(); 

    //모든 내비 li a의 on을 제거하고 
    $("#navi li a").removeClass("on"); 

    //스크롤이 header 부분에 해당할 대 
    if(scroll>=pos0 && scroll < pos1){
        $("#navi li").eq(0).children("a").addClass("on"); 
    }
    //스크롤이 news에 해당할 때 
    if(scroll>=pos1 && scroll < pos2){
        $("#navi li").eq(1).children("a").addClass("on"); 
    }
    //스크롤이 brand에 해당할 때 
    if(scroll>=pos2 && scroll < pos3){
        $("#navi li").eq(2).children("a").addClass("on"); 
    }
    //스크롤이 crew에 해당할 때 
    if(scroll>=pos3 ){
        $("#navi li").eq(3).children("a").addClass("on"); 
    }
});



//내비 버튼을 클릭했을 때 
$("#navi li a").on("click", function(e){
    e.preventDefault(); 

    //클릭한 버튼에서 href값을 구해서 target에 담음 
    let target = $(this).attr("href"); 
    console.log(target); 

    //target의 세로위치값을 targetPos에 담음 
    let targetPos = $(target).offset().top; 
    console.log(targetPos); 

    //내비 버튼을 클릭하면 
    //문서의 스크롤바 위치값이 targetPos에 맞춰서 animate로 이동하도록 처리 
    $("html, body").animate({
        scrollTop : targetPos
    },1000);

    
});