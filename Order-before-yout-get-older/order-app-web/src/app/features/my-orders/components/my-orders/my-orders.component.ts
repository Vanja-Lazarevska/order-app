import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { ExampleFlatNode, OrderNode } from 'src/app/shared/interfaces/order.interface';
import { map } from 'rxjs';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})

export class MyOrdersComponent implements OnInit  {
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );
  private _transformer = (node: OrderNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  constructor(private readonly ordersService: OrdersService ){
}
  ngOnInit(): void {
    this.ordersService.getOrders().pipe(map(data => {
      const order_tree_data = data.map((eachOrder)=> {
        return{
         name: `${eachOrder.shipping}, ordered on: ${eachOrder.timeOfOrder}`, 
         children: eachOrder.products.map((product)=> {return {name: product.name}}) 
        }
       })
       return order_tree_data
    })).subscribe((data)=>this.dataSource.data = data)
  }
  
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}

