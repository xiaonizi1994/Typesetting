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

const sections = texts.concat(imgs);

const margin = 50;
const gap = 25;
const columnWidth = (document.body.clientWidth) / 2 - margin - gap;

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


const colums = [];
const innerHtml = '';

const getHeight = (innerHtml) => {
    virtual.innerHTML = innerHtml;
    const height = column.offsetHeight;
    console.log('height', height);
}

const setColumnWidth = (column, columnWidth) => {
    column.style.width = columnWidth + "px";
}

const renderSections = (sections) => {
    const sectionsDiv = sections.reduce((pre, item) => pre + createSectionDiv(item), '');
    column.innerHTML = sectionsDiv;

}

setColumnWidth(column, columnWidth);
renderSections(sections);
