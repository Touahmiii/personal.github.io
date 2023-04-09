/*
 * Copyright (C) 2022 Text Tools. All Rights Reserved.
 * This file is part of texttools.org
 * Proprietary Software License
*/
var area=$("#input_output"),examples=JSON.parse(localStorage.getItem("ta_examples")),counter=(1==examples&&(area.val("The quick brown fox jumps over the lazy dog.\nThe quick brown fox jumps over the lazy dog.\nThe quick brown fox jumps over the lazy dog."),$("#find").val("dog"),$("#replace").val("cat")),0);function resetCount(){$("#instances").html("Replaced: 0")}function loadText(){var e=$("#file_upload").get(0).files[0],t=new FileReader;t.onload=function(e){e=e.target.result;area.val(e)},t.readAsText(e,"UTF-8")}function saveText(e,t){var n=navigator.userAgent.match(/MSIE\s([\d.]+)/),o=navigator.userAgent.match(/Trident\/7.0/)&&navigator.userAgent.match(/rv:11/),a=navigator.userAgent.match(/Edge/g),o=n?n[1]:o?11:a?12:-1;n&&o<10?console.log("No blobs on IE ver<10"):(t=(t=document.getElementById("input_output").value).replace(/\r?\n/g,"\r\n"),a=new Blob([t],{type:"text/plain"}),"null.txt"!=(e=prompt("File name:","New Document")+".txt")&&(-1<o?window.navigator.msSaveBlob(a,e):((n=document.createElement("a")).download=e,n.href=window.URL.createObjectURL(a),n.onclick=function(e){document.body.removeChild(e.target)},n.style.display="none",document.body.appendChild(n),n.click())))}function printTextArea(){(childWindow=window.open("","childWindow","location=yes, menubar=yes, toolbar=yes")).document.open(),childWindow.document.write('<html><head></head><body style="word-wrap:break-word;"><style>.ap_container,.google-auto-placed,.adsbygoogle{display:none}</style>'),childWindow.document.write(document.getElementById("input_output").value.replace(/\n/gi,"<br>")),childWindow.document.write("</body></html>"),childWindow.print(),childWindow.document.close(),childWindow.close()}$("#replaceAll").click(function(){Remember();var e=area.val().replace(/\r/gi,""),t=$("#find").val().replace(/\r/gi,"").replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1"),n=$("#replace").val().replace(/\r/gi,""),o=(o=$("#caseSen").prop("checked")?"g":"gi",t=$("#wholeWords").prop("checked")?new RegExp("\\b"+t+"\\b",o):new RegExp(t,o),counter=0,e.match(t));counter=null!=o?o.length:0,e=e.replace(t,n),$("#instances").html("Replaced: "+counter),area.val(e),0==counter?Toast("No matches found"):Toast("Made "+counter+" replacements"),Remember()}),$(".clipboard").click(function(){Clipboard(area)}),$("#clearAll, #edit_delete").click(function(){area.val(""),resetCount(),Remember()}),$("#file_new").click(function(){$("#find,#replace,#input_output").val(""),resetCount(),Remember()}),$("#file_upload").on("change",function(){loadText(),resetCount()}),$("#file_download").click(function(){saveText()}),$("#file_print").click(function(){printTextArea()}),$("#edit_undo").click(function(){var e=History.undo();void 0!==e&&area.val(e),resetCount()}),$("#edit_redo").click(function(){var e=History.redo();void 0!==e&&area.val(e),resetCount()}),$("#edit_copy").click(function(){Clipboard(area)}),$("#edit_select").click(function(){area.select().focus()});var History=function(){var t=[],n=0;return{remember:function(e){t[n-1]!==e&&(t.splice(n,10),t.push(e),t.splice(0,t.length-10),n=t.length)},undo:function(){if(1<n)return t[--n-1]},redo:function(){if(n<t.length)return t[n++]}}}();function Remember(){var e=area.val();History.remember(e)}Remember();