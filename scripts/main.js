$(document).ready(async () => {
    let textContents = ``;
    let dataUrl = "https://node-insta-notes.herokuapp.com";
    $.get(dataUrl).done(( data ) => {
      const keys = Object.keys(data);
      console.log("KEYS");
      for(const key of keys) {
          const { content = "" } = data[`${key}`];
          textContents = `<li keyid="${key}"><div class="deleteContent" keyid="${key}">X</div>${content}</li>`+textContents;
      }
      $("#content-list").html(`<ol reversed>${textContents}</ol>`);
    });
     
      
    // add note
    $("#addContent").submit((event) => {
        event.preventDefault();
        content = $("#newText").val();
        let posting = $.post( dataUrl, { content } );
        posting.done(function( data ) {
            $("#content-list ol").prepend(`<li keyid="${data.addedDate}"><div class="deleteContent" keyid="${data.addedDate}">X</div><pre>${data.content}</pre></li>`);
            $("#newText").val("");
        });
   });
   //delete note
    
     $(document.body).on('click', '.deleteContent', (event) =>{
        const keyid = $(event.currentTarget).attr('keyid');
        $.ajax({
            type: "DELETE",
            url: `${dataUrl}/${keyid}`,
        });
        $(event.currentTarget).parent().hide();
     });
   
});