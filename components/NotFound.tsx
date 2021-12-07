import { Result } from 'antd'
import Link from 'next/link'

function NotFound() {
    return (
        <div className="row justify-content-md-center">
            <div className="col-md-5">
                <Result
                    status="warning"
                    title="هذه الصفحة غير موجودة"
                    subTitle="يرجى التأكد من كتابة الرابط"
                    extra={
                        <Link href="/">
                            <a className="btn butt-primary butt-md">
                                الرئيسية
                            </a>
                        </Link>
                    }
                />
            </div>
        </div>
    )
}

export default NotFound
