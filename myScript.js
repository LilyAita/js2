url =
  "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";

const crearMapa = (json) =>{
    var map=new Map();
    for (let i = 0; i < json.length; i++) {
        var sep = json[i].events;
        for (let j = 0; j < sep.length; j++)
        {
            if (map.get(sep [j]) == undefined)
            {
                map.set( sep [j], [0,0,0,0]);
            }
        }
    }
    
     
    return map;
}

const contar = (map, json) =>{
    for (let i = 0; i < json.length ; i++)
    {
        map.forEach(function(value, key) {
            let bol = true;
            for (let j = 0; j < json[i].events.length && bol; j++)
            {
               
                if (json[i].events[j]=== key)
                {
                    console.log()
                    if (json[i].squirrel )
                        value[0]++;   
                    else
                        value[1]++;
                    bol=false;
                }
            }
            if (bol === true)
            {
                if (json[i].squirrel )
                    value[2]++;
                else
                    value[3]++;
            }
          })
    }
    return map;
}

const crearArreglo = (map) =>{
    var arreglo=[];
        map.forEach(function(value, key) {
            
            
            arreglo.push([key, correlacion(value)])
            console.log(correlacion(value));
          })
          console.log(arreglo);
    return arreglo;
}
const correlacion = (arreglo) =>{
  let TP = parseInt(arreglo[0]);
  let FN = parseInt(arreglo[1]);
  let FP = parseInt(arreglo[2]);
  let TN = parseInt(arreglo[3]);
  console.log ("MA"+TP+" "+FN+" "+FP+" "+TN);
  let res =
    ((TP * TN) - (FP * FN)) /
    Math.sqrt((TP + FP) * (TP + FN) * (TN + FP) * (TN + FN));
    console.log(res);
    console.log((TP * TN) - (FP * FN));
    console.log((TP + FP) * (TP + FN) * (TN + FP) * (TN + FN));
    return res;
}
const compare= (a, b)=> {
    
    return b[1]-a[1];
  }
fetch(url)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      console.log("Respuesta de red OK pero respuesta HTTP no OK");
    }
  })
  .then((json) => {
    var table = document.getElementById("MyTableC");

    var mapita= crearMapa(json);
    mapita  = contar (mapita,json);
    var arreglo = crearArreglo (mapita);
    arreglo.sort(compare);

    for (let i = 1; i <= arreglo.length; i++) {
        var row = table.insertRow(i);
        row.insertCell(0).innerHTML = i;
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        cell1.innerHTML = arreglo[i - 1][0];
        cell2.innerHTML = arreglo[i - 1][1];
      }

  })
  .catch(function (error) {
    console.log("Hubo un problema con la petición Fetch:" + error.message);
  });
