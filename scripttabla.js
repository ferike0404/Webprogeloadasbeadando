document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("data-form");
    const tableBody = document.getElementById("table-body");
    const searchInput = document.getElementById("search");
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const email = document.getElementById("email").value;
        const city = document.getElementById("city").value;
        
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${name}</td>
            <td>${age}</td>
            <td>${email}</td>
            <td>${city}</td>
            <td>
                <button onclick="editRow(this)">Szerkesztés</button>
                <button onclick="deleteRow(this)">Törlés</button>
            </td>
        `;
        tableBody.appendChild(row);
        form.reset();
    });
    
    searchInput.addEventListener("input", () => {
        const filter = searchInput.value.toLowerCase();
        const rows = tableBody.getElementsByTagName("tr");
        
        for (let row of rows) {
            let textContent = row.textContent.toLowerCase();
            row.style.display = textContent.includes(filter) ? "" : "none";
        }
    });
});

function editRow(button) {
    const row = button.parentElement.parentElement;
    const cells = row.getElementsByTagName("td");
    
    document.getElementById("name").value = cells[0].textContent;
    document.getElementById("age").value = cells[1].textContent;
    document.getElementById("email").value = cells[2].textContent;
    document.getElementById("city").value = cells[3].textContent;
    
    row.remove();
}

function deleteRow(button) {
    button.parentElement.parentElement.remove();
}

function sortTable(columnIndex) {
    const table = document.querySelector("table tbody");
    const rows = Array.from(table.rows);
    const sortedRows = rows.sort((a, b) => {
        const aText = a.cells[columnIndex].textContent.trim().toLowerCase();
        const bText = b.cells[columnIndex].textContent.trim().toLowerCase();
        
        return aText.localeCompare(bText, 'hu', { numeric: true });
    });
    
    table.innerHTML = "";
    sortedRows.forEach(row => table.appendChild(row));
}
