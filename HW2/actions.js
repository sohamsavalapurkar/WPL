$(document).ready(function() {
    
    $.ajax({
        url: "../Assignment-2/js/data.json",
        dataType: "json",
        success: function(data) {
            $.each(data, function(index, image) {
                $("#images").append($('<img>', {
                    src: "../Assignment-2/images/square/" + image.path,
                    alt: image.title, 
                    id: image.id,
                    class: "small-img"
                }))
                
            });
            
             
        },
        error: function() {alert("error loading file"); }
    });
    $("#images").on("mouseenter", "img", function(event) {
        var x = event.clientX + 20;
        var y = event.clientY + 20;
        var path, city, date;
        var id = this.id;
        $.ajax({
            url: "../Assignment-2/js/data.json",
            dataType: "json",
            async: false,
            success: function(data) {
                $.each(data, function(index, image) {
                    if(image.id == id) {
                        city = image.city;
                        path = image.path;
                        date = image.taken;
                        
                    }
                });    
             
        },
        error: function() {alert("error loading file"); }
        })
        
        $(".modal").css({left:x, top:y})
        $(this).addClass("gray");
        $(".modal-body").append($('<img>', {
            src: "../Assignment-2/images/medium/" + path,
            alt: this.alt, 
            id: this.id,
           
        }))
        $(".modal").toggle();
        $(".modal-content").append("<p>Title: " + this.alt + "<br/>City: " + city + "<br/>Date: " + date +  "</p>");
    });
    $("#images").on("mouseleave", "img", function() {
        $(this).removeClass("gray");
        $(".modal-body img:last-child").remove();
        $(".modal-content p:last-child").remove();
        $(".modal").toggle();
    });
})