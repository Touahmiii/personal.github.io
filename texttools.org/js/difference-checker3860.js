/*
 * Copyright (C) 2022 Text Tools. All Rights Reserved.
 * This file is part of texttools.org
 * Proprietary Software License
*/
var area=$("#input_output"),examples=JSON.parse(localStorage.getItem("ta_examples"));function diffUsingJS(e){"use strict";function n(e){return document.getElementById(e)}var t=difflib.stringAsLines(n("baseText").value),i=difflib.stringAsLines(n("newText").value),a=new difflib.SequenceMatcher(t,i).get_opcodes(),l=n("diffoutput");l.innerHTML="",l.appendChild(diffview.buildView({baseTextLines:t,newTextLines:i,opcodes:a,baseTextName:"Column A",newTextName:"Column B",viewType:e}))}function loadTextA(){var e=$("#upload_colA").get(0).files[0],n=new FileReader;n.onload=function(e){e=e.target.result;$("#baseText").val(e)},n.readAsText(e,"UTF-8")}function loadTextB(){var e=$("#upload_colB").get(0).files[0],n=new FileReader;n.onload=function(e){e=e.target.result;$("#newText").val(e)},n.readAsText(e,"UTF-8")}1==examples&&($("#baseText").val("Apple\nBanana\nBilberry\nBlackberry\nCherry\nLemon\nLime"),$("#newText").val("Apple\nAvocado\nBanana\nBlackberry\nBlueberry\nCherry\nLemons\nLime")),$("#compareText").click(function(){var e=$("#settings").val();1==e?diffUsingJS(0):2==e&&diffUsingJS(1),$("#diffinput, .input_btn").hide(),$("#diffoutput, .output_btn").show()}),$("#goBack").click(function(){$("#diffoutput, .output_btn").hide(),$("#diffinput, .input_btn").show()}),$("#clearAll").click(function(){$("#baseText, #newText").val(""),$(".diff").hide()}),$("#resetAll").click(function(){$("#diffoutput, .output_btn").hide(),$("#diffinput, .input_btn").show(),$("#baseText, #newText").val("")});