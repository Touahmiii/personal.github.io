/*
 * Copyright (C) 2022 Text Tools. All Rights Reserved.
 * This file is part of texttools.org
 * Proprietary Software License
*/
var area=$("#input_output"),examples=JSON.parse(localStorage.getItem("ta_examples"));function convertToOldEnglish(e){for(var t={a:"𝔞",b:"𝔟",c:"𝔠",d:"𝔡",e:"𝔢",f:"𝔣",g:"𝔤",h:"𝔥",i:"𝔦",j:"𝔧",k:"𝔨",l:"𝔩",m:"𝔪",n:"𝔫",o:"𝔬",p:"𝔭",q:"𝔮",r:"𝔯",s:"𝔰",t:"𝔱",u:"𝔲",v:"𝔳",w:"𝔴",x:"𝔵",y:"𝔶",z:"𝔷",A:"𝔄",B:"𝔅",C:"ℭ",D:"𝔇",E:"𝔈",F:"𝔉",G:"𝔊",H:"ℌ",I:"ℑ",J:"𝔍",K:"𝔎",L:"𝔏",M:"𝔐",N:"𝔑",O:"𝔒",P:"𝔓",Q:"𝔔",R:"ℜ",S:"𝔖",T:"𝔗",U:"𝔘",V:"𝔙",W:"𝔚",X:"𝔛",Y:"𝔜",Z:"ℨ"},o=e.split(""),n=0;n<o.length;n++)t[o[n].toLowerCase()]&&(o[n]=t[o[n]]);return e=o.join("")}function convertToOldEnglishBold(e){return e.replace(/[A-Za-z]/g,function(e){let t;return t=/[A-Z]/.test(e)?"𝕬".codePointAt(0)-"A".codePointAt(0):"𝖆".codePointAt(0)-"a".codePointAt(0),String.fromCodePoint(e.codePointAt(0)+t)})}function loadText(){var e=$("#file_upload").get(0).files[0],t=new FileReader;t.onload=function(e){e=e.target.result;area.val(e)},t.readAsText(e,"UTF-8")}function saveText(e,t){var o=navigator.userAgent.match(/MSIE\s([\d.]+)/),n=navigator.userAgent.match(/Trident\/7.0/)&&navigator.userAgent.match(/rv:11/),i=navigator.userAgent.match(/Edge/g),n=o?o[1]:n?11:i?12:-1;o&&n<10?console.log("No blobs on IE ver<10"):(t=(t=document.getElementById("input_output").value).replace(/\r?\n/g,"\r\n"),i=new Blob([t],{type:"text/plain"}),"null.txt"!=(e=prompt("File name:","New Document")+".txt")&&(-1<n?window.navigator.msSaveBlob(i,e):((o=document.createElement("a")).download=e,o.href=window.URL.createObjectURL(i),o.onclick=function(e){document.body.removeChild(e.target)},o.style.display="none",document.body.appendChild(o),o.click())))}function printTextArea(){(childWindow=window.open("","childWindow","location=yes, menubar=yes, toolbar=yes")).document.open(),childWindow.document.write('<html><head></head><body style="word-wrap:break-word;"><style>.ap_container,.google-auto-placed,.adsbygoogle{display:none}</style>'),childWindow.document.write(document.getElementById("input_output").value.replace(/\n/gi,"<br>")),childWindow.document.write("</body></html>"),childWindow.print(),childWindow.document.close(),childWindow.close()}1==examples&&area.val("The quick brown fox jumps over the lazy dog."),$("#convertText").click(function(){Remember();var e=(e=area.val()).normalize("NFKC");e=($("#isBold").prop("checked")?convertToOldEnglishBold:convertToOldEnglish)(e),area.val(e),Remember()}),$(".clipboard").click(function(){Clipboard(area)}),$("#clearAll, #edit_delete, #file_new").click(function(){area.val(""),Remember()}),$("#file_upload").on("change",function(){loadText()}),$("#file_download").click(function(){saveText()}),$("#file_print").click(function(){printTextArea()}),$("#edit_undo").click(function(){var e=History.undo();void 0!==e&&area.val(e)}),$("#edit_redo").click(function(){var e=History.redo();void 0!==e&&area.val(e)}),$("#edit_copy").click(function(){Clipboard(area)}),$("#edit_select").click(function(){area.select().focus()});var History=function(){var t=[],o=0;return{remember:function(e){t[o-1]!==e&&(t.splice(o,10),t.push(e),t.splice(0,t.length-10),o=t.length)},undo:function(){if(1<o)return t[--o-1]},redo:function(){if(o<t.length)return t[o++]}}}();function Remember(){var e=area.val();History.remember(e)}Remember();