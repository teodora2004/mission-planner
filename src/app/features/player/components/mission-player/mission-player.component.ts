import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Point } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

const customInputs = [MatButtonModule, MatIconModule];

@Component({
  selector: 'app-mission-player',
  standalone: true,
  imports: customInputs,
  templateUrl: './mission-player.component.html',
  styleUrls: ['./mission-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissionPlayerComponent implements AfterViewInit, OnDestroy {
  @Input() points: Point[] = [];
  @ViewChild('mapCanvas', { static: true })
  mapCanvas!: ElementRef<HTMLCanvasElement>;

  public canvasWidth: number = environment.canvasBounds.width || 900;
  public canvasHeight: number = environment.canvasBounds.height || 600;

  private image!: HTMLImageElement;
  private animationId!: number;
  private isAnimating = false;
  private currentIndex = 0;
  private progress = 0;

  ngAfterViewInit(): void {
    this.draw();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
  }

  private draw(): void {
    this.image = new Image();
    this.image.src = '../../../assets/robot.png';
    this.image.onload = () => {
      this.drawPoints();
      if (this.isAnimating) {
        this.animate();
      }
    };
  }

  private drawPoints(): void {
    const canvas = this.mapCanvas.nativeElement;
    const context = canvas.getContext('2d');

    this.mapCanvas.nativeElement.width = this.canvasWidth;
    this.mapCanvas.nativeElement.height = this.canvasHeight;

    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#673AB7';

    this.points.forEach((point) => {
      const x = parseInt(point.x);
      const y = parseInt(point.y);

      // draw the point
      context.beginPath();
      context.arc(x, y, 10, 0, 2 * Math.PI);
      context.fill();
      context.closePath();

      // draw label for the point
      context.font = 'bold 20px serif';
      context.fillText(point.name, x + 15, y + 15);

      context.strokeStyle = 'gray';
      context.beginPath();

      // draw lines between the points
      for (let i = 0; i < this.points.length; i++) {
        const point = this.points[i];

        const x = parseInt(point.x);
        const y = parseInt(point.y);

        if (i === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }

      context.stroke();
    });
  }

  private animate(): void {
    const canvas = this.mapCanvas.nativeElement;
    const context = canvas.getContext('2d');

    if (!context || !this.image) return;

    const speed = 2;
    const imageWidth = 80;
    const imageHeight = 80;

    const moveToNextPoint = () => {
      const start = this.points[this.currentIndex];
      const end = this.points[this.currentIndex + 1];

      const startX = parseInt(start.x);
      const startY = parseInt(start.y);
      const endX = parseInt(end.x);
      const endY = parseInt(end.y);

      const distance = Math.hypot(endX - startX, endY - startY);
      const steps = distance / speed;

      const dx = (endX - startX) / steps;
      const dy = (endY - startY) / steps;

      const draw = () => {
        if (this.progress < steps) {
          this.progress++;

          const x = startX + dx * this.progress;
          const y = startY + dy * this.progress;

          context.clearRect(x, y, canvas.width, canvas.height);

          this.drawPoints();
          context.drawImage(
            this.image,
            x - imageWidth / 2,
            y - imageHeight / 2,
            imageWidth,
            imageHeight
          );

          this.animationId = requestAnimationFrame(draw);
        } else {
          this.currentIndex = (this.currentIndex + 1) % this.points.length;
          this.progress = 0;
          moveToNextPoint();
        }
      };
      draw();
    };
    moveToNextPoint();
  }

  public startAnimation() {
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.animate();
    }
  }

  public stopAnimation() {
    this.isAnimating = false;
    cancelAnimationFrame(this.animationId);
  }
}
