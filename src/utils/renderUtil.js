import {TYPE} from "../constants";

const margin = 50;
const gap = 25;

export const COLUMN_WIDTH = (document.documentElement.clientWidth) / 2 - margin - gap;
export const COLUMN_HEIGHT = (document.documentElement.clientHeight) - 100;

export const createTextDiv = (context) => {
    return `<div class="section">${context}</div>`
}

export const createImgDiv = (context) => {
    return `<img class='section' src=${context}/>`
}

export const createPageIndex = (pageIndex)=>{
    return `<div class="pageIndex">第${pageIndex+1}页</div>`
}

export const createMainDiv = (parentElement)=>{
    const mainDiv = `<div class="main"></div>`
    parentElement.innerHTML = mainDiv;
}

export const createSectionDiv = (item) => {
    if (item.type === TYPE.img) {
        return createImgDiv(item.context);
    }
    if (item.type === TYPE.text)
        return createTextDiv(item.context);
}
