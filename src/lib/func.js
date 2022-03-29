import districts from "../lib/pca.js";
import moment from "moment";

export const DATE_FORMAT = "YYYY-MM-DD";
export const MONTH_FORMAT = "YYYY-MM";
export const DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

export const TIME_FORMAT = 'HH:mm';

export function convertDistrictToArray(district) {
    if (!district) {
        return null;
    } else if (district.length > 6) {
        return [
            district.substring(0, 2),
            district.substring(0, 4),
            district.substring(0, 6),
            district
        ];
    } else if (district.length > 4) {
        return [
            district.substring(0, 2),
            district.substring(0, 4),
            district.substring(0, 6)
        ];
    } else if (district.length > 2) {
        return [district.substring(0, 2), district.substring(0, 4)];
    } else return [district];
}


export function getDistrictLabel(code) {
    const codes = convertDistrictToArray(code);
    let children = districts;
    let label = "";
    codes.forEach((item, i) => {
        const found = children.find(district => district.value === item);
        if (found) {
            label += found.label;
            children = found.children;
        }
    });
    return label;
}

export function getSingleDistrictLabel(codes) {
    const labels = [];
    let children = districts;
    let label = '';
    if (typeof codes == "string") {
        codes = convertDistrictToArray(codes);
    }
    codes && codes instanceof Array &&
    codes.forEach((item) => {
        const found = children.find(district => district.value === item);
        if (found) {
            label = found.label;
            children = found.children || [];
            labels.push(label)
        }
    });
    return labels;
}

export function formatDate(date) {
    return typeof date === "string" ? date : date ? date.format(DATE_FORMAT) : null;
}
export function formatStrToDate(dateStr) {
    return typeof dateStr === "string" ? moment(dateStr, DATE_FORMAT) : dateStr;
}

export function formatDateTime(datetime) {
    return typeof datetime === "string" ? datetime : datetime ? datetime.format(DATETIME_FORMAT) : null;
}

export function getStatusIndex(value, list = []) {
    let index = -1;
    list.forEach((item, i) => {
        if (item.value === value) {
            index = i;
        }
    });
    return index;
}

export function getStatusText(value, list = []) {
    const found = list.find(item => item.value === value);
    return found ? found.label : value;
}

export function getTextOfField(value, field, text, list = []) {
    let found = list.find(item => item[field] === value);
    return found ? found[text] : value;
}
export function getLockStatus(value) {
    return value === "CONFIRMED" ? "已锁定" : "未锁定";
}

export function treeToList(tree) {
    const result = [];
    tree.forEach(item => {
        if (item.children) {
            treeToList(item.children).forEach(a => {
                result.push({...a})
            });
        }
        result.push({...item});
    });
    return result;

}

//分组
export const groupBy = (list, fn) => {
    const groups = {};
    list.forEach(function (o) {
        const group = fn(o);
        groups[group] = groups[group] || [];
        groups[group].push(o);
    });
    return groups;
}
