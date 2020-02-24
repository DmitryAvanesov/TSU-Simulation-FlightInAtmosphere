'use strict';

class ChartModel {
  constructor() {
    this.data = [];
    this.accDueToGr = 9.80665;
    this.maxX = 0;
    this.maxY = 0;

    this.speedX = [];
    this.speedY = [];
  }

  setMaxAxis(speed, height, angle) {
    const angleRad = angle * Math.PI / 180;

    this.maxX = speed * Math.cos(angleRad) * (speed * Math.sin(angleRad) + Math.sqrt(Math.pow(speed, 2) * Math.pow(Math.sin(angleRad), 2) + 2 * this.accDueToGr * height)) / this.accDueToGr;
    this.maxY = height + Math.pow(speed, 2) * Math.pow(Math.sin(angleRad), 2) / (2 * this.accDueToGr);
  }

  setInitialValues(speed, height, angle) {
    const angleRad = angle * Math.PI / 180;

    this.data.push({
      x: 0,
      y: height,
      t: 0
    });

    this.speedX.length = 0;
    this.speedY.length = 0;

    this.speedX.push(speed * Math.cos(angleRad));
    this.speedY.push(speed * Math.sin(angleRad));
  }

  increaseTime(speed, height, angle, mass, drag, time) {
    const previousPoint = this.data[this.data.length - 1];
    const previousSpeedX = this.speedX[this.speedX.length - 1];
    const previousSpeedY = this.speedY[this.speedY.length - 1];
    const timeSec = time / 1000;
    const timeDiff = timeSec - previousPoint.t;
    const angleRad = angle * Math.PI / 180;

    const newX = previousPoint.x + previousSpeedX * timeDiff;
    const newY = height + speed * Math.sin(angleRad) * timeSec - this.accDueToGr * Math.pow(timeSec, 2) / 2;

    this.data.push({
      x: parseFloat(newX.toFixed(2)),
      y: parseFloat(newY.toFixed(2)),
      t: parseFloat(timeSec)
    });

    this.speedX.push(previousSpeedX * (1 - drag / mass * timeDiff));
    this.speedY.push(previousSpeedY - (this.accDueToGr + drag / mass * previousSpeedY) * timeDiff);
  }
}