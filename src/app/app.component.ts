import LiferayParams from '../types/LiferayParams'

import { Component, OnInit } from '@angular/core';
import { ProviderService } from './services/provider.service';
import { map } from 'rxjs/operators';
import { ASC, DESC } from './constants/queries';
import { Provider, ProviderDetails } from './interfaces/provider.interface';
import { DataPaginator } from './interfaces/paginator.interface';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
//import { SCOPES } from './constants/auth';
import { HEADERS_BEHAVIOR } from './constants/provider-constants';
//import { Auth0Service } from './services/auth0.service';
//import { ROUTES } from './constants/routes';
import { ProviderReturnHistoryService } from './services/provider-return-history.service';
import { FormGroup, FormBuilder } from '@angular/forms';

declare const Liferay: any;

@Component({
//	selector: 'app-root',
	templateUrl: 
		Liferay.ThemeDisplay.getPathContext() + 
		'/o/mkpl-provider/app/app.component.html'
})

export class AppComponent implements OnInit {
  
  subsidiaryId: number;
  providers: Provider[];
  info: ProviderDetails;
  orderBy = true;
  order = 'id';
  $paginator: Observable<any>;
  paginator: DataPaginator;
  totalProviders = 0;
  canEdit = false;
  canCreate = false;
  canUpdateStatus = false;
  canViewDetail = false;
  tableInfo: Array<{ label: string; id: string; sortable: boolean }>;
  limit = 10;
  page = 0;
  selectForm: FormGroup;
  // TODO se cambian nombres con guión bajo
  paginatorData: { 
    number: number; 
    size: number; 
    total_elements: number; 
    sort: string; 
    last: boolean; 
    number_of_elements: number; 
    total_pages: number; 
    first: boolean;
  };

  

  elementNumber = [
    { value: 10, display: '10 elementos' },
    { value: 20, display: '20 elementos' },
    { value: 30, display: '30 elementos' },
    { value: 50, display: '50 elementos' },
    { value: 100, display: '100 elementos' },
  ];

  constructor(
	  private providerService: ProviderService,
            private providerHistoryService: ProviderReturnHistoryService,
	          private fb: FormBuilder
	  ) { }

  ngOnInit(): void {
   /*  this.authService.getScopes().subscribe(scopes => {
      this.canEdit = scopes.includes(SCOPES.updateProvider);
      this.canCreate = scopes.includes(SCOPES.createProvider);
      this.canUpdateStatus = scopes.includes(SCOPES.updateProviderStatus);
      this.canViewDetail = scopes.includes(SCOPES.readProvider);
    }); */
    this.setNewPage(1, this.limit, 'id');
	this.tableInfo = HEADERS_BEHAVIOR;
	
	/* this.providers = this.providerService.getProviders(this.subsidiaryId, 0, ''); */

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
	  //this.paginator = this.providerService.getProviders(this.subsidiaryId);
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

    this.providerService.getProviders(page = 0, order, orderBy, limit)
      .pipe(map(({ data, ...paginatorData }) => {
        return{
          providers: data,
          paginatorData
        };
      })).subscribe(({ providers, paginatorData})=>{
        this.totalProviders = paginatorData.total_elements;
        this.providers = providers;
        this.paginatorData = paginatorData;
        
      })
  }

  currentPageChange($event: number) {
    this.page = $event;
    this.setNewPage($event, this.limit);
  }

  handleOrder(id:any) {
    this.order = id;
    this.orderBy = !this.orderBy;
    this.setNewPage(0, this.limit, this.order);
  }

  goToCreate() {
  //  localStorage.setItem('providerExist', `${!!this.providers.length}`);
   // this.router.navigate([`${ROUTES.providers}/create`]);
  }

  newValue(newValue: number) {
    this.limit = newValue;
    this.setNewPage(0, this.limit);
  }

  saveFilters() {
    this.providerHistoryService.savefilters(this.page, this.limit, this.orderBy, this.order);
  }
  /* getProviders() {
	  this.providers = this.providerService.getProviders(this.subsidiaryId, 0, '');
  }   */
  
  tranformData(providerM: Provider[]) {
    return providerM.map( (provedor: any) => ({
      id: provedor.number,
      name: provedor.string,
      city: provedor.string,
      address: provedor.string,
      active: provedor.boolean
    }));
  }
}