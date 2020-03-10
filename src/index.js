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
)

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
    return `<div class="text">${context}</div>`
}

const createImgDiv = (context) => {
    return "<img src='context'/>"
}

const colums = [];
const innerHtml = '';

const getHeight = (innerHtml) => {
    virtual.innerHTML = innerHtml;
    const height = column.offsetHeight;
    console.log('height', height);
}

const setColumnWidth = (column, columnWidth)=>{
    column.style.width = columnWidth + "px";
}

const renderTexts = (texts) => {
    const textsDiv = texts.reduce((pre, item) => pre + createTextDiv(item.context), '');
    column.innerHTML = textsDiv;

}

setColumnWidth(column, columnWidth);
renderTexts(texts);
