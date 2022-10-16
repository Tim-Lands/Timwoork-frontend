import { Result } from "antd";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

function NotSeller() {
  const { getAll } = useAppSelector((state) => state.languages);
  return (
    <div className="row justify-content-md-center">
      <div className="col-md-5">
        <Result
          status="warning"
          title={getAll("You_don’t_have")}
          subTitle={getAll("You_need_to")}
          extra={
            <Link href="/user/editSeller">
              <a className="btn butt-primary butt-md">
                {getAll("Become_a_seller")}
              </a>
            </Link>
          }
        />
      </div>
    </div>
  );
}

export default NotSeller;
