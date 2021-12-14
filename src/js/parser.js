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

function parseReadinessDates(reader, params) {
    let codeColNum = params.codeColNum, // колонки таблицы
        orderQuantityColNum = params.orderQuantityColNum,
        notCompleteColNum = params.notCompleteColNum,
        creationDateColNum = params.creationDateColNum,
        readinessDateColNum = params.readinessDateColNum;
    let rows = globalVar(reader);
    let result = [];
    for (let i = 0; i < rows.length; i++) {
        let currentRow = rows[i];
        let orderQuantity = parseInt(currentRow[orderQuantityColNum]);
        let notCompleteQuantity = parseInt(currentRow[notCompleteColNum]);
        let creationDate = currentRow[creationDateColNum];
        let readinessDate = currentRow[readinessDateColNum];
        if(!isNaN(orderQuantity) && !isNaN(notCompleteQuantity) && !isNaN(Date.parse(creationDate))) {
            result.push({
                productCode: currentRow[codeColNum],
                orderQuantity: orderQuantity,
                completeQuantity: orderQuantity - notCompleteQuantity,
                creationDate: new Date(creationDate),
                readinessDate: isNaN(Date.parse(readinessDate)) ? null : new Date(readinessDate)
            })
        }
    }
    return result;
}

function parsePriceList(reader) {
    let codeColNum = 0, priceColNum = 1, moqColNum = 2, productionTimeColNum = 3, commentColNum = 4;
    let rows = globalVar(reader);
    let result = [];
    for (let i = 0; i < rows.length; i++) {
        let currentRow = rows[i];
        let moq = parseInt(currentRow[moqColNum]);
        let productionTime = parseInt(currentRow[productionTimeColNum]);
        let priceVal = currentRow[priceColNum];
        let price = 0;
        if(priceVal) price = parseFloat(priceVal.toString().replace(/\s/g, ''));
        if(!isNaN(moq) && !isNaN(productionTime) && !isNaN(price)) {
            result.push({
                productCode: currentRow[codeColNum],
                price: price,
                moq: moq,
                productionTime: productionTime,
                comment: currentRow[commentColNum]
            });
        }
    }
    return result;
}

export {funcTarget, parseThreeColumns, parseTwoColumns, parseReadinessDates, parsePriceList};
