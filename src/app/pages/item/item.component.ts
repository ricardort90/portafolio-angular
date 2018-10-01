import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { DescProducto } from '../../interfaces/descProduvto.interfaces';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: DescProducto;
  id: string;
  
  constructor( private route: ActivatedRoute,
               public productoService: ProductosService) { }

  ngOnInit() {

    this.route.params
        .subscribe( parametos => {
          this.productoService.getProducto(parametos['id'])
          .subscribe( (producto: DescProducto ) => {
            this.id = parametos['id'];
            this.producto = producto;
            console.log(producto);
          });
        });
  }

}
