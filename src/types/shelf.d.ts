import type { Shelf } from "@prisma/client";


type ShelfList = Pick<Shelf, "id" | "name">;