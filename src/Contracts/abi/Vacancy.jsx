export default [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "valueToActivate",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "photo",
        type: "string",
      },
      {
        internalType: "string",
        name: "companyName",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "telegramLink",
        type: "string",
      },
      {
        internalType: "string",
        name: "payRangeCurrency",
        type: "string",
      },
      {
        internalType: "string",
        name: "payRangeLower",
        type: "string",
      },
      {
        internalType: "string",
        name: "payRangeHigher",
        type: "string",
      },
      {
        internalType: "address payable",
        name: "ownerAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "activateFoundation",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "disableFoundation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "queryAll",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "status",
            type: "bool",
          },
          {
            internalType: "string",
            name: "photo",
            type: "string",
          },
          {
            internalType: "string",
            name: "companyName",
            type: "string",
          },
          {
            internalType: "string",
            name: "telegramLink",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "valueToActivate",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "string",
                name: "currencySymbol",
                type: "string",
              },
              {
                internalType: "string",
                name: "lowerValue",
                type: "string",
              },
              {
                internalType: "string",
                name: "higherValue",
                type: "string",
              },
            ],
            internalType: "struct Vacancy.PayRange",
            name: "payRange",
            type: "tuple",
          },
        ],
        internalType: "struct Vacancy.summary",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
