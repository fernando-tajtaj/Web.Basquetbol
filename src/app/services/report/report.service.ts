import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../global';
import { ReportBaseDto } from '../../models/dto/report/report-base-dto';
import { ReportInfoDto } from '../../models/dto/report/report-info-dto';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private url: string = Global.url + '/report';

  constructor(private http: HttpClient) {}

  getAll(params: Record<string, string> = {}): Observable<ReportBaseDto[]> {
    let httpParams = new HttpParams();
    Object.keys(params || {}).forEach((k) => {
      if (params[k] !== undefined && params[k] !== null && params[k] !== '') {
        httpParams = httpParams.set(k, params[k]);
      }
    });

    return this.http.get<ReportBaseDto[]>(`${this.url}`, { params: httpParams });
  }

  getById(uuid: string): Observable<ReportInfoDto> {
    return this.http.get<ReportInfoDto>(`${this.url}/${uuid}`);
  }
}
