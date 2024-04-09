document.addEventListener('DOMContentLoaded', function() {
    // fetch('medi.md')
    // .then(response => response.text())
    // .then(markdownText => {
    //   // Create a new instance of Showdown converter
    //   const converter = new showdown.Converter({
    //   tables: true,
    //   });
      
    //    // Convert Markdown to HTML
    //    var html = converter.makeHtml(markdownText);
    
    //    // Insert the HTML into the container
    //    document.getElementById('inicio').innerHTML = html;

    //  });

    //  loadMD('pediatria/pediatria.md');
    //  document.getElementById('inicio').innerHTML = '';
    document.getElementById('tabla_farmacos').innerHTML = '<input type="text" id="search" placeholder="Type to search"></input>';
    document.getElementById('tabla_farmacos').innerHTML += '<table class="table" id="la-tabla"><thead><tr id="nombres_cols"> </tr></thead><tbody id="cuerpo_tabla"></tbody></table>';
    document.getElementById('tabla_farmacos').setAttribute('class',"tab-pane container active");
    let SHEET_ID = '1SMU1ltLrMVifOb2T8sN5gu5Yd3tKmQ6eid6QnjSDlQo';
    let SHEET_TITLE = 'dosis';
    let SHEET_RANGE = 'A1:G248'
    let FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);
  
    console.log('hola');
    fetch(FULL_URL)
    .then(res => res.text())
    .then(rep => {
      let data = JSON.parse(rep.substr(47).slice(0,-2));
      let tablitaLinda = data.table.rows; 
      console.log(tablitaLinda);
      for (let i = 0; i < tablitaLinda[0].c.length; i++) {
          const element = tablitaLinda[0].c[i].v;
          console.log(element);
          console.log('hola mundo desde el for');
          document.getElementById('nombres_cols').innerHTML += `<th id="${element}">${element}</th>` 


      }
      for (let i = 1; i < tablitaLinda.length; i++) {
          const element = tablitaLinda[i].c;
          const fila = `<tr id="fila_${i}"></tr>`;
          document.getElementById('cuerpo_tabla').innerHTML += fila;
          for (let j = 0; j < element.length; j++) {
              if (element[j] == null) {
                  document.getElementById(`fila_${i}`).innerHTML += '<td>NA</td>';
              }else{
                  if (element[j].v == null) {
                      document.getElementById(`fila_${i}`).innerHTML += '<td>NA</td>';
                  } else{
                      const dato = element[j].v;
                      const celda = `<td>${dato}</td>`;
                      document.getElementById(`fila_${i}`).innerHTML += celda;
                  }
              }
          }
      }
      
  })
  .then(rep => {
    var $rows = $('#cuerpo_tabla tr');
    $('#search').keyup(function() {
        var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
  
        $rows.show().filter(function() {
            var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
            return !~text.indexOf(val);
        }).hide();
    });

  })
});

function populateSidebarHeadings() {
  const allHeadings = document.querySelectorAll('h1, h2, h3');
  const sidebarList = document.getElementById('sidebar-headings');

  sidebarList.innerHTML = ''; // Clear existing content

  const processedHeadings = new Set(); // Track processed headings to avoid duplicates

  function processHeading(heading) {
    if (processedHeadings.has(heading)) {
      return null; // Skip already processed heading
    }
    processedHeadings.add(heading);

    const anchor = document.createElement('a');
    anchor.href = '#' + heading.id;
    anchor.textContent = heading.textContent.trim();

    const listItem = document.createElement('li');
    listItem.appendChild(anchor);

    let currentList = listItem;

    // Loop through subsequent siblings (avoiding duplicates)
    for (let nextHeading = heading.nextElementSibling; nextHeading; nextHeading = nextHeading.nextElementSibling) {
      if (nextHeading.tagName === 'H2' || nextHeading.tagName === 'H3' && !processedHeadings.has(nextHeading)) {
        const subHeadingText = nextHeading.textContent.trim();
        const subItem = document.createElement('li');
        const subAnchor = document.createElement('a');
        subAnchor.href = '#' + nextHeading.id;
        subAnchor.textContent = subHeadingText;
        subItem.appendChild(subAnchor);

        if (nextHeading.tagName === 'H2') {
          currentList.appendChild(subItem);
        } else { // h3
          const subList = document.createElement('ul');
          subItem.appendChild(subList);
          currentList.appendChild(subItem);
        }
        currentList = subItem; // Update currentList for nesting only if h2
      }
    }

    processedHeadings.add(heading); // Mark heading as processed again (for potential future references)

    return listItem;
  }

  const sidebarItems = Array.from(allHeadings).map(processHeading).filter(Boolean); // Remove null values (skipped headings)
  sidebarList.append(...sidebarItems);
}




const classMap = {
  table: 'table table-striped table-bordered table-hover table-sm table-dark table-bordered border-primary',
}



const bindings = Object.keys(classMap)
  .map(key => ({
    type: 'output',
    regex: new RegExp(`<${key}(.*)>`, 'g'),
    replace: `<${key} class="${classMap[key]}" $1>`
  }));


function loadMD(filepath) {
  
  fetch(filepath)
    .then(response => response.text())
    .then(markdownText => {
      // Create a new instance of Showdown converter
      const converter = new showdown.Converter({
      tables: true,
      extensions: [...bindings]
      });
      
      // Convert Markdown to HTML
      var html = converter.makeHtml(markdownText);
  
      // Insert the HTML into the container
      document.getElementById('inicio').innerHTML = html;
      const images = document.getElementById('inicio').getElementsByTagName('img');
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
      document.getElementById('inicio').setAttribute('class',"tab-pane container active");
      document.getElementById('tabla_farmacos').setAttribute('class',"tab-pane container");
    })
    .then(order => {
      populateSidebarHeadings();
      })      
        


    // }
    //   )
    .catch(err => {
      console.log(err);
    });
}
// function getInnerHeadings(headingsArray){
//   // get all subheadings of a heading 
//   for (let i = 0; i < headingsArray.length; i++) {
//     const headingLevel = headingsArray[i].tagName;
//     const headingText = headingsArray[i].innerText;

//     if (headingLevel == 'H1') {
//     }
    
// }


function loadHTML(filepath) {
  fetch(filepath)
    .then(response => response.text())
    .then(htmlText => {
      document.getElementById('inicio').innerHTML = htmlText;
      // change css main max-width to 100%
      document.getElementsByTagName('main')[0].style.maxWidth = '100%';
    })
    .catch(err => {
      console.log(err);
    });
}

function loadGoogleSheet(){
  document.getElementById('inicio').innerHTML = '';
  
  document.getElementById('tabla_farmacos').innerHTML = '<input type="text" id="search" placeholder="Type to search"></input>';
  document.getElementById('tabla_farmacos').innerHTML += '<table class="table" id="la-tabla"><thead><tr id="nombres_cols"> </tr></thead><tbody id="cuerpo_tabla"></tbody></table>';
  document.getElementById('tabla_farmacos').setAttribute('class',"tab-pane container active");
  let SHEET_ID = '1SMU1ltLrMVifOb2T8sN5gu5Yd3tKmQ6eid6QnjSDlQo';
  let SHEET_TITLE = 'dosis';
  let SHEET_RANGE = 'A1:G248'
  let FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);
  console.log('hola');
  fetch(FULL_URL)
  .then(res => res.text())
  .then(rep => {
      let data = JSON.parse(rep.substr(47).slice(0,-2));
      let tablitaLinda = data.table.rows; 
      console.log(tablitaLinda);
      for (let i = 0; i < tablitaLinda[0].c.length; i++) {
          const element = tablitaLinda[0].c[i].v;
          console.log(element);
          console.log('hola mundo desde el for');
          document.getElementById('nombres_cols').innerHTML += `<th id="${element}">${element}</th>` 


      }
      for (let i = 1; i < tablitaLinda.length; i++) {
          const element = tablitaLinda[i].c;
          const fila = `<tr id="fila_${i}"></tr>`;
          document.getElementById('cuerpo_tabla').innerHTML += fila;
          for (let j = 0; j < element.length; j++) {
              if (element[j] == null) {
                  document.getElementById(`fila_${i}`).innerHTML += '<td>NA</td>';
              }else{
                  if (element[j].v == null) {
                      document.getElementById(`fila_${i}`).innerHTML += '<td>NA</td>';
                  } else{
                      const dato = element[j].v;
                      const celda = `<td>${dato}</td>`;
                      document.getElementById(`fila_${i}`).innerHTML += celda;
                  }
              }
          }
      }
      // set min width of all columns of table to 20 characters
      // document.getElementById("Fármaco").setAttribute('style','width: 20ch');
      // document.getElementById("Categoría").setAttribute('style','width: 20ch');
      // document.getElementById("Dosis pediatrica").setAttribute('style','width: 20ch');
      // document.getElementById("Dosis adulto").setAttribute('style','width: 20ch');
      // document.getElementById("Presentación").setAttribute('style','width: 20ch');

      
  })
  .then(rep => {
    var $rows = $('#cuerpo_tabla tr');
    $('#search').keyup(function() {
        var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
  
        $rows.show().filter(function() {
            var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
            return !~text.indexOf(val);
        }).hide();
    });

  })
}

function openPDF() {
  var pdfUrl = 'https://uchile-my.sharepoint.com/personal/danielsanmartin_uchile_cl/Documents/Dan/Diccionario_LSCh.pdf?CT=1703984327422&OR=ItemsView';
  window.open(pdfUrl, '_blank');
}

