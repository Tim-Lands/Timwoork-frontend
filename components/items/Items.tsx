import { useAppSelector } from "@/store/hooks";
import { Table } from "antd";
import Link from "next/link";
import LastSeen from "../LastSeen";

const Items = ({itemType, items, onChange}:{itemType:string, items:any, onChange:Function}) => {

    const {
        languages: { getAll },
    } = useAppSelector((state) => state);
    const statusLabel = (status: any) => {
        switch (status) {
            case 0:
                return <span className="badge bg-secondary">{getAll("PEnding")}</span>;

            case 1:
                return (
                    <span className="badge bg-warning">{getAll("Cancelled_by_the")}</span>
                );

            case 2:
                return (
                    <span className="badge bg-danger">{getAll("Refused_by_the")}</span>
                );

            case 3:
                return (
                    <span className="badge bg-info text-dark">
                        {getAll("In_progress")}
                    </span>
                );

            case 4:
                return (
                    <span className="badge bg-warning">
                        {getAll("Buyer_cancellation_request")}
                    </span>
                );

            case 5:
                return (
                    <span className="badge bg-warning">
                        {getAll("Cancelled_by_the_seller")}
                    </span>
                );

            case 6:
                return (
                    <span className="badge bg-primary">{getAll("Pending_receipt")}</span>
                );

            case 7:
                return (
                    <span className="badge bg-success text-light">
                        {getAll("Completed")}
                    </span>
                );

            case 8:
                return (
                    <span className="badge bg-danger text-light">
                        {getAll("Completed")}
                    </span>
                );

            case 9:
                return (
                    <span className="badge bg-light text-dark">
                        {getAll("Status_amendment_request")}
                    </span>
                );

            case 10:
                return (
                    <span className="badge bg-danger text-light">
                        {getAll("Suspended_due_to")}
                    </span>
                );

            default:
                return (
                    <span className="badge bg-info text-dark">{getAll("PEnding")}</span>
                );
        }
    }

    const columns: any = [
        {
          title: getAll("Title"),
          dataIndex: "",
          render: (e: any) => {
            console.log(e)
            return (
              <Link href={
                itemType == 'sales'
                ?`/mysales/${e.id}`
                :`/mypurchases/${e.id}`
                }>
                <a>{e.title}</a>
              </Link>
            );
          },
        },
        {
          title: getAll("Total_price"),
          dataIndex: "price_product",
          render: (status: any) => <>{status}$</>,
        },
        {
          title: itemType == 'sales' ? getAll("Buyer"):getAll('Seller'),
          dataIndex: "",
          render: (e: any) => (
            <p className="m-0 is-hover-primary">
              {itemType == 'sales'
              ?<Link href={`/u/${e.order.cart.user.username}`}>
                <a className="flex-center" style={{ color: "gray" }}>
                  <span className="mx-1">
                    {e.order.cart.user.profile.full_name}
                  </span>
                </a>
              </Link>
              :<Link href={`/u/${e.profile_seller.profile.user.username}`}>
              <a className="flex-center" style={{ color: "gray" }}>
                <span className="mx-1">
                  {e.profile_seller.profile.first_name +
                    " " +
                    e.profile_seller.profile.last_name}
                </span>
              </a>
            </Link>
        }
            </p>
          ),
        },
        {
          title: getAll("Status"),
          dataIndex: "status",
          render: (e: any) => <>{statusLabel(e)}</>,
        },
        {
          title: getAll("Date"),
          dataIndex: "created_at",
          render: (created_at: any) => <LastSeen date={created_at} />,
        },
      ];

    return(
        <div className="timwoork-single my-3">
        <div className="row py-4 justify-content-center">
          <div className="col-lg-10">
            <div className="app-bill">
              <div className="app-bill-header">
                <h3 className="title">{getAll("My_sells")}</h3>
              </div>
              <div className="saleTable">
                <Table
                  className="innerTable"
                  columns={columns}
                  onChange={e=>onChange(e)}
                  dataSource={items.data}
                  loading={items.loading}
                  bordered
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Items