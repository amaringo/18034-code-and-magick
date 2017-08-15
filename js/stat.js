'use strict';

window.renderStatistics = function (ctx, names, times) {
  var cloudX = 100;
  var cloudY = 10;
  var cloudWidth = 420;
  var cloudHeight = 270;
  var shadowShift = 10;
  var barWidth = 40;
  var barIndent = 100;
  var barX = 120;
  var barY = 250;
  var barMargin = 15;


  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.strokeRect(cloudX + shadowShift, cloudY + shadowShift, cloudWidth, cloudHeight);
  ctx.fillRect(cloudX + shadowShift, cloudY + shadowShift, cloudWidth, cloudHeight);
  ctx.fillStyle = 'rgba(256,256,256,1)';
  ctx.strokeRect(cloudX, cloudY, cloudWidth, cloudHeight);
  ctx.fillRect(cloudX, cloudY, cloudWidth, cloudHeight);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура! Вы победили!', 130, 40);
  ctx.fillText('Список результатов', 130, 60);
  ctx.textBaseline = 'hanging';


  var max = -1;
  for (var i = 0; i < times.length; i++) {

    if (times[i] > max) {
      max = times[i];
    }

  }
  var histogramWidth = 150;
  var step = histogramWidth / max;


  for (var p = 0; p < times.length; p++) {
    if (names[p] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(barX + barIndent * p, barY, barWidth, times[p] * step * (-1));
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + (Math.random() + 0.4) / 2 + ')';
      ctx.fillRect(barX + barIndent * p, barY, barWidth, times[p] * step * (-1));
    }

  }
  for (var n = 0; n < times.length; n++) {
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.font = '14px PT Mono';
    ctx.fillText(names[n], barX + barIndent * n, barY + barMargin);
    ctx.fillText(Math.floor(times[n]), barX + barIndent * n, barY - (times[n] * step) - barMargin);
  }
};
