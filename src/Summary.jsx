import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useReadContract } from "wagmi";
import ResumeAbi from "./Contracts/abi/Resume";
const toShortAddr = address => address.slice(0,7)+"..."+address.slice(address.length-7,address.length)
function Summary() {
  const { summaryAddress } = useParams();
  const [resumeData, setResumeData] = useState({
    selfieUrl: "",
    description: "",
    name: "",
    surname: "",
    additionalLinkUri: "",
    owner: "",
    middlename: "",
    status: false,
  });

  const resume = useReadContract({
    abi: ResumeAbi,
    address: summaryAddress,
    functionName: "queryAll",
  });

  useEffect(() => {
    if (resume.data) {
      setResumeData({
        selfieUrl: resume.data.selfieUri,
        additionalLinkUri: resume.data.additionalLinkUri,
        description: resume.data.description,
        name: resume.data.name,
        surname: resume.data.surname,
        middlename: resume.data.middlename,
        owner: resume.data.owner,
        status: resume.data.status,
      });
    }
  }, [resume.data]);

  return (
    <div className="resume-wrap">
      <div className="resume-selfie">
        <img src={resumeData.selfieUrl} alt="selfie" />

        <h1>
          <hr />
          <span className="podpunkt">
            <i>Фамилия: </i>
            {resumeData.surname}
          </span>{" "}
          <hr />
          <span className="podpunkt">
            <i>Имя: </i>
            {resumeData.name}
          </span>{" "}
          <hr />
          <span className="podpunkt">
            <i>Отчество: </i>
            {resumeData.middlename}
          </span>{" "}
        </h1>
      </div>

      <div className="resume-content">
        <h1>Резюме</h1>
        <hr />
        <h3>
          Адрес резюме в блокчейне:{" "}
          <a href={`https://sepolia.etherscan.io/address/${summaryAddress}`}>
            {toShortAddr(summaryAddress)}
          </a>
        </h3>

        <h3>
          Адрес создателя резюме в блокчейне: 
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
            <i>Текст резюме:</i>
          </span>{" "}
          {resumeData.description}
        </p>
        <hr />
        <p>
          <span className="podpunkt">
            <i>Дополнительная ссылка:</i>
          </span>{" "}
          <a href={resumeData.additionalLinkUri}>
            {resumeData.additionalLinkUri}
          </a>
        </p>
      </div>
    </div>
  );
}

export default Summary;
