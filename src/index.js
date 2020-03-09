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

const body = document.getElementsByTagName("body")[0];
const mainHtml = "<div id ='main'></div>"
const virtualHtml = "<div id ='virtual'></div>"
body.innerHTML = mainHtml + virtualHtml;

const main = document.getElementById("main");
const virtual = document.getElementById("virtual");

const createTextDiv = (content) => {
    return `<div>${content}</div>`
}

const createImgDiv = (content) => {
    return "<img src='content'/>"
}

const colums = [];
const innerHtml = '';

main.innerHTML = createTextDiv("dd");

const getHeight = (innerHtml)=>{
    virtual.innerHTML = innerHtml;
    const height = main.offsetHeight;
    console.log('height', height);
}

getHeight(createTextDiv("dd"));
