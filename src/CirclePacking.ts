import { pSBC } from "./utils/colors.js";
import { randomIntFromInterval } from "./utils/numbers.js";

type Circle = {
  x: number;
  y: number;
  radius: number;
};

type CirclePackingConstructor = {
  canvas: HTMLCanvasElement | null;
  minRadius: number;
  maxRadius: number;
  totalCircles: number;
  intersection: number;
  colorRange: number[];
};

class CirclePacking {
  circles: Circle[] = [];
  createCircleAttempts = 500;
  minRadius = 0;
  maxRadius = 0;
  totalCircles = 0;
  intersection = 0;
  colorRange = [0, 0];

  size = 0;
  context: CanvasRenderingContext2D | null;

  backgroundColor = "#0b053d";
  primaryColor = "rgba(255, 203, 244, 0.8)";

  constructor({
    canvas,
    minRadius,
    maxRadius,
    totalCircles,
    intersection,
    colorRange,
  }: CirclePackingConstructor) {
    if (!canvas) {
      throw "CirclePacking needs a canvas";
    }

    this.minRadius = minRadius;
    this.maxRadius = maxRadius;
    this.totalCircles = totalCircles;
    this.intersection = intersection;
    this.colorRange = colorRange;

    this.context = canvas.getContext("2d");

    if (!this.context) {
      throw "Context is null";
    }

    this.size = window.innerWidth;
    const dpr = window.devicePixelRatio;

    canvas.width = this.size * dpr;
    canvas.height = this.size * dpr;

    this.context.scale(dpr, dpr);
    this.context.lineWidth = 2;

    this.clear();
    this.begin();
  }

  clear() {
    if (!this.context) {
      throw "Context is null";
    }
    const canvas = this.context.canvas;
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    this.context.fillStyle = this.backgroundColor;
    this.context.fillRect(0, 0, canvas.width, canvas.height);
    this.circles = [];
  }

  begin() {
    for (let i = 0; i < this.totalCircles; i++) {
      this.createAndDrawCircle();
    }
  }

  update({
    minRadius,
    maxRadius,
    totalCircles,
    intersection,
    colorRange,
  }: Omit<CirclePackingConstructor, "canvas">) {
    this.minRadius = minRadius;
    this.maxRadius = maxRadius;
    this.totalCircles = totalCircles;
    this.intersection = intersection;
    this.colorRange = colorRange;

    this.clear();
    this.begin();
  }

  createAndDrawCircle() {
    if (!this.context) {
      throw "Context is null";
    }

    let newCircle: Circle = {
      x: Math.floor(Math.random() * this.size),
      y: Math.floor(Math.random() * this.size),
      radius: this.minRadius,
    };
    let circleSafeToDraw = false;

    // Find a good sport to draw a circle
    for (let tries = 0; tries < this.createCircleAttempts; tries++) {
      newCircle = {
        x: Math.floor(Math.random() * this.size),
        y: Math.floor(Math.random() * this.size),
        radius: this.minRadius,
      };

      if (this.doesCircleHaveACollision(newCircle)) {
        continue;
      } else {
        circleSafeToDraw = true;
        break;
      }
    }

    if (!circleSafeToDraw) {
      return;
    }

    for (
      let radiusSize = this.minRadius;
      radiusSize < this.maxRadius;
      radiusSize++
    ) {
      newCircle.radius = radiusSize;
      if (this.doesCircleHaveACollision(newCircle)) {
        newCircle.radius--;
        break;
      }
    }

    this.circles.push(newCircle);
    this.context.beginPath();
    this.context.arc(
      newCircle.x,
      newCircle.y,
      newCircle.radius,
      0,
      2 * Math.PI
    );
    this.context.fillStyle =
      pSBC(
        randomIntFromInterval(this.colorRange[0], this.colorRange[1]),
        this.primaryColor
      ) || this.primaryColor;
    this.context.fill();
  }

  doesCircleHaveACollision(circle: Circle): boolean {
    const padding = Math.random() * (this.size / 6);

    // Check collision with other circles
    for (let i = 0; i < this.circles.length; i++) {
      const otherCircle = this.circles[i];
      const a = circle.radius + otherCircle.radius;
      const x = circle.x - otherCircle.x;
      const y = circle.y - otherCircle.y;
      const intersection = otherCircle.radius * this.intersection;

      if (a >= Math.sqrt(x * x + y * y) + intersection) {
        return true;
      }
    }

    // Check if circle is touching canvas borders Y
    if (
      circle.x + circle.radius >= this.size - padding ||
      circle.x - circle.radius <= padding
    ) {
      return true;
    }

    // Check if circle is touching canvas borders X
    if (
      circle.y + circle.radius >= this.size - padding ||
      circle.y - circle.radius <= padding
    ) {
      return true;
    }

    return false;
  }
}

export default CirclePacking;
