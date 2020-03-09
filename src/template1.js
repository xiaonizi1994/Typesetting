import {data} from "data";
import {TYPE} from "constants";


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

