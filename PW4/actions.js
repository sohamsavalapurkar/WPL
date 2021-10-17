$(document).ready(function() {
    
    $.ajax({
  
           url: "movies.xml",
           dataType: "xml",
           success: function(data) {
              $("table").append('<tr><td>Title</td><td>Genre</td><td>Director</td><td>Cast</td><td>Short Description</td><td>IMDB-rating</td></tr>');
              $(data).find('movie').each(function(){
                  var title = $(this).find('title').text();
                  var genre = []
                  $(this).find('genre').each(function() {
                      genre.push($(this).text())
                  })
                  genre = genre.join(", ")
                  var director = $(this).find('director').text();
                  var cast = []
                  $(this).find('person').each(function() {
                      cast.push($(this).attr("name"))
                  })
                  cast = cast.join(", ")
                  var description = $(this).find('synopsis').text();
                  var score = $(this).find('score').text();
      
                  var info = '<tr><td>' + title +'</td><td>' +  genre + '</td><td>' +  director + '</td><td>' +  cast + '</td><td>' +  description + '</td><td>' +  score + '</td></tr>';
                  $("table").append(info);
              });
              
  
           },
           error: function() { alert("error loading file");  }
    });
    
  
  })