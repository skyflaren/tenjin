let cnt = 1, val = 0, rand = 0;

// var obj = JSON.parse("score_word.json");
let database;
async function foo() {
	return new Promise((resolve,reject) => {
		$.getJSON("assets/words/score_word.json",data => {
			database = data;
			// console.log(data);
		});
	});
}
foo().then(_ => main());
// var data = eval("(" +json.responseText + ")");
// console.log(data);

function main() {
	nextQuestion();
}


// var x;

async function nextQuestion() {
	if (cnt>10) return;
    rand = Math.floor(Math.random()*4)+1;
    let j = 1, clicked = 0;
	// let word =  ""+cnt;
    // let word = database.get(Math.floor(Math.random()*database[cnt-1].length));

	let keys = Object.keys(database);
	let word = database[cnt-1][Math.floor(Math.random()*database[cnt-1].length)];

    document.getElementById("question-word").innerHTML = ""+word;
    
	console.log($('#progress-bar').css('width'));
	$("#progress-bar").animate({width:10*(cnt-1) + "%"},300);
    // $('#progress-bar').css('width',10*(cnt-1) + "%");

    for(let option of document.getElementsByTagName("label") ){
        if(j == rand){
            

			// let syn = "";
			await new Promise((res,rej) => {
				let xmlHttp = new XMLHttpRequest();
				xmlHttp.open("GET", `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=6a1568fe-8f69-4142-9016-debb45a2ab37`, true); // false for synchronous request

				xmlHttp.onload = () => {
					let syn = JSON.parse(xmlHttp.responseText);
					console.log(syn);
					// x = syn;
					let tmp;


					if (Array.isArray(syn) && typeof(syn[0]) == "string") tmp = syn[0];
					else tmp = syn[0].meta.syns[0][0];

					// if (tmp == []) {tmp="uhh";console.log("uhh");}
					
					option.innerHTML = tmp;
					// console.log(tmp);
				}

				xmlHttp.send();
				// syn = xmlHttp.responseText;
				// console.log(syn);
				res(xmlHttp.responseText);
			});
            // let tmp = syn.meta.syns[0][0];
            // option.innerHTML = tmp;
            // console.log(tmp)
        }
        else{
            option.innerHTML = database[cnt-1][Math.floor(Math.random()*database[cnt-1].length)];
        }
        j += 1;
    }
	$('#submit').css('filter','opacity(0.5)');
}

async function httpGet(theUrl) {
	let txt;
	await new Promise((res,rej) => {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", theUrl, false); // false for synchronous request
		xmlHttp.send();
		txt =  xmlHttp.responseText;
		resolve(xmlHttp.responseText);
	});
	return txt; 
}

for(let option of document.getElementsByClassName("choice") ){
	option.addEventListener("click",() => {
		document.getElementById("submit").disabled=false;
		$('#submit').css('filter','opacity(1)');
	});
}
// rename
function isChecked(skip=false) {
	let flag = false;
	$(".choice > input").each((ind,option) => {
		if (option.checked) {
            if(!skip && option.id == ""+rand) val++;
			option.checked = false;
			console.log('asf');
			flag = true;
			return;
		}
	});
	return flag;
}


$('#submit').click(() => {
    if (!isChecked()) {
      console.log('here');
      return;
    }
    if (cnt++<10) nextQuestion();
    else {
		redirect();
      	console.log("rip ", cnt);
    }
});

$('#skip').click(() => {
	isChecked(true); // do not get value, just deselect everything
	
  if (cnt++<10) nextQuestion();
  else {
    redirect();
    console.log("rip 2.0", cnt);
  }
});


function redirect() {
	document.cookie = `tenjin_score=${val}`;

    /*
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "https://ipinfo.io/json", true);
    xhr.send();
    */

	window.location.pathname = "/results.html";
}