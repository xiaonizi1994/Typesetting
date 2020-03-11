import {TYPE} from "./constants";
import {data} from "./data";


const texts = [];
const imgs = [];
data.paragraphs.forEach(
    value => {
        if (value.type === TYPE.text) {
            texts.push(value);
        }
        if (value.type === TYPE.img) {
            imgs.push(value)
        }
    }
);


const margin = 50;
const gap = 25;

const columnWidth = (document.documentElement.clientWidth) / 2 - margin - gap;
const columnHeight = (document.documentElement.clientHeight) - 100;

const body = document.getElementsByTagName("body")[0];
const columnHtml = "<div id ='column'></div>"
const virtualHtml = "<div id = 'virtual'></div>"
body.innerHTML = columnHtml + virtualHtml;

const column = document.getElementById("column");
const virtual = document.getElementById("virtual");

virtual.style.width = columnWidth + "px";

const createTextDiv = (context) => {
    return `<div class="section">${context}</div>`
}

const createImgDiv = (context) => {
    return `<img class='section' src=${context}/>`
}

const createSectionDiv = (item) => {
    if (item.type === TYPE.img) {
        console.log('dd');
        return createImgDiv(item.context);
    }
    if (item.type === TYPE.text)
        return createTextDiv(item.context);
}


const getHeight = (innerHtml) => {
    virtual.innerHTML = innerHtml;
    const height = virtual.offsetHeight;
    return height;
}


const sections = texts.concat(imgs)
    .map((item) => {
        const html = createSectionDiv(item);
        const height = getHeight(html);
        return {
            height,
            html,
        }
    });
console.log("section", sections);

const columns = [];
const innerHtml = '';

const setColumnWidth = (column, columnWidth) => {
    column.style.width = columnWidth + "px";
}

const renderSections = (sections) => {
    const sectionsDiv = sections.reduce((pre, item) => pre + createSectionDiv(item), '');
    column.innerHTML = sectionsDiv;

}
//
// const generateColumns = (sections)=>{
//     const leftColumns = {};
//     const rightColumns = {};
//     sections.forEach((section, index)=>{
//         if(!isFull(columnHeight,leftColumns, sections)){
//             appendColumn(leftColumns, section);
//             return;
//         }
//             })
// }

const generatePages = (sections) => {
    let pages = [];
    let leftColumn = {};
    let rightColumn = {};
    let isAddingLeft = true;
    let pageIndex = 0;
    sections.forEach((section) => {
        if (isAddingLeft) {
            if (isFull(columnHeight, leftColumn, section)) {
                isAddingLeft = false;
                leftColumn = {};
            } else {
                leftColumn = appendColumn(leftColumn, section);
                pages[pageIndex] = {leftColumn};
            }
        }
        if (!isAddingLeft) {
            if (isFull(columnHeight, rightColumn, sections)) {
                isAddingLeft = true;
                pageIndex++;
                rightColumn = {};
            } else {
                rightColumn = appendColumn(rightColumn, section);
                pages[pageIndex] = {
                    ...pages[pageIndex],
                    rightColumn
                };
            }
        }
        console.log("left", leftColumn);
        console.log("right", rightColumn);
    })
    console.log("page", pages);
}

const isFull = (columnHeight, column, section) => {
    if (!column.totalHeight) {
        column.totalHeight = 0;
    }
    if (column.totalHeight + section.height > columnHeight) {
        return true;
    } else {
        return false;
    }
}

const appendColumn = (columns, section) => {
    columns.totalHeight += section.height;
    if (!columns.section) {
        columns.section = [];
    }
    columns.section.push(section);
    return columns;
}

setColumnWidth(column, columnWidth);
// renderSections(sections);
generatePages(sections);
