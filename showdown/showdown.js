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
      document.getElementById('markdown-medi').innerHTML = html;
      
    });
    const buttonPediatria = document.querySelector('#button-pediatria');
    buttonPediatria.addEventListener('click', event => {
      event.preventDefault();
      var referencia = buttonPediatria.getAttribute('referencia');
      console.log(referencia);
      for (let i = 0; i < cambioAtributoElements.length; i++) {
        cambioAtributoElements[i].setAttribute('src', referencia);
    }
      fetch(referencia)
        .then(response => response.text())
        .then(markdownText => {
          // Create a new instance of Showdown converter
          const converter = new showdown.Converter({
          tables: true,
          });
          
          // Convert Markdown to HTML
          var html = converter.makeHtml(markdownText);
          console.log(href)
          console.log(html);
        
          // Insert the HTML into the container
          document.getElementsByClassName('md-cuerpo').innerHTML = html;
        });
    });
  });

