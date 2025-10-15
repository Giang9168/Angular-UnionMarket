// src/app/guards/admin.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

export const adminGuard: CanActivateFn = (route, state) => {
  // Sử dụng inject() để lấy các service cần thiết
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const token = cookieService.get('jwt'); // <-- Thay bằng tên cookie của bạn
  console.log(token)
  if (!token) {
    // Nếu không có token, chuyển về trang đăng nhập 
    console.log(token)
    router.navigate(['/login']);
    return false; // ❌ Chặn truy cập
  }

  try {
    // Giải mã token để lấy thông tin payload
    const decodedToken: any = jwtDecode(token);
    console.log(decodedToken)
    // Kiểm tra xem trong token có claim role là 'Admin' hay không
    // Tên claim có thể khác nhau tùy vào backend của bạn
    const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    if (userRole && userRole === 'Admin') {
      return true; // ✅ Cho phép truy cập
    } else {
      // Có token nhưng không phải admin, chuyển về trang cấm truy cập
      router.navigate(['/unauthorized']);
      return false; // ❌ Chặn truy cập
    }
  } catch (error) {
    // Nếu token không hợp lệ (không giải mã được)
    console.error("Invalid token:", error);
    router.navigate(['/login']);
    return false; // ❌ Chặn truy cập
  }
};