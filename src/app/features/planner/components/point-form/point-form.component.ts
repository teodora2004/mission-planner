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
import { environment } from 'src/environments/environment';
import { canvasBoundsValidator } from '@shared/custom-validators';

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
  private maxWidth: number = environment.canvasBounds.width || 900;
  private maxHeight: number = environment.canvasBounds.height || 600;

  public pointForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    x: ['', [Validators.required, Validators.pattern(/^-?\d+$/), canvasBoundsValidator(this.maxWidth)]],
    y: ['', [Validators.required, Validators.pattern(/^-?\d+$/), canvasBoundsValidator(this.maxHeight)]],
  });

  constructor(private fb: FormBuilder) {}

  public submitForm(): void {
    if (this.pointForm.valid) {
      this.pointAdded.emit(this.pointForm.value);
      this.pointForm.reset();
    }
  }

  public getErrorMessage(controlName: string): string {
    const control = this.pointForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('pattern')) {
      return 'Please enter a valid number';
    }
    if (control?.hasError('outOfBounds')) {
      return 'Point exceeds canvas bounds';
    }
    return '';
  }
}
