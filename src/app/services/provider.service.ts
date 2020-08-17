import { Injectable } from '@angular/core';
/* import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ASC } from 'src/app/constants/queries';
import { createPageHttp } from 'src/app/utils/request';

import { environment } from 'src/environments/environment';
import { ProviderDetails, Provider } from 'src/app/interfaces/provider.interface';

import { ListResponse, Paginator } from 'src/app/interfaces/paginator.interface'; */

import { ASC } from '../constants/queries';
import { Provider } from '../interfaces/provider.interface';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  constructor() { }
  /* private http: HttpClient */
  /* createProvider(data: any, cityId: string): Observable<any> {
    return this.http.post(
      `${environment.BACK_ENDPOINT}/provider?city_id=${cityId}`,
      data
    );
  } */

  /* getProviders(page, order = 'id', orderBy = ASC, limit = 10): Observable<Paginator> {
    const params = createPageHttp({ page, order, orderBy, limit});
    return this.http
      .get<ListResponse>(`${environment.BACK_ENDPOINT}/provider`, { params })
      .pipe(
        map(({ content, ...paginator }) => ({
          data: content as Provider[],
          dataPaginator: paginator
        }))
      );
  } */
  // TODO borrar dummy
  getProviders(page = 0, order = 0, orderBy = ASC, limit = 10): Provider[] {
    let p1: Provider = {id: 1, name: 'PROVEEDOR 1 AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA SSSSSSSSSSSS', city: 'BOGOTA D.C.', address: 'CARRERA 50 39 32 38', active: true};
    let p2: Provider = {id: 2, name: 'PROVEEDOR 2', city: 'BOGOTA D.C.', address: 'CARRERA 50 39 32 38', active: false};
    let p3: Provider = {id: 3, name: 'PROVEEDOR 3', city: 'BOGOTA D.C.', address: 'CARRERA 50 39 32 38', active: true};

    return  [p1, p2, p3];
  }


   toggleProvider(id: number) {
    /*return this.http.put(
      `${environment.BACK_ENDPOINT}/provider/active/${id}`,
      {}
    );*/
  } 

  /* getProviderProfile(id: string): Observable<ProviderDetails> {
    return this.http.get<ProviderDetails>(
      `${environment.BACK_ENDPOINT}/provider/${id}`
    );
  } */

 /*  putProviderProfile(data, cityId) {
    return this.http.put(
      `${environment.BACK_ENDPOINT}/provider?city_id=${cityId}`,
      data
    );
  } */
}
