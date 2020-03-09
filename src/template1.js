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

const main = document.getElementById("main");


const createTextDiv = (content) => {
    return "<div>content</div>"
}

const createImgDiv = (content) => {
    return "<img src='content'/>"
}

const textDiv = '<div>' + '</div>'
main.innerHTML = createTextDiv("dd")
