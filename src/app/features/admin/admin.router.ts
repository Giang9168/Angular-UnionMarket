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
                path: 'product-management', loadComponent: () => import('./admin-component/product-management/product-management.component').then(m => m.ProductManagementComponent)

            }
            // ... thêm các trang con khác của admin
        ]
    }
];