import { Statistic, Card } from 'antd'
import { FallOutlined, RiseOutlined, ShrinkOutlined } from '@ant-design/icons';
import PropTypes from "prop-types";
import Link from 'next/link'

export default function UploadPicture({ profile_seller, beseller, isLoadingSeler, pending_amount, withdrawable_amount, darkMode }) {

    return (
        <div className="col-lg-4">
            {!profile_seller &&
                <div className="be-seller-aside">
                    <h3 className="title">كن بائعا</h3>
                    <p className="text">هل تريد أن تكون بائعا؟ يمكنك إضافة معلومات إضافية!</p>
                    <button onClick={beseller} disabled={isLoadingSeler} className='btn butt-green butt-md' style={{ width: '100%' }}>
                        إنشاء بروفايل بائع
                    </button>
                </div>
            }
            {profile_seller &&
                <div className="py-1">
                    <Card title="نبذة عني" extra={<Link href="/user/editSeller"><a className='edit-button flex-center'><span className="material-icons material-icons-outlined">edit</span></a></Link>}>
                        <p className="user-bro">
                            {profile_seller.bio}
                        </p>
                    </Card>
                </div>
            }
            <div className="py-1">
                <Card title="الرصيد">
                    <div className="statistic-item">
                        <Statistic
                            title="الرصيد المعلق"
                            value={pending_amount}
                            precision={2}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<FallOutlined />}
                            suffix="$"
                        />
                    </div>
                    <div className="statistic-item">
                        <Statistic
                            title="الرصيد القابل للسحب"
                            value={withdrawable_amount}
                            precision={2}
                            valueStyle={{ color: darkMode ? '#8ac557' : '#3f8600' }}
                            prefix={<RiseOutlined />}
                            suffix="$"
                        />
                    </div>
                    <div className="statistic-item">
                        <Statistic
                            title="الرصيد الكلي"
                            value={Number(withdrawable_amount) + Number(pending_amount)}
                            precision={2}
                            valueStyle={{ color: darkMode ? '#ddd' : '#222' }}
                            prefix={<ShrinkOutlined />}
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