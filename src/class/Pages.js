import {COLUMN_HEIGHT, COLUMN_WIDTH} from "../utils/renderUtil";
import {TYPE} from "../constants";

export class Page {
    constructor(leftColumns, rightColumns, pageIndex) {
        this.leftColumns = leftColumns;
        this.rightColumns = rightColumns;
        this.pageIndex = pageIndex;
    }

    renderPage() {
        return `
        <div>
            <div class="main" style="height: ${COLUMN_HEIGHT}px">
                ${this.createLeftColumn(this.leftColumns, this.pageIndex)}
                ${this.createRightColumn(this.rightColumns)}
            </div>
            ${this.createPageIndex(this.pageIndex)}
        </div>`
    }

    createLeftColumn(leftColumns, pageIndex) {
        if (!leftColumns) {
            return "";
        }
        const sections = leftColumns.sections;
        if (sections[sections.length - 1].type === TYPE.img) {
            const img = sections.splice(sections.length - 1, 1);
            if (pageIndex === 0) {
                sections.splice(2, 0, img[0]);
            } else {
                sections.splice(1, 0, img[0]);
            }
        }
        const leftSectionsHtml = sections.reduce((pre, section) => pre + section.html, "");
        return `
            <div class="left" style="width:${COLUMN_WIDTH}px">
               ${leftSectionsHtml}
            </div>
        `
    }

    createRightColumn(rightColumns) {
        if (!rightColumns) {
            return "";
        }
        const rightColumnsHtml = rightColumns.sections.reduce((pre, section) => pre + section.html, "");
        return `
            <div class="right" style="width:${COLUMN_WIDTH}px">
               ${rightColumnsHtml}
            </div>
        `
    }

    createPageIndex(pageIndex) {
        return `<div class="pageIndex">第${pageIndex + 1}页</div>`
    }


}
