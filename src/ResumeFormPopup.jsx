import React, { useState, createContext, useContext } from "react";
import Modal from "react-modal";
const popupContext = createContext();
const defaultValue = {
  fname: "",
  mname: "",
  sname: "",
  description: "",
  selfie: "",
  addlink: "",
};
const defaultValue2 = {
  companyName: "",
  description: "",
  photo: "",
  telegramLink: "",
  currencySymbol: "₮",
  payrangelower: "",
  payrangehigher: "",
};
export const ResumeFormPopupProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);
  const [inputValue2, setInputValue2] = useState(defaultValue2);
  const [resolvedValue, setResolvedValue] = useState(null);
  const [resolvedValue2, setResolvedValue2] = useState(null);

  const createPopup = () => {
    setIsOpen(true);
  };
  const createPopup2 = () => {
    setIsOpen2(true);
  };
  const handleSubmit = () => {
    console.log(inputValue);
    setResolvedValue(inputValue);
  };
  const handleSubmit2 = () => {
    console.log(inputValue2);
    setResolvedValue2(inputValue2);
  };
  const destroy = () => {
    setIsOpen(false);
    setInputValue(defaultValue);
    setResolvedValue(null);
  };
  const destroy2 = () => {
    setIsOpen2(false);
    setInputValue2(defaultValue2);
    setResolvedValue2(null);
  };

  const handleChange = (e) => {
    setInputValue((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };
  const handleChange2 = (e) => {
    setInputValue2((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <popupContext.Provider
      value={{
        createPopup,
        resolvedValue,
        destroy,
        createPopup2,
        resolvedValue2,
        destroy2,
      }}
    >
      <Modal
        isOpen={isOpen}
        style={{ content: { display: "flex", flexDirection: "column" } }}
        onRequestClose={destroy}
      >
        <label htmlFor="fname">Ваше имя</label>
        <input
          placeholder="Иван"
          style={{
            all: "unset",
            border: "1px solid rgba(0,0,0,0.5)",
            padding: "5px 20px",
          }}
          type="text"
          name="fname"
          value={inputValue.fname}
          onChange={handleChange}
        />
        <label htmlFor="mname">Ваше отчество</label>
        <input
          placeholder="Витальевич"
          style={{
            all: "unset",
            border: "1px solid rgba(0,0,0,0.5)",
            padding: "5px 20px",
          }}
          type="text"
          name="mname"
          value={inputValue.mname}
          onChange={handleChange}
        />
        <label htmlFor="sname">Ваша фамилия</label>
        <input
          placeholder="Мясников"
          style={{
            all: "unset",
            border: "1px solid rgba(0,0,0,0.5)",
            padding: "5px 20px",
          }}
          type="text"
          name="sname"
          value={inputValue.sname}
          onChange={handleChange}
        />
        <label htmlFor="selfie">Ссылка на вашу фотографию(аватар)</label>
        <input
          style={{
            all: "unset",
            border: "1px solid rgba(0,0,0,0.5)",
            padding: "5px 20px",
          }}
          type="text"
          name="selfie"
          value={inputValue.selfie}
          onChange={handleChange}
        />
        <label htmlFor="selfie">
          Дополнительная ссылка (пдф файл, linktree, telegram)
        </label>
        <input
          style={{
            all: "unset",
            border: "1px solid rgba(0,0,0,0.5)",
            padding: "5px 20px",
          }}
          type="text"
          name="addlink"
          value={inputValue.addlink}
          onChange={handleChange}
        />
        <img width={200} src={inputValue.selfie} alt="[Ваш аватар]" />
        <label htmlFor="selfie">Описание вашего резюме</label>
        <textarea
          style={{
            all: "unset",
            overflowX: "hidden",
            overflowY: "scroll",
            wordBreak: "break-all",
            border: "1px solid rgba(0,0,0,0.5)",
            padding: "5px 20px",
            minHeight: "350px",
          }}
          type="text"
          name="description"
          value={inputValue.description}
          onChange={handleChange}
        />

        <div className="button" onClick={handleSubmit}>
          Создать
        </div>
      </Modal>
      <Modal
        isOpen={isOpen2}
        style={{ content: { display: "flex", flexDirection: "column" } }}
        onRequestClose={destroy2}
      >
        <label htmlFor="companyName">Название компании</label>
        <input
          placeholder="ItDrive"
          style={{
            all: "unset",
            border: "1px solid rgba(0,0,0,0.5)",
            padding: "5px 20px",
          }}
          type="text"
          name="companyName"
          value={inputValue2.companyName}
          onChange={handleChange2}
        />
        <label htmlFor="telegramLink">Ccылка на телеграм</label>
        <input
          placeholder=""
          style={{
            all: "unset",
            border: "1px solid rgba(0,0,0,0.5)",
            padding: "5px 20px",
          }}
          type="text"
          name="telegramLink"
          value={inputValue2.telegramLink}
          onChange={handleChange2}
        />
        <label htmlFor="currencySymbol">Валюта</label>
        <select
          name="currencySymbol"
          onChange={handleChange2}
          id="currencySymbol"
        >
          <option value="₮">₮</option>
          <option value="$">$</option>
          <option value="₽">₽</option>
          <option value="₿">₿</option>
        </select>
        <label htmlFor="payrange">Вилка заработной платы</label>
        <div style={{ display: "flex" }}>
          <input
            style={{
              all: "unset",
              border: "1px solid rgba(0,0,0,0.5)",
              padding: "5px 20px",
            }}
            type="text"
            name="payrangelower"
            value={inputValue2.payrangelower}
            onChange={handleChange2}
          />
          -
          <input
            style={{
              all: "unset",
              border: "1px solid rgba(0,0,0,0.5)",
              padding: "5px 20px",
            }}
            type="text"
            name="payrangehigher"
            value={inputValue2.payrangehigher}
            onChange={handleChange2}
          />
        </div>

        <label htmlFor="photo">Ссылка на фотографию(превью)</label>
        <input
          style={{
            all: "unset",
            border: "1px solid rgba(0,0,0,0.5)",
            padding: "5px 20px",
          }}
          type="text"
          name="photo"
          value={inputValue2.photo}
          onChange={handleChange2}
        />

        <img width={200} src={inputValue2.photo} alt="[Ваш аватар]" />
        <label htmlFor="selfie">Описание вашего резюме</label>
        <textarea
          style={{
            all: "unset",
            overflowX: "hidden",
            overflowY: "scroll",
            wordBreak: "break-all",
            border: "1px solid rgba(0,0,0,0.5)",
            padding: "5px 20px",
            minHeight: "350px",
          }}
          type="text"
          name="description"
          value={inputValue2.description}
          onChange={handleChange2}
        />

        <div className="button" onClick={handleSubmit2}>
          Создать
        </div>
      </Modal>
      {children}
    </popupContext.Provider>
  );
};

export const usePopup = () => {
  return { ...useContext(popupContext) };
};
