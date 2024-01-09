import { Component } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';

interface MenuNode {
  id: number;
  refGroup: number;
  name: string;
  objectName: string;
  refMenuId: number | null;
  children?: any[];
}
interface ExampleFlatNode {
  expandable: boolean;
  id: number;
  name: string;
  level: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TreeView';
  data!: any;
  treeData: any;
  private _transformer = (node: MenuNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      id: node.id,
      name: node.name,
      level: level,
    };
  };
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<any[]>("http://49.249.110.2:8050/api/MenuMasters/GetMenuMasterList/173")
      .pipe(
        catchError(this.errorHandler)
      ).subscribe(data => {
        this.data = data;
        console.log("data", this.data)
        this.TreeData(data);
      })
  }

  TreeData(data: any) {
    console.log("data", data)
    const treeData: MenuNode[] = data.data.map((item: MenuNode) => {
      const node: MenuNode = {
        id: item.id,
        refGroup: item.refGroup,
        name: item.name,
        objectName: item.objectName,
        refMenuId: item.refMenuId,
      };
      return node;
    });

    const tree = this.buildTree(treeData);
    this.dataSource.data = tree;
    console.log("data Source", this.dataSource)
  }

  buildTree(data: MenuNode[]): MenuNode[] {
    const tree: MenuNode[] = [];
    const map: { [key: number]: MenuNode } = {};

    data.forEach(node => {
      map[node.id] = { ...node, children: [] };
    });

    data.forEach(node => {
      if (node.refMenuId !== null) {
        map[node.refMenuId].children?.push(map[node.id]);
      } else {
        tree.push(map[node.id]);
      }
    });
    return tree;
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
  // hasChild = (_: number, node: MenuNode) => !!node.children && node.children.length > 0;
  hasChild = (_: number, node: any) => node.expandable;

}
