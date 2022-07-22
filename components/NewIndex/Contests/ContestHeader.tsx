import Link from "next/link";
import React from "react";

function ContestHeader() {
  return (
    <div className="timlands-top-header">
      <ul className="timlands-tabs-nav me-auto">
        <li className="active">
          <button type="button" className="tab-butt-nav">
            الأحدث
          </button>
        </li>
        <li>
          <button type="button" className="tab-butt-nav">
            الأكثر شعبية
          </button>
        </li>
        <li>
          <button type="button" className="tab-butt-nav">
            الأكثر مشاركة
          </button>
        </li>
      </ul>
      <ul className="timlands-tabs-nav ml-auto">
        <li>
          <Link href={`/contests/add-new`}>
            <a className="btn butt-sm butt-green flex-center">
              <span className="material-icons material-icons-outlined">
                add_circle
              </span>{" "}
              إضافة مسابقة جديدة
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ContestHeader;
