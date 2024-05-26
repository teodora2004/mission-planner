import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Point } from 'src/app/shared/interfaces';
import { MatTableModule } from '@angular/material/table';

const customImports = [CommonModule, MatTableModule];

@Component({
  selector: 'app-point-list',
  standalone: true,
  imports: [customImports],
  templateUrl: './point-list.component.html',
  styleUrls: ['./point-list.component.scss'],
})
export class PointListComponent {
  @Input() points: Point[] = [];

  public displayedColumns: string[] = ['number', 'name', 'x', 'y'];
}
