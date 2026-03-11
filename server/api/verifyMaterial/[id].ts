import { VerifyError } from "~/types/verifyError";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { id: string };
  const errorCodes = [
    { code: "NOT_FOUND", httpcode: 404 },
    { code: "FORBIDDEN", httpcode: 403 },
    { code: "UNAUTHORIZED", httpcode: 401 },
    { code: "INVALID_DATA", httpcode: 400 },
    { code: "SERVER_ERROR", httpcode: 500 },
  ];
  try {
    if (id === "1063720") {
      return {
        id: "1063720",
        title: "The Great Gatsby",
      };
    }

    let customError: VerifyError | null = null;
    if (id !== "1942456") {
      customError = {
        code: "NOT_FOUND",
        detail: `Item not found: ${id}`,

        data: null,
        errors: [
          {
            code: "ITEM_NOT_FOUND",
            detail: "The requested biblio record could not be found.",
          },
        ],
      };
    } else if (id === "1942456") {
      customError = {
        code: "FORBIDDEN",
        detail: `Item not allowed for loan: ${id}`,
        data: null,
        errors: [
          {
            code: "CAN_NOT_BE_BORROWED",
            detail: "This item is not allowed for loan.",
          },
        ],
      };
    }
    /*1063720*/
    throw createError({
      status:
        errorCodes.find((e) => e.code === customError?.code)?.httpcode || 500,
      statusText: customError?.detail,
      data: customError?.errors,
    });
  } catch (error: any) {
    throw error;
  }
});
