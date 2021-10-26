$.ajax({
        url: "https://www.flickr.com/services/rest/?method=flickr.photos.search",
        //url:"https://www.flickr.com/services/rest/?method=flickr.interestingness.getList", 
        dataType: "json",
        data: {
            api_key: "d61e30a1010fe3e1dab106d3a2df0f21",
            per_page: 500,
            format: "json",
            nojsoncallback: 1,
            privacy_filter: 1,
            tags: "landscape"
        }
    })
    .success(function (data) {

        let items = data.photos.photo;
        console.log(items);

        $("#gallery").append("<ul>");

        $(items).each(function (index, data) {
            let text = data.title;
            if (!data.title) {
                text = "No description in this photo";
            }

            $("#gallery ul")
                .append(
                    $("<li>")
                    .append(
                        $("<div>").append(
                            $("<a>").attr({
                                href: "https://live.staticflickr.com/" + data.server + "/" + data.id + "_" + data.secret + "_b.jpg"
                            })
                            .append(
                                $("<img class='thumb'>").attr({
                                    src: "https://live.staticflickr.com/" + data.server + "/" + data.id + "_" + data.secret + "_m.jpg"
                                })
                            ),
                            $("<p>").text(text),

                            $("<div class='profile'>")
                            .append(
                                $("<img class='buddy'>").attr({
                                    //src : "https://www.flickr.com/buddyicons/"+data.owner+".jpg"
                                    src: "http://farm" + data.farm + ".staticflickr.com/" + data.server + "/buddyicons/" + data.owner + ".jpg"
                                }),
                                $("<span>").text(data.owner)
                            )

                        )
                    )
                ) //gallery append ends       
        });

        //img 태그요소가 완료된 이후 해당 img요소의 전체 갯수 구함
        const total = $("#gallery ul li").length;


        let imgNum = 0;

        $("#gallery img").each(function (index, data) {
            data.onerror = function () {
                $(data).attr("src", "img/default.jpg");
            }

            data.onload = function () {
                imgNum++;
                console.log(imgNum);

                //카운트되는 이미지 갯수와 (전체이미지갯수*2)값이 동일하면
                if (imgNum === total * 2) {
                    //로딩바이미지에 off를 붙여서 안보이게 처리
                    $(".loading").addClass("off");

                    new Isotope("#gallery ul", {
                        itemSelector: "#gallery ul li",
                        columnWidth: "#galley ul li",
                        transitionDuration: "0.5s"
                    });

                    //gallery ul에 on을 붙여서 서서히 보이게 처리
                    $("#gallery ul").addClass("on");
                }
            }
        });



    })
    .error(function (err) {
        console.err("데이터를 호출하는데 실패했습니다");
    });


$("body").on("click", "#gallery ul li", function (e) {
    e.preventDefault();

    let imgSrc = $(this).children("a").attr("href");

    $("body").append(
        $("<div class='pop'>")
        .append(
            $("<img>").attr({
                src: imgSrc
            }),
            $("<span>").text("close")
        )
    )
});

$("body").on("click", ".pop span", function () {
    $(".pop").remove();
});