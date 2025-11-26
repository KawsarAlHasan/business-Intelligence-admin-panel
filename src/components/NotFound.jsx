import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button onClick={handleSubmit} type="primary">
            Back Home
          </Button>
        }
      />
    </div>
  );
}

export default NotFound;
