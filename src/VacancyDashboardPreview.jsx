import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReadContract } from "wagmi";
import VacancyABI from "./Contracts/abi/Vacancy";

function VacancyDashboardPreview({ resumeAddress, activateHandler }) {
  const [resumeData, setResumeData] = useState({
    photo: "",
    companyName: "",
    status: false,
  });
  const navigate = useNavigate();

  const resume = useReadContract({
    abi: VacancyABI,
    address: resumeAddress,
    functionName: "queryAll",
  });

  useEffect(() => {
    if (resume.data) {
      console.log(resume.data);
      setResumeData({
        photo: resume.data.photo,
        companyName: resume.data.companyName,
        status: resume.data.status,
      });
    }
  }, [resume.data]);

  return (
    <div className="resume-preview-wrap">
      <span>Ваша вакансия</span>
      <hr />
      <div className="resume-preview-selfie">
        <img src={resumeData.photo} alt="selfie" />
      </div>
      <hr />
      <h1 className="resume-preview-name">{resumeData.companyName}</h1>
      <hr />
      <div className="resume-preview-buttons">
        {resumeData.status ? (
          <div
            className="button"
            onClick={() => navigate(`/summaries/${resumeAddress}`)}
          >
            Перейти
          </div>
        ) : (
          <div
            className="button"
            onClick={() => activateHandler(resumeAddress)}
          >
            Активировать
          </div>
        )}
      </div>
    </div>
  );
}

export default VacancyDashboardPreview;
