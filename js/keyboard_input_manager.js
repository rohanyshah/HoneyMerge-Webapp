// Listen to swipe events
  var touchStartClientX, touchStartClientY;
  var gameContainer = document.getElementsByClassName("game-container")[0];

  gameContainer.addEventListener(this.eventTouchstart, function (event) {
    if (( !window.navigator.msPointerEnabled && event.touches.length > 1) || event.targetTouches > 1) return;

    if(window.navigator.msPointerEnabled){
        touchStartClientX = event.pageX;
        touchStartClientY = event.pageY;
    } else {
        touchStartClientX = event.touches[0].clientX;
        touchStartClientY = event.touches[0].clientY;
    }

    event.preventDefault();
  });

  gameContainer.addEventListener(this.eventTouchmove, function (event) {
    event.preventDefault();
  });

  gameContainer.addEventListener(this.eventTouchend, function (event) {
    if (( !window.navigator.msPointerEnabled && event.touches.length > 0) || event.targetTouches > 0) return;

    var touchEndClientX, touchEndClientY;
    if(window.navigator.msPointerEnabled){
        touchEndClientX = event.pageX;
        touchEndClientY = event.pageY;
    } else {
        touchEndClientX = event.changedTouches[0].clientX;
        touchEndClientY = event.changedTouches[0].clientY;
    }

    var dx = touchEndClientX - touchStartClientX;
    var absDx = Math.abs(dx);

    var dy = touchEndClientY - touchStartClientY;
    var absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) > 10) {
      // (right : left) : (down : up)
      self.emit("move", absDx > absDy ? (dx > 0 ? 3 : 2) : (dy > 0 ? (dx > 0 ? 5 : 4) : (dx > 0 ? 1 : 0)));
    }
  });
};
