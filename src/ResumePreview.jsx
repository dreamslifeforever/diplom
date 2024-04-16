import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReadContract } from "wagmi";
import ResumeAbi from "./Contracts/abi/Resume";

function ResumePreview({ resumeAddress, activateHandler }) {
  const [resumeData, setResumeData] = useState({
    selfieUrl: "",
    name: "",
    surname: "",
    status: false,
  });
  const navigate = useNavigate();

  const resume = useReadContract({
    abi: ResumeAbi,
    address: resumeAddress,
    functionName: "queryAll",
  });

  useEffect(() => {
    if (resume.data) {
      console.log(resume.data);
      setResumeData({
        selfieUrl: resume.data.selfieUri,
        name: resume.data.name,
        surname: resume.data.surname,
        status: resume.data.status,
      });
    }
  }, [resume.data]);

  return (
    <div className="resume-preview-wrap">
      <span>Ваше резюме</span>
      <hr />
      <div className="resume-preview-selfie">
        <img src={resumeData.selfieUrl} alt="selfie" />
      </div>
      <hr />
      <h1 className="resume-preview-name">
        {resumeData.surname} {resumeData.name}
      </h1>
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

export default ResumePreview;
