import exportToExcel from "../../support/exportToExcel";

export const onSearch = (value, event, callback) => {
    alert(value)
}


export const dummyData = () => {
    const datasource = [];
    const locations = ["Manhyia", "Abuakwa", "tech", "Nsuta", "Mampong","Agric", "Wasa","West", "East","North", "Darbaah","Amekom"]
    const names = ["Mark", "John", "Doe", "Mensah", "Frimpong", "James", "Fred", "Oppong", "Frank", "David", "Kwame", "Simon"]

    
    for (let i = 0; i < 100; i++) {
        datasource.push({
            key: i,
            posID: `0000${i}`,
            id: `merch0000${i}`,
            balance: ((1000 * i) / 3 + 1).toFixed(2),
            locationOfUse: `${locations[i % 12]} ${locations[parseInt(i + Math.random() * 10) % 12]}`,
            name: `${names[i % 12]} ${names[parseInt(i + Math.random() * 10) % 12]}`,
            createdAt: (new Date() ).toLocaleDateString(),
        });
    }

    return datasource
}

export const onExport = (tableQuery, filename = "merchants", sheetname = "merchants") => {
    sheetname = `${sheetname}`;

    let pageTables = document.querySelectorAll(tableQuery);

    let table = document.createElement('table');
    pageTables.forEach(pageTable => {
        table.innerHTML += pageTable.innerHTML
    })

    exportToExcel(table, filename, sheetname)
}