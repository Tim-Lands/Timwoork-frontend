import { Result } from 'antd'
import Link from 'next/link'

function NotSeller() {
    return (
        <div className="row justify-content-md-center">
            <div className="col-md-5">
                <Result
                    status="warning"
                    title="ليس لديك الصلاحية"
                    subTitle="يجب ان تكون بائعا حتى تضيف الخدمة"
                    extra={
                        <Link href="/login">
                            <a className="btn butt-primary butt-md">
                              كن بائعا
                            </a>
                        </Link>
                    }
                />
            </div>
        </div>
    )
}

export default NotSeller
