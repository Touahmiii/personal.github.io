/*
 * Copyright (C) 2022 Text Tools. All Rights Reserved.
 * This file is part of texttools.org
 * Proprietary Software License
*/
var area=$("#input_output"),examples=JSON.parse(localStorage.getItem("ta_examples"));function generateRandomStrings(){var t=parseInt($("#strAmount").val(),10),e=$("#strSeparator").val(),n=[];for(let e=0;e<t;e++)n.push(generateString());return escapeHtml(n="comma"==e?n.join(","):"space"==e?n.join(" "):"comma+space"==e?n.join(", "):n.join("\n")),n}function generateString(){for(var e={},t=(e["str-length"]=$("#strLength").val(),e["alpha-lower"]=!!$("#a-z").is(":checked"),e["alpha-upper"]=!!$("#A-Z").is(":checked"),e.numbers=!!$("#num_0-9").is(":checked"),e.symbols=!!$("#symbols").is(":checked"),""),n=(e["alpha-lower"]&&(t+="abcdefghijklmnopqrstuvwxyz"),e["alpha-upper"]&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZ"),e.numbers&&(t+="1234567890"),e.symbols&&(t+="`~!@#$%^&*()_-+={}[]\\|:;\"'<>,.?/"),t.replace(/[0O1IlB8\|]/g,""),""),a=0;a<e["str-length"];a++)n+=t.charAt(Math.floor(Math.random()*t.length));return n}function escapeHtml(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function saveText(e,t){var n=navigator.userAgent.match(/MSIE\s([\d.]+)/),a=navigator.userAgent.match(/Trident\/7.0/)&&navigator.userAgent.match(/rv:11/),r=navigator.userAgent.match(/Edge/g),a=n?n[1]:a?11:r?12:-1;n&&a<10?console.log("No blobs on IE ver<10"):(t=(t=document.getElementById("input_output").value).replace(/\r?\n/g,"\r\n"),r=new Blob([t],{type:"text/plain"}),"null.txt"!=(e=prompt("File name:","New Document")+".txt")&&(-1<a?window.navigator.msSaveBlob(r,e):((n=document.createElement("a")).download=e,n.href=window.URL.createObjectURL(r),n.onclick=function(e){document.body.removeChild(e.target)},n.style.display="none",document.body.appendChild(n),n.click())))}function printTextArea(){(childWindow=window.open("","childWindow","location=yes, menubar=yes, toolbar=yes")).document.open(),childWindow.document.write('<html><head></head><body style="word-wrap:break-word;"><style>.ap_container,.google-auto-placed,.adsbygoogle{display:none}</style>'),childWindow.document.write(document.getElementById("input_output").value.replace(/\n/gi,"<br>")),childWindow.document.write("</body></html>"),childWindow.print(),childWindow.document.close(),childWindow.close()}1==examples&&area.val(generateRandomStrings()),$("#generateStr").click(function(){Remember();var e=generateRandomStrings();area.val(e),Remember()}),$(".clipboard").click(function(){Clipboard(area)}),$("#clearAll, #edit_delete, #file_new").click(function(){$(".alert").hide(),area.val(""),Remember()}),$("#file_download").click(function(){saveText()}),$("#file_print").click(function(){printTextArea()}),$("#edit_undo").click(function(){var e=History.undo();void 0!==e&&area.val(e)}),$("#edit_redo").click(function(){var e=History.redo();void 0!==e&&area.val(e)}),$("#edit_copy").click(function(){Clipboard(area)}),$("#edit_select").click(function(){area.select().focus()});var History=function(){var t=[],n=0;return{remember:function(e){t[n-1]!==e&&(t.splice(n,10),t.push(e),t.splice(0,t.length-10),n=t.length)},undo:function(){if(1<n)return t[--n-1]},redo:function(){if(n<t.length)return t[n++]}}}();function Remember(){var e=area.val();History.remember(e)}Remember();