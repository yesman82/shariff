'use strict';

var $ = require('jquery');

module.exports = function(shariff) {
    var share = (require('./facebook/share'))(shariff);
    var like = (require('./facebook/like'))(shariff);
    return $.extend(
        {
            popup: true,
            name: 'facebook',
            faName: 'fa-facebook'
        },
        shariff.options.facebookAction === 'share' ? share : like
    );
};
