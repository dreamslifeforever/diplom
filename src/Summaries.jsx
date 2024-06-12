import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import FactoryAbi, {
  FoundationFactoryAddress,
} from "./Contracts/abi/FoundationFactory";
import SummaryPreview from "./SummaryPreview";
import SearchBar from "./SearchBar";

function Controls({ incrementFunc, decrementFunc, currentIndex }) {
  return (
    <div className="page_controller">
      <div onClick={decrementFunc} className="controller_button">
        {" "}
        {"<"}{" "}
      </div>
      <div className="indexer">{currentIndex}</div>
      <div onClick={incrementFunc} className="controller_button">
        {" "}
        {">"}{" "}
      </div>
    </div>
  );
}

function Summaries() {
  const [pageIndex, setPageIndex] = useState(0);
  const [visibleSummaries, setVisibleSummaries] = useState([]);
  const [searchText, setSearchText] = useState("");

  const maxViewsPerPage = 6;

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

  useEffect(() => {
    if (summaries.data) {
      const sums = [];
      for (
        let index = maxViewsPerPage * pageIndex;
        index < maxViewsPerPage * (pageIndex + 1) &&
        index < summaries.data.length;
        index++
      ) {
        if (
          "0x635AA52E73a3530Faa9ea308f3298AC28AadFc4B" != summaries.data[index]
        ) {
          sums.push(
            <SummaryPreview
              key={index}
              visible={true}
              summaryAddress={summaries.data[index]}
            />
          );
        }
      }

      setVisibleSummaries(sums);
    }
  }, [summaries.data, pageIndex, searchText]);

  const decrementPage = () =>
    setPageIndex(pageIndex - 1 >= 0 ? pageIndex - 1 : pageIndex);

  const incrementPage = () =>
    setPageIndex(
      pageIndex + 1 <= summaries.data.length / maxViewsPerPage
        ? pageIndex + 1
        : pageIndex
    );

  const searchHandler = (text) => {};

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Поиск резюме"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="summaries-wrap">{visibleSummaries}</div>
      <Controls
        currentIndex={pageIndex}
        decrementFunc={decrementPage}
        incrementFunc={incrementPage}
      />
    </>
  );
}

export default Summaries;
