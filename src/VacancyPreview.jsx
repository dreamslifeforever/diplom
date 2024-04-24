import React, { useEffect } from "react";
import { useReadContract } from "wagmi";
import VacancyAbi from "./Contracts/abi/Vacancy";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function VacancyPreview({ summaryAddress }) {
  const [summaryData, setSummaryData] = useState({
    photo: "",
    description: "",
    companyName: "",
    telegramLink: "",
    payRange: {
      currencySymbol: "",
      lowerValue: "",
      higherValue: "",
    },
    owner: "",

    status: false,
  });
  const summary = useReadContract({
    abi: VacancyAbi,
    address: summaryAddress,
    functionName: "queryAll",
  });

  useEffect(() => {
    if (summary.data) {
      console.log(summary.data);
      setSummaryData({
        photo: summary.data.photo,
        description: summary.data.additionalLinkUri,
        companyName: summary.data.companyName,
        telegramLink: summary.data.telegramLink,
        payRange: summary.data.payRange,
        owner: summary.data.owner,
        status: summary.data.status,
      });
    }
  }, [summary.data]);
  if (!summaryData.status) return null;
  return (
    <Link to={`/vacancies/${summaryAddress}`}>
      <div className="summary-wrap">
        <div className="summary-selfie">
          <img src={summaryData.photo} alt="selfie" />
        </div>
        <hr />
        <div className="summary-name">{summaryData.companyName}</div>
        <div
          className="summary-name"
          style={{
            textDecoration: "none",
            paddingTop: "3px",
            textTransform: "none",
            fontSize: "20px",
          }}
        >
          {summaryData.payRange.lowerValue}-{summaryData.payRange.higherValue}
          {summaryData.payRange.currencySymbol}
        </div>
      </div>
    </Link>
  );
}
