let keyword = "the";
$(".tenj-word-under").append($("<div></div>").addClass(".tenj-underline"));

// $("span").mouseover(_ => {
// 	$("this .underline").css("height","20px");
// 	$("this .underline").css("top","-20px");
// })

// $("span").mouseleave(_ => {
// 	$("this .underline").css("height","5px");
// 	$("this .underline").css("top","-5px");
// })

checkText($('body'));

function checkText(elm) {
	// if (elm==null) return;
	// console.log(elm,elm[0].nodeType);
	if (elm[0].nodeType == Node.TEXT_NODE || (elm.children().length==0 && elm[0].firstChild && elm[0].firstChild.nodeType == Node.TEXT_NODE)) {
		console.log('here');
		elm.html(elm.text().replace(new RegExp(`\\b${keyword}\\b`,"gi"),`<span class="tenj-word-under">${keyword}<div class="tenj-underline"></div></span>`));
		return;
	}
	else if (elm[0].nodeType == Node.ELEMENT_NODE) {
		console.log('there);',elm.children());
		for (let chd of elm.children()) {
			// console.log(chd==null,$(chd)[0],$(chd)[0].nodeType);
			checkText($(chd));
		}
	} else {
		console.log($(elm)[0].nodeType)
	}
}