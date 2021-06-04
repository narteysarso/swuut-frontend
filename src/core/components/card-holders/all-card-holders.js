import exportToExcel from "../../utils/exportToExcel"


export const handleDateChange = (event, callback) => {
    console.log(event.target.value)
    callback(event.target.value)
}

export const onSearch = (value, event, callback) => {
    alert(value)
}

export const dummyData = () => {
    const datasource = [];
    const cardTypes = ["prepaid", "debit"]
    const names = ["Mark", "John", "Doe", "Mensah", "Frimpong", "James", "Fred", "Oppong", "Frank", "David", "Kwame", "Simon"]


    for (let i = 0; i < 100; i++) {
        const action = cardTypes[i % 2]
        datasource.push({
            key: i,
            cardID: `0000${i}`,
            card_type: action,
            name: `${names[i % 12]} ${names[parseInt(i + Math.random() * 10) % 12]}`,
            phone: `+244`,
            createdAt: (new Date()).toLocaleDateString(),
        });
    }

    return datasource
}


export const onExport = (tableQuery, filename = "cardholders", sheetname = "cardholders") => {

    
    sheetname = `${sheetname}`;

    let pageTables = document.querySelectorAll(tableQuery);

    let table = document.createElement('table');
    pageTables.forEach(pageTable => {
        table.innerHTML += pageTable.innerHTML
    })



    exportToExcel(table, filename, sheetname);
}
