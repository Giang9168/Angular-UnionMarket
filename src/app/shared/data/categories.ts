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
        name: 'Danh mục',
       
         children: [
            { name: 'Hàng Hóa', path: 'product', icon: faStar, isOpen: false },
            { name: 'Khách Hàng/NCC', path: 'customers', icon: faStar, isOpen: false },
            { name: 'Loại Hàng', path: 'categories', icon: faStar, isOpen: false },
            { name: 'Xuất Sứ', path: 'origin', icon: faStar, isOpen: false },
            { name: 'Màu', path: 'colors', icon: faStar, isOpen: false },
            { name: 'Đơn vị tính', path: 'units', icon: faStar, isOpen: false },
            { name: 'Kệ Hàng', path: 'shelves', icon: faStar, isOpen: false },
            { name: 'Size', path: 'size', icon: faStar, isOpen: false },
            { name: 'Thuộc tính', path: 'attributes', icon: faStar, isOpen: false }
        ],
        icon: faStar,
        isOpen: false
    },
    {
        name: 'Xuất Nhập ',
        children: [
            { name: 'Nhập Hàng', path: 'ordersell', icon: faStar, isOpen: false },
            { name: 'Xuất Bán', path: 'orderbuy', icon: faStar, isOpen: false },
            { name: 'Trả Hàng', path: 'trahang', icon: faStar, isOpen: false }
        ], icon: faStar,
        isOpen: false
    },
    {
        name: 'Báo Cáo',
        path: 'report',
        icon: faStar,
        isOpen: false
    }
];