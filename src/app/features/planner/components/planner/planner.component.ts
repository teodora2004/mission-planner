import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Point } from '@shared/interfaces';
import { Observable, of } from 'rxjs';
import { PointService } from '@shared/services/point.service';
import { PointListComponent } from '../point-list/point-list.component';
import { PointFormComponent } from '../point-form/point-form.component';

const customImports = [
  CommonModule,
  HttpClientModule,
  PointListComponent,
  PointFormComponent,
];

const customProviders = [PointService];

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: customImports,
  providers: customProviders,
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
})
export class PlannerComponent implements OnInit {
  public points$: Observable<Point[]> = of([]);

  constructor(private pointService: PointService) {}

  ngOnInit(): void {
    this.loadPoints();
  }

  private loadPoints(): void {
    this.points$ = this.pointService.getPoints();
  }

  public handlePointAdded(point: Point): void {
    this.pointService.addPoint(point).subscribe(() => {
      this.loadPoints();
    });
  }
}
