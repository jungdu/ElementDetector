  var st = document.createElement("style");
  st.innerHTML = ".highlight{ background-color: black; opacity: 0.7; box-shadow: 0 0 5px 5px #056aff;}";
  $("head").append(st);

  var edWindow = mkEcWindow({
    "width":"200px",
    "title":"Element Detector",
    "height": "auto",
    "draggable": true
  });

  $("html").append(edWindow);

  $("body").mousemove(function(e){
    $(".highlight").removeClass("highlight");
    $(e.target).addClass("highlight");
  });
  initClickEvent();

  function initClickEvent(){
    $("body *").each(function(){
      $(this).click(function(e){
        if(e.target !== this){
          return;
        }
        window.detectedElem = this;
        var $this = $(this);
        $(".ed_tagname")[0].innerHTML = this.tagName;

        $(".attr_position")[0].value = $this.css("position");
        $(".attr_width")[0].value = $this.css("width");
        $(".attr_height")[0].value = $this.css("height");
        $(".attr_top")[0].value = $this.css("top");
        $(".attr_left")[0].value = $this.css("left");
        $(".attr_margin")[0].value = $this.css("margin");
        $(".attr_padding")[0].value = $this.css("padding");
        $(".attr_float")[0].value = $this.css("float");
        $(".attr_innerHTML")[0].value = this.innerHTML;
      });
    });
  }

  function mkEcWindow(option){
      if(!option){
          option = {};
      }
      if(option.width){
          new Error("Input width");
      }else if(option.height){
          new Error("Input height");
      }else if(option.title){
          new Error("Input title");
      }

      var ecWinCss = {
        "z-index":"999999",
        "position":"fixed",
        "width":"300px",
        "height": "auto",
        "top": "50px",
        "right": "50px",
        "border":"1px solid #ccc",
        "box-shadow":" 0 0 5px #888888",
        "background":"rgba(255, 255, 255, 0.8)",
        "display": "block"
      };

      var ecWinTitleCss = {
        "padding-left":"10px",
        "float":"left",
        "font-size": "17px"
      };

      var ecWinTopCss = {
        "user-select": "none",
        "width": "100%",
        "height": "23px",
        "background-color": "#062845",
        "color": "#Ddd",
        "font-family": "fantasy",
        "cursor": "move"
      };

      var ecWinContentCss = {
        "width": "100%",
        "min-height": "200px",
        "height":"auto",
        "font-size": "13px",
        "overflow": "auto",
        "padding-bottom":"10px",
      };

      var ecWin = document.createElement("div");
      $(ecWin).css(ecWinCss);
      ecWin.className = "ec_win";
      ecWin.style.width = option.width;
      ecWin.style.height = option.height;

      if(option.pos){
          ecWin.style.position = "absolute";
          ecWin.style.top = option.pos.top+"px";
          ecWin.style.left = option.pos.left+"px";
      }
      var ecWinTop = document.createElement("div");
      $(ecWinTop).css(ecWinTopCss);
      ecWinTop.className = "ec_win_top";
      var ecWinTitle = document.createElement("div");
      $(ecWinTitle).css(ecWinTitleCss);
      ecWinTitle.className = "ec_win_title";
      ecWinTitle.innerHTML = option.title;
      var ecWinClosebtn = document.createElement("div");
      ecWinClosebtn.className = "ec_win_closebtn";
      ecWinClosebtn.addEventListener("click", function(){
          $(this).parent().parent().removeClass("ec_attr_opend");
      });
      var ecWinContent = document.createElement("div");
      $(ecWinContent).css(ecWinContentCss);
      ecWinContent.className = "ec_win_content";
      var tagName = document.createElement("li");
      tagName.className = "ed_tagname";
      tagName.innerHTML = "Tag Name";
      $(tagName).css({
        "list-style":"none",
        "font-weight": "800",
        "padding-left": "5px",
        "color": "d"
      });
      ecWinContent.appendChild(tagName);
      ecWinContent.appendChild(mkAttrLi("position", {width: "50px"}));
      ecWinContent.appendChild(mkAttrLi("width", {width: "50px"}));
      ecWinContent.appendChild(mkAttrLi("height", {width: "50px"}));
      ecWinContent.appendChild(mkAttrLi("top", {width: "50px"}));
      ecWinContent.appendChild(mkAttrLi("left", {width: "50px"}));
      ecWinContent.appendChild(mkAttrLi("margin", {width: "100px"}));
      ecWinContent.appendChild(mkAttrLi("padding", {width: "100px"}));
      ecWinContent.appendChild(mkAttrLi("float", {width: "50px"}));
      var inHTML = document.createElement("textarea");
      inHTML.className = "attr_innerHTML";
      inHTML.placeholder = "innerHTML";
      $(inHTML).css({
        "width": "95%",
        "height": "100px",
        "margin-left":"0px",
        "padding": "0px",
        "margin": "0px"
      });
      $(inHTML).keydown(function(){
        if(window.detectedElem){
            window.detectedElem.innerHTML = this.value;
        }
        initClickEvent();
      });
      $(inHTML).keyup(function(){
        if(window.detectedElem){
            window.detectedElem.innerHTML = this.value;
        }
        initClickEvent();
      });

      ecWinContent.appendChild(inHTML);
      ecWin.appendChild(ecWinTop);
      ecWinTop.appendChild(ecWinTitle);
      ecWinTop.appendChild(ecWinClosebtn);
      ecWin.appendChild(ecWinContent);
      if(option.draggable === true){
          windowDraggable(ecWin, ecWinTop);
      }
      return ecWin;
  }
  function mkAttrLi(attr, option){
    var li = document.createElement("li");
    li.className ="ec_attr_name";
    li.innerHTML = attr + " : ";
    $(li).css({
      "list-style":"none"
    });
    var input = document.createElement("input");
    input.type = "text";
    $(input).css({
      "height": "16px",
      "line-height": "16px",
      "padding": "0px",
      "margin": "0px",
      "border":"none",
      "border-bottom": "1px solid #555",
      "font-size": "13px"
    });
    input.className = "attr_"+attr;
    input.spellcheck = false;
    if(option!==undefined && option.width!==undefined){
        input.style.width = option.width;
    }
    input.addEventListener('change', function(){
      if(window.detectedElem){
        window.detectedElem.style[attr] = this.value;
      }
    });
    li.appendChild(input);
    return li;
}

  function windowDraggable(elem, handle){
      var $elem = $(elem);
      //var $winTop = $(elem).children(".ec_win_top");
      var $handle = $(handle);
      $handle.mousedown(function (e) {
          e.preventDefault();
          var destTop, destLeft;
          var startX = e.clientX;
          var startY = e.clientY;
          var elemTop = parseInt($elem.css("top"));
          var elemLeft = parseInt($elem.css("left"));
          dragPos = {};
          $(document).mousemove(function (e1) {
              // values: e.clientX, e.clientY, e.pageX, e.pageY
              var diffX = e1.clientX - startX;
              var diffY = e1.clientY - startY;
              destTop = elemTop + diffY;
              destLeft = elemLeft + diffX;
              $elem.css("top", destTop);
              $elem.css("left", destLeft);
          });
          $(document).mouseup(function () {
              $(document).off("mousemove");
              dragPos.top = destTop;
              dragPos.left = destLeft;
              $(".ec_win").css("top", destTop+"px");
              $(".ec_win").css("left", destLeft+"px");
          });
      });
  }
