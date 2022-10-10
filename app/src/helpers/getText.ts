//from ReactQuill we get <p></p> with description so to remove it we use this function
export const getText = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent;
};
