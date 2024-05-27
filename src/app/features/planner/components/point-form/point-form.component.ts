import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Point } from 'src/app/shared/interfaces';

const customImports = [
  CommonModule,
  ReactiveFormsModule,
  MatInputModule,
  MatButtonModule,
];

@Component({
  selector: 'app-point-form',
  standalone: true,
  imports: [customImports],
  templateUrl: './point-form.component.html',
  styleUrls: ['./point-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PointFormComponent {
  @Output() pointAdded = new EventEmitter<Point>();

  public pointForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    x: ['', [Validators.required, Validators.pattern(/^-?\d+$/)]],
    y: ['', [Validators.required, Validators.pattern(/^-?\d+$/)]],
  });

  constructor(private fb: FormBuilder) {}

  public submitForm(): void {
    if (this.pointForm.valid) {
      this.pointAdded.emit(this.pointForm.value);
      this.pointForm.reset();
    }
  }
}
