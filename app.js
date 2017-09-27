"use strict";

const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI";

class Youtube {
 constructor()
  {
   this.result= {
      videos: [],
      selectedVideo: null,
      searchTerm: "iPhone X"
     }
   }

   init() {
      //app.videoSearch("iPhone");
      console.log($('#input').val())
      $('#span').click(function() {
         $("#root").empty();
         $("#video").empty();
         
            youtube.youtubeSearch($('#input').val());
      })
      $('#input').keypress(function(e) {
            if(e.which == 13)  {
                  $("#root").empty();
                  $("#video").empty();
                  youtube.youtubeSearch($('#input').val());
                  
            }
            
      })
     youtube.clickImages();
   }
   clickImages(){
         $('ol').click((e) =>
          {  $("#video").empty();
          $("#root").empty();
          youtube.youtubeSearch(e.target.id);
         } )

   }
   //<iframe className="embed-responsive-item" src={url}> </iframe>
   getVideoList(videos) {
      return videos.map((video, index) => {
            const url = `https://www.youtube.com/embed/${video.id.videoId}`;            
         const imageUrl = video.snippet.thumbnails.medium.url;
      //    $('#video').append(`https://www.youtube.com/embed/${video.id.videoId}`)
         $('#video').append(`<div  ><p> 
         <iframe class="embed-responsive-item" src=${url}> </iframe></p></div>
     
         `);
         return `<li> 
                        <h4 ><b >${video.snippet.title}</b></h4>
                     <img id=${video.id.videoId} class="media-object" src=${imageUrl} />
                      <label>${video.snippet.description}</label>
                     
               </li>`;

      });
      
   }
   youtubeSearch(searchTerm) {
      console.log('sdfdsf:' +searchTerm);

      YTSearch({ key: API_KEY, term: searchTerm }, data => {
         console.log("result", data);
         this.result = {
            videos: data,
            selectedVideo: data[0],
            searchTerm: searchTerm
         };
         var list = this.getVideoList(this.result.videos);
         console.log("lis: ", list);

         $("#root").append(list);
      //    $('#video').append(list[0]);
         
      });
   }
   videoSearch(searchTerm) {
      jQuery.getJSON("list.json", data => {
         console.log("result", data.items);
         this.result = {
            videos: data.items,
            selectedVideo: data.items[0],
            searchTerm: searchTerm
         };
         var list = this.getVideoList(this.result.videos);
         console.log("lis: ", list);
         $("#root").append(list);
      });
   }
};
let  youtube = new Youtube();
$(document).ready(youtube.init);
