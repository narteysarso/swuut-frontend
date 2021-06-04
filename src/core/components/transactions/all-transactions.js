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
    const actionTypes = ["send", "recharge"]
    const names = ["Mark", "John", "Doe", "Mensah", "Frimpong", "James", "Fred", "Oppong", "Frank", "David", "Kwame", "Simon"]

    const modelTypes = { "send": "CardOwner", "recharge": "Merchant" }

    for (let i = 0; i < 100; i++) {
        const action = actionTypes[i % 2]
        datasource.push({
            key: i,
            posID: `0000${i}`,
            trans_type: action,
            trans_id: `trans0000${i}`,
            amount: ((100 * i) / 3 + 1).toFixed(2),
            from_model_type: modelTypes[action],
            from_model_id: `num000${i}`,
            from_model_name: `${names[i % 12]} ${names[parseInt(i + Math.random() * 10) % 12]}`,
            to_model_type: modelTypes[actionTypes[(i + 1) % 2]],
            to_model_id: `num000${i}`,
            to_model_name: `${names[(i + 3) % 12]} ${names[parseInt(i + Math.random() * 10) % 12]}`,
            createdAt: (new Date()).toLocaleDateString(),
        });
    }

    return datasource
}


export const onExport = (tableQuery, filename = "transactions", sheetname = "transactions") => {

    
    sheetname = `${sheetname}`;

    let pageTables = document.querySelectorAll(tableQuery);

    let table = document.createElement('table');
    pageTables.forEach(pageTable => {
        table.innerHTML += pageTable.innerHTML
    })



    exportToExcel(table, filename, sheetname);
}
