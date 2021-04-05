'use strict';

const findElement = require('../../helpers/findElement');
const getPerformActionId = require('../../helpers/getPerformActionId');

module.exports = (browser) => {
    browser.addCommand('moveToObject', async function(selector, xOffset, yOffset) {
        const elem = await findElement(this, selector);

        if (!this.isW3C) {
            return elem.moveTo({xOffset, yOffset});
        }

        if (this.isMobile) {
            return elem.touchAction([
                'press',
                {action: 'moveTo', x: xOffset, y: yOffset},
                'release'
            ]);
        }

        const [element, viewport] = await Promise.all([this.getElementRect(elem.elementId), getViewportRect(this)]);
        const point = getPointToMoveAbsoluteCoords(element, xOffset, yOffset);

        if (isWithinViewport(point, viewport)) {
            return moveTo(this, point, viewport);
        }

        await elem.scrollIntoView();

        const viewportAfterScroll = await getViewportRect(this);

        return moveTo(this, point, viewportAfterScroll);
    });
};

function getViewportRect(browser) {
    return browser.execute(function() {
        return {x: window.pageXOffset, y: window.pageYOffset, height: window.innerHeight, width: window.innerWidth};
    });
}

function getPointToMoveAbsoluteCoords(element, xOffset, yOffset) {
    return {x: calculateAbsoluteCoord(element.x, element.width, xOffset), y: calculateAbsoluteCoord(element.y, element.height, yOffset)};
}

function calculateAbsoluteCoord(elementCoord, elementSize, elementOffset) {
    elementOffset = typeof elementOffset === 'number' ? elementOffset : (elementSize / 2);

    return Math.ceil(Math.max(elementCoord + elementOffset, 0));
}

function isWithinViewport(point, viewport) {
    return viewport.x <= point.x
        && viewport.y <= point.y
        && viewport.x + viewport.width >= point.x
        && viewport.y + viewport.height >= point.y;
}

function moveTo(browser, point, viewport) {
    const x = point.x - viewport.x;
    const y = point.y - viewport.y;

    return browser.performActions([{
        type: 'pointer',
        id: getPerformActionId(browser),
        parameters: {pointerType: 'mouse'},
        actions: [{type: 'pointerMove', duration: 0, x, y}]
    }]);
}
