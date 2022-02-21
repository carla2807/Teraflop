//Importo rutas
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsIndexComponent } from './components/products/products-index/products-index.component';
import { ProductsCreateComponent } from './components/products/products-create/products-create.component';
import { ProductsEditComponent } from './components/products/products-edit/products-edit.component';
import { ClienteIndexComponent } from './components/clientes/cliente-index/cliente-index.component';
import { ClienteCreateComponent } from './components/clientes/cliente-create/cliente-create.component';
import { ClienteEditComponent } from './components/clientes/cliente-edit/cliente-edit.component';
import { UserIndexComponent } from './components/users/user-index/user-index.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { VentaIndexComponent } from './components/ventas/venta-index/venta-index.component';
import { VentaCreateComponent } from './components/ventas/venta-create/venta-create.component';
import { ReporteComponent } from './components/reportes/reporte/reporte.component';

//Aca van las rutas
//primer path vacio porque es la raiz
const appRoute: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'products',
    component: ProductsIndexComponent,
  },
  {
    path: 'products/registrar',
    component: ProductsCreateComponent,
  },
  {
    path: 'products/editar/:id',
    component: ProductsEditComponent,
  },
  {
    path: 'clientes',
    component: ClienteIndexComponent,
  },
  {
    path: 'cliente/registrar',
    component: ClienteCreateComponent,
  },
  {
    path: 'cliente/editar/:id',
    component: ClienteEditComponent,
  },
  {
    path: 'usuarios',
    component: UserIndexComponent,
  },
  {
    path: 'usuarios/registrar',
    component: UserCreateComponent,
  },
  {
    path: 'usuario/editar/:id',
    component: UserEditComponent,
  },
  {
    path: 'ventas',
    component: VentaIndexComponent,
  },
  {
    path: 'ventas/:id',
    component: VentaCreateComponent,
  },
  {
    path: 'reportes',
    component: ReporteComponent,
  },
];
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
