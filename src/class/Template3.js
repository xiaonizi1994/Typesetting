import {Layout} from "./Layout";
import {data} from "../data";
import {COLUMN_HEIGHT} from "../utils/renderUtil";
import {TYPE} from "../constants";
import {Page} from "./Pages";

export class Template3 extends Layout {
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
                let columnHeight = COLUMN_HEIGHT;
                if (this.isFull(columnHeight, leftColumn, text.height)) {
                    const {preSection, nextSection} = this.splitSection(columnHeight, leftColumn, text.context);
                    isAddingLeft = false;
                    leftColumn = this.appendColumn(leftColumn, preSection);
                    rightColumn = {
                        totalHeight: nextSection.height,
                        sections: [nextSection],
                    };

                    pages[pageIndex] = {
                        leftColumn,
                        rightColumn,
                    };
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


    renderPages(pages) {
        let pagesHtml = "";
        pages.forEach((page, index) => {
            let sections = page.rightColumn.sections;
            if (sections[sections.length - 1].type === TYPE.img) {
                const img = sections.splice(sections.length - 1, 1);
                sections.splice(2, 0, img[0]);
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
