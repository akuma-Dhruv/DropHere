// import { makeCode } from "./qrcode"

var qrcode = new QRCode(document.getElementById("qrcode"), {
	width: 300,
	height: 300
});
const url="https://amplified-heathered-trip.glitch.me/list?token=";
// const elText = document.getElementById("content");
function make(token) {
	
	qrcode.makeCode(url+token);
	console.log("generating qr code");

}
function keyPress(event) {
	if (event.keyCode == 13) {
		make();
	}
}

function download() {
	const fileName = document.getElementById("content").value;
	if (!fileName) {
		alert("enter value first")
		return;
	}
	var canvas = document.getElementById("qrcode").childNodes[0];
	var imgsrc = canvas.toDataURL("image/jpg");
	var el = document.createElement("a");
	el.setAttribute("href", imgsrc);
	el.setAttribute("download", fileName + "_QR");
	document.body.appendChild(el);
	el.click();
	el.remove();
}

window.onload=()=>{
	let token =document.getElementById("token").innerHTML;
	console.log(token);
	make(token);
}