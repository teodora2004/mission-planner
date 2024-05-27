import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { barOptions, repoUrl } from './constants';

const CustomBarInputs = [
  CommonModule,
  BrowserModule,
  BrowserAnimationsModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  RouterModule,
];

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [CustomBarInputs],
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent {
  public barOptions = barOptions;
  private repoUrl = repoUrl;

  constructor(private router: Router) {}

  public navigate(path: string) {
    this.router.navigate([path]);
  }

  public openRepoLink() {
    window.open(this.repoUrl, '_blank');
  }
}
