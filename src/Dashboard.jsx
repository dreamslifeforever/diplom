import React, { useEffect } from "react";
import {
  useReadContract,
  useAccount,
  useWriteContract,
  useConfig,
} from "wagmi";
import { getTransactionReceipt } from "@wagmi/core";

import FactoryAbi, {
  FoundationFactoryAddress,
} from "./Contracts/abi/FoundationFactory";
import ResumeAbi from "./Contracts/abi/Resume";
import { usePopup } from "./ResumeFormPopup";
import ResumePreview from "./ResumePreview";
const UNDEFIEND_ADDRESS = "0x0000000000000000000000000000000000000000";

export default function Dashboard() {
  const account = useAccount();
  const config = useConfig();
  const { createPopup, resolvedValue, destroy } = usePopup();
  const { writeContractAsync } = useWriteContract();
  const resumeAddress = useReadContract({
    abi: FactoryAbi,
    address: FoundationFactoryAddress,
    functionName: "queryResumeByAddress",
    args: [account.address],
  });
  const createResume = async (userData) => {
    const sendedresume = await writeContractAsync({
      value: "5000000000000",
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
      value: "100000000000000",
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
  const handleData = async () => {
    createPopup();
  };
  useEffect(() => {
    if (resolvedValue) {
      createResume(resolvedValue);
    }
  }, [resolvedValue]);

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
    </div>
  ) : (
    <div>Вы не подключены к сети</div>
  );
}
