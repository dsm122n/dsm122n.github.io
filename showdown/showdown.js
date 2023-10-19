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