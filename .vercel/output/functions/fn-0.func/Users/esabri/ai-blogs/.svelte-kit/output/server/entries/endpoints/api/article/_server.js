import "../../../../chunks/openai.js";
import "fs";
import "csv-parser";
import "stream";
async function GET({ params }) {
  `${params.article_slug}/markdown.md`;
  return {
    // markdown: markdown,
    // metadata: jsonObj
  };
}
export {
  GET
};
