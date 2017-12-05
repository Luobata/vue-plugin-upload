export default {
    typeFormat(typeArray) {
        if (typeArray === '*') return '*';
        if (!typeArray || !typeArray.length) return '';
        typeArray.forEach((item, index) => {
            typeArray[index] = `*.${item}`;
        });
        return typeArray.join(';');
    },
    sizeFormat(size) {
        if (!size || !parseFloat(size, 10)) return '0B';
        let unit = 'B';
        const hihgUnit = (unit) => {
            let unitUp = 'B';
            switch (unit) {
            case 'B':
                unitUp = 'KB';
                break;
            case 'KB':
                unitUp = 'MB';
                break;
            case 'MB':
                unitUp = 'GB';
                break;
            case 'GB':
                unitUp = 'TB';
                break;
            default:
                break;
            }
            return unitUp;
        };
        let sizes = parseInt(size, 10);
        while (sizes > 1024) {
            unit = hihgUnit(unit);
            sizes = parseFloat(sizes / 1024, 10);
        }

        return `${sizes} ${unit}`;
    },
};
