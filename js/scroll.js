const $btns = $("#navi li"); 
const $boxs = $(".myScroll"); 
let posArr = []; 
let len = $btns.length; 
let baseLine = -100; 

//posArr.push($boxs.eq(1).offset().top); 

//myScroll클래스가 있는 박스들을, 박스 갯수만큼 반복을 돌면서 posArr에 세로위치값을 저장하는 반복문 
for(let i=0; i<len; i++){
    posArr.push($boxs.eq(i).offset().top);
}

//브라우저 리사이즈시 다시 세로위치값 갱신 
$(window).on("resize", function(){
    //리사이즈했을 때 값 4개만 담기위해서 배열을 비움
    posArr = []; 
    for(let i=0; i<len; i++){
        posArr.push($boxs.eq(i).offset().top);     
    }

    console.log(posArr); 
});


//화면에서 스크롤 할 때 
$(window).on("scroll", function(){
    //현재 스크롤한 값을 변수에 담음 
    var scroll = $(this).scrollTop();

    console.log(scroll); 

    // scroll이 section#news에 도착하면(scrollTop =960 )
    if(scroll >= posArr[1] && scroll < posArr[2]){
        scroll = scroll - posArr[1]; 
        console.log(scroll);

    } 
    

//0,600,1300,2700
    for(let i =0; i<len; i++){
        //스크롤이 posArr의 순번에 해당하는 값보다 크거나 같다면 
        if(scroll >= posArr[i] + baseLine){
            //모든 버튼의 on을 제거하고 
            $btns.children("a").removeClass("on"); 
            //해당하는 버튼의 a에 on 추가 
            $btns.eq(i).children("a").addClass("on"); 

            //모든 박스에 on을 제거 
            $boxs.removeClass("on");
            //해당순번- 화면에 보이는 박스에 on추가  
            $boxs.eq(i).addClass("on"); 
        }
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