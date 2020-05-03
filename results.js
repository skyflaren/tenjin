const score = document.cookie.split(";").filter(i => i.trim().startsWith("tenjin_score"))[0].trim().split('=')[1]/1;

document.getElementById("number").innerHTML = score;
console.log("score",score);