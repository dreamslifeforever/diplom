import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useReadContract } from "wagmi";
import VanancyABI from "./Contracts/abi/Vacancy";
const toShortAddr = (address) =>
  address.slice(0, 7) +
  "..." +
  address.slice(address.length - 7, address.length);
function Vacancy() {
  const { summaryAddress } = useParams();
  const [resumeData, setResumeData] = useState({
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

  const resume = useReadContract({
    abi: VanancyABI,
    address: summaryAddress,
    functionName: "queryAll",
  });

  useEffect(() => {
    if (resume.data) {
      setResumeData({
        photo: resume.data.photo,
        description: resume.data.description,
        companyName: resume.data.companyName,
        telegramLink: resume.data.telegramLink,
        payRange: resume.data.payRange,
        owner: resume.data.owner,
        status: resume.data.status,
      });
    }
  }, [resume.data]);

  return (
    <div className="resume-wrap">
      <div className="resume-selfie">
        <img src={resumeData.photo} alt="selfie" />

        <h1>
          <hr />
          <span className="podpunkt">
            <i>Название компании: </i>
            {resumeData.companyName}
          </span>{" "}
          <hr />
        </h1>
      </div>

      <div className="resume-content">
        <h1>Вакансия</h1>
        <hr />
        <h3>
          Адрес вакансии в блокчейне:{" "}
          <a href={`https://sepolia.etherscan.io/address/${summaryAddress}`}>
            {toShortAddr(summaryAddress)}
          </a>
        </h3>

        <h3>
          Адрес создателя вакансии в блокчейне:
          <a href={`https://sepolia.etherscan.io/address/${resumeData.owner}`}>
            {toShortAddr(resumeData.owner)}
          </a>
        </h3>
        <h3>
          Статус в блокчейне: {resumeData.status ? "Активен" : "Не активен"}
        </h3>
        <hr />

        <p className="scroll-x">
          <span className="podpunkt">
            <i>Текст вакансии:</i>
          </span>{" "}
          {resumeData.description}
        </p>
        <hr />
        <p>
          <span className="podpunkt">
            <i>Заработная плата:</i>
          </span>{" "}
          {resumeData.payRange.lowerValue}-{resumeData.payRange.higherValue}
          {resumeData.payRange.currencySymbol}
        </p>
        <p>
          <span className="podpunkt">
            <i>Ссылка для связи:</i>
          </span>{" "}
          <a href={resumeData.telegramLink}>{resumeData.telegramLink}</a>
        </p>
      </div>
    </div>
  );
}

export default Vacancy;
