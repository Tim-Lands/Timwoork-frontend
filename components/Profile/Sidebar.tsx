import { Statistic, Card } from 'antd'
import PropTypes from "prop-types";
import Link from 'next/link'
import useSWR from 'swr';
import { Alert } from '../Alert/Alert';

export default function UploadPicture({ pending_amount, withdrawable_amount, darkMode }) {
    const { data: userInfo }: any = useSWR('api/me')
    return (
        <div className="col-lg-4">
            <div className="pb-1">
                <Card title="الرصيد">
                    <div className="statistic-item">
                        <Statistic
                            title="الرصيد المعلق"
                            value={pending_amount}
                            precision={2}
                            valueStyle={{ color: '#cf1322' }}
                            suffix="$"
                        />
                    </div>
                    <div className="statistic-item">
                        <Statistic
                            title="الرصيد القابل للسحب"
                            value={withdrawable_amount}
                            precision={2}
                            valueStyle={{ color: darkMode ? '#8ac557' : '#3f8600' }}
                            suffix="$"
                        />
                        {(userInfo && userInfo.user_details.profile.withdrawable_amount > 9) ?
                            <>
                                {(userInfo && userInfo.user_details.profile.wallet.is_withdrawable == true) ?
                                    <div className="d-flex justify-content-center pt-1">
                                        <Link href={'/withdrawal'}>
                                            <a className='btn butt-green butt-xs px-5' style={{ width: '100%' }}>
                                                طلب سحب الأموال
                                            </a>
                                        </Link>
                                    </div> :
                                    <Alert type='error'>
                                        <strong>للأسف لديك طلب سحب أموال في المعالجة</strong>
                                    </Alert>
                                }
                            </>
                            :
                            <Alert type='error'>
                                <strong>للأسف لا يمكنك طلب سحب الأموال رصيدك القابل للسحب أقل من 10 دولار</strong>
                            </Alert>
                        }

                    </div>
                    <div className="statistic-item">
                        <Statistic
                            title="الرصيد الكلي"
                            value={Number(withdrawable_amount) + Number(pending_amount)}
                            precision={2}
                            valueStyle={{ color: darkMode ? '#ddd' : '#222' }}
                            suffix="$"
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
}
UploadPicture.propTypes = {
    pending_amount: PropTypes.number,
    darkMode: PropTypes.any,
    withdrawable_amount: PropTypes.number,
};