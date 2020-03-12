import {COLUMN_WIDTH} from "../utils/renderUtil";

export class Page {
    constructor(leftColumns, rightColumns, pageIndex) {
        this.leftColumns = leftColumns;
        this.rightColumns = rightColumns;
        this.pageIndex = pageIndex;
    }

    renderPage() {
        return `
        <div class="main">
            ${this.createLeftColumn(this.leftColumns)}
            ${this.createRightColumn(this.rightColumns)}
        </div>`
            + this.createPageIndex(this.pageIndex);
    }

    createLeftColumn(leftColumns) {
        const leftSectionsHtml = leftColumns.sections.reduce((pre, section) => pre + section.html, "");
        return `
            <div class="left" style="width:${COLUMN_WIDTH}">
               ${leftSectionsHtml}
            </div>
        `
    }

    createRightColumn(rightColumns) {
        const rightColumnsHtml = rightColumns.sections.reduce((pre, section) => pre + section.html, "");
        return `
            <div class="right" style="width:${COLUMN_WIDTH}">
               ${rightColumnsHtml}
            </div>
        `
    }

    createPageIndex(pageIndex) {
        return `<div class="pageIndex">第${pageIndex + 1}页</div>`
    }


}
