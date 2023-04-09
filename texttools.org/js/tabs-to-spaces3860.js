/*
 * Copyright (C) 2022 Text Tools. All Rights Reserved.
 * This file is part of texttools.org
 * Proprietary Software License
*/
var area=$("#input_output"),examples=JSON.parse(localStorage.getItem("ta_examples"));function resetCount(){$("#instances").html("Tabs replaced: 0")}function loadText(){var e=$("#file_upload").get(0).files[0],t=new FileReader;t.onload=function(e){e=e.target.result;area.val(e)},t.readAsText(e,"UTF-8")}function saveText(e,t){var n=navigator.userAgent.match(/MSIE\s([\d.]+)/),a=navigator.userAgent.match(/Trident\/7.0/)&&navigator.userAgent.match(/rv:11/),o=navigator.userAgent.match(/Edge/g),a=n?n[1]:a?11:o?12:-1;n&&a<10?console.log("No blobs on IE ver<10"):(t=(t=document.getElementById("input_output").value).replace(/\r?\n/g,"\r\n"),o=new Blob([t],{type:"text/plain"}),"null.txt"!=(e=prompt("File name:","New Document")+".txt")&&(-1<a?window.navigator.msSaveBlob(o,e):((n=document.createElement("a")).download=e,n.href=window.URL.createObjectURL(o),n.onclick=function(e){document.body.removeChild(e.target)},n.style.display="none",document.body.appendChild(n),n.click())))}function printTextArea(){(childWindow=window.open("","childWindow","location=yes, menubar=yes, toolbar=yes")).document.open(),childWindow.document.write('<html><head></head><body style="word-wrap:break-word;"><style>.ap_container,.google-auto-placed,.adsbygoogle{display:none}</style>'),childWindow.document.write(document.getElementById("input_output").value.replace(/\n/gi,"<br>")),childWindow.document.write("</body></html>"),childWindow.print(),childWindow.document.close(),childWindow.close()}1==examples&&area.val("\tHello\tWorld!"),$("#convertTabs").click(function(){Remember();var e=area.val().replace(/\r\n|\r|\n/gm,"\n"),t=$("#numSpaces").val(),n=e.match(/\t/gm),t=(n=null==n?0:n.length," ".repeat(t)),t=(e=$("#isLeading").prop("checked")?e.replace(/^\t/gm,t):e.replace(/\t/gm,t)).match(/\t/gm),n=n-(t=null==t?0:t.length);area.val(e),$("#instances").html("Tabs replaced: "+n),Toast(n+" tabs replaced"),Remember()}),area.on("keydown",function(e){var t;"Tab"==e.key&&(e.preventDefault(),e=this.selectionStart,t=this.selectionEnd,this.value=this.value.substring(0,e)+"\t"+this.value.substring(t),this.selectionStart=this.selectionEnd=e+1)}),$(".clipboard").click(function(){Clipboard(area)}),$("#clearAll, #edit_delete, #file_new").click(function(){area.val(""),resetCount(),Remember()}),$("#file_upload").on("change",function(){loadText(),resetCount()}),$("#file_download").click(function(){saveText()}),$("#file_print").click(function(){printTextArea()}),$("#edit_undo").click(function(){var e=History.undo();void 0!==e&&area.val(e),resetCount()}),$("#edit_redo").click(function(){var e=History.redo();void 0!==e&&area.val(e),resetCount()}),$("#edit_copy").click(function(){Clipboard(area)}),$("#edit_select").click(function(){area.select().focus()});var History=function(){var t=[],n=0;return{remember:function(e){t[n-1]!==e&&(t.splice(n,10),t.push(e),t.splice(0,t.length-10),n=t.length)},undo:function(){if(1<n)return t[--n-1]},redo:function(){if(n<t.length)return t[n++]}}}();function Remember(){var e=area.val();History.remember(e)}Remember();