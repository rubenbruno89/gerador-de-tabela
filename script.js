document.addEventListener('DOMContentLoaded', () => {
    const tableContainer = document.getElementById('table-container');
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const generatePdfButton = document.getElementById('generate-pdf');

    const numRows = 21;
    const numCols = 12;
    const totalCells = 250;
    let cellCounter = 1;

    // Generate Table Content
    for (let i = 0; i < numRows; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < numCols; j++) {
            const cell = document.createElement('td');
            if (cellCounter <= totalCells) {
                cell.textContent = cellCounter;
                cellCounter++;
            } else {
                // Leave cell empty if counter exceeds totalCells
                cell.textContent = '';
            }
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    tableContainer.appendChild(table);

    // PDF Generation Logic
    generatePdfButton.addEventListener('click', () => {
        // Temporarily remove button to avoid it appearing in the PDF
        generatePdfButton.style.display = 'none';
        const elementToCapture = document.body; // Or tableContainer if you only want the table

        // Use the globally available html2canvas function
        html2canvas(elementToCapture, {
            scale: 2 // Increase scale for better resolution
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            // Access jsPDF constructor from the global scope (window.jspdf)
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: 'p', // portrait
                unit: 'px', // units for dimensions
                format: [canvas.width, canvas.height] // use canvas dimensions
            });
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save('tabela_1_a_250.pdf');

            // Restore button visibility
            generatePdfButton.style.display = 'block';
        }).catch(err => {
            console.error("Erro ao gerar PDF:", err);
            // Restore button visibility even if there's an error
             generatePdfButton.style.display = 'block';
        });
    });
});