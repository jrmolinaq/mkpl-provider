import { Component, OnInit } from '@angular/core';
import { ProviderService } from './services/provider.service';

import { ASC, DESC } from './constants/queries';
import {
  Provider,
  ProviderDetails
} from './interfaces/provider.interface';
import { Paginator } from './interfaces/paginator.interface';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SCOPES } from './constants/auth';
import { HEADERS_BEHAVIOR } from './constants/provider-constants';
import { ProviderReturnHistoryService } from './services/provider-return-history.service';
import { FormGroup, FormBuilder } from '@angular/forms';

declare const Liferay: any;

@Component({
	templateUrl: 
		Liferay.ThemeDisplay.getPathContext() + 
		'/o/mkpl-provider/app/app.component.html'
})
export class AppComponent implements OnInit {
  providers: Provider[];
  info: ProviderDetails;
  dataToPaginate: Paginator;
  orderBy = true;
  order = 'id';
  $paginator: Observable<Paginator>;
  totalProviders = 0;
  canEdit = false;
  canCreate = false;
  canUpdateStatus = false;
  canViewDetail = false;
  tableInfo: Array<{ label: string; id: string; sortable: boolean }>;
  limit = 10;
  page = 0;
  selectForm: FormGroup;

  elementNumber = [
    { value: 10, display: '10 elementos' },
    { value: 20, display: '20 elementos' },
    { value: 30, display: '30 elementos' },
    { value: 50, display: '50 elementos' },
    { value: 100, display: '100 elementos' },
  ];

  constructor(private providerService: ProviderService,
              private providerHistoryService: ProviderReturnHistoryService,
              private fb: FormBuilder) { }

  ngOnInit() {
      /* TODO traer permisos desde liferay
      this.canEdit = scopes.includes(SCOPES.updateProvider);
      this.canCreate = scopes.includes(SCOPES.createProvider);
      this.canUpdateStatus = scopes.includes(SCOPES.updateProviderStatus);
      this.canViewDetail = scopes.includes(SCOPES.readProvider);*/

      this.canEdit = true;
      this.canCreate = true;
      this.canUpdateStatus = true;
      this.canViewDetail = true;

    this.tableInfo = HEADERS_BEHAVIOR;

    const filters = this.providerHistoryService.getFilters();

    if ( filters[0] ) {
      this.page = filters[1];
      this.limit = filters[2];
      this.orderBy = filters[3];
      this.order = filters[4];
      this.setNewPage(this.page, this.limit);
    } else {
      this.page = 0;
      this.limit = 10;
      this.orderBy = true;
      this.order = 'id';
      this.setNewPage(0, this.limit);
    }
  }

  disableProvider(id: number) {
    this.providerService
      .toggleProvider(id)
      .subscribe(
        ({ id: elemId, active }: Provider) =>
          (this.providers = this.providers.map(elem =>
            elem.id === elemId ? { ...elem, active } : elem
          ))
      );
  }

  private setNewPage(page: number, limit: number, order = this.order) {
    this.selectForm = this.fb.group({
      selectControl: [this.limit]
    });

    const orderBy = this.orderBy ? ASC : DESC;

    this.$paginator = this.providerService
      .getProviders(page, order, orderBy, limit)
      .pipe(
        tap(({ data, dataPaginator }) => {
          this.totalProviders = dataPaginator.totalElements;
          this.providers = data as Provider[];
        })
      );
  }

  currentPageChange($event: number) {
    this.page = $event;
    this.setNewPage($event, this.limit);
  }

  handleOrder(id: string) {
    this.order = id;
    this.orderBy = !this.orderBy;
    this.setNewPage(0, this.limit, this.order);
  }

  newValue(newValue: number) {
    this.limit = newValue;
    this.setNewPage(0, this.limit);
  }

  saveFilters() {
    this.providerHistoryService.savefilters(this.page, this.limit, this.orderBy, this.order);
  }
}
