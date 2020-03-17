import {
    COLUMN_WIDTH,
    createFirstDiv,
    createImgDiv,
    createTextDiv,
    createTitleDiv
} from "../utils/renderUtil";
import {TYPE} from "../constants";
import {data} from "../data";

export class Layout {
    constructor() {
        this.initUI();
    }

    initUI() {
        this.body = document.getElementsByTagName("body")[0];
        this.virtualHtml = "<div id = 'virtual'></div>"
        this.body.innerHTML = this.virtualHtml;
        this.virtual = document.getElementById("virtual");
        this.virtual.style.width = COLUMN_WIDTH + "px";
    }

    getTextHeight(innerHtml) {
        this.virtual.innerHTML = innerHtml;
        const height = this.virtual.offsetHeight + 30;
        return height;
    }

    getImgHeight(innerHtml) {
        this.virtual.innerHTML = null;
        this.virtual.innerHTML = innerHtml;
        const naturalHeight = this.virtual.childNodes[0].naturalHeight;
        const naturalWidth = this.virtual.childNodes[0].naturalWidth;
        const height = COLUMN_WIDTH / naturalWidth * naturalHeight;
        return height + 30;
    }

    generateDivs(paragraphs) {
        const texts = [];
        const imgs = [];
        paragraphs
            .forEach((item, index) => {
                let html;
                let height
                if (item.type === TYPE.text) {
                    if (index == 0) {
                        html = createFirstDiv(item.context);
                        height = this.getTextHeight(html);

                    } else {
                        html = createTextDiv(item.context);
                        height = this.getTextHeight(html);
                    }
                    texts.push({
                        html,
                        height,
                        context: item.context,
                        type: item.type
                    })

                } else {
                    html = createImgDiv(item.context);
                    height = this.getImgHeight(html);
                    imgs.push({
                        html,
                        height,
                        context: item.context,
                        type: item.type
                    })
                }
            });
        const titleDiv = createTitleDiv(data.title);
        const titleHeight = this.getTextHeight(titleDiv);
        const titleSection = {
            html: titleDiv,
            height: titleHeight
        }
        texts.splice(0, 0, titleSection);
        return {
            texts,
            imgs,
        }
    }

    splitSection(columnHeight, column, text) {
        let splitText = text;
        let height = 0;
        let index = 0;
        while (!this.isFull(columnHeight, column, height)) {
            index++;
            splitText = text.slice(0, index);
            height = this.getTextHeight(createTextDiv(splitText));
        }

        const preText = text.slice(0, index - 1);
        const preTextDiv = createTextDiv(preText);
        const preHeight = this.getTextHeight(preTextDiv);
        const nextText = text.slice(index - 1, text.length);
        const nextTextDiv = createTextDiv(nextText);
        const nextHeight = this.getTextHeight(nextTextDiv);
        return {
            preSection: {
                height: preHeight,
                html: preTextDiv
            },
            nextSection: {
                height: nextHeight,
                html: nextTextDiv,
            }
        }
    };

    isFull(columnHeight, column, sectionHeight) {
        if (!column.totalHeight) {
            column.totalHeight = 0;
        }
        if (column.totalHeight + sectionHeight > columnHeight) {
            return true;
        } else {
            return false;
        }
    };

    appendColumn(columns, section) {
        if (section == null) {
            return columns;
        }
        if (!columns.sections) {
            columns.sections = [];
            columns.totalHeight = -30;
        }
        columns.totalHeight += section.height;

        columns.sections.push(section);
        return columns;
    };


}
