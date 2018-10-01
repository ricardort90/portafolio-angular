import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/Producto.interafaces';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  producFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProducto();
   }

  private cargarProducto() {

    return new Promise( ( resolve, reject ) => {
        this.http.get('https://angular-html-c5ad9.firebaseio.com/productos_idx.json')
        .subscribe( (resp: Producto[] ) => {
          this.productos = resp;
          setTimeout(()=>{
            this.cargando = false;
          },1000);
          resolve();
        });
    });
    
  }

  getProducto( id: string ) {

    return this.http.get( `https://angular-html-c5ad9.firebaseio.com/productos/${ id }.json`);
    
  }

  buscarProducto( termino: string ){
    if ( this.productos.length === 0) {
      //cargar producto
      this.cargarProducto().then(()=>{
        //despues de obtener productos
        this.filtrarProducto( termino );
      })
    }else{
      //aplicar filtro
      this.filtrarProducto( termino );
    }
  }

  private filtrarProducto ( termino: string ){

    this.producFiltrado = [];
    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();
      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0) {
        this.producFiltrado.push( prod );
        console.log( prod );
      }
    });
  }
}
