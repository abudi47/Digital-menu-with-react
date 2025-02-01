import { unlink } from "node:fs/promises";

export const removeFile = async (path) => {
  return unlink(path)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

