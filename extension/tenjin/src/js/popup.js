const defvocab = {
	"calculus" : {
		"a" : {
			"link" : "https://www.google.ca"
		},
		"b" : {
			"link" : "https://www.google.ca"
		}
	},
	"green" : {
		"a" : {
			"link" : "https://www.google.ca"
		},
		"b" : {
			"link" : "https://www.google.ca"
		}
	},
	"blue" : {
		"a" : {
			"link" : "https://www.google.ca"
		},
		"b" : {
			"link" : "https://www.google.ca"
		}
	},
	"red" : {
		"a" : {
			"link" : "https://www.google.ca"
		},
		"b" : {
			"link" : "https://www.google.ca"
		}
	},
	"yell" : {
		"a" : {
			"link" : "https://www.google.ca"
		},
		"b" : {
			"link" : "https://www.google.ca"
		}
	},
	"chemistry" : {
		"asdf" : {
			"link" : "https://www.google.ca"
		},
		"limiting reagent" : {
			"link" : "https://www.google.ca"
		}
	},
	"mathematics" : {
		"asdf" : {
			"link" : "https://www.google.ca"
		},
		"wheeep" : {
			"link" : "https://www.google.ca"
		},
		"add" : {
			"link" : "https://www.google.ca"
		},
		"sdf" : {
			"link" : "https://www.google.ca"
		},
		"sfd" : {
			"link" : "https://www.google.ca"
		},
		"efw" : {
			"link" : "https://www.google.ca"
		},
		"ewr" : {
			"link" : "https://www.google.ca"
		},
		"kefo" : {
			"link" : "https://www.google.ca"
		},
		"wejk" : {
			"link" : "https://www.google.ca"
		},
		"emef" : {
			"link" : "https://www.google.ca"
		}
	}
}

// let vocab = localStorage.getItem("vocabulary") == "" ? defvocab : JSON.parse(localStorage.getItem("vocabulary"));
let vocab = defvocab; 

let selected = "";

let stacks, colours;
const subjects = Object.keys(vocab);

$(document).ready(() => {
	// const defcolours = "#fee48a,#fafd9f,#f9b996,#adddff";
	const defcolours = ["#fee48a", "#fafd9f", "#f9b996", "#adddff"];

	// colours = localStorage.getItem("colours") == "" ? defcolours : JSON.parse(localStorage.getItem("colours"));
	colours = defcolours;


	stacks = $('.stacks');

	$('#back').hide();

	fillSubjects();
	fillPalette();
});

function fillSubjects() {
	for (let s of subjects) {
		addSub(s);
	}
}


function addSub(sub) {
	let div = $('<div></div>');
	div.addClass('card-subject');

	let span = $('<span></span>');

	let word = $('<span></span>').text(sub);
	word.addClass('sub');

	let cnt = $('<span></span>').text(` - ${Object.keys(vocab[sub]).length}`);
	cnt.addClass('count');

	span.append(word,cnt);
	div.append(span);
	stacks.append(div);

	div.click(_ => {
		selected = sub;
		// stacks .hide();
		stacks.empty();
		fillWords(sub);
		$('#back').show();
		stacks.scrollTop(0);

		$('#back').click(_ => {
			selected = "";
			stacks.empty();
			stacks.scrollTop(0);
			fillSubjects();
			$('#back').hide();
		});
	});
}


function fillWords(sub) {
	for (let word in vocab[sub]) {
		addWord(word);
	}
}

function addWord(word) {
	let div = $('<div></div>');
	div.addClass('card-subject word');

	let span = $('<span></span>').text(word);
	// span.addClass('word');

	div.append(span);
	stacks.append(div);

	div.click(_ => {
		// selected = word;
		// $('.card-subject').hide();
	});
}


function fillPalette() {
	for (let col in colours) {
		let hex = colours[col];
		addSwatch(hex);
	}
	addSwatch();
}

function addSwatch(hex='white',ret=false) {
	let pal = $('<div></div>');
	pal.css('background-color',hex);

	if (hex=='white') {
		pal.text('+');
		pal.css('border','1px dashed grey');
		pal.css('text-align','center');
		pal.click(_ => {
			let i = $('<input />');
			i.attr('type','color');
			i.click();

			i.change(_ => {
				pal.before(addSwatch(i.val(),true));
				if ($('#palette')[0].children.length >= 9) pal.remove();
				colours.push(i.val());
				updateStorage("colours",colours);
			});
		});
	}
	if (ret) return pal;
	else $('#palette').append(pal);
}


function updateStorage(key,val) {
	localStorage.setItem(key,val);
}

function getStorage(key,def) {
	return localStorage.getItem(key) == "" ? def : localStorage.getItem(key);
}