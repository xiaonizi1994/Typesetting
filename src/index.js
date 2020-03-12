import {TYPE} from "./constants";
import {data} from "./data";
import {Page} from "./class/Pages";
import {COLUMN_HEIGHT, COLUMN_WIDTH, createSectionDiv} from "./utils/renderUtil";


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


const body = document.getElementsByTagName("body")[0];

const virtualHtml = "<div id = 'virtual'></div>"
body.innerHTML = virtualHtml;

const column = document.getElementById("column");
const virtual = document.getElementById("virtual");

virtual.style.width = COLUMN_WIDTH + "px";


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
            type: item.type
        }
    });
console.log("section", sections);

const columns = [];
const innerHtml = '';

const setColumnWidth = (column, columnWidth) => {
    column.style.width = columnWidth + "px";
}

//
// const generateColumns = (sections)=>{
//     const leftColumns = {};
//     const rightColumns = {};
//     sections.forEach((section, index)=>{
//         if(!isFull(COLUMN_HEIGHT,leftColumns, sections)){
//             appendColumn(leftColumns, section);
//             return;
//         }
//             })
// }

const splitSection = (section, remainHeight) =>{

}

const generatePages = (sections) => {
    let pages = [];
    let leftColumn = {};
    let rightColumn = {};
    let isAddingLeft = true;
    let pageIndex = 0;
    sections.forEach((section) => {
        if (isAddingLeft) {
            if (isFull(COLUMN_HEIGHT, leftColumn, section)) {
                isAddingLeft = false;
                leftColumn = {};
            } else {
                leftColumn = appendColumn(leftColumn, section);
                pages[pageIndex] = {leftColumn};
            }
        }
        if (!isAddingLeft) {
            if (isFull(COLUMN_HEIGHT, rightColumn, section)) {
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
    });
    console.log("page", pages);
    return pages;
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
    columns.totalHeight += section.height + 30;
    if (!columns.sections) {
        columns.sections = [];
    }
    columns.sections.push(section);
    return columns;
}

const renderPages = (parentElement, pages) => {
    let pagesHtml = "";
    pages.forEach((page, index) => {
        pagesHtml += new Page(page.leftColumn, page.rightColumn, index).renderPage()
    });
    parentElement.innerHTML = pagesHtml;
}

const pages = generatePages(sections);
renderPages(body, pages);

