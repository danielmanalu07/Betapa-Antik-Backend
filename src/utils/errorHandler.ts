import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime/library";

function handleDuplicateError(error: any) {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": {
        let target = "field";

        const metaTarget = error.meta?.target;
        if (Array.isArray(metaTarget) && metaTarget.length > 0) {
          target = metaTarget[0];
        } else if (typeof metaTarget === "string") {
          const match = metaTarget.match(/User_(.+)_key/);
          target = match ? match[1] : metaTarget;
        }

        return {
          statusCode: 400,
          message: `Duplicate ${target}`,
          error: {
            field: target,
            message: `${target} already exists`,
          },
        };
      }
    }
  }

  return {
    statusCode: 500,
    message: "Internal Server Error",
    error,
  };
}

export default handleDuplicateError;
