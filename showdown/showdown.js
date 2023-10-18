// Get the content of the <div> element
const mathContent = document.getElementById("math-content").innerHTML;

// Define a regular expression to match LaTeX equations within $$
const latexRegex = /\$\$(.*?)\$\$/g;

// Use replace() with a callback function to render each equation
const renderedContent = mathContent.replace(latexRegex, (match, latex) => {
  const container = document.createElement("span");
  katex.render(latex, container);
  return container.outerHTML;
});

// Set the modified content back to the <div>
document.getElementById("math-content").innerHTML = renderedContent;

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
    })
    .catch(err => {
      console.log(err);
    });
}