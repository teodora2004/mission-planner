import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { PointListComponent } from '../point-list/point-list.component';
import { PointFormComponent } from '../point-form/point-form.component';
import { PointService } from 'src/app/shared/services/point.service';
import { PaginationOptions, Point } from 'src/app/shared/interfaces';
import { PageEvent } from '@angular/material/paginator';

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
export class PlannerComponent implements OnInit, OnDestroy {
  public points: Point[] = [];
  private destroy$ = new Subject<void>();

  public pageIndex = PaginationOptions.PageIndex;
  public pageSize = PaginationOptions.PageSize;
  public totalPoints = 0;

  constructor(private pointService: PointService) {}

  ngOnInit(): void {
    this.loadPoints();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadPoints(): void {
    this.pointService
      .getPoints(this.pageIndex + 1, this.pageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.points = response.data;
          this.totalPoints = response.items;
        },
        error: (err) => console.error('Error loading points:', err),
      });
  }

  public handlePointAdded(point: Point): void {
    this.pointService
      .addPoint(point)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.loadPoints(),
        error: (err) => console.error('Error adding point:', err),
      });
  }

  public handlePageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPoints();
  }
}
