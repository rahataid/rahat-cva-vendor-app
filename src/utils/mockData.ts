import { enumStringBody } from "@babel/types";
import { IBeneficiary } from "@types/beneficiaries";

export const mockBeneficiaries: IBeneficiary[] = [
  {
    uuid: "9fd8152d-785b-4b27-9612-96c3d64d61e1",
    name: "Sarvesh Karki",
    phone: 9851000000,
    gender: "MALE",
    estimatedAge: "26-30",
    address: "Lalitpur",
    status: "SUCCESS",
    beneficiaryType: "ENROLLED",
    walletAddress: "0x1234567890",
    otpHash: "0x1230",
    voucherType: "FREE_VOUCHER",
    status: "SUCCESS",
    createdAt: 1672566000000,
    voucherSymbol: "ABCD5",
    transactionHash: "0x9fd8152d785b4b27961296c3d64d61e1",
  },
  {
    uuid: "98fd9d4d-15d1-45b3-9cb1-89d6ef19eaae",
    name: "Mani Byanjankar",
    phone: 9851111111,
    gender: "MALE",
    estimatedAge: "31-35",
    address: "Lalitpur",
    status: "SUCCESS",
    beneficiaryType: "REFERRED",
    walletAddress: "0x1234567891",
    otpHash: "0x1231",
    voucherType: "DISCOUNT_VOUCHER",
    status: "SUCCESS",
    createdAt: 1672652400000,
    voucherSymbol: "EFGH6",
    transactionHash: "0x98fd9d4d15d145b39cb189d6ef19eaae",
  },
  {
    uuid: "b8e1f812-0db2-4697-b372-c3e93abeb105",
    name: "Raghav Kattel",
    phone: 9851222222,
    gender: "MALE",
    estimatedAge: "26-30",
    address: "Kathmandu",
    status: "SUCCESS",
    beneficiaryType: "ENROLLED",
    walletAddress: "0x1234567892",
    otpHash: "0x1232",
    voucherType: "FREE_VOUCHER",
    status: "SUCCESS",
    createdAt: 1672662400000,
    voucherSymbol: "IJKL7",
    transactionHash: "0xb8e1f8120db24697b372c3e93abeb105",
  },
  {
    uuid: "f5436f47-6d9b-4fa1-8345-688bfe7847b8",
    name: "Riya Shrestha",
    phone: 9851333333,
    gender: "FEMALE",
    estimatedAge: "21-25",
    address: "Bhaktapur",
    status: "SUCCESS",
    beneficiaryType: "REFERRED",
    walletAddress: "0x1234567893",
    otpHash: "0x1233",
    voucherType: "DISCOUNT_VOUCHER",
    status: "SUCCESS",
    createdAt: 1672738800000,
    voucherSymbol: "MNOP8",
    transactionHash: "0xf5436f476d9b4fa18345688bfe7847b8",
  },
  {
    uuid: "96f8e2f4-789b-44aa-b6e3-190e9f6b2084",
    name: "Kiran Lama",
    phone: 9851444444,
    gender: "MALE",
    estimatedAge: "26-30",
    address: "Pokhara",
    status: "SUCCESS",
    beneficiaryType: "REFERRED",
    walletAddress: "0x1234567894",
    otpHash: "0x1234",
    voucherType: "DISCOUNT_VOUCHER",
    status: "SUCCESS",
    createdAt: 1672738800000,
    voucherSymbol: "QRST9",
    transactionHash: "0x96f8e2f4789b44aab6e3190e9f6b2084",
  },
  {
    uuid: "b01744a6-cd3e-4b26-b61d-57e12e44265e",
    name: "Sunita Rai",
    phone: 9851555555,
    gender: "FEMALE",
    estimatedAge: "31-35",
    address: "Chitwan",
    status: "SUCCESS",
    beneficiaryType: "ENROLLED",
    walletAddress: "0x1234567895",
    otpHash: "0x1235",
    voucherType: "FREE_VOUCHER",
    status: "SUCCESS",
    createdAt: 1672738800000,
    voucherSymbol: "UVWX1",
    transactionHash: "0xb01744a6cd3e4b2657e12e44265e",
  },
  {
    uuid: "cb16834e-8d14-4c9a-80bb-cda2d7c95d8a",
    name: "Binod Gurung",
    phone: 9851666666,
    gender: "MALE",
    estimatedAge: "31-35",
    address: "Butwal",
    status: "SUCCESS",
    beneficiaryType: "REFERRED",
    walletAddress: "0x1234567896",
    otpHash: "0x1236",
    voucherType: "DISCOUNT_VOUCHER",
    status: "SUCCESS",
    createdAt: 1672825200000,
    voucherSymbol: "YZ01A",
    transactionHash: "0xcb16834e8d144c980bbda2d7c95d8a",
  },
  {
    uuid: "a5ae9b81-8fa7-46e5-8728-53bea363f689",
    name: "Anita Tamang",
    phone: 9851777777,
    gender: "FEMALE",
    estimatedAge: "26-30",
    address: "Dharan",
    status: "SUCCESS",
    beneficiaryType: "REFERRED",
    walletAddress: "0x1234567897",
    otpHash: "0x1237",
    voucherType: "DISCOUNT_VOUCHER",
    status: "SUCCESS",
    createdAt: 1672825200000,
    voucherSymbol: "2345B",
    transactionHash: "0xa5ae9b818fa746e5872853bea363f689",
  },
  {
    uuid: "589b4259-61d9-4426-94a9-80899b5b1a4b",
    name: "Rakesh Magar",
    phone: 9851888888,
    gender: "MALE",
    estimatedAge: "21-25",
    address: "Nepalgunj",
    status: "SUCCESS",
    beneficiaryType: "ENROLLED",
    walletAddress: "0x1234567898",
    otpHash: "0x1238",
    voucherType: "FREE_VOUCHER",
    status: "SUCCESS",
    createdAt: 1672825200000,
    voucherSymbol: "6789C",
    transactionHash: "0x589b425961d9442694a980899b5b1a4b",
  },
  {
    uuid: "1dcfc5d1-2dbb-4b17-bb3b-18a36f8f14c0",
    name: "Mina Basnet",
    phone: 9851999999,
    gender: "FEMALE",
    estimatedAge: "26-30",
    address: "Biratnagar",
    status: "SUCCESS",
    beneficiaryType: "REFERRED",
    walletAddress: "0x1234567899",
    otpHash: "0x1239",
    voucherType: "DISCOUNT_VOUCHER",
    status: "SUCCESS",
    createdAt: 1672825200000,
    voucherSymbol: "ABCDE",
    transactionHash: "0x1dcfc5d12dbb4b17bb3b18a36f8f14c0",
  },
];

// export const mockBeneficiaries: IBeneficiary[] = [
//   {
//     uuid: "9fd8152d-785b-4b27-9612-96c3d64d61e1",
//     name: "Sarvesh Karki",
//     phone: 9851000000,
//     gender: "MALE",
//     estimatedAge: "26-30",
//     address: "Lalitpur",
//     status: "SUCCESS",
//     beneficiaryType: "ENROLLED",
//     walletAddress: "0x1234567890",
//     otpHash: "0x1230",
//     voucherType: "FREE_VOUCHER",
//     status: "SUCCESS",
//     createdAt: 1672566000000, // January 1, 2024, 12:00:00 AM
//     voucherSymbol: "ABCD5",
//     transactionHash: "0x9fd8152d785b4b27961296c3d64d61e1",
//   },
//   {
//     uuid: "98fd9d4d-15d1-45b3-9cb1-89d6ef19eaae",
//     name: "Mani Byanjankar",
//     phone: 9851111111,
//     gender: "MALE",
//     estimatedAge: "31-35",
//     address: "Lalitpur",
//     status: "SUCCESS",
//     beneficiaryType: "REFERRED",
//     walletAddress: "0x1234567891",
//     otpHash: "0x1231",
//     voucherType: "DISCOUNT_VOUCHER",
//     status: "SUCCESS",
//     createdAt: 1672652400000, // January 2, 2024, 12:00:00 AM
//     voucherSymbol: "EFGH6",
//     transactionHash: "0x98fd9d4d15d145b39cb189d6ef19eaae",
//   },
//   {
//     uuid: "b8e1f812-0db2-4697-b372-c3e93abeb105",
//     name: "Raghav Kattel",
//     phone: 9851222222,
//     gender: "MALE",
//     estimatedAge: "26-30",
//     address: "Kathmandu",
//     status: "SUCCESS",
//     beneficiaryType: "ENROLLED",
//     walletAddress: "0x1234567892",
//     otpHash: "0x1232",
//     voucherType: "FREE_VOUCHER",
//     status: "SUCCESS",
//     createdAt: 1672738800000, // January 3, 2024, 12:00:00 AM
//     voucherSymbol: "IJKL7",
//     transactionHash: "0xb8e1f8120db24697b372c3e93abeb105",
//   },
//   {
//     uuid: "f5436f47-6d9b-4fa1-8345-688bfe7847b8",
//     name: "Riya Shrestha",
//     phone: 9851333333,
//     gender: "FEMALE",
//     estimatedAge: "21-25",
//     address: "Bhaktapur",
//     status: "SUCCESS",
//     beneficiaryType: "REFERRED",
//     walletAddress: "0x1234567893",
//     otpHash: "0x1233",
//     voucherType: "DISCOUNT_VOUCHER",
//     status: "SUCCESS",
//     createdAt: 1672825200000, // January 4, 2024, 12:00:00 AM
//     voucherSymbol: "MNOP8",
//     transactionHash: "0xf5436f476d9b4fa18345688bfe7847b8",
//   },
//   {
//     uuid: "96f8e2f4-789b-44aa-b6e3-190e9f6b2084",
//     name: "Kiran Lama",
//     phone: 9851444444,
//     gender: "MALE",
//     estimatedAge: "26-30",
//     address: "Pokhara",
//     status: "SUCCESS",
//     beneficiaryType: "REFERRED",
//     walletAddress: "0x1234567894",
//     otpHash: "0x1234",
//     voucherType: "DISCOUNT_VOUCHER",
//     status: "SUCCESS",
//     createdAt: 1672911600000, // January 5, 2024, 12:00:00 AM
//     voucherSymbol: "QRST9",
//     transactionHash: "0x96f8e2f4789b44aab6e3190e9f6b2084",
//   },
//   {
//     uuid: "b01744a6-cd3e-4b26-b61d-57e12e44265e",
//     name: "Sunita Rai",
//     phone: 9851555555,
//     gender: "FEMALE",
//     estimatedAge: "31-35",
//     address: "Chitwan",
//     status: "SUCCESS",
//     beneficiaryType: "ENROLLED",
//     walletAddress: "0x1234567895",
//     otpHash: "0x1235",
//     voucherType: "FREE_VOUCHER",
//     status: "SUCCESS",
//     createdAt: 1672998000000, // January 6, 2024, 12:00:00 AM
//     voucherSymbol: "UVWX1",
//     transactionHash: "0xb01744a6cd3e4b2657e12e44265e",
//   },
//   {
//     uuid: "cb16834e-8d14-4c9a-80bb-cda2d7c95d8a",
//     name: "Binod Gurung",
//     phone: 9851666666,
//     gender: "MALE",
//     estimatedAge: "31-35",
//     address: "Butwal",
//     status: "SUCCESS",
//     beneficiaryType: "REFERRED",
//     walletAddress: "0x1234567896",
//     otpHash: "0x1236",
//     voucherType: "DISCOUNT_VOUCHER",
//     status: "SUCCESS",
//     createdAt: 1673084400000, // January 7, 2024, 12:00:00 AM
//     voucherSymbol: "YZ01A",
//     transactionHash: "0xcb16834e8d144c980bbda2d7c95d8a",
//   },
//   {
//     uuid: "a5ae9b81-8fa7-46e5-8728-53bea363f689",
//     name: "Anita Tamang",
//     phone: 9851777777,
//     gender: "FEMALE",
//     estimatedAge: "26-30",
//     address: "Dharan",
//     status: "SUCCESS",
//     beneficiaryType: "REFERRED",
//     walletAddress: "0x1234567897",
//     otpHash: "0x1237",
//     voucherType: "DISCOUNT_VOUCHER",
//     status: "SUCCESS",
//     createdAt: 1673170800000, // January 8, 2024, 12:00:00 AM
//     voucherSymbol: "2345B",
//     transactionHash: "0xa5ae9b818fa746e5872853bea363f689",
//   },
//   {
//     uuid: "589b4259-61d9-4426-94a9-80899b5b1a4b",
//     name: "Rakesh Magar",
//     phone: 9851888888,
//     gender: "MALE",
//     estimatedAge: "21-25",
//     address: "Nepalgunj",
//     status: "SUCCESS",
//     beneficiaryType: "ENROLLED",
//     walletAddress: "0x1234567898",
//     otpHash: "0x1238",
//     voucherType: "FREE_VOUCHER",
//     status: "SUCCESS",
//     createdAt: 1673257200000, // January 9, 2024, 12:00:00 AM
//     voucherSymbol: "6789C",
//     transactionHash: "0x589b425961d9442694a980899b5b1a4b",
//   },
//   {
//     uuid: "1dcfc5d1-2dbb-4b17-bb3b-18a36f8f14c0",
//     name: "Mina Basnet",
//     phone: 9851999999,
//     gender: "FEMALE",
//     estimatedAge: "26-30",
//     address: "Biratnagar",
//     status: "SUCCESS",
//     beneficiaryType: "REFERRED",
//     walletAddress: "0x1234567899",
//     otpHash: "0x1239",
//     voucherType: "DISCOUNT_VOUCHER",
//     status: "SUCCESS",
//     createdAt: 1673343600000, // January 10, 2024, 12:00:00 AM
//     voucherSymbol: "ABCDE",
//     transactionHash: "0x1dcfc5d12dbb4b17bb3b18a36f8f14c0",
//   },
// ];

export const mockReferredBeneficiaries: IBeneficiary[] = [
  {
    uuid: "a67f2655-21c7-4f25-8f86-bcc9a0a01fc7",
    name: "Sarvesh Karki",
    phone: 9851000000,
    gender: "MALE",
    estimatedAge: "26-30",
    address: "Lalitpur",
    status: "SUCCESS",
    beneficiaryType: "REFERRED",
    walletAddress: "0x1234567890",
    otpHash: "0x1230",
    voucherType: "DISCOUNT_VOUCHER",
    createdAt: 1704108400000,
  },
  {
    uuid: "5b346192-f65f-4c8f-a312-97c2f6a8cf14",
    name: "Mani Byanjankar",
    phone: 9851111111,
    gender: "MALE",
    estimatedAge: "31-35",
    address: "Lalitpur",
    status: "SUCCESS",
    beneficiaryType: "REFERRED",
    walletAddress: "0x1234567891",
    otpHash: "0x1231",
    voucherType: "DISCOUNT_VOUCHER",
    createdAt: 1704194800000,
  },
  {
    uuid: "e3014e89-63f3-460a-8f9d-ef93197941c1",
    name: "Raghav Kattel",
    phone: 9851222222,
    gender: "MALE",
    estimatedAge: "26-30",
    address: "Kathmandu",
    status: "SUCCESS",
    beneficiaryType: "REFERRED",
    walletAddress: "0x1234567892",
    otpHash: "0x1232",
    voucherType: "DISCOUNT_VOUCHER",
    createdAt: 1704281200000,
  },
  {
    uuid: "eebb4c0b-6711-48f0-9a97-10fe4dcfa89a",
    name: "Riya Shrestha",
    phone: 9851333333,
    gender: "FEMALE",
    estimatedAge: "21-25",
    address: "Bhaktapur",
    status: "SUCCESS",
    beneficiaryType: "REFERRED",
    walletAddress: "0x1234567893",
    otpHash: "0x1233",
    voucherType: "DISCOUNT_VOUCHER",
    createdAt: 1704367600000,
  },
  {
    uuid: "1d0c63f3-63b5-4c3c-87a5-81e36c3bf912",
    name: "Kiran Lama",
    phone: 9851444444,
    gender: "MALE",
    estimatedAge: "26-30",
    address: "Pokhara",
    status: "SUCCESS",
    beneficiaryType: "REFERRED",
    walletAddress: "0x1234567894",
    otpHash: "0x1234",
    voucherType: "DISCOUNT_VOUCHER",
    createdAt: 1704454000000,
  },
  {
    uuid: "e4b5c8ef-d1b2-4e86-b3c5-2a7e75d787c5",
    name: "Sunita Rai",
    phone: 9851555555,
    gender: "FEMALE",
    estimatedAge: "31-35",
    address: "Chitwan",
    status: "SUCCESS",
    beneficiaryType: "REFERRED",
    walletAddress: "0x1234567895",
    otpHash: "0x1235",
    voucherType: "DISCOUNT_VOUCHER",
    createdAt: 1704540400000,
  },
  {
    uuid: "ee5a47db-d0e8-47f5-8523-19ab6a39b02a",
    name: "Binod Gurung",
    phone: 9851666666,
    gender: "MALE",
    estimatedAge: "31-35",
    address: "Butwal",
    status: "SUCCESS",
    beneficiaryType: "REFERRED",
    walletAddress: "0x1234567896",
    otpHash: "0x1236",
    voucherType: "DISCOUNT_VOUCHER",
    createdAt: 1704626800000,
  },
  {
    uuid: "de0b51d2-7f5f-4a4e-a7cf-d1b1fbc24b02",
    name: "Anita Tamang",
    phone: 9851777777,
    gender: "FEMALE",
    estimatedAge: "26-30",
    address: "Dharan",
    status: "SUCCESS",
    beneficiaryType: "REFERRED",
    walletAddress: "0x1234567897",
    otpHash: "0x1237",
    voucherType: "DISCOUNT_VOUCHER",
    createdAt: 1704713200000,
  },
  {
    uuid: "605e5931-21b5-4c7f-858d-f581b3b34618",
    name: "Rakesh Magar",
    phone: 9851888888,
    gender: "MALE",
    estimatedAge: "21-25",
    address: "Nepalgunj",
    status: "SUCCESS",
    beneficiaryType: "REFERRED",
    walletAddress: "0x1234567898",
    otpHash: "0x1238",
    voucherType: "DISCOUNT_VOUCHER",
    createdAt: 1704799600000,
  },
  {
    uuid: "bf4bb1bf-4b19-4f2a-a01a-6405b4d4cb6f",
    name: "Mina Basnet",
    phone: 9851999999,
    gender: "FEMALE",
    estimatedAge: "26-30",
    address: "Biratnagar",
    status: "SUCCESS",
    beneficiaryType: "REFERRED",
    walletAddress: "0x1234567899",
    otpHash: "0x1239",
    voucherType: "DISCOUNT_VOUCHER",
    createdAt: 1704886000000,
  },
];
