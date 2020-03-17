import {Layout} from "../class/Layout";
import {data} from "../data";
import {COLUMN_HEIGHT} from "../utils/renderUtil";
import {TYPE} from "../constants";
import {Page} from "../class/Pages";
import {Template1} from "./Template1";

export class Template2 extends Layout{
    constructor() {
        super();
    }
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
                let columnHeight = COLUMN_HEIGHT;
                if (this.isFull(columnHeight, rightColumn, text.height)) {
                    const {preSection, nextSection} = this.splitSection(columnHeight, rightColumn, text.context);
                    rightColumn = this.appendColumn(rightColumn, preSection);
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

    renderPages(pages) {
        let pagesHtml = "";
        pages.forEach((page, index) => {
            let sections = page.leftColumn.sections;
            if (sections[sections.length - 1].type === TYPE.img) {
                const img = sections.splice(sections.length - 1, 1);
                if (index === 0) {
                    sections.splice(2, 0, img[0]);
                } else {
                    sections.splice(1, 0, img[0]);
                }
            }
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

new Template2().draw();
