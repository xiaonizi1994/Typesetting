import {COLUMN_HEIGHT, COLUMN_WIDTH} from "../utils/renderUtil";

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
                ${this.createLeftColumn(this.leftColumns)}
                ${this.createRightColumn(this.rightColumns)}
            </div>
            ${this.createPageIndex(this.pageIndex)}
        </div>`
    }

    createLeftColumn(leftColumns) {
        if (!leftColumns) {
            return "";
        }

        const leftSectionsHtml = leftColumns.sections.reduce((pre, section) => pre + section.html, "");
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
