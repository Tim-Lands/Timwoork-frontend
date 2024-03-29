import getTranslatedMeta from "utils/translatedMeta";
import { useAppSelector } from "@/store/hooks";
function Privacy() {
  const { getAll } = useAppSelector((state) => state.languages);

  return (
    <div className="py-4">
      {/* <NextSeo
        title="Your Title"
        description="This is a demo description"
        canonical="https://www.example.com"
        openGraph={{
          url: "https://www.example.com",
          title: "Open Graph Title",
          description: "Open Graph Description",
          images: [
            {
              url: "https://www.example.com/og-image01.jpg",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
              type: "image/jpeg",
            },
            {
              url: "https://www.example.com/og-image02.jpg",
              width: 900,
              height: 800,
              alt: "Og Image Alt Second",
              type: "image/jpeg",
            },
            { url: "https://www.example.com/og-image03.jpg" },
            { url: "https://www.example.com/og-image04.jpg" },
          ],
          site_name: "YourSiteName",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      /> */}

      <div className="container my-3">
        <div className="bg-white p-2 px-4">
          <div className="page-header">
            <h2 className="title">{getAll("Privacy_policy")}</h2>
          </div>
          <div className="page-content">
            <p className="text">{getAll("The_Website’s_administration")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getAll("Disclaimer_of_legal")}</h2>
            <p className="text">{getAll("The_Website’s_administration")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getAll("Cases_of_service")}</h2>
            <p className="text">{getAll("The_Website’s_management")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">
              {getAll("Subscriber’s_account_password")}
            </h2>

            <ul className="list">
              <li>{getAll("The_subscriber_chooses")}</li>
              <li>{getAll("The_subscriber_takes")}</li>
              <li>{getAll("The_subscriber_takes_2")}</li>
              <li>{getAll("The_subscriber_must")}</li>
              <li>{getAll("It_is_prohibited")}</li>
              <li>{getAll("It_is_strictly")}</li>
            </ul>
          </div>
          <div className="page-content">
            <h2 className="sub-title">التسجيل</h2>
            <p className="text">{getAll("Timwoork’s_website")}</p>
          </div>
          <div className="page-content">
            <h2 className="sub-title">{getAll("Content_censorship")}</h2>
            <p className="text">
              {getAll("Timwoork’s_management_reserves")}
              {getAll("All_contents_of")}
            </p>
            <br></br>
            <p className="text">{getAll("This_policy_is")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
/* Privacy.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
}; */
export default Privacy;
export function getServerSideProps(ctx: any) {
  return {
    props: { meta: getTranslatedMeta({ ctx, title: "Privacy_policy" }) },
  };
}
