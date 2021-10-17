$(document).ready(function() {
    $("span").hide();
    $("#list").on("mouseenter","li", function() {
    $(this).find("span").fadeIn()
}).on("mouseleave", "li", function() {
   $(this).find("span").fadeOut()
})
$("#plus").click(function() {
   $("#add").toggle(); 
   
})
$("#add").keypress(function(event) {
   var keycode = (event.keyCode ? event.keyCode : event.which);
   if(keycode == '13') {
       $("#list").append('<li class="list-group-item"><span><i class="fa fa-trash"></i></span>' +  $("#add").val() + '</li>');
       $("#add").val("") 
       $("#add").hide();
   }
})
$("#list").on("click", "span", function(){
    $(this).parent().remove();
});

$("#list").on("click", "li", function(){
    $(this).addClass('crossOut');
});
$(document).ready(function(){
    $('#list li:nth-child(odd)').addClass('alternate');
});
})