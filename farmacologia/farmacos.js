// Read the farmacos.csv file
fetch("farmacos.csv")
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
    });
