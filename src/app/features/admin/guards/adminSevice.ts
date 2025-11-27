import { computed, inject, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Định nghĩa thông tin người dùng (giữ nguyên)
export interface User {
    username: string;
    role: Role;
}

export enum Role {
    Guest = 0,
    User = 1,
    Manager = 2,
    Admin = 3
    // Thêm bất kỳ role nào khác bạn có
}
// Định nghĩa hình dạng của "service" để dễ sử dụng và inject


