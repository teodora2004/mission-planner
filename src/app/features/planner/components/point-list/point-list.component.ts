import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Point } from 'src/app/shared/interfaces';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

const customImports = [CommonModule, MatTableModule, MatPaginatorModule];

@Component({
  selector: 'app-point-list',
  standalone: true,
  imports: customImports,
  templateUrl: './point-list.component.html',
  styleUrls: ['./point-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PointListComponent {
  @Input() points: Point[] = [];
  @Input() total = 0;
  @Output() pageChange = new EventEmitter<PageEvent>();

  public displayedColumns: string[] = ['number', 'name', 'x', 'y'];
  public pageSizeOptions: number[] = [5, 10, 20];

  public onPageChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }
}
