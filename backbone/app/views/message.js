'use strict';

var Backbone = require('backbone');

module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'message-item',
  render: function() {
    var name = this.model.sender.userId || 'Unknown';
    var initial = name.substr(0, 2).toUpperCase();

    var timestamp = window.layerSample.dateFormat(this.model.sentAt);
    var parts = '';

    if (!this.model.isDestroyed) {
      this.model.parts.forEach(function(part) {
        parts += '<div class="bubble text">' + part.body + '</div>';
      });

      this.$el.append('<div class="avatar">' + initial + '</div>' +
                      '<div class="message-content">' +
                        '<span class="name">' + name + '</span>' +
                        '<div class="message-parts">' + parts + '</div>' +
                      '</div>' +
                      '<div class="timestamp">' + timestamp +
                        '<span class="message-status">' + this.getMessageStatus() + '</span>' +
                      '</div>');
    }
  },
  getMessageStatus: function() {
    switch (this.model.readStatus) {
      case 'NONE':
        return 'unread';
      case 'SOME':
        return 'read by some';
      case 'ALL':
        return 'read';
      default:
        return 'unread';
    }
  }
});
