document.addEventListener('DOMContentLoaded', () => {
    const tableContainer = document.getElementById('table-container');
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    const numRows = 21;
    const numCols = 12;
    const totalCells = 250;
    let cellCounter = 1;

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
});

