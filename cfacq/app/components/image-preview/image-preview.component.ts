import {
  AfterViewInit, ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter, HostListener,
  Input,
  OnChanges,
  Output, SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'app-image-preview',
  template: `
    <div class="image-preview">
      <canvas #canvas (mousedown)="onMouseDown($event)" (mousemove)="onMouseMove($event)" (mouseup)="onMouseUp($event)"
              (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)" (touchend)="onTouchEnd($event)"
              [hidden]="img === null"></canvas>
      <div class="noImage" *ngIf="img === 'error'"></div>
    </div>`,
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent implements AfterViewInit, OnChanges {
  @Input() img: any;
  @Input() imagelink: string;
  @Input() visible: boolean;
  @Input() canResizeContour: boolean;

  @Output() getImage = new EventEmitter();
  @Output() imageLoaded = new EventEmitter();

  @ViewChild('canvas', {read: ViewContainerRef}) canvasRef: any;
  canvas: any;
  context: any;

  private zoom = 1;
  private zoomStart: number;
  private initZoom = 1;
  position: any;
  offset: any;
  moving: boolean;
  zooming: boolean;
  lastX: number;
  lastY: number;
  initDistance: number;

  loaded = false;

  zoomInverse = 1;
  scaleFactor = 1.1;
  MAX_ZOOM = 3;
  DISTANCE_CLICKS_ZOOM = 20;
  originalWidth: number;
  width: number;
  height: number;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.canvas = this.canvasRef.element.nativeElement;
    this.canvas.width = this.el.nativeElement.children[0].offsetWidth;
    this.canvas.height = this.el.nativeElement.children[0].offsetHeight;
    console.log(this.el.nativeElement.children[0].offsetHeight);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['img']) {
      if (this.canvas) {
        this.canvas.width = this.el.nativeElement.children[0].offsetWidth;
        this.canvas.height = this.el.nativeElement.children[0].offsetHeight;
      }

      if (this.img && this.canvas) {
        this.loaded = true;
        this.zoom = 1;
        this.initZoom = 1;

        if (!this.canvas) {
          this.canvas = this.canvasRef.element.nativeElement;
        }

        this.offset = {
          x: this.canvas.width / 2,
          y: this.canvas.height / 2
        };

        this.originalWidth = this.el.nativeElement.children[0].offsetWidth;
        this.width = this.originalWidth;
        this.canvas.width = this.originalWidth;
        this.canvas.height = this.el.nativeElement.children[0].offsetHeight;

        this.context = this.canvas.getContext('2d');
        this.trackTransforms(this.context);

        if (this.img.width > this.canvas.width) {
          this.initZoom = this.canvas.width / this.img.width;
        }

        if (this.initZoom * this.img.height > this.canvas.height) {
          this.initZoom = this.canvas.height / this.img.height;
        }

        this.onZoom(Math.log(this.initZoom) / Math.log(this.scaleFactor), true);
      }
    } else if (this.context) {
      if (changes['visible']) {
        this.redraw();
      }
    }
  }

  afterLoadComplete() {
    this.loaded = true;
  }

  public resetZoom() {
    this.width = this.originalWidth;
    this.zoom = 1;
    this.initZoom = 1;
    this.context = this.canvas.getContext('2d');
    this.trackTransforms(this.context);

    if (this.canvas && this.context && this.img) {
      if (this.img.width > this.canvas.width) {
        this.initZoom = this.canvas.width / this.img.width;
      }

      if (this.initZoom * this.img.height > this.canvas.height) {
        this.initZoom = this.canvas.height / this.img.height;
      }

      this.onZoom(Math.log(this.initZoom) / Math.log(this.scaleFactor), true);
    }
  }

  @HostListener('window:resize', ['$event.target'])
  onResize() {
    if (this.canvas) {
      this.canvas.width = this.el.nativeElement.offsetWidth;
      this.canvas.height = this.el.nativeElement.offsetHeight;
      this.context = this.canvas.getContext('2d');
      this.trackTransforms(this.context);
      this.context.scale(this.zoom, this.zoom);
      this.redraw();
    }
  }

  onMouseDown(e: any) {
    e.preventDefault();
    this.moving = true;
    const bounds = this.getPosition();
    this.lastX = e.pageX - bounds.left;
    this.lastY = e.pageY - bounds.top;
  }

  onMouseMove(e: any) {
    const bounds = this.getPosition();
    if (this.moving) {
      this.panImage(e.pageX - bounds.left, e.pageY - bounds.top);
    } else {
      this.lastX = e.pageX - bounds.left;
      this.lastY = e.pageY - bounds.top;
    }
  }

  onMouseUp() {
    if (this.img) {
      this.moving = false;
      this.redraw();
    }
  }

  onTouchStart(e: any) {
    e.stopPropagation();
    const bounds = this.getPosition();
    if (e.touches.length === 1) {
      this.lastX = e.touches[0].pageX - bounds.left;
      this.lastY = e.touches[0].pageY - bounds.top;
      this.moving = true;
      this.zooming = false;
    } else if (e.touches.length === 2) {
      this.moving = false;
      this.zooming = true;
      this.zoomStart = this.zoom;
      this.initDistance = this.getDistanceBetweenPoints(e.touches);
      this.lastX = (e.touches[0].pageX - bounds.left) / 2 + (e.touches[1].pageX - bounds.left) / 2;
      this.lastY = (e.touches[0].pageY - bounds.top) / 2 + (e.touches[1].pageY - bounds.top) / 2;
    } else {
      this.moving = false;
      this.zooming = false;
    }
  }

  onTouchMove(e: any) {
    if (this.moving) {
      e.preventDefault();
      const bounds = this.getPosition();
      this.panImage(e.touches[0].pageX - bounds.left, e.touches[0].pageY - bounds.top);
    } else if (this.zooming) {
      e.preventDefault();
      this.zoomImage(e.touches);
    }
  }

  onTouchEnd(e: any) {
    if (e.touches.length === 0) {
      this.moving = false;
      this.zooming = false;
    } else if (e.touches.length === 1) {
      this.lastX = e.touches[0].pageX;
      this.lastY = e.touches[0].pageY;
      this.moving = true;
      this.zooming = false;
    } else if (e.touches.length === 2) {
      this.moving = false;
      this.zooming = true;
    }
    this.redraw();
  }

  private redraw() {
    if (this.img && this.loaded && this.context && this.offset && this.img !== 'error') {
      const p1 = this.context.transformedPoint(0, 0);
      const p2 = this.context.transformedPoint(this.canvas.width, this.canvas.height);
      if (p1 && p2) {
        this.context.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

        this.context.save();
        const p = this.context.transformedPoint(this.offset.x, this.offset.y);
        this.context.translate(p.x, p.y);
        this.context.drawImage(this.img, -(this.img.width / 2), -(this.img.height / 2), this.img.width, this.img.height);

        this.context.translate(-(this.img.width / 2), -(this.img.height / 2));

        this.context.restore();
      }
    }
  }

  private onScroll(event: any) {
    const e = window.event || event; // old IE support
    const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    if (delta && ((delta > 0 && this.zoom < this.MAX_ZOOM) || (delta < 0 && this.zoom > this.initZoom))) {
      this.onZoom(delta, false);
    }
    // for IE
    e.returnValue = false;
    // for Chrome and Firefox
    if (e.preventDefault) {
      e.preventDefault();
    }
  }

  private panImage(x: number, y: number) {
    if (this.offset) {
      this.offset.x += x - this.lastX;
      this.offset.y += y - this.lastY;

      this.lastX = x;
      this.lastY = y;

      this.redraw();
    }
  }

  private zoomImage(points: any) {
    const distance = this.getDistanceBetweenPoints(points);
    const clicks = distance - this.initDistance;

    const factor = Math.pow(this.scaleFactor, clicks / this.DISTANCE_CLICKS_ZOOM);
    const width = this.width * factor;

    const z = width / this.originalWidth;
    if (z < this.MAX_ZOOM && z > this.initZoom) {
      this.initDistance = distance;
      this.onZoom(clicks / this.DISTANCE_CLICKS_ZOOM, false);
    }
  }

  private getDistanceBetweenPoints(points: any) {
    const a = points[0].pageX - points[1].pageX;
    const b = points[0].pageY - points[1].pageY;
    return Math.sqrt(a * a + b * b);
  }

  private onZoom(clicks: number, skipTranslate?: boolean) {
    if (this.img) {
      let pt;
      if (!skipTranslate) {
        pt = this.context.transformedPoint(this.lastX, this.lastY);
        this.context.translate(pt.x, pt.y);
      }
      const factor = Math.pow(this.scaleFactor, clicks);
      this.width *= factor;

      this.zoom = this.width / this.originalWidth;
      this.zoomInverse = this.originalWidth / this.width;

      this.context.scale(factor, factor);
      if (!skipTranslate) {
        this.context.translate(-pt.x, -pt.y);

        const x = (this.lastX - this.offset.x) * factor - (this.lastX - this.offset.x);
        const y = (this.lastY - this.offset.y) * factor - (this.lastY - this.offset.y);

        this.offset.x = this.offset.x - x;
        this.offset.y = this.offset.y - y;
      }

      this.redraw();
    }
  }

  getPosition() {
    return this.el.nativeElement.getBoundingClientRect();
  }

  trackTransforms(ctx: any) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let xform = svg.createSVGMatrix();
    ctx.getTransform = function () {
      return xform;
    };

    const savedTransforms: any[] = [];
    const save = ctx.save;
    ctx.save = function () {
      if (xform) {
        savedTransforms.push(xform.translate(0, 0));
        return save.call(ctx);
      }
    };
    const restore = ctx.restore;
    ctx.restore = function () {
      if (xform) {
        xform = savedTransforms.pop();
        return restore.call(ctx);
      }
    };

    const scale = ctx.scale;
    ctx.scale = function (sx: number, sy: number) {
      if (xform) {
        xform = (<any>xform).scaleNonUniform(sx, sy);
        return scale.call(ctx, sx, sy);
      }
    };
    const rotate = ctx.rotate;
    ctx.rotate = function (radians: number) {
      if (xform) {
        xform = xform.rotate(radians * 180 / Math.PI);
        return rotate.call(ctx, radians);
      }
    };
    const translate = ctx.translate;
    ctx.translate = function (dx: number, dy: number) {
      if (xform) {
        xform = xform.translate(dx, dy);
        return translate.call(ctx, dx, dy);
      }
    };
    const transform = ctx.transform;
    ctx.transform = function (a: number, b: number, c: number, d: number, e: number, f: number) {
      if (xform) {
        const m2 = svg.createSVGMatrix();
        m2.a = a;
        m2.b = b;
        m2.c = c;
        m2.d = d;
        m2.e = e;
        m2.f = f;
        xform = xform.multiply(m2);
        return transform.call(ctx, a, b, c, d, e, f);
      }
    };
    const setTransform = ctx.setTransform;
    ctx.setTransform = function (a: number, b: number, c: number, d: number, e: number, f: number) {
      if (xform) {
        xform.a = a;
        xform.b = b;
        xform.c = c;
        xform.d = d;
        xform.e = e;
        xform.f = f;
        return setTransform.call(ctx, a, b, c, d, e, f);
      }
    };
    const pt = svg.createSVGPoint();
    ctx.transformedPoint = function (x: number, y: number) {
      if (xform) {
        pt.x = x;
        pt.y = y;
        try {
          return pt.matrixTransform(xform.inverse());
        } catch (e) {
        }
      }
    };
  }
}
