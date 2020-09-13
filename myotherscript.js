url =
  "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";
fetch(url)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      console.log("Respuesta de red OK pero respuesta HTTP no OK");
    }
  })
  .then((json) => {
    var table = document.getElementById("MyTable");
    for (let i = 1; i <= json.length; i++) {
      var row = table.insertRow(i);
      row.insertCell(0).innerHTML = i;
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      cell1.innerHTML = json[i - 1].events;
      cell2.innerHTML = json[i - 1].squirrel;
      if (json[i - 1].squirrel ) {
        row.style.backgroundColor = "#F9C6CB";
      }
    }
  })
  .catch(function (error) {
    console.log("Hubo un problema con la petición Fetch:" + error.message);
  });
