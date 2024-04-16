import React, { useState } from "react";
import { useReadContract } from "wagmi";
import FactoryAbi, {
  FoundationFactoryAddress,
} from "./Contracts/abi/FoundationFactory";
import SummaryPreview from "./SummaryPreview";
function Summaries() {
  const summariesLength = useReadContract({
    abi: FactoryAbi,
    address: FoundationFactoryAddress,
    functionName: "resumesLength",
  });

  const summaries = useReadContract({
    abi: FactoryAbi,
    address: FoundationFactoryAddress,
    functionName: "queryResumes",
    args: [summariesLength.data, 0],
  });

  console.log(summaries.data);
  return (
    <div className="summaries-wrap">
      {summaries.data ? (
        summaries.data.map((x) => <SummaryPreview summaryAddress={x} />)
      ) : (
        <div>No summaries</div>
      )}
    </div>
  );
}

export default Summaries;
