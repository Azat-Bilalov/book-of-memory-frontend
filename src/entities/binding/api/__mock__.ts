import { DOCUMENTS_MOCK } from "@/entities/document/api/__mock__";
import { VETERANS_MOCK } from "@/entities/veteran/api/__mock__";

export const BINDINGS_MOCK = [
  {
    id: 1342,
    status: "in_progress",
    createdAt: "2023-12-20, 19:05:05",
    formattedAt: "2023-12-20, 19:12:34",
    endedAt: "",
    documents: [DOCUMENTS_MOCK[0], DOCUMENTS_MOCK[2]],
    veteran: VETERANS_MOCK[0],
  },
  {
    id: 6293,
    status: "canceled",
    createdAt: "2023-12-23, 10:08:00",
    formattedAt: "2023-12-24, 17:00:00",
    endedAt: "2023-12-24, 19:00:37",
    documents: [DOCUMENTS_MOCK[3], DOCUMENTS_MOCK[2]],
    veteran: VETERANS_MOCK[4],
  },
  {
    id: 3430,
    status: "completed",
    createdAt: "2023-11-30, 22:30:10",
    formattedAt: "2023-11-30, 23:14:10",
    endedAt: "2023-12-01, 01:51:26",
    documents: [DOCUMENTS_MOCK[1]],
    veteran: VETERANS_MOCK[2],
  },
];
