import React, { useEffect } from "react";
import {
  useReadContract,
  useAccount,
  useWriteContract,
  useConfig,
} from "wagmi";
import { getTransactionReceipt } from "@wagmi/core";
import VacancyDashboardPreview from "./VacancyDashboardPreview";
import FactoryAbi, {
  FoundationFactoryAddress,
} from "./Contracts/abi/FoundationFactory";
import ResumeAbi from "./Contracts/abi/Resume";
import VacancyAbi from "./Contracts/abi/Vacancy";

import { usePopup } from "./ResumeFormPopup";
import ResumePreview from "./ResumePreview";
const UNDEFIEND_ADDRESS = "0x0000000000000000000000000000000000000000";

export default function Dashboard() {
  const account = useAccount();
  const config = useConfig();
  const { createPopup, createPopup2, resolvedValue, resolvedValue2, destroy } =
    usePopup();
  const { writeContractAsync } = useWriteContract();
  const resumeAddress = useReadContract({
    abi: FactoryAbi,
    address: FoundationFactoryAddress,
    functionName: "queryResumeByAddress",
    args: [account.address],
  });
  const shares = useReadContract({
    abi: FactoryAbi,
    address: FoundationFactoryAddress,
    functionName: "shares",
  });
  const vacancyAddress = useReadContract({
    abi: FactoryAbi,
    address: FoundationFactoryAddress,
    functionName: "queryVacancyByAddress",
    args: [account.address],
  });
  const createResume = async (userData) => {
    const sendedresume = await writeContractAsync({
      value: shares.data.toString(),
      abi: FactoryAbi,
      address: FoundationFactoryAddress,
      functionName: "createResume",
      args: [
        userData.selfie,
        userData.description,
        userData.addlink,
        userData.fname,
        userData.mname,
        userData.sname,
      ],
    });

    const interval = setInterval(() => {
      if (resumeAddress.data == UNDEFIEND_ADDRESS) {
        resumeAddress.refetch();
      } else {
        clearInterval(interval);
        destroy();
      }
    }, 1000);
  };

  const activateResume = async (address) => {
    const sendedresume = await writeContractAsync({
      value: "1000000000000",
      abi: ResumeAbi,
      address: address,
      functionName: "activateFoundation",
    });

    const interval = setInterval(async () => {
      try {
        const receipt = await getTransactionReceipt(config, {
          hash: sendedresume,
          chainId: config.chains[0].id,
        });
        console.log(receipt);
        resumeAddress.refetch({ cancelRefetch: true });

        clearInterval(interval);
      } catch (error) {
        console.log(error);
      }
    }, 1000);
  };
  const createVacancy = async (userData) => {
    const sendedresume = await writeContractAsync({
      value: shares.data.toString(),
      abi: FactoryAbi,
      address: FoundationFactoryAddress,
      functionName: "createVacancy",
      args: [
        userData.photo,
        userData.description,
        userData.companyName,
        userData.telegramLink,
        userData.currencySymbol,
        userData.payrangelower,
        userData.payrangehigher,
      ],
    });

    const interval = setInterval(() => {
      if (vacancyAddress.data == UNDEFIEND_ADDRESS) {
        vacancyAddress.refetch();
      } else {
        clearInterval(interval);
        destroy();
      }
    }, 1000);
  };
  const activateVacancy = async (address) => {
    const sendedresume = await writeContractAsync({
      value: "10000000000000",
      abi: VacancyAbi,
      address: address,
      functionName: "activateFoundation",
    });

    const interval = setInterval(async () => {
      try {
        const receipt = await getTransactionReceipt(config, {
          hash: sendedresume,
          chainId: config.chains[0].id,
        });
        console.log(receipt);
        resumeAddress.refetch({ cancelRefetch: true });

        clearInterval(interval);
      } catch (error) {
        console.log(error);
      }
    }, 1000);
  };
  const handleData = async () => {
    createPopup();
  };
  const handleData2 = async () => {
    createPopup2();
  };
  useEffect(() => {
    if (resolvedValue) {
      createResume(resolvedValue);
    }
  }, [resolvedValue]);
  useEffect(() => {
    if (resolvedValue2) {
      createVacancy(resolvedValue2);
    }
  }, [resolvedValue2]);

  return account.isConnected ? (
    <div>
      <h1>Личный кабинет пользователя {account.address}</h1>
      <hr />
      {resumeAddress.data !== UNDEFIEND_ADDRESS ? (
        <ResumePreview
          resumeAddress={resumeAddress.data}
          activateHandler={activateResume}
        />
      ) : (
        <div>
          <span>Вы не создали резюме</span>
          <div className="button" onClick={handleData}>
            Создать резюме
          </div>
        </div>
      )}
      {vacancyAddress.data !== UNDEFIEND_ADDRESS ? (
        <VacancyDashboardPreview
          resumeAddress={vacancyAddress.data}
          activateHandler={activateVacancy}
        />
      ) : (
        <div>
          <span>Вы не создали вакансию</span>
          <div className="button" onClick={handleData2}>
            Создать вакансию
          </div>
        </div>
      )}
    </div>
  ) : (
    <div>Вы не подключены к сети</div>
  );
}
