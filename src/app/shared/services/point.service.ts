import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { GetPointsResponse, Point } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PointService {
  private apiUrl = `${environment.apiUrl}/points`;

  constructor(private http: HttpClient) { }

  public getPoints(page: number, limit: number): Observable<GetPointsResponse> {
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_per_page', limit.toString());

    return this.http.get<GetPointsResponse>(this.apiUrl, { params }).pipe(
      map((response: GetPointsResponse) => {
        return { data: response.data || [], items: response.items };
      })
    );
  }

  public addPoint(point: Point): Observable<Point> {
    return this.http.post<Point>(this.apiUrl, point);
  }
}
