const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')
const width = 2000
const height = 2000
const canvas = createCanvas(width, height)
const ctx = canvas.getContext('2d')

ctx.fillStyle = '#000'
ctx.fillRect(0, 0, width, height)
ctx.font = 'bold 70pt Menlo'
ctx.textAlign = 'center'
ctx.textBaseline = 'top'
ctx.fillStyle = '#3574d4'
const text = 'Hello, World!'
const textWidth = ctx.measureText(text).width
ctx.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120)
ctx.fillStyle = '#fff'
ctx.fillText(text, 600, 170)
ctx.fillStyle = '#fff'
ctx.font = 'bold 30pt Menlo'
ctx.fillText('flaviocopes.com', 600, 530)

//SNIP

var ink = "rgb(0,255,0)"
var scale = 200
var points = 80000 //80000
var grain = 40000 //12*10**4
var dt = 0.001
var obj = -1
var t = 0; var c = 0
var X = 0; var Y = 0
var pars = 6; var edge = 12
var v = new Array(pars); var tv = new Array(pars); var dv = new Array(pars)

var draw = function(ctx) {
	t=0
	for (var p = 0; p <= points; p++) {
//			obj=0; R = scale * (v[0] * Math.sin(v[1]*t)**v[2] + v[3] * Math.cos(Math.tan(v[4]*t))**v[5]) //gold standard
//			obj=1; R = scale * (v[0] * Math.sin(v[1]*t)**v[2] + v[3] * Math.cos(v[4]*t)) //kinda great
//			obj=2; R = scale * (v[0] * Math.sin(v[1]*t)**v[2] + v[3] * Math.cos(v[4]*t)**v[5] + Math.log(v[6]*t)) //too big
//			obj=3; R = scale * (v[0] * Math.sin(v[1]*t) + v[3] * Math.cos(v[4]*t)) //simple for reference
//			obj=4; R = scale * (v[0] * Math.sin(v[1]*t)**v[2] + v[3] * Math.cos(Math.tan(v[4]*t)**v[5])) //noisy star
		obj=5; R = scale * Math.log( Math.sin(v[0]*t)**v[1] + v[2] * Math.cos(v[3]*t) ) //spiky sinister
//			obj=6; R = scale * Math.sin(v[0]*t) ** Math.cos(v[1]*t) //squiggly jellyfish
//			obj=7; R = scale * Math.sin(v[0]*t) ** (Math.cos(v[1]*t)**v[2]) //plasma ball
//			obj=8; R = scale * Math.sin(v[0]*t)**v[1] * Math.cos(v[2]*t)**v[3] //open squiggles
//			obj=9; R = scale * Math.tan(Math.sin(v[0]*t)) ** Math.tan(Math.cos(v[1]*t)**v[2]) //double squiggler
//			obj=99; R = scale * Math.log(Math.sin(v[0]*t) ** Math.cos(v[1]*t)**v[2])
		X = 1400+R*Math.cos(t); Y = 900+R*Math.sin(t)
		ctx.fillStyle = ink
		ctx.fillRect(X,Y,1,1)
		t += dt
	}
}

init()

for (var q = 0; q <= pars; q++) {
	v[q] += dv[q]
	if (Math.abs(v[q]) > edge) {dv[q] *= -1}
}
ctx.clearRect(0,0,2000,2000)
draw(ctx)
c++
ctx.font = "16px Consolas";
ctx.fillText("points: " + points.toFixed(0),150,200);
ctx.fillText("zscale: " + scale.toFixed(2),150,225);
ctx.fillText("frames: " + c,150,250);
ctx.fillText("object: " + obj,150,275);
ctx.fillText("Δt: " + dt.toFixed(5),150,300);
for (var q = 0; q <= pars; q++) {
	ctx.fillText("μ" + q + ": " + v[q].toFixed(5),150,325+q*25);
}

function init() {
	for (var q = 0; q <= pars; q++) {
		v[q] = Math.random()*edge
		if (Math.random()*2>1) {v[q] *= -1}
		tv[q] = Math.random()*edge*1.5
		if (Math.random()*2>1) {tv[q] *= -1}
		dv[q] = (tv[q] - v[q])/grain
	}
}


//SNAP
loadImage('./eq.png').then(image => {
  ctx.drawImage(image, 300,1700,1000,200)
  const buffer = canvas.toBuffer('image/png')
  fs.writeFileSync('./out.png', buffer)
})
