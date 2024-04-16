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
export const ResumeFormPopupProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);
  const [resolvedValue, setResolvedValue] = useState(null);

  const createPopup = () => {
    setIsOpen(true);
  };
  const handleSubmit = () => {
    console.log(inputValue);
    setResolvedValue(inputValue);
  };
  const destroy = () => {
    setIsOpen(false);
    setInputValue(defaultValue);
    setResolvedValue(null);
  };

  const handleChange = (e) => {
    setInputValue((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <popupContext.Provider value={{ createPopup, resolvedValue, destroy }}>
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
      {children}
    </popupContext.Provider>
  );
};

export const usePopup = () => {
  return { ...useContext(popupContext) };
};
