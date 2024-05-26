import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Point } from '@shared/interfaces';
import { CommonModule } from '@angular/common';

const customImports = [CommonModule, MatListModule];

@Component({
  selector: 'app-legend-player',
  standalone: true,
  imports: customImports,
  templateUrl: './legend-player.component.html',
  styleUrls: ['./legend-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegendPlayerComponent {
  @Input() points: Point[] = [];
}
