document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('sidebar').style = 'display: none;';
    document.getElementById('content').style = 'margin-left: 0px; width: 100%;';
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
      // set cursor on search bar

      document.getElementById('search').focus();
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


function generateTitleObject() {

  let titleObject = document.querySelectorAll('h1, h2, h3');
  // change headings id to match text content with no blank spaces and all lowercase
  for (let i = 0; i < titleObject.length; i++) {
    const heading = titleObject[i];
    const headingText = heading.innerText;
    const headingId = headingText.replace(/\s+/g, '-').toLowerCase();
    const headingLevel = heading.tagName;
    heading.setAttribute('id', `${headingLevel}-${headingId}`);
  }
  // populate sidebar with headings with jquery
  let sidebar = document.getElementById('sidebar');
  let sidebarContent = '<ul class="list-unstyled components">';
  for (let i = 0; i < titleObject.length; i++) {
    const heading = titleObject[i];
    const headingText = heading.innerText;
    const headingId = heading.getAttribute('id');
    const headingLevel = heading.tagName;
    sidebarContent += `<li><a href="#${headingId}">${headingText}</a></li>`;
  }
  sidebarContent += '</ul>';
  sidebar.innerHTML = sidebarContent;
  // assign class sub-h2 to h2 headings and sub-h3 to h3 headings in sidebar
  let sidebarHeadings = document.querySelectorAll('#sidebar a');
  for (let i = 0; i < sidebarHeadings.length; i++) {
    const sidebarHeading = sidebarHeadings[i];
    let sidebarHeadingLevel = sidebarHeading.getAttribute('href').split('-')[0];
    // delete # from beginning of string
    sidebarHeadingLevel = sidebarHeadingLevel.slice(1).toLowerCase();
    sidebarHeading.classList.add(`sub-${sidebarHeadingLevel}`);
  }
}



const classMap = {
  table: 'table table-striped table-bordered table-hover table-sm table-dark table-bordered border-primary',
}

function setStyleDefault() {
  document.getElementById('sidebar').style = 'display: block; position: absolute; height: 100%; width: 250px; top: auto;';
  document.getElementById('content').style = 'position: relative; margin-left: auto; padding-left: 20px; width: calc(100% - 250px);';
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
        console.log(generateTitleObject());
        setStyleDefault();
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
  document.getElementById('sidebar').style = 'display: none;';
  document.getElementById('content').style = 'display: block; margin-left: 0px; max-width: 100vw;';
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
     
      $('inicio').style = 'position: absolute; overflow: hidden; max-width: 100vw; height: 100%; position: 0';
      $('main').style = 'position: absolute; overflow: hidden; max-width: 100vw; height: 100%; position: 0';
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

$(document).ready(function () {
  console.log('hola jquery');

/*   $("#sidebar").mCustomScrollbar({
      theme: "minimal"
  }); */

  $('#dismiss, .overlay').on('click', function () {
      // hide sidebar
      $('#sidebar').removeClass('active');
      // hide overlay
      $('.overlay').removeClass('active');
  });

  $('#sidebarCollapse').on('click', function () {
      // open sidebar
      $('#sidebar').addClass('active');
      // fade in the overlay
      $('.overlay').addClass('active');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  });
});