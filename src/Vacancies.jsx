import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import FactoryAbi, {
  FoundationFactoryAddress,
} from "./Contracts/abi/FoundationFactory";
import VacancyPreview from "./VacancyPreview";

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

function Vacancies() {
  const [pageIndex, setPageIndex] = useState(0);
  const [visibleSummaries, setVisibleSummaries] = useState([]);

  const maxViewsPerPage = 6;

  const summariesLength = useReadContract({
    abi: FactoryAbi,
    address: FoundationFactoryAddress,
    functionName: "vacanciesLength",
  });

  const summaries = useReadContract({
    abi: FactoryAbi,
    address: FoundationFactoryAddress,
    functionName: "queryVacancies",
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
        sums.push(
          <VacancyPreview key={index} summaryAddress={summaries.data[index]} />
        );
      }

      setVisibleSummaries(sums);
    }
  }, [summaries.data, pageIndex]);

  const decrementPage = () =>
    setPageIndex(pageIndex - 1 >= 0 ? pageIndex - 1 : pageIndex);

  const incrementPage = () =>
    setPageIndex(
      pageIndex + 1 <= summaries.data.length / maxViewsPerPage
        ? pageIndex + 1
        : pageIndex
    );

  console.log(summaries.data);
  return (
    <>
      <div className="summaries-wrap">{visibleSummaries}</div>
      <Controls
        currentIndex={pageIndex}
        decrementFunc={decrementPage}
        incrementFunc={incrementPage}
      />
    </>
  );
}

export default Vacancies;
