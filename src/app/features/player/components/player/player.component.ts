import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Point } from 'src/app/shared/interfaces';
import { HttpClientModule } from '@angular/common/http';
import { PointService } from 'src/app/shared/services/point.service';
import { Observable } from 'rxjs';
import { MissionPlayerComponent } from '../mission-player/mission-player.component';
import { LegendPlayerComponent } from '../legend-player/legend-player.component';

const customImports = [
  CommonModule,
  HttpClientModule,
  MissionPlayerComponent,
  LegendPlayerComponent
];

const customProviders = [PointService]

@Component({
  selector: 'app-player',
  standalone: true,
  providers: customProviders,
  imports: customImports,
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  public points$!: Observable<Point[]>;

  constructor(private pointService: PointService) {}

  ngOnInit(): void {
    this.points$ = this.pointService.getPoints();
  }
}
