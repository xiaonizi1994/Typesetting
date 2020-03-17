import {TYPE} from "./constants";
import {data} from "./data";
import {Page} from "./class/Pages";
import {
    COLUMN_HEIGHT,
    COLUMN_WIDTH,
    createFirstDiv,
    createImgDiv,
    createTextDiv,
    createTitleDiv
} from "./utils/renderUtil";
import {Layout} from "./class/Layout";
import {Template2} from "./class/Template2";
import {Template3} from "./class/Template3";

//
// const body = document.getElementsByTagName("body")[0];
//
// const virtualHtml = "<div id = 'virtual'></div>"
// body.innerHTML = virtualHtml;
// const virtual = document.getElementById("virtual");
// virtual.style.width = COLUMN_WIDTH + "px";
//
//
// const getTextHeight = (innerHtml) => {
//     virtual.innerHTML = innerHtml;
//     const height = virtual.offsetHeight + 30;
//     return height;
// }
//
// const getImgHeight = (innerHtml) => {
//     virtual.innerHTML = null;
//     virtual.innerHTML = innerHtml;
//     const naturalHeight = virtual.childNodes[0].naturalHeight;
//     const naturalWidth = virtual.childNodes[0].naturalWidth;
//     const height = COLUMN_WIDTH / naturalWidth * naturalHeight;
//     return height + 30;
// }
//
// const generateDivs = (paragraphs) => {
//     const texts = [];
//     const imgs = [];
//     paragraphs
//         .forEach((item, index) => {
//             let html;
//             let height
//             if (item.type === TYPE.text) {
//                 if (index == 0) {
//                     html = createFirstDiv(item.context);
//                     height = getTextHeight(html);
//
//                 } else {
//                     html = createTextDiv(item.context);
//                     height = getTextHeight(html);
//                 }
//                 texts.push({
//                     html,
//                     height,
//                     context: item.context,
//                     type: item.type
//                 })
//
//             } else {
//                 html = createImgDiv(item.context);
//                 height = getImgHeight(html);
//                 imgs.push({
//                     html,
//                     height,
//                     context: item.context,
//                     type: item.type
//                 })
//             }
//         });
//     const titleDiv = createTitleDiv(data.title);
//     const titleHeight = getTextHeight(titleDiv);
//     const titleSection = {
//         html: titleDiv,
//         height: titleHeight
//     }
//     texts.splice(0, 0, titleSection);
//     return {
//         texts,
//         imgs,
//     }
// }
//
// const splitSection = (columnHeight, column, text) => {
//     let splitText = text;
//     let height = 0;
//     let index = 0;
//     while (!isFull(columnHeight, column, height)) {
//         index++;
//         splitText = text.slice(0, index);
//         height = getTextHeight(createTextDiv(splitText));
//     }
//
//     const preText = text.slice(0, index - 1);
//     const preTextDiv = createTextDiv(preText);
//     const preHeight = getTextHeight(preTextDiv);
//     const nextText = text.slice(index - 1, text.length);
//     const nextTextDiv = createTextDiv(nextText);
//     const nextHeight = getTextHeight(nextTextDiv);
//     return {
//         preSection: {
//             height: preHeight,
//             html: preTextDiv
//         },
//         nextSection: {
//             height: nextHeight,
//             html: nextTextDiv,
//         }
//     }
// };
//
// const generatePages = (texts, imgs) => {
//     let pages = [];
//     let leftColumn = {};
//     let rightColumn = {};
//     let isAddingLeft = true;
//     let pageIndex = 0;
//     let img = imgs.shift();
//     texts.forEach((text) => {
//         if (isAddingLeft) {
//             let columnHeight = COLUMN_HEIGHT - (img ? img.height : 0);
//             if (isFull(columnHeight, leftColumn, text.height)) {
//                 const {preSection, nextSection} = splitSection(columnHeight, leftColumn, text.context);
//                 isAddingLeft = false;
//                 leftColumn = appendColumn(leftColumn, preSection);
//                 leftColumn = appendColumn(leftColumn, img);
//                 rightColumn = {
//                     totalHeight: nextSection.height,
//                     sections: [nextSection],
//                 };
//
//                 pages[pageIndex] = {
//                     leftColumn,
//                     rightColumn,
//                 };
//                 img = imgs.shift();
//             } else {
//                 leftColumn = appendColumn(leftColumn, text);
//                 pages[pageIndex] = {leftColumn};
//             }
//         } else {
//             let columnHeight = COLUMN_HEIGHT - (img ? img.height : 0);
//             if (isFull(columnHeight, rightColumn, text.height)) {
//                 const {preSection, nextSection} = splitSection(columnHeight, rightColumn, text.context);
//                 rightColumn = appendColumn(rightColumn, preSection);
//                 rightColumn = appendColumn(rightColumn, img);
//                 pages[pageIndex] = {
//                     ...pages[pageIndex],
//                     rightColumn,
//                 };
//                 isAddingLeft = true;
//                 pageIndex++;
//                 leftColumn = {
//                     totalHeight: nextSection.height,
//                     sections: [nextSection],
//                 };
//                 pages[pageIndex] = {
//                     leftColumn,
//                 }
//                 img = imgs.shift();
//             } else {
//                 rightColumn = appendColumn(rightColumn, text);
//                 pages[pageIndex] = {
//                     ...pages[pageIndex],
//                     rightColumn
//                 };
//             }
//         }
//     });
//     return pages;
// }
//
// const isFull = (columnHeight, column, sectionHeight) => {
//     if (!column.totalHeight) {
//         column.totalHeight = 0;
//     }
//     if (column.totalHeight + sectionHeight > columnHeight) {
//         return true;
//     } else {
//         return false;
//     }
// }
//
// const appendColumn = (columns, section) => {
//     if (section == null) {
//         return columns;
//     }
//     if (!columns.sections) {
//         columns.sections = [];
//         columns.totalHeight = -30;
//     }
//     columns.totalHeight += section.height;
//
//     columns.sections.push(section);
//     return columns;
// }
//
// const renderPages = (parentElement, pages) => {
//     let pagesHtml = "";
//     pages.forEach((page, index) => {
//         pagesHtml += new Page(page.leftColumn, page.rightColumn, index).renderPage()
//     });
//     parentElement.innerHTML = pagesHtml;
// }
//
// const {texts, imgs} = generateDivs(data.paragraphs);
// const pages = generatePages(texts, imgs);
// renderPages(body, pages);

// new Layout().draw();
new Template3().draw();

