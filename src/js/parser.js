import * as XLSX from "xlsx";

function globalVar(reader) {
    let data = reader.result;
    const wb = XLSX.read(data, {type: "binary"});
    //считываем 1 лист
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    return XLSX.utils.sheet_to_json(ws, {header: 1}); //  генерирует массив объектов
}

function funcTarget(e, parserFunc, params) {
    let promise = new Promise((resolve, reject) => {

        let file = e;
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = () => {
            let data = parserFunc(reader, params);
            resolve(data);
            reject(new Error("error"));
        }
    })
    return promise;
}

function parseThreeColumns(reader, params) {
    let codeColNum = params.codeColNum, // колонки таблицы
        countColNum = params.countColNum,
        priceColNum = params.priceColNum;

    let rows = globalVar(reader);
    let result = [];
    // Цикл по строкам
    for (let i = 0; i < rows.length; i++) {
        let currentRow = rows[i];
        let productCount = parseInt(currentRow[countColNum]); //принимает строку в качестве аргумента и возвращает целое число
        let priceVal = currentRow[priceColNum];
        let price = 0;
        if(priceVal) price = parseFloat(priceVal.toString().replace(/\s/g, ''))
        if (!isNaN(productCount) && currentRow[codeColNum]) {
            // определяет является ли литерал или переменная нечисловым значением
            result.push({
                // добавляем значения в массив
                productCode: currentRow[codeColNum],
                productCount: productCount,
                price: !isNaN(price) ? price : 0 ,
            });
        }

    }
    return result;
}

function parseTwoColumns(reader) {
    let rows = globalVar(reader);
    let result = [];

    // проверяем первую ячейку таблицы
    let header = rows[0][0]; // находим первую ячейку таблицы

    let codeColNum = 0,
        countColNum = 1;
    if (header === "GOODWILL ОСТАТКИ *") (codeColNum = 1), (countColNum = 8);

    for (let i = 0; i < rows.length; i++) {
        let currentRow = rows[i];
        let productCount = parseInt(currentRow[countColNum]);
        if (!isNaN(productCount))
            result.push({
                productCode: currentRow[codeColNum],
                productCount: productCount,
            });
    }

    return result;
}

export {funcTarget, parseThreeColumns, parseTwoColumns};
