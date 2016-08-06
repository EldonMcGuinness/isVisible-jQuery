(function( $ ) {

  /*
  * Parameters:
  * vhenVisible - Do this when visible
  * vhenInvisible - Do this when not visible
  *
  *
  */

  $.fn.isVisible = function( options ) {
    var target = $( this );
    console.log(target);

    if (target.length > 1){
    	$.each(target,function(index, value){
    		$(value).isVisible(options);
    	});
    	return;
    }

	target.whenVisible = null;
	target.whenInvisible = null;

    if (options != undefined){
      target.whenVisible = ( typeof(options["whenVisible"]) == "function" ) ? options["whenVisible"] : null;
      target.whenInvisible = ( typeof(options["whenInvisible"]) == "function" ) ? options["whenInvisible"] : null;
    }

    $(document).ready(function(){
      reevaluate();
    });

    $(window).scroll(function() {
      reevaluate();
    }).resize(function() {
      reevaluate();
    });;

    function reevaluate(){
      var viewport = {
        position:{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        },
        size:{
          height:0,
          width:0
        }
      }

      viewport.size.height = $(window).height();
      viewport.size.width = $(window).width();
      viewport.position.top = $(window).scrollTop();
      viewport.position.left = $(window).scrollLeft();
      viewport.position.bottom = Math.abs( $(window).scrollTop() + viewport.size.height );
      viewport.position.right = Math.abs( $(window).scrollLeft() - viewport.size.width );


      // TODO check for other visibility issues (hidden, opacity)
      // Check if we are still on the screen vertically
      if (
          $(target).css("visibility") == "none" ||
          viewport.position.top	> ( $(target).offset()["top"] + $(target).height() ) ||
          viewport.position.bottom < ( $(target).offset()["top"] ) ||
          viewport.position.left > ( $(target).offset()["left"] + $(target).width() ) ||
          viewport.position.right < ( $(target).offset()["left"] )
      ){
        if (target.whenInvisible != null) target.whenInvisible(target);
        //console.log("not visible");
      }else{
        if (target.whenVisible != null) target.whenVisible(target);
        //console.log("visible");
      }

    }
  }
})( jQuery );
