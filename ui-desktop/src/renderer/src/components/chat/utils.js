export const isClosed = (item) => item.ClosedAt || (new Date().getTime() > item.EndsAt * 1000);

export const makeId = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export const getHashCode = (string) => {
    var hash = 0;
    for (var i = 0; i < string.length; i++) {
        var code = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + code;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

const colors = [
    '#1899cb', '#da4d76', '#d66b38', '#d39d00', '#b46fc4', '#269c68', '#86858a'
];

export const getColor = (name) => {
    if (!name) {
        return;
    }
    return colors[(getHashCode(name) + 1) % colors.length]
}

export const parseDataChunk = (decodedChunk) => {
    const lines = decodedChunk.split('\n');
    const trimmedData = lines.map(line => line.replace(/^data: /, "").trim());
    const filteredData = trimmedData.filter(line => !["", "[DONE]"].includes(line));
    const parsedData = filteredData.map(line => JSON.parse(line));

    return parsedData;
}

export const formatSmallNumber = (number) => {
    const strNum = String(number);
    if(!strNum.includes("e")) {
        return number;
    }

    const exponentionalIndex = strNum.indexOf('-');
    if(exponentionalIndex == -1) {
        return number;
    }
    const pow = strNum.substring(exponentionalIndex + 1);
    return number.toFixed(+pow);
}