import { Result } from 'antd'
import Link from 'next/link'

function Unauthorized() {
    return (
        <div className="row justify-content-md-center">
            <div className="col-md-5">
                <Result
                    status="warning"
                    title="ليس لديك الصلاحية"
                    subTitle="ليس لديك الصلاحية لدخول هذه الصفحة"
                    extra={
                        <Link href="/login">
                            <a className="btn butt-primary butt-md">
                                تسجيل الدخول
                            </a>
                        </Link>
                    }
                />
            </div>
        </div>
    )
}

export default Unauthorized
