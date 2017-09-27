"use strict";

const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI";

let app = {
   result: {
      videos: [],
      selectedVideo: null,
      searchTerm: "iPhone X"
   },

   init: function() {
      //app.videoSearch("iPhone");
      console.log($('#input').val())
      $('#span').click(function() {
         $("#root").empty();
         $("#video").empty();
         
            app.youtubeSearch($('#input').val());
      })
      $('#input').keypress(function(e) {
            if(e.which == 13)  {
                  $("#root").empty();
                  $("#video").empty();
                  app.youtubeSearch($('#input').val());
                  
            }
            
      })
      app.clickImages()
   },
   clickImages: function(){
         $('ol').click((e) =>
          {  $("#video").empty();
          $("#root").empty();
            this.youtubeSearch(e.target.id);
         } )

   },
   //<iframe className="embed-responsive-item" src={url}> </iframe>
   getVideoList: function(videos) {
      return videos.map((video, index) => {
            const url = `https://www.youtube.com/embed/${video.id.videoId}`;            
         const imageUrl = video.snippet.thumbnails.medium.url;
      //    $('#video').append(`https://www.youtube.com/embed/${video.id.videoId}`)
         $('#video').append(`<div  class="embed-responsive embed-responsive-16by9" ><p> 
         <iframe class="embed-responsive-item" src=${url}> </iframe></p></div>
     
         `);
         return `<li> 
                        <h4 ><b >${video.snippet.title}</b></h4>
                     <img class="media-object" src=${imageUrl} />
                      <label>${video.snippet.description}</label>
                     
               </li>`;

      });
      
   },
   youtubeSearch: function(searchTerm) {
      console.log('sdfdsf:' +searchTerm);

      YTSearch({ key: API_KEY, term: searchTerm }, data => {
         console.log("result", data);
         app.result = {
            videos: data,
            selectedVideo: data[0],
            searchTerm: searchTerm
         };
         var list = app.getVideoList(app.result.videos);
         console.log("lis: ", list);

         $("#root").append(list);
      //    $('#video').append(list[0]);
         
      });
   },
   videoSearch: function(searchTerm) {
      jQuery.getJSON("list.json", data => {
         console.log("result", data.items);
         app.result = {
            videos: data.items,
            selectedVideo: data.items[0],
            searchTerm: searchTerm
         };
         var list = app.getVideoList(app.result.videos);
         console.log("lis: ", list);
         $("#root").append(list);
      });
   }
};

$(document).ready(app.init);
