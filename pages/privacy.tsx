import Layout from '../components/Layout/HomeLayout'
import { ReactElement } from "react";
import { MetaTags } from '@/components/SEO/MetaTags'

function Privacy() {
    return (
        <div className="py-4">
            <MetaTags
                title='سياسة الخصوصية'
                metaDescription={"النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف"}
                ogDescription={"النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف"}
            />
            <div className="container my-3">
                <div className="bg-white p-2 px-4">
                    <div className="page-header">
                        <h2 className="title">سياسة الخصوصية</h2>
                    </div>
                    <div className="page-content">
                        <p className="text">تلتزم إدارة الموقع في حدود المسموح لها وفق القانون المنظم، بعدم كشف أي معلومات شخصية عن المستخدم مثل العنوان أو رقم الهاتف أو عنوان البريد الإلكتروني وغيرها. علاوة على ذلك، لن يتم تبادل، أو تداول أي من تلك المعلومات أو بيعها لأي طرف آخر طالما كان ذلك في حدود قدرات إدارة الموقع الممكنة، ولن يُسمح بالوصول إلى المعلومات إلا للأشخاص المؤهلين والمحترفين الذين يشرفون على موقع تيموورك الإلكتروني.        </p>
                    </div>
                    <div className="page-content">
                        <h2 className="sub-title">انتفاء المسؤولية القانونية</h2>
                        <p className="text">
                            تلتزم إدارة الموقع في حدود المسموح لها
                         وفق القانون المنظم، بعدم كشف أي معلومات
                         شخصية عن المستخدم مثل العنوان أو رقم الهاتف
                         أو عنوان البريد الإلكتروني وغيرها. علاوة على ذلك،
                         لن يتم تبادل، أو تداول أي من تلك المعلومات أو بيعها
                         لأي طرف آخر طالما كان ذلك في حدود قدرات إدارة 
                        الموقع الممكنة، ولن يُسمح بالوصول إلى المعلومات
                         إلا للأشخاص المؤهلين والمحترفين الذين يشرفون على موقع تيموورك الإلكتروني.   
                        </p>
                    </div>
                    <div className="page-content">
                        <h2 className="sub-title">حالات انقطاع الخدمة والسهو والخطأ</h2>
                        <p className="text">
                        تبذل إدارة الموقع قصارى جهدها للحرص والحفاظ على استمرار 
                        عمل الموقع الإلكتروني بدون مشاكل، رغم ذلك قد تقع في أي وقت 
                        أخطاء وحالات سهو وانقطاع للخدمة وتأخير لها، وفي مثل هذه الحالات
                         سنتوقع من المستخدمين الصبر حتى تعود الخدمة إلى الحالة الطبيعية.     
                        </p>
                    </div>
                    <div className="page-content">
                        <h2 className="sub-title">حساب المشترك وكلمة السر وأمن المعلومات</h2>

                        <ul className="list">
                            <li>
                                يختار المشترك كلمة سر / مرور لحسابه، وبريداً الكترونياً خاصاً به لمراسلته عليه، وتكون مسؤولية حماية البريد وكلمة السر وعدم مشاركتها أو نشرها على المشترك، في حال حدوث أي معاملات باستخدام حسابه هذا فسيتحمل المشترك كافة المسؤوليات المترتبة على ذلك، دون أدنى مسؤولية على موقع تيموورك
                            </li>
                            <li>
                                يتحمل المشترك كامل المسؤولية عن جميع المحتويات الخاصة به، التي يرفعها وينشرها عبر الموقع
                            </li>
                            <li>
                                يلتزم المستخدم بعدم الاتفاق مع بائع أو مشتري على التعامل معه خارج موقع تيموورك. عدم الالتزام بذلك يعرض المستخدم لإيقاف حسابه
                            </li>
                            <li>
                                يلتزم المشترك بشروط الاستخدام، وبعدم نشر أي محتوى مخالف للشريعة الإسلامية أو استخدام الموقع لأغراض غير قانونية، على سبيل المثال لا الحصر، مثل: القرصنة ونشر وتوزيع مواد أو برامج منسوخة، أو الخداع والتزوير أو الاحتيال أو التهديد أو إزعاج أي شخص أو شركة أو جماعة أو نشر مواد إباحية أو جنسية أو نشر فيروسات أو ملفات تجسس أو وضع روابط إلى مواقع تحتوي على مثل هذه المخالفات
                            </li>
                            <li>
                                يمنع انتهاك حقوق الملكية الفكرية أو تشويه سمعة شخص أو مؤسسة أو شركة أو تعمد نشر أي معلومات تسبب ضرراً لشركة أو شخص أو دولة أو جماعة، ويكون المشترك مسؤولاً مسؤولية كاملة عن كل ما يقدمه عبر حسابه في الموقع
                            </li>
                            <li>
                                يمنع منعاً باتاً استخدام خدمات الموقع لأغراض سياسية، ويمنع التعرض لأي دولة عربية أو إسلامية بأي شكل من الأشكال
                            </li>
                        </ul>
                    </div>
                    <div className="page-content">
                        <h2 className="sub-title">التسجيل</h2>
                        <p className="text">
                        بعض أجزاء الموقع لا تفتح إلا للأعضاء المشتركين المسجلين بعد
                         تقديم بعض المعلومات الشخصية عنهم. يوافق المشترك عند
                         تسجيله في الموقع بأن المعلومات المدخلة من طرفه هي كاملة ودقيقة، ويلتزم بأنه لن 
                         يقوم بالتسجيل في الموقع أو يحاول دخوله منتحلاً اسم مشترك آخر ولن يستخدم اسماً قد 
                         ترى الإدارة أنه غير مناسب، مثل أرقام الهواتف، والأسماء المنتحلة لشخصيات شهيرة، 
                         وروابط المواقع، والأسماء غير المفهومة، وما في حكمها. كذلك يلتزم بعدم تسجيل 
                         أكثر من حساب واحد في موقع تيموورك وعند استخدام نفس الشخص
                          لأكثر من حساب فإنه يعرض كافة حساباته للإيقاف بشكل نهائي.    
                        </p>
                    </div>
                    <div className="page-content">
                        <h2 className="sub-title">الرقابة على المحتوى</h2>
                        <p className="text">
                        تحتفظ إدارة موقع تيموورك الإلكتروني بالحق في
                         مراقبة أي محتوى يدخله المشترك دون أن يكون ذلك لزاماً عليها، ذلك
                         أنها لا تستطيع مراقبة كل مدخلات المشتركين، لذا تحتفظ بالحق (من دون التزام) في حذف أو إزالة
                          أو تحرير أي مواد مدخلة من شأنها انتهاك شروط وأحكام الموقع دون الرجوع للمستخدم.
                          إن قوانين حقوق النشر والتأليف المحلية و العالمية والأجنبية والمعاهدات الدولية تحمي 
                         جميع محتويات هذا الموقع، ومن خلال الاشتراك فيه فإن المشترك يوافق ضمنياً 
                         وبشكل صريح على الالتزام بإشعارات حقوق النشر التي تظهر على صفحاته.     
                        </p>
                        <br></br>
                        <p className="text">
                        هذه السياسة محل تغيير دائم وتطوير، نرجو مراجعتها بشكل دوري والتواصل معنا عبر مركز المساعدة للاستفسار عن أي من بنودها. 
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
Privacy.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Privacy
