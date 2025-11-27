// src/app/features/admin/admin.routes.ts

import { Routes } from '@angular/router';
import { AdminComponentComponent } from './admin-component/admin-component.component';

// Export một hằng số chứa các routes
export const ADMIN_ROUTES: Routes = [
    {
        // Khi URL khớp với '/admin', nó sẽ tải layout này
        path: '',
        component: AdminComponentComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                // URL: /admin/dashboard
                path: 'dashboard',
                // Tải component dashboard
                loadComponent: () => import('./admin-component/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'product', loadComponent: () => import('./admin-component/product-management/product-management.component').then(m => m.ProductManagementComponent)

            },
            {
                path: 'ordersell', loadComponent: () => import('./admin-component/Inventory/ordersell/ordersell.component').then(m => m.OrdersellComponent)

            },
            {
                path: 'orderbuy', loadComponent: () => import('./admin-component/Inventory/orderbuy/orderbuy.component').then(m => m.OrderbuyComponent)

            },
            {
                path: 'trahang', loadComponent: () => import('./admin-component/Inventory/trahang/trahang.component').then(m => m.TrahangComponent)

            },
           
            {
                path: 'report', loadComponent: () => import('./admin-component/report/report.component').then(m => m.ReportComponent)
            },

            {
                path:"attributes", loadComponent: () => import('./admin-component/categories/attributes/attributes.component').then(m => m.AttributesComponent)    
            },
            {
                path:"colors", loadComponent: () => import('./admin-component/categories/colors/colors.component').then(m => m.ColorsComponent) 
            },
            {
                path:"origin", loadComponent: () => import('./admin-component/categories/origin/origin.component').then(m => m.OriginComponent) 
            },
            {
                path:"shelves", loadComponent: () => import('./admin-component/categories/shelves/shelves.component').then(m => m.ShelvesComponent) 
            },
            {
                path:"size", loadComponent: () => import('./admin-component/categories/size/size.component').then(m => m.SizeComponent) 
            },
            {
                path:"units", loadComponent: () => import('./admin-component/categories/units/units.component').then(m => m.UnitsComponent) 

            },
            {
                path:"categories", loadComponent: () => import('./admin-component/categories/categories/categories.component').then(m => m.CategoriesComponent)
            },
            {
                path:"customers", loadComponent: () => import('./admin-component/categories/customers/customers.component').then(m => m.CustomersComponent)
            }
           
        ]
    }
];