var POPUPHeight,POPUPpWidth,NOWwidth=2,NOWheight=0;var divOBJ=null;function open_DialogOBJ(d){divOBJ=$("#"+d);var c="<div class='backgroundDivStyle' id='backgroundDivID'></div>";var b="<div id='showDivDialog'>";b+="<img id='closeImgBtn' class='img_close'";b+="alt='关闭' src='../images/icon_close1.png' onclick='_closeDialog();'>";b+="</div>";$(document.body).append(c);$(document.body).append(b);$("#showDivDialog").show();var a=$("#showDivDialog");$("#showDivDialog").addClass("dialogDiv");$("#backgroundDivID").css({display:"block",height:$(document).height()+136});$(divOBJ).prependTo("#showDivDialog");$(divOBJ).show();POPUPHeight=$("#showDivDialog").height();POPUPWidth=$("#showDivDialog").width();$("#showDivDialog").css({width:POPUPWidth,height:POPUPHeight,top:($(document).scrollTop()+100),left:(document.documentElement.clientWidth-POPUPWidth)/2})}function _closeDialog(){$("#showDivDialog").removeClass("dialogDiv");$("#showDivDialog").removeAttr("top");$("#showDivDialog").removeAttr("left");$(divOBJ).hide();$("#showDivDialog").css("display","none");if($("#pop_link").length>0){$("#pop_link").removeAttr("href")}$("#backgroundDivID").css("display","none")};