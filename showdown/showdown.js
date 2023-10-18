fetch('medi.md')
.then(response => response.text())
.then(markdownText => {
  // Create a new instance of Showdown converter
  const converter = new showdown.Converter({
  tables: true,
  });
  
  // Convert Markdown to HTML
  const html = converter.makeHtml(markdownText);

  // Insert the HTML into the container
  document.getElementById('markdown-pediatria').innerHTML = html;
});
