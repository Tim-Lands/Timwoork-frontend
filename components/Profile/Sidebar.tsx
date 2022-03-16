import { Statistic, Card } from 'antd'
import PropTypes from "prop-types";
import Link from 'next/link'
import useSWR from 'swr';
import { Alert } from '../Alert/Alert';

export default function UploadPicture({ profile_seller, beseller, isLoadingSeler, pending_amount, withdrawable_amount, darkMode }) {
    const { data: userInfo }: any = useSWR('api/me')
    return (
        <div className="col-lg-4">
            {!profile_seller &&
                <div className="be-seller-aside mt-4">
                    <h3 className="title">كن بائعا</h3>
                    <p className="text">هل تريد أن تكون بائعا؟ يمكنك إضافة معلومات إضافية!</p>
                    <button onClick={beseller} disabled={isLoadingSeler} className='btn butt-green butt-md' style={{ width: '100%' }}>
                        إنشاء بروفايل بائع
                    </button>
                </div>
            }
            {profile_seller && <>
                <div className="py-1 mt-2">
                    <Card title="نبذة عني" extra={<Link href="/user/editSeller"><a className='edit-button flex-center'><span className="material-icons material-icons-outlined">edit</span></a></Link>}>
                        <p className="user-bro">
                            {profile_seller.bio}
                        </p>
                    </Card>
                </div>
                <div className="p-4 bg-white" style={{
                    borderWidth: 1,
                    borderColor: '#f1f1f1',
                    borderStyle: 'solid',
                    marginBlock: 9
                }}>
                    <p className="text">
                        <strong>شارة البائع: </strong> <span className='text-inop'>{profile_seller.badge.name_ar}</span>
                    </p>
                    <p className="text m-0">
                        <strong>مستوى البائع: </strong> <span className='text-inop'>{profile_seller.level.name_ar}</span>
                    </p>
                </div>
            </>
            }
            <div className="py-1">
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
                        {userInfo && userInfo.user_details.profile.wallet.is_withdrawable ?
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
    profile_seller: PropTypes.object,
    profileUser: PropTypes.object,
    beseller: PropTypes.func,
    isLoadingSeler: PropTypes.bool,
    pending_amount: PropTypes.number,
    darkMode: PropTypes.any,
    withdrawable_amount: PropTypes.number,
};