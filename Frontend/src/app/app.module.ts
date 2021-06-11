import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PedidoComponent } from './Pedido/components/pedido.component';
import { ProdutoComponent } from './Produto/components/produto.component';
import { ClienteComponent } from './Cliente/components/cliente.component';
import { PedidoService } from './Pedido/service/pedido.service';
import { ProdutoService } from './Produto/service/produto.service';
import { ClienteService } from './Cliente/service/cliente.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    PedidoComponent,
    ProdutoComponent,
    ClienteComponent,
    NavBarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'clientes', component: ClienteComponent
      },
      {
        path: 'pedidos', component: PedidoComponent
      },
      {
        path: 'produtos', component: ProdutoComponent
      }
    ])
  ],
  providers: [HttpClientModule, PedidoService, ProdutoService, ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
