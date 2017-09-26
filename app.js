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
            app.youtubeSearch($('#input').val());
      })
      $('#input').keypress(function(e) {
            if(e.which == 13)  {
                  app.youtubeSearch($('#input').val());
                  
            }
            
      })
   },
   //<iframe className="embed-responsive-item" src={url}> </iframe>
   getVideoList: function(videos) {
      return videos.map((video, index) => {
            const url0 = `https://www.youtube.com/embed/${video.id.videoId}`;            
            const url = `https://www.youtube.com/embed/${video.id.videoId}`;            
         const imageUrl = video.snippet.thumbnails.default.url;
         $('#video').append(`https://www.youtube.com/embed/${video.id.videoId}`)
         return `<li> 
                     <img class="media-object" src=${imageUrl} />
                      <label>${video.snippet.title}</label>
                      <label>${video.snippet.description}</label>
                     <p> 
                        <iframe class="embed-responsive-item" src=${url}> </iframe>

                     </p>
               </li>`;

      });
      
   },
   youtubeSearch: function(searchTerm) {
      console.log(searchTerm);

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
         $('#video').append(list[0]);
         
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
