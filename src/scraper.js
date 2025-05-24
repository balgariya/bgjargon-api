import axios from "axios";
import * as cheerio from "cheerio";
import { sanitizeText } from "./utils.js";

/**
 * Scrapes BGJargon for word definitions
 * @param {string} word - The word to search for
 * @returns {Object|null} - Scraped data or null if not found
 */
export async function scrapeBgJargon(word) {
  try {
    const encodedWord = encodeURIComponent(word.trim());
    const url = `https://www.bgjargon.com/word/meaning/${encodedWord}`;

    const response = await axios.get(url, {
      timeout: 10000, //10 seconds
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const $ = cheerio.load(response.data);

    const noWordElement = $(".no_word");
    if (noWordElement.length > 0) {
      return null;
    }

    const definitions = [];
    $("article").each((i, articleEl) => {
      const meaning = $(articleEl).find(".meaning p").text().trim();
      const example = $(articleEl).find(".example p").text().trim();
      const votesYes = $(articleEl).find(".vote_yes").text().trim();
      const votesNo = $(articleEl).find(".vote_no").text().trim();

      if (meaning) {
        definitions.push({
          meaning: sanitizeText(meaning),
          example: example ? sanitizeText(example) : null,
          votesYes: votesYes || "0",
          votesNo: votesNo || "0",
        });
      }
    });

    if (definitions.length === 0) {
      return null;
    }

    const wordTitle = $("article h2").first().text().trim();

    return {
      word: sanitizeText(wordTitle || word),
      definitions: definitions,
      totalDefinitions: definitions.length,
    };
  } catch (error) {
    if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      console.error("BGJargon website is unreachable");
    } else if (error.response?.status === 404) {
      return null;
    } else {
      console.error("Error scraping BGJargon:", error.message);
    }
    return null;
  }
}
