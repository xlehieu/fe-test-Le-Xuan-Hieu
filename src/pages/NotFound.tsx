import { ROUTE } from "@/routes/route.config";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Result
        status="404"
        title="404"
        subTitle="Trang không tồn tại"
        extra={
          <Link to={ROUTE.DASHBOARD}>
            <Button type="primary">Về trang dashboard</Button>
          </Link>
        }
      />
    </div>
  );
}

export default NotFoundPage;