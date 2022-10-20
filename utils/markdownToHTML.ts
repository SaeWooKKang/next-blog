import { remark } from "remark";
import html from "remark-html";
import remarkPrism from "remark-prism";

export const  markdownToHTML = async (markdown: string) => {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(remarkPrism)
    .process(markdown);
  
  return result.value;
}