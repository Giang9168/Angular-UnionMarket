import { Category } from "../models/category.model";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export const CATEGORIES: Category[] = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        icon: faStar,
        isOpen: false
    },
    {
        name: 'Quản trị',
        path: 'product-management',
        icon: faStar,
        isOpen: false
    },
    {
        name: 'Sản phẩm',
        children: [
            { name: 'Điện thoại', path: '/products/phones', icon: faStar, isOpen: false },
            { name: 'Laptop', path: '/products/laptops', icon: faStar, isOpen: false },
            { name: 'Phụ kiện', path: '/products/accessories', icon: faStar, isOpen: false }
        ], icon: faStar, path: "/product",
        isOpen: false
    },
    {
        name: 'Liên hệ',
        path: 'contact',
        icon: faStar,
        isOpen: false
    }
];