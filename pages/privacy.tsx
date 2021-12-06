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
            <div className="container">
                <div className="bg-white p-2 px-4">
                    <div className="page-header">
                        <h2 className="title">سياسة الخصوصية</h2>
                    </div>
                    <div className="page-content">
                        <h2 className="sub-title">زيادة عدد الحروف</h2>
                        <p className="text">
                            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
                            إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع.
                            ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً،دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.
                            هذا النص يمكن أن يتم تركيبه على أي تصميم دون مشكلة فلن يبدو وكأنه نص منسوخ، غير منظم، غير منسق، أو حتى غير مفهوم. لأنه مازال نصاً بديلاً ومؤقتاً.
                        </p>
                    </div>
                    <div className="page-content">
                        <h2 className="sub-title">زيادة عدد الحروف</h2>

                        <ul className="list">
                            <li>
                                يختار المشترك كلمة سر / مرور لحسابه، وبريداً الكترونياً خاصاً به لمراسلته عليه، وتكون مسؤولية حماية البريد وكلمة السر وعدم مشاركتها أو نشرها على المشترك، في حال حدوث أي معاملات باستخدام حسابه هذا فسيتحمل المشترك كافة المسؤوليات المترتبة على ذلك، دون أدنى مسؤولية على موقع خمسات
                            </li>
                            <li>
                                يتحمل المشترك كامل المسؤولية عن جميع المحتويات الخاصة به، التي يرفعها وينشرها عبر الموقع
                            </li>
                            <li>
                                يلتزم المستخدم بعدم الاتفاق مع بائع أو مشتري على التعامل معه خارج موقع خمسات. عدم الالتزام بذلك يعرض المستخدم لإيقاف حسابه
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
