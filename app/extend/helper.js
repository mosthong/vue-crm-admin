'use strict';

const moment = require('moment');

module.exports = {
  formatTime(time) {
    return moment(time).format('YYYY-MM-DD HH:mm::ss.SSS');
  }
}
