import React, { useEffect } from "react";
import { useReadContract } from "wagmi";
import ResumeAbi from "./Contracts/abi/Resume";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function SummaryPreview({ summaryAddress }) {
  const [summaryData, setSummaryData] = useState({
    selfieUrl: "",
    description: "",
    name: "",
    surname: "",
    additionalLinkUri: "",
    owner: "",
    middlename: "",
    status: false,
  });
  const summary = useReadContract({
    abi: ResumeAbi,
    address: summaryAddress,
    functionName: "queryAll",
  });

  useEffect(() => {
    if (summary.data) {
      setSummaryData({
        selfieUrl: summary.data.selfieUri,
        additionalLinkUri: summary.data.additionalLinkUri,
        description: summary.data.description,
        name: summary.data.name,
        surname: summary.data.surname,
        middlename: summary.data.middlename,
        owner: summary.data.owner,
        status: summary.data.status,
      });
      console.log(summary.data.selfieUri);
    }
  }, [summary.data]);
  if (!summaryData.status) return null;
  return (
    <Link to={`/summaries/${summaryAddress}`}>
      <div className="summary-wrap">
        <div className="summary-selfie">
          <img src={summaryData.selfieUrl} alt="selfie" />
        </div>
        <hr />
        <div className="summary-name">
          {summaryData.surname} {summaryData.name}
        </div>
      </div>
    </Link>
  );
}
