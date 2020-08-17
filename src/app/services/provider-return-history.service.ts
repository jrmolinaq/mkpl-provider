import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProviderReturnHistoryService {

  constructor() { }

  private saved = false;
  private pageNumber: number;
  private limit: number;
  private orderBy: boolean;
  private order: string;

  savefilters( pageNumber: number, limit: number, orderBy: boolean, order: string) {
    this.saved = true;
    this.pageNumber = pageNumber;
    this.limit = limit;
    this.orderBy = orderBy;
    this.order = order;
  }

  getFilters(): any[] {
    const res = [this.saved, this.pageNumber, this.limit, this.orderBy, this.order];
    this.saved = false;
    return res;
  }

}
