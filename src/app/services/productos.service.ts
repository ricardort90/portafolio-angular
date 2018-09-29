import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/Producto.interafaces';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProducto();
   }

  private cargarProducto() {

    this.http.get('https://angular-html-c5ad9.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[] ) => {

        console.log(resp);
        this.productos = resp;
        setTimeout(()=>{
          this.cargando = false;
        },2000);
      });
  }
}
