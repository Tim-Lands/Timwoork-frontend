import React from "react";
import useSWR from "swr";
import Link from "next/link";

function BlogFooter() {
  const { data: getPosts }: any = useSWR(
    "https://timwoork.net/wp-json/wp/v2/posts?per_page=5"
  );
  return (
    <div className="app-footer-aside">
      <div className="aside-header">
        <h4 className="title">المدونة</h4>
      </div>
      <div className="aside-body">
        <ul className="aside-list-items">
          {getPosts &&
            getPosts.map((item: any) => (
              <li key={item.id}>
                <Link href={`/blog/${item.slug}`}>
                  {item.title.rendered.length < 35 ? (
                    <a>{item.title.rendered}</a>
                  ) : (
                    <a>{item.title.rendered.slice(0, 35)} ...</a>
                  )}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default BlogFooter;
