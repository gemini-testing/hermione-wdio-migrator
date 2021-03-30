'use strict';

const BUTTON_ENUM = {
    left: 0,
    middle: 1,
    right: 2
};

module.exports = (button) => {
    if (typeof button === 'number') {
        return button;
    }

    return BUTTON_ENUM[button || 'left'];
};
