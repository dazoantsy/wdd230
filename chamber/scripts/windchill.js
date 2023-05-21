//Getting values
let temperature = document.getElementById("tempValue").value
let windSpeed = document.getElementById("wsValue").value

//Conversion 
let t = (temperature*1.8) + 32
let s = 0.6215*windSpeed

//computation
let windChill
if (t<=50 && s>3) {
    windChill = 35.74+(0.6215*t) - (35.75*Math.pow(s, 0.16)) + (0.4275*t.Math.pow(s, 0.16));
}
else {
    windChill = 'N/A'
}

//Output
document.querySelector('#wcValue').textContent = windChill;