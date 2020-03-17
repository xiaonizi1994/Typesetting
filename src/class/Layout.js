import {
    COLUMN_HEIGHT,
    COLUMN_WIDTH,
    createFirstDiv,
    createImgDiv,
    createTextDiv,
    createTitleDiv
} from "../utils/renderUtil";
import {TYPE} from "../constants";
import {data} from "../data";
import {Page} from "./Pages";

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

    generatePages(texts, imgs) {
        let pages = [];
        let leftColumn = {};
        let rightColumn = {};
        let isAddingLeft = true;
        let pageIndex = 0;
        let img = imgs.shift();
        texts.forEach((text) => {
            if (isAddingLeft) {
                let columnHeight = COLUMN_HEIGHT - (img ? img.height : 0);
                if (this.isFull(columnHeight, leftColumn, text.height)) {
                    const {preSection, nextSection} = this.splitSection(columnHeight, leftColumn, text.context);
                    isAddingLeft = false;
                    leftColumn = this.appendColumn(leftColumn, preSection);
                    leftColumn = this.appendColumn(leftColumn, img);
                    rightColumn = {
                        totalHeight: nextSection.height,
                        sections: [nextSection],
                    };

                    pages[pageIndex] = {
                        leftColumn,
                        rightColumn,
                    };
                    img = imgs.shift();
                } else {
                    leftColumn = this.appendColumn(leftColumn, text);
                    pages[pageIndex] = {leftColumn};
                }
            } else {
                let columnHeight = COLUMN_HEIGHT - (img ? img.height : 0);
                if (this.isFull(columnHeight, rightColumn, text.height)) {
                    const {preSection, nextSection} = this.splitSection(columnHeight, rightColumn, text.context);
                    rightColumn = this.appendColumn(rightColumn, preSection);
                    rightColumn = this.appendColumn(rightColumn, img);
                    pages[pageIndex] = {
                        ...pages[pageIndex],
                        rightColumn,
                    };
                    isAddingLeft = true;
                    pageIndex++;
                    leftColumn = {
                        totalHeight: nextSection.height,
                        sections: [nextSection],
                    };
                    pages[pageIndex] = {
                        leftColumn,
                    }
                    img = imgs.shift();
                } else {
                    rightColumn = this.appendColumn(rightColumn, text);
                    pages[pageIndex] = {
                        ...pages[pageIndex],
                        rightColumn
                    };
                }
            }
        });
        return pages;
    }

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

    renderPages(pages) {
        let pagesHtml = "";
        pages.forEach((page, index) => {
            pagesHtml += new Page(page.leftColumn, page.rightColumn, index).renderPage()
        });
        this.body.innerHTML = pagesHtml;
    }

    draw() {
        const {texts, imgs} = this.generateDivs(data.paragraphs);
        const pages = this.generatePages(texts, imgs);
        this.renderPages(pages);
    }

}
