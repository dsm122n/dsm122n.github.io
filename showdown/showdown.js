document.addEventListener('DOMContentLoaded', function() {
    fetch('medi.md')
    .then(response => response.text())
    .then(markdownText => {
      // Create a new instance of Showdown converter
      const converter = new showdown.Converter({
      tables: true,
      });
      
      // Convert Markdown to HTML
      var html = converter.makeHtml(markdownText);
    
      // Insert the HTML into the container
      document.getElementById('markdown-main').innerHTML = html;
      
    });
   
  });

function loadMD(filepath) {
  fetch(filepath)
    .then(response => response.text())
    .then(markdownText => {
      // Create a new instance of Showdown converter
      const converter = new showdown.Converter({
      tables: true,
      });
      
      // Convert Markdown to HTML
      var html = converter.makeHtml(markdownText);
     
      // Insert the HTML into the container
      document.getElementById('markdown-main').innerHTML = html;

      const images = document.getElementById('markdown-main').getElementsByTagName('img');
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const currentSrc = image.getAttribute('src');
        var fileFolder = filepath.split('/');
        fileFolder.pop();
        // convert array to string
        fileFolder = fileFolder.join('/');
        fileFolder = `./${fileFolder}/` 
        image.setAttribute('src', fileFolder + currentSrc);
      }     
      document.getElementsByTagName('main')[0].style.maxWidth = '800px'
    })
    .catch(err => {
      console.log(err);
    });
}
function loadHTML(filepath) {
  fetch(filepath)
    .then(response => response.text())
    .then(htmlText => {
      document.getElementById('markdown-main').innerHTML = htmlText;
      // change css main max-width to 100%
      document.getElementsByTagName('main')[0].style.maxWidth = '100%';
    })
    .catch(err => {
      console.log(err);
    });
}
function openFarmaco(filepath){
  fetch(filepath)
    .then(response => response.text())
    .then(htmlText => {
      document.getElementById('markdown-main').innerHTML = htmlText;
      // change css main max-width to 100%
      document.getElementsByTagName('main')[0].style.maxWidth = '100%';
    })
    .catch(err => {
      console.log(err);
    })
}

function getCSV(filepath) {

    
  fetch(filepath)
  .then(response => response.text())
  .then(data => {
      // Split the data into rows
      const rows = data.split("\n");
      
      // Create the table element
      const table = document.createElement("table");
      let i = 0;
      // Loop through the rows and create the table cells
      rows.forEach(row => {
          const cells = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          
          const tr = document.createElement("tr");
          cells.forEach(cell => {
              if (i === 0) {
                  const th = document.createElement("th");
                  th.textContent = cell;
                  tr.appendChild(th);
              } else {
                  const td = document.createElement("td");
                  td.textContent = cell;
                  tr.appendChild(td);
              }
          });
          table.appendChild(tr);
          console.log(table)
          i++;
      });
      // Add the table to the div
      const tablaDiv = document.getElementById("tabla-farmacos");
      tablaDiv.appendChild(table);
      console.log(tablaDiv);
      console.log(tablaDiv);
      // delete content from div markdown-main
      document.getElementById('markdown-main').innerHTML = "";
  });
  
}