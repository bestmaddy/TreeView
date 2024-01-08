import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreeServiceService {
  menu!: Menu;
  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<any[]> {
    const data = this.httpClient.get<any[]>("http://49.249.110.2:8050/api/MenuMasters/GetMenuMasterList/173")
      .pipe(
        catchError(this.errorHandler)
      );
    return data
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
export class Menu {
  status: boolean = true;
  data!: [
    {
      id: number;
      refGroup: number;
      name: string;
      objectName: string;
      refMenuId: number;
      orderNum: number;
      type: string;
      menuPath: string;
      remarks: string;
      isActive: boolean;
      entDate: Date;
      entUser: string;
      entTerm: string;
      updDate: Date;
      updUser: string;
      updTerm: string;
      menuIcon: string;
      refGroupNavigation: string;
      tblRoleWiseMenu: [];
    }];
}
