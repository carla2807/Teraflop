import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsIndexComponent } from './components/products/products-index/products-index.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductsCreateComponent } from './components/products/products-create/products-create.component';
import { ProductsEditComponent } from './components/products/products-edit/products-edit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { ClienteIndexComponent } from './components/clientes/cliente-index/cliente-index.component';
import { ClienteCreateComponent } from './components/clientes/cliente-create/cliente-create.component';
import { ClienteEditComponent } from './components/clientes/cliente-edit/cliente-edit.component';
import { UserIndexComponent } from './components/users/user-index/user-index.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { VentaIndexComponent } from './components/ventas/venta-index/venta-index.component';
import { VentaCreateComponent } from './components/ventas/venta-create/venta-create.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReporteComponent } from './components/reportes/reporte/reporte.component';
import { VentaDetalleComponent } from './components/ventas/venta-detalle/venta-detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProductsIndexComponent,
    SidebarComponent,
    ProductsCreateComponent,
    ProductsEditComponent,
    ClienteIndexComponent,
    ClienteCreateComponent,
    ClienteEditComponent,
    UserIndexComponent,
    UserCreateComponent,
    UserEditComponent,
    VentaIndexComponent,
    VentaCreateComponent,
    ReporteComponent,
    VentaDetalleComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    routing,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
