import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layout/blank-layout/blank-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { BrandsComponent } from './features/brands/brands.component';
import { CartComponent } from './features/cart/cart.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { DetailsComponent } from './features/details/details.component';
import { HomeComponent } from './features/home/home.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import ProductsComponent from './features/products/products.component';
import { auhtGuard } from './core/guards/auht-guard';
import { tologinGuard } from './core/guards/tologin-guard';
import { AllordersComponent } from './features/allorders/allorders.component';

export const routes: Routes = [
    {path:'' ,redirectTo:'home',pathMatch:'full'},
    {path:'',component:AuthLayoutComponent, canActivate:[tologinGuard], children:[
        {path:'login', component:LoginComponent, title:'login'},
        {path:'register', component:RegisterComponent, title:'registerion'}
    ]},
    {path:'',component:BlankLayoutComponent,canActivate:[auhtGuard],  children:[
        {path:'home',component:HomeComponent, title:'home'},
        {path:'cart',component:CartComponent, title:'cart'},
        {path:'product',component:ProductsComponent, title:'products'},
        {path:'allorders',component:AllordersComponent, title:'allorders'},
        {path:'categories',component:CategoriesComponent, title:'categories'},
        {path:'brands',component:BrandsComponent, title:'brands'},
        {path:'checkout/:id',component:CheckoutComponent, title:'checkout'},
        {path:'details/:slug/:id',component:DetailsComponent, title:'details'},
    ]}, 
    {path:'**', component:NotfoundComponent, title:'404'},
]
