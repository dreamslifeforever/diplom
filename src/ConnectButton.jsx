import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReadContract, useAccount, useConnect } from "wagmi";

const buttonTexts = {
  connected: "Личный кабинет",
  disconnected: "Войти",
};

function ConnectButton(props) {
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  const navigate = useNavigate();

  return (
    <div
      className="connect button"
      onClick={() =>
        window.location.pathname === "/dashboard"
          ? open()
          : navigate("/dashboard")
      }
    >
      {address ? buttonTexts.connected : buttonTexts.disconnected}
    </div>
  );
}
export default ConnectButton;
