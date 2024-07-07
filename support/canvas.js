import sinon from 'sinon';

const context2dProperties = [
  'direction',
  'fillStyle',
  'filter',
  'font',
  'fontKerning',
  'fontStretch',
  'fontVariantCaps',
  'globalAlpha',
  'globalCompositeOperation',
  'imageSmoothingEnabled',
  'imageSmoothingQuality',
  'letterSpacing',
  'lineCap',
  'lineDashOffset',
  'lineJoin',
  'lineWidth',
  'miterLimit',
  'shadowBlur',
  'shadowColor',
  'shadowOffsetX',
  'shadowOffsetY',
  'strokeStyle',
  'textAlign',
  'textBaseline',
  'textRendering',
  'wordSpacing',
];

const context2dMethods = [
  'arc',
  'arcTo',
  'beginPath',
  'bezierCurveTo',
  'clearRect',
  'clip',
  'closePath',
  'createImageData',
  'createLinearGardient',
  'createPattern',
  'createRadialGradient',
  'drawFocusIfNeeded',
  'drawImage',
  'ellipse',
  'fill',
  'fillRect',
  'fillText',
  'getImageData',
  'getLineDash',
  'getTransform',
  'isPointInPath',
  'isPointInStroke',
  'lineTo',
  'measureText',
  'moveTo',
  'putImageData',
  'quadraticCurveTo',
  'rect',
  'restore',
  'rotate',
  'save',
  'scale',
  'setLineDash',
  'setTransform',
  'stroke',
  'strokeRect',
  'strokeText',
  'transform',
  'translate',
];

class CanvasContext2d {
  constructor(canvas) {
    this.canvas = canvas;

    context2dMethods
      .forEach((name) => {
        this[name] = sinon.fake();
      });

    context2dProperties
      .forEach((name) => {
        this[name] = null;
      });
  }
}

class Canvas {
  constructor() {
    this._context2d = new CanvasContext2d(this);
    this.width = 640;
    this.height = 480;
  }

  getContext(_type) {
    return this._context2d;
  }
}

export {
  Canvas,
  CanvasContext2d,
};
