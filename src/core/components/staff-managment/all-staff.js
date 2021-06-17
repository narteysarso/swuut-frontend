import exportToExcel from "../../support/exportToExcel";

export const onSearch = (value, event, callback) => {
    alert(value)
}

export const onExport = (tableQuery, filename = "staffs", sheetname = "staffs") => {
    sheetname = `${sheetname}`;

    let pageTables = document.querySelectorAll(tableQuery);

    let table = document.createElement('table');
    pageTables.forEach(pageTable => {
        table.innerHTML += pageTable.innerHTML
    })

    exportToExcel(table, filename, sheetname)
}
