import { Result } from "antd";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
function NotFound() {
  const { getAll } = useAppSelector((state) => state.languages);
  return (
    <div className="row justify-content-md-center">
      <div className="col-md-5">
        <Result
          status="warning"
          title={getAll("Page_not_found")}
          subTitle={getAll("Please_make_sure")}
          extra={
            <Link href="/">
              <a className="btn butt-primary butt-md">{getAll("Home")}</a>
            </Link>
          }
        />
      </div>
    </div>
  );
}

export default NotFound;
