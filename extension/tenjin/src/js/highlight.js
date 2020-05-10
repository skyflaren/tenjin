let keywords = ["exotic","culinary","domestic","life"];
// $(".tenj-word-under").append($("<div></div>").addClass(".tenj-underline"));

// $("span").mouseover(_ => {
// 	$("this .underline").css("height","20px");
// 	$("this .underline").css("top","-20px");
// })

// $("span").mouseleave(_ => {
// 	$("this .underline").css("height","5px");
// 	$("this .underline").css("top","-5px");
// })

$(document).ready(_ => {
	for (let i of $('p')) checkText($(i));
	// checkText($('body'));


	foo();
});

var words;
var x;
async function foo() {
	// return new Promise((res,rej) => {
		let xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", `https://dulldesk.github.io/hoster/word_score.json`, true); // false for synchronous request

		xmlHttp.onload = () => {
			words = JSON.parse(xmlHttp.responseText);
		// $.getJSON("../../assets/word_score.json",data => {
			words = Object.keys(words);
			
			/*
			document.onselectionchange = e => {
				let word = window.getSelection().toString().trim();
				console.log(word);
				if (words.includes(word)) {
					define(e,word)
				}
			};
			*/
			$('.tenj-word').click((evt) => {
				// define(evt,this.text());
				define(evt,evt.target.firstChild.textContent);
			});
		}
		xmlHttp.send();
		// res(xmlHttp.responseText);

	// });
}


async function define(evt,word) {
	// console.log(word);
	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=5d718d2b-027d-4a97-827f-c7a7536f2914`, true); // false for synchronous request

	xmlHttp.onload = () => {
		let rawdef = JSON.parse(xmlHttp.responseText);
		console.log(xmlHttp.responseText);
		x = rawdef; 
		// let tmp;


		// if (Array.isArray(rawdef) && typeof(rawdef[0]) == "string") tmp = rawdef[0];
		// else rawdef = syn[0].meta.syns[0][0];
		if (rawdef && word) {
			rawdef = rawdef[0].shortdef;
			let pop = $('<div></div>');
			pop.addClass('tenj-popup');
			pop.attr('id',`tenj-def-${word}`);

			let ttl = $('<h2></h2>').text(word);
			let ol = $('<ol></ol>');

			for (let i=0;i<Math.min(5,rawdef.length);i++) {
				let def = rawdef[i];
				let li = $('<li></li>').text(def);
				ol.append(li);
			}
			pop.append(ttl,ol);
			pop.focusout(_ => pop.remove());

			$(document).click(evt => { 
				if(!($(evt.target)).closest(pop[0]).length) pop.remove();
			});

			pop.css('left',`${evt.originalEvent.clientX}px`);
			pop.css('top',`${evt.originalEvent.clientY+30}px`);

			console.log(evt);

			$('body').append(pop);
		}


		// console.log(tmp);
	}

	xmlHttp.send();
}

// $(':root').css('--highlight',getStorage('highlighter','#ffb4b4'));

function getStorage(key,def) {
	return localStorage.getItem(key) == null ? def : localStorage.getItem(key);
}


function checkText(elm) {
	try {
		// console.log(elm,elm[0].nodeType);
		// if (elm[0].nodeType == Node.TEXT_NODE || (elm.children().length==0 && elm[0].firstChild && elm[0].firstChild.nodeType == Node.TEXT_NODE)) {
		// if (elm[0].nodeType == Node.TEXT_NODE || elm[0].firstChild.nodeType == Node.TEXT_NODE) {
		if (elm[0].nodeType == Node.TEXT_NODE || hasTextNode(elm)) {
			// console.log('here');
			for (let word of keywords) {
				console.log((elm.text().match(new RegExp(`\\b${word}\\b`,"gi")) || []).length);
				elm.html(elm.html().replace(new RegExp(`\\b${word}\\b`,"gi"),`<span class="tenj-word">${word}</span>`));
			}
		} 
		else 
		if (elm[0].nodeType == Node.ELEMENT_NODE) {
			// console.log('there',elm.children());
			for (let chd of elm[0].childNodes) {
				// console.log(chd==null,$(chd)[0],$(chd)[0].nodeType);
				checkText($(chd));
			}
		} 
		// else {console.log($(elm)[0].nodeType) }
	} catch (e) {}
}


function hasTextNode(elm) {
	for (let chd of elm[0].childNodes) {
		if (chd.nodeType == Node.TEXT_NODE) return true;
	}
	return false;
}



