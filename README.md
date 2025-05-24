<div align="center">

# BGJargon API

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18+-blue.svg)](https://expressjs.com/)

_Unofficial REST API for [Bulgarian Jargon Dictionary](https://www.bgjargon.com/)_

</div>

---

> [!NOTE]
> Unofficial API for educational purposes. Original content belongs to [bgjargon.com](https://bgjargon.com).

## Installation

```bash
git clone https://github.com/balgariya/bgjargon-api.git
cd bgjargon-api
bun install
bun start
```

**API available at:** `http://localhost:3000`

## Endpoints

**Search Word/Phrase**

- `GET /api?word=<term>` - Query parameter
- `GET /api/<encoded_term>` - URL path

**Health Check**

- `GET /health` - Server status

**Documentation**

- `GET /` - Complete API docs

### Response Format

**Success:**

```json
{
  "success": true,
  "data": {
    "word": "лани",
    "definitions": [
      {
        "meaning": "(диал.) миналата година",
        "example": "– А ти нема ли да фанеш да се изкàпеш?\n\n– Я съм се капàл.\n\n– Кога? Лàни на реката?!\n\nТипично порицание към някой, който не обича често-често да се къпе (обикновено от жена към мъж от семейството - съпруг, син, внук...).",
        "votesYes": "22",
        "votesNo": "4"
      },
      {
        "meaning": "МИНАЛАТА ГОДИНА",
        "example": "ЛАНИ ХОДИХ НА МОРЕ — МИНАЛАТА ГОДИНА ХОДИХ НА МОРЕ",
        "votesYes": "17",
        "votesNo": "4"
      }
    ],
    "totalDefinitions": 2
  },
  "timestamp": "2025-05-24T10:04:28.258Z"
}
```

**Error:**

```json
{
  "success": false,
  "error": "Word parameter is required.",
  "code": 400,
  "timestamp": "2025-05-24T10:12:43.690Z"
}
```

---

<div align="center">

**Made with ❤️ for the Bulgarian developer community**

⭐ Star this repo if you find it useful!

</div>
