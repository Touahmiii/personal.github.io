/*
 * Copyright (C) 2022 Text Tools. All Rights Reserved.
 * This file is part of texttools.org
 * Proprietary Software License
*/
var area=$("#input_output"),examples=JSON.parse(localStorage.getItem("ta_examples"));function loadText(){var e=$("#file_upload").get(0).files[0],n=new FileReader;n.onload=function(e){e=e.target.result;area.val(e)},n.readAsText(e,"UTF-8")}function saveText(e,n){var t=navigator.userAgent.match(/MSIE\s([\d.]+)/),o=navigator.userAgent.match(/Trident\/7.0/)&&navigator.userAgent.match(/rv:11/),a=navigator.userAgent.match(/Edge/g),o=t?t[1]:o?11:a?12:-1;t&&o<10?console.log("No blobs on IE ver<10"):(n=(n=document.getElementById("input_output").value).replace(/\r?\n/g,"\r\n"),a=new Blob([n],{type:"text/plain"}),"null.txt"!=(e=prompt("File name:","New Document")+".txt")&&(-1<o?window.navigator.msSaveBlob(a,e):((t=document.createElement("a")).download=e,t.href=window.URL.createObjectURL(a),t.onclick=function(e){document.body.removeChild(e.target)},t.style.display="none",document.body.appendChild(t),t.click())))}function printTextArea(){(childWindow=window.open("","childWindow","location=yes, menubar=yes, toolbar=yes")).document.open(),childWindow.document.write('<html><head></head><body style="word-wrap:break-word;"><style>.ap_container,.google-auto-placed,.adsbygoogle{display:none}</style>'),childWindow.document.write(document.getElementById("input_output").value.replace(/\n/gi,"<br>")),childWindow.document.write("</body></html>"),childWindow.print(),childWindow.document.close(),childWindow.close()}1==examples&&($("#prefix").val("A"),$("#suffix").val("B"),area.val("1\n2\n3")),$("#addPreSuf").click(function(){Remember();for(var e=area.val(),n=$("#prefix").val(),t=$("#suffix").val(),e=e.replace(/\r\n|\r|\n/gm,"\n").split("\n"),o=0,o=0;o<e.length;o++)(!$("#isEmpty").prop("checked")||e[o])&&(e[o]=n+e[o]+t);e=e.join("\n"),area.val(e),Toast("Applied"),Remember()}),$(".clipboard").click(function(){Clipboard(area)}),$("#clearAll, #edit_delete, #file_new").click(function(){area.val(""),Remember()}),$("#file_new").click(function(){$("#prefix, #suffix").val("")}),$("#file_upload").on("change",function(){loadText()}),$("#file_download").click(function(){saveText()}),$("#file_print").click(function(){printTextArea()}),$("#edit_undo").click(function(){var e=History.undo();void 0!==e&&area.val(e)}),$("#edit_redo").click(function(){var e=History.redo();void 0!==e&&area.val(e)}),$("#edit_copy").click(function(){Clipboard(area)}),$("#edit_select").click(function(){area.select().focus()});var History=function(){var n=[],t=0;return{remember:function(e){n[t-1]!==e&&(n.splice(t,10),n.push(e),n.splice(0,n.length-10),t=n.length)},undo:function(){if(1<t)return n[--t-1]},redo:function(){if(t<n.length)return n[t++]}}}();function Remember(){var e=area.val();History.remember(e)}Remember();