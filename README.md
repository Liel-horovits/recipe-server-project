# Recipe Project - Backend API

מערכת לניהול מתכונים הכוללת ניהול משתמשים, קטגוריות ותוכן פרטי/ציבורי.

## טבלת Endpoint (API Documentation)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | הרשמת משתמש חדש | No |
| **POST** | `/api/auth/login` | התחברות וקבלת Token | No |
| **GET** | `/api/recipes` | שליפת כל המתכונים (דפדוף + חיפוש) | No / Optional |
| **GET** | `/api/recipes/:id` | שליפת מתכון ספציפי לפי ID | No |
| **POST** | `/api/recipes` | הוספת מתכון חדש | Yes |
| **PUT** | `/api/recipes/:id` | עדכון מתכון (רק לבעלים) | Yes |
| **DELETE** | `/api/recipes/:id` | מחיקת מתכון (בעלים או מנהל) | Yes |
| **GET** | `/api/recipes/time/:minutes` | שליפת מתכונים לפי זמן הכנה | No |
| **GET** | `/api/categories` | שליפת כל הקטגוריות | No |
| **GET** | `/api/categories/:code` | שליפת קטגוריה לפי קוד | No |
| **GET** | `/api/categories/:code/recipes` | שליפת מתכונים לפי קטגוריה | No |
| **GET** | `/api/users` | קבלת רשימת משתמשים | Yes (Admin) |
| **DELETE** | `/api/users/:id` | מחיקת משתמש מהמערכת | Yes (Admin) |

## טכנולוגיות בשימוש
* **Node.js & Express** - שרת האפליקציה.
* **MongoDB & Mongoose** - בסיס נתונים ומודלים.
* **JWT (JSON Web Token)** - אבטחה וזיהוי משתמשים.
* **Joi** - ולידציה של נתונים.
* **Bcrypt** - הצפנת סיסמאות.

## הוראות הרצה
1. הריצו `npm install` להתקנת הספריות.
2. צרו קובץ `.env` עם `MONGO_URI` ו-`JWT_SECRET`.
3. הריצו `node app.js` או `npm start`.