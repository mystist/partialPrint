/*
 * partialPrint
 * 
 * https://github.com/Mystist/partialPrint
 *
 * Copyright (c) 2013 Foundation and other contributors
 *
 * License: https://github.com/Mystist/partialPrint/blob/master/MIT-LICENSE.txt
 *
 */
 
(function ($) {

  var prev;
  var isUsing = false;

  var methods = {

    init: function(options) {
    
      var defaults = {};
      var settings = $.extend(defaults, options);
      initialize();
      
    }
    
  };
  
  var initialize = function() {
  
    prev = null;
    insertCss();
    bindSetupEvent();
  
  };
  
  var bindSetupEvent = function() {
  
    $("html").bind("keydown", function(e) {
      if(e.keyCode===119) { // F8
        if(isUsing) {
          unInstall();
          unBindPrintEvent();
        } else {
          install();
          bindPrintEvent();
        }
      }
    });
  
  };
  
  var install = function() {
  
    $("body").unbind("mouseover").bind("mouseover", function(e) {
    
      if(e.target===document.body ||e.target===prev) {
        return;
      }
    
      if(prev) {
        $(prev).removeClass("m_background_color");
        prev = null;
      }
      
      prev = e.target;
      $(e.target).addClass("m_background_color");
    
    });
    
    isUsing = true;
  
  };
  
  var bindPrintEvent = function() {
  
    $("body").unbind("mousedown").bind("mousedown", function(e) {
    
      if(e.which===3) {
        $(e.target).removeClass("m_background_color");
        
        $("body *").addClass("m_noprint");
        $(e.target).removeClass("m_noprint").find("*").removeClass("m_noprint");
        $(e.target).parentsUntil("body").removeClass("m_noprint");
        
      }
    
    });
  
  };
  
  var unInstall = function() {
  
    $("body").unbind("mouseover");
    $(".m_background_color").removeClass("m_background_color");
    isUsing = false;
  
  };
  
  var unBindPrintEvent = function() {
  
    $("body").unbind("mousedown");
    $(".m_noprint").removeClass("m_noprint");
  
  };
  
  var insertCss = function() {
  
    var style1 = ".m_background_color {background-color: #c4dae9}";
    var style2 = ".m_noprint {display: none}";
    
    includeCss(style1);
    includeCss(style2, "print");
  
  };
  
  var includeCss = function(styles, media) {
    var style = document.createElement("style");
    style.type = "text/css";
    style.media = media || "screen";
    (document.getElementsByTagName("head")[0] || document.body).appendChild(style);
    if (style.styleSheet) { // for IE
      style.styleSheet.cssText = styles;
    } else { //for w3c
      style.appendChild(document.createTextNode(styles));
    }
  };

  $.fn.partialPrint = function(method) {
    if(methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error( 'No '+method+' Method.' );
    }
  };

})(jQuery);

$(document).ready(function() {
  $.fn.partialPrint();
});



