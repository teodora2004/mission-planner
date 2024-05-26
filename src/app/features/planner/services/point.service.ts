import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Point } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PointService {
  private apiUrl = `${environment.apiUrl}/points`;

  constructor(private http: HttpClient) { }

  public getPoints(): Observable<Point[]> {
    return this.http.get<Point[]>(this.apiUrl);
  }

  public addPoint(point: Point): Observable<Point> {
    return this.http.post<Point>(this.apiUrl, point);
  }
}
