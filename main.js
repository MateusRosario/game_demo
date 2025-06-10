
let inicio = 1
let fim = 10;
let result = "";

for(let tabuadaDo = 1; tabuadaDo <= 10; tabuadaDo = tabuadaDo + 1) {
    
    result += "<div>"
    result += "TABUADA DO " + tabuadaDo + "<br>";
    for(let item = inicio; item <= fim; item = item + 1) {
        result += item + " vezes " + tabuadaDo + " é igual á " + item * tabuadaDo + "<br>";
    }
    result += "</div>"
}

export default result