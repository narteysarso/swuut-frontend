export const filterColumns = (columns, columnFilter, callback = () => {}) => {

    let newColumns = columns.filter(column => columnFilter[column.title])

    callback(newColumns);
    
    return newColumns;
}


export const flaternInfiniteQueryData = (data, callback = ()=>{}) => {
    return data?.pages?.reduce((prev, page) => {
        prev.push(page?.payload?.data)
        return prev.flat()
    }, [])
}