'use strict';

module.exports = function(shariff) {
    var url = encodeURIComponent(shariff.getURL());
    return {
        shareText: {
            'de': 'Gefällt mir',
            'en': 'like',
            'es': 'me gusta'
        },
        title: {
            'de': 'Gefällt mir',
            'en': 'Like',
            'es': 'Me gusta'
        },
        shareUrl: 'https://www.facebook.com/plugins/like.php?href=' + url + shariff.getReferrerTrack()
    };
};
