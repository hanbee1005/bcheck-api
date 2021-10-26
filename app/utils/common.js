let util = {}

/**
 * 리턴 Body 메시지를 만들어서 리턴한다.
 * @param status
 * @param message
 * @param data
 * @returns {{data, message, status}}
 */
util.makeResponseBody = function (status, message, data) {
    return {
        status,
        message,
        data
    }
}

module.exports = util
